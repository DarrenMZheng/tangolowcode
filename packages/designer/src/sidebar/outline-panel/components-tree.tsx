import React, { useEffect, useMemo, useState } from 'react';
import { Space, Tree } from 'antd';
import { Box, css } from 'coral-system';
import { IconFont } from '@music163/tango-ui';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { observer, useWorkspace } from '@music163/tango-context';
import { DropMethod, ITangoViewNodeData } from '@music163/tango-core';
import { parseDndId } from '@music163/tango-helpers';
import { useSandboxQuery } from '../../context';
import { buildQueryBySlotId } from '../../helpers';

const outlineStyle = css`
  .ant-tree-title {
    color: rgb(85, 85, 85);
  }

  .ant-tree .ant-tree-treenode {
    padding: 2px;
  }

  .ant-tree-indent-unit {
    width: 12px;
  }

  .ant-tree .ant-tree-node-content-wrapper {
    white-space: nowrap;
    transition: none;
  }
  .variable-row {
    font-size: 12px;
  }
  .ant-tree-switcher-noop {
    display: none;
  }
`;

const filedNames = {
  title: 'component',
  key: 'id',
  children: 'children',
};

const getNodeKeys = (data: ITangoViewNodeData[]) => {
  const ids: string[] = [];
  data?.forEach((node) => {
    ids.push(node.id);
    if (node.children) {
      ids.push(...getNodeKeys(node.children));
    }
  });
  return ids;
};

const OutlineTreeNode: React.FC<any> = observer(({ node }: { node: ITangoViewNodeData }) => {
  const workspace = useWorkspace();
  const sandboxQuery = useSandboxQuery();
  const [visible, setVisible] = useState(true);
  const nodeLabel = useMemo(() => {
    const { component, index } = parseDndId(node.id);
    return `${component}:${index}`;
  }, [node.id]);
  const componentPrototype = workspace.componentPrototypes.get(node.component);
  const icon = componentPrototype?.icon || 'icon-placeholder';

  const iconRender = icon.startsWith('icon-') ? (
    <IconFont className="material-icon" type={icon} />
  ) : (
    <img src={icon} alt={componentPrototype.name} />
  );

  const toggleVisible = (nodeId: string) => {
    sandboxQuery.getElement(buildQueryBySlotId(nodeId)).style.visibility = visible
      ? 'hidden'
      : 'visible';
    setVisible(!visible);
  };

  const VisibleIcon = visible ? EyeOutlined : EyeInvisibleOutlined;
  return (
    <Space>
      {iconRender} {nodeLabel}
      {/* 切换显示 */}
      <VisibleIcon
        className="material-icon"
        onClick={(e) => {
          e.stopPropagation();
          toggleVisible(node.id);
        }}
      />
    </Space>
  );
});

export const ComponentsTree = observer(() => {
  const workspace = useWorkspace();
  const sandboxQuery = useSandboxQuery();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
    workspace.selectSource.selected.map((item) => item.id),
  );
  const file = workspace.activeViewModule;
  const nodesTree = file.nodesTree as ITangoViewNodeData[];

  useEffect(() => {
    setSelectedKeys(workspace.selectSource.selected.map((item) => item.id));
  }, [workspace.selectSource.selected]);

  if (!nodesTree.length) {
    return (
      <Box>
        没有指定文件，或文件<code>{workspace.activeViewFile}</code>没有有效的节点树
      </Box>
    );
  }

  return (
    <Box css={outlineStyle}>
      <Tree
        selectedKeys={selectedKeys}
        fieldNames={filedNames}
        treeData={nodesTree as any[]}
        onSelect={(keys) => {
          const data = sandboxQuery.getDraggableParentsData(
            buildQueryBySlotId(keys[0] as string),
            true,
          );
          if (data && data.id) {
            workspace.selectSource.select({
              id: data.id,
              name: data.name,
              bounding: data.bounding,
              parents: data.parents,
            });
          }
          setSelectedKeys(keys);
        }}
        blockNode
        autoExpandParent
        expandedKeys={getNodeKeys(nodesTree)}
        draggable
        onDragStart={(data) => {
          const prototype = workspace.componentPrototypes.get(data.node.component);
          if (!prototype) {
            return;
          }
          const { canDrag } = prototype.rules || {};
          if (canDrag && !canDrag()) {
            return;
          }
          workspace.dragSource.set({
            id: data.node.id,
            name: data.node.component,
          });
        }}
        onDrop={(data) => {
          const dropKey = data.node.key as string;
          let method;
          if (data.dropToGap) {
            // 插入节点的后面
            method = DropMethod.InsertAfter;
          } else {
            // 作为第一个子节点
            method = DropMethod.InsertFirstChild;
          }
          workspace.dragSource.dropTarget.set(
            {
              id: dropKey,
            },
            method,
          );
          workspace.dropNode();
        }}
        titleRender={(node) => <OutlineTreeNode node={node} />}
      />
    </Box>
  );
});
