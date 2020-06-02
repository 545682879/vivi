import React, { PureComponent } from 'react';
import TableForm from '../../../iloop-form/TableForm';

const address = {
  rspList: 'rspList',
  rspKey: 'rspKey',
  rspId: 'rspId',
  rspValues: 'rspValues',
};

export default class ReqFields extends PureComponent {
  /**
   * @param {{ value: any; }} props
   */
  constructor(props) {
    super(props);
    let params = {};
    const { value } = props;
    try {
      params = JSON.parse(value) || {};
    } catch (e) {
      params = {};
    }
    const defaultFields = ['rspList', 'rspKey', 'rspId', 'rspValues'];
    const dataSource = defaultFields.map(it => ({
      paramName: address[it],
      paramValue: params[it],
    }));
    this.state = {
      formItems: [
        {
          tableName: 'template',
          fieldName: 'paramName',
          fieldHeader: '字段名',
          posIndex: 1,
          posWidth: 1,
          isOptional: true,
          isHidden: false,
          isDisable: false,
          isSearch: false,
          validation: null,
          inputType: 'plain',
          dictionaryType: null,
          reqUrl: null,
          reqParams: null,
          rspFields: null,
          maxLength: 100,
        },
        {
          tableName: 'template',
          fieldName: 'paramValue',
          fieldHeader: '字段值',
          posIndex: 2,
          posWidth: 1,
          isOptional: true,
          isHidden: false,
          isDisable: false,
          isSearch: false,
          validation: null,
          inputType: 'input',
          dictionaryType: null,
          reqUrl: null,
          reqParams: null,
          rspFields: null,
          maxLength: 100,
        },
      ],
      dataSource,
      defaultFields,
    };
  }

  onValuesChange = () => {
    const { defaultFields } = this.state;
    const { onChange } = this.props;
    const values = this.tableform.getDataSource();
    const result = {};
    (defaultFields || []).forEach((it, idx) => {
      result[it] = values[idx].paramValue;
    });
    onChange(JSON.stringify(result));
  };

  render() {
    const { formItems, dataSource } = this.state;
    return (
      <TableForm
        // @ts-ignore
        formItems={formItems}
        // @ts-ignore
        wrappedComponentRef={form => {
          this.tableform = form;
        }}
        inline
        style={{ marginTop: '10px' }}
        fixedNumber
        dataSource={dataSource}
        onValuesChange={this.onValuesChange}
      />
    );
  }
}
