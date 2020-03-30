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

    const dataSource = (params || []).map(it => {
      return {
        label: it.label,
        value: it.value || it,
      };
    });

    this.state = {
      formItems: [
        {
          tableName: 'template',
          fieldName: 'label',
          fieldHeader: '标签',
          posIndex: 1,
          posWidth: 1,
          isOptional: false,
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
          fieldName: 'value',
          fieldHeader: '值',
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
    if (
      (values || []).every(it => {
        return it.label;
      })
    ) {
      onChange(
        JSON.stringify(
          (values || []).map(it => {
            return { label: it.label, value: it.value };
          })
        )
      );
    } else {
      onChange(
        JSON.stringify(
          (values || []).map(it => {
            return it.value;
          })
        )
      );
    }
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
