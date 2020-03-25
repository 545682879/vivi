/* eslint-disable no-unused-expressions */
/**
 *
 * @author gjl from hly&zjj
 * @since 2017/7/19
 */
import React from 'react';
import { Input } from 'antd';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = e => {
    const { value } = e.target;
    const { onChange, toFix, notAllowZero, integer } = this.props;
    let reg = notAllowZero ? /^[1-9][0-9]*$/ : /^\d*$/;
    reg = integer ? /^(-?[1-9]\d*|[0]{1,1})$/ : /^\d*$/; // 匹配允许0的正整数，但是不允许01，001格式
    if(toFix){
      reg = new RegExp(`^([-]?(0|[1-9][0-9]*))(\\.[0-9]{0,${toFix}})?$`)
    }
    // eslint-disable-next-line no-restricted-globals
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      onChange && onChange(e);
    }
  };

  onBlur = e => {
    if (e.target.oldValue === e.target.value) return;
    const { value, setFix, setFixBefore } = this.props;
    // eslint-disable-next-line no-unused-expressions
    setFixBefore && setFixBefore(e);
    let newValue = value || '';
    if (`${value}`.charAt(newValue.length - 1) === '.') {
      newValue = value.slice(0, -1);
    }
    newValue = parseFloat(newValue, 10) ? parseFloat(newValue, 10) : '';
    // eslint-disable-next-line no-unused-expressions
    setFix && setFix(newValue);
  };

  render() {
    const {
      style,
      id,
      name,
      className,
      value,
      onFocus,
      placeholder,
      maxLength,
      readOnly,
      disabled,
      addonAfter,
      suffix,
      prefix,
      addonBefore,
      size,
      onClick
    } = this.props;
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Input
        id={id}
        name={name}
        className={className}
        value={value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        maxLength={maxLength || 20}
        readOnly={readOnly || false}
        disabled={disabled}
        style={{ ...style }}
        prefix={prefix}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        suffix={suffix}
        size={size}
        onClick={onClick}
      />
    );
  }
}

export default NumberInput;
