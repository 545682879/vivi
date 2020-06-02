/* eslint-disable no-unused-expressions */
/**
 *
 * @author gjl from hly&zjj
 * @since 2017/7/19
 */
import React from 'react';
import { Input } from 'antd';

class NumberInput extends React.Component {
  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @param {{ target: { value: any; }; }} e
   */
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

  /**
   * @param {{ target: {value: any; }; }} e
   */
  onBlur = e => {
    const { value, setFix, setFixBefore } = this.props;
    // eslint-disable-next-line no-unused-expressions
    setFixBefore && setFixBefore(e);
    /** @type {string} */
    let newValue = value || "0";
    if (`${value}`.charAt(newValue.length - 1) === '.') {
      newValue = value.slice(0, -1);
    }
    const resultValue = parseFloat(newValue) ? parseFloat(newValue) : '';
    // eslint-disable-next-line no-unused-expressions
    setFix && setFix(resultValue);
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
