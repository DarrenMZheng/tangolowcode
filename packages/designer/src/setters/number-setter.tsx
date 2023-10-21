import React from 'react';
import { InputNumber, InputNumberProps, Slider } from 'antd';
import { FormItemComponentProps } from '@music163/tango-setting-form';

const style = {
  width: '100%',
};

export function NumberSetter({ onChange, ...props }: InputNumberProps) {
  return (
    <InputNumber
      placeholder="请输入数字"
      style={style}
      onChange={(val) => {
        if (val === null) {
          val = undefined;
        }
        onChange && onChange(val);
      }}
      {...props}
    />
  );
}

export function SliderSetter(props: FormItemComponentProps<number>) {
  return <Slider {...props} />;
}
