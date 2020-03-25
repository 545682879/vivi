// @ts-nocheck
import React, { Component } from 'react';
import { Form } from 'antd';

/**
 * @param {JSX.IntrinsicAttributes} WrappedComponent
 */
export default function formHOC(WrappedComponent) {
  // eslint-disable-next-line react/prefer-stateless-function
  return class HOC extends Component {
    render() {
      const { form } = this.props;
      const WrappedForm = Form.create()(WrappedComponent);
      return form ? <WrappedComponent {...this.props} /> : <WrappedForm {...this.props} />;
    }
  };
}
