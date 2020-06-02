/* eslint-disable no-param-reassign */
/**
 *
 * @author czw
 * @since 2019/8/15
 */
import React from 'react';
import IloopForm from '../../index';
// @ts-ignore
const { IloopSelect, IloopNumber } = IloopForm;

export default class ContractPayCycle extends React.Component {
  /**
   * @param {{ value: any; }} props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || {}
    };
  }

  componentWillReceiveProps() {

  }

  /**
   * @param {string} field
   * @param {{ target: { value: any; }; }} e
   */
  triggerChange = (field, e) => {
    const targetValue = (field === 'monthType') ? e : e.target.value;
    const { value } = this.state;
    const newValue = { ...value, [field]: targetValue };
    const { onChange } = this.props;
    if (onChange) {
      onChange(newValue);
    }
    this.setState({value: newValue});
  }

  render() {
    const {value} = this.state;
    const {startDateProps, endDateProps, disabled, dictionaryType, rspFields} = this.props;
    return (
      <div>
        <IloopSelect style={{width: '100px', verticalAlign: "middle"}} disabled={disabled} name="monthType" onChange={this.triggerChange.bind(this, 'monthType')} dictionaryType={dictionaryType} rspFields={rspFields} value={value.monthType} />
        <IloopNumber style={{marginLeft: '3px', width: '120px', verticalAlign: "middle"}} disabled={disabled} addonAfter="号" onChange={this.triggerChange.bind(this, 'settleStartDate')} {...startDateProps} value={value.settleStartDate} />
        <span>～</span>
        <IloopNumber style={{ width: '120px', verticalAlign: "middle"}} disabled={disabled} addonAfter="号" onChange={this.triggerChange.bind(this, 'settleEndDate')} {...endDateProps} value={value.settleEndDate} />
      </div>
    );
  }
}