import React from 'react';
import { ToggleButton } from '@music163/tango-ui';
import { EyeOutlined } from '@ant-design/icons';
import { observer, useDesigner } from '@music163/tango-context';

export const PreviewTool = observer(() => {
  const designer = useDesigner();

  return (
    <ToggleButton
      shape="ghost"
      selected={designer.isPreview}
      onClick={() => {
        const nextIsPreview = !designer.isPreview;
        designer.toggleIsPreview(nextIsPreview);
        if (nextIsPreview) {
          designer.setActiveView('design');
        }
      }}
      tip="预览"
    >
      <EyeOutlined />
    </ToggleButton>
  );
});
