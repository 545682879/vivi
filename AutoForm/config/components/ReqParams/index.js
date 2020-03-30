import React, { PureComponent } from 'react';
import TableForm from '../../../iloop-form/TableForm';


export default class RegParams extends PureComponent {
  constructor(props) {
    super(props);
    let params = [];
    const { value } = props;
    try {
      params = JSON.parse(value);
    } catch (e) {
      params = [];
    }

    const dataSource = (Object.keys(params || {}) || []).map(it => ({
      paramName: it,
      paramValue: params[it],
    }));

    this.state = {
      formItems: [
        {
          tableName: 'template',
          fieldName: 'paramName',
          fieldHeader: '参数名',
          posIndex: 1,
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
        {
          tableName: 'template',
          fieldName: 'paramValue',
          fieldHeader: '参数值',
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
    };
  }

  onValuesChange = () => {
    const { onChange } = this.props;
    const values = this.tableform.getDataSource();
    const result = {};
    (values || []).forEach(it => {
      result[it.paramName] = it.paramValue;
    });
    onChange(JSON.stringify(result));
  };

  render() {
    const { formItems, dataSource } = this.state;
    return (
      <TableForm
        formItems={formItems}
        style={{ marginTop: '10px' }}
        wrappedComponentRef={form => {
          this.tableform = form;
        }}
        inline
        dataSource={dataSource}
        onValuesChange={this.onValuesChange}
      />
    );
  }
}
