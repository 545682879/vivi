import React, { PureComponent } from 'react';
import TableForm from '../../../iloop-form/TableForm';

const address = {
  provinceName: '省',
  provinceCode: '省编码',
  cityName: '市',
  cityCode: '市编码',
  regionName: '区',
  regionCode: '区编码',
};

export default class AddressFields extends PureComponent {
  // @ts-ignore
  constructor(props) {
    super(props);
    let params = {};
    const { value } = props;
    try {
      params = JSON.parse(value) || {};
    } catch (e) {
      params = {};
    }
    const defaultFields = [
      'provinceName',
      'provinceCode',
      'cityName',
      'cityCode',
      'regionName',
      'regionCode',
    ];
    const dataSource = defaultFields.map(it => ({
      paramName: address[it],
      paramValue: params[it],
    }));
    this.state = {
      formItems: [
        {
          tableName: 'template',
          fieldName: 'paramName',
          fieldHeader: '省/市/区',
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
          fieldHeader: '名称',
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
        style={{ marginTop: '10px' }}
        // @ts-ignore
        wrappedComponentRef={form => {
          this.tableform = form;
        }}
        inline
        fixedNumber
        dataSource={dataSource}
        onValuesChange={this.onValuesChange}
      />
    );
  }
}
