import React from 'react';
import cx from 'classnames';
import { css, Button, HTMLCoralProps } from 'coral-system';
import { DropDownProps, Dropdown, MenuProps, Tooltip, TooltipProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  color: var(--tango-colors-gray-50);
  padding: 0 8px;

  .anticon-down {
    font-size: 12px !important;
    margin-left: 4px;
  }

  &.size-s {
    height: 24px;
    font-size: 14px;
  }

  &.size-m {
    height: 32px;
    font-size: 14px;

    .anticon {
      font-size: 16px;
    }
  }

  &.size-l {
    height: 40px;
    font-size: 16px;

    .anticon {
      font-size: 20px;
    }
  }

  &.size-xl {
    height: 40px;
    font-size: 20px;
  }

  &.shape-text {
    padding: 0px 8px;
    border: 0;
    border-radius: var(--tango-radii-s);
    color: var(--tango-colors-gray-40);
    background: transparent;

    &.selected.type-normal {
      color: var(--tango-colors-white);
    }

    &.selected.type-primary {
      color: var(--tango-colors-brand);
    }

    &:hover {
      background-color: rgba(197, 197, 197, 0.16);
    }

    &.disabled {
      color: var(--tango-colors-gray-60);
    }
  }

  &.shape-outline {
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: var(--tango-radii-s);

    &.disabled {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
    }

    &.selected.type-normal {
      color: var(--tango-colors-gray-100);
      background-color: var(--tango-colors-gray-30);
      border-color: var(--tango-colors-gray-30);
    }

    &.selected.type-primary {
      color: #fff;
      background-color: var(--tango-colors-brand);
      border-color: var(--tango-colors-brand);
    }
  }

  &.shape-ghost {
    background-color: var(--tango-colors-custom-toolbarButtonBg, rgba(223, 223, 223, 0.08));
    color: var(--tango-colors-custom-toolbarButtonTextColor, #fff);
    border: 0;
    border-radius: var(--tango-radii-m);

    &:hover {
      color: var(--tango-colors-custom-toolbarButtonTextColorHover, #fff);
      background-color: var(--tango-colors-custom-toolbarButtonBgHover, rgba(197, 197, 197, 0.16));
    }

    &.disabled {
      color: var(--tango-colors-custom-toolbarButtonTextColorDisabled, rgb(201, 205, 212));
    }

    &.selected {
      background-color: var(--tango-colors-brand);
    }
  }

  &.disabled {
    pointer-events: none;
  }
`;

export interface ToggleButtonProps extends Omit<HTMLCoralProps<'button'>, 'type'> {
  size?: 's' | 'm' | 'l' | 'xl';
  shape?: 'outline' | 'ghost' | 'text';
  type?: 'normal' | 'primary';
  selected?: boolean;
  disabled?: boolean;
  /**
   * 提示文案
   * @deprecated 使用 tooltip 代替
   */
  tip?: string;
  /**
   * 提示文案
   */
  tooltip?: string;
  /**
   * 提示文案的位置
   */
  tooltipPlacement?: TooltipProps['placement'];
  /**
   * 下拉菜单
   */
  items?: MenuProps['items'];
  /**
   * 自定义下拉弹层
   */
  overlay?: DropDownProps['overlay'];
  /**
   * 下拉弹层的样式
   */
  overlayStyle?: DropDownProps['overlayStyle'];
  /**
   * 点击菜单项的回调
   */
  onItemClick?: MenuProps['onClick'];
  /**
   * 下拉菜单的属性
   */
  dropdownProps?: DropDownProps;
}

export function ToggleButton(props: ToggleButtonProps) {
  const {
    size = 'm',
    shape = 'outline',
    type = 'normal',
    disabled,
    selected,
    children,
    tip,
    tooltip = tip,
    tooltipPlacement = 'bottom',
    items,
    overlay,
    overlayStyle,
    onItemClick,
    dropdownProps = {},
    ...rest
  } = props;
  const clazz = cx({
    [`size-${size}`]: size,
    [`shape-${shape}`]: shape,
    [`type-${type}`]: type,
    disabled,
    selected,
  });

  const showDropdown = !!items || !!overlay;

  let btn = (
    <Button css={buttonStyle} className={clazz} type="button" {...rest}>
      {children}
      {showDropdown ? <DownOutlined /> : null}
    </Button>
  );

  if (tooltip) {
    btn = (
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        {btn}
      </Tooltip>
    );
  }

  if (showDropdown) {
    btn = (
      <Dropdown
        {...dropdownProps}
        overlay={overlay}
        overlayStyle={overlayStyle}
        menu={{ items, onClick: onItemClick }}
      >
        {btn}
      </Dropdown>
    );
  }

  return btn;
}
