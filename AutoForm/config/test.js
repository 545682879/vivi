import React, { Component } from 'react';
import { Button } from 'antd';
import { IloopForm } from 'iloopc';
import connectRoute from '@/utils/connectRoute';
import { getThCheckedColumn, getUiList } from '@/components/SearchTable/utils';
import SearchTable from '@/components/SearchTable/SearchTable';

const { TableForm, NormalForm, DependencesContext, validateForms } = IloopForm;

function assignInitialValue(items, values) {
  return (items || []).map(item => ({ ...item, initialValue: values[item.field] }));
}

export function getColumnDef(data) {
  return {
    headerName: data.fieldHeader,
    field: data.fieldName,
    fieldLinkkeys: data.fieldLinkkeys,
  };
}

@connectRoute()
class Test extends Component {
  constructor() {
    super();
    this.changeDependences = dependences => {
      this.setState({ dependences });
    };
    this.state = {
      dependences: { transportMethod: '' },
      changeDependences: this.changeDependences,
    };
    // this.changeState = this.changeState.bind(this);
    // this.changeTableState = this.changeTableState.bind(this);
    this.normalFormRef = React.createRef();
    this.tableFormRef = React.createRef();
    this.forms = {};
  }

  componentDidMount() {
    const { formItems, formValues } = this.state;
    this.setState({ formItems: assignInitialValue(formItems, formValues) });
  }

  doSave = () => {
    // eslint-disable-next-line compat/compat
    validateForms([...Object.values(this.forms)], () => {
      (Object.keys(this.forms) || []).forEach(it => {
        console.log(it, this.forms[it].getDataSource());
      });
    });
  };

  render() {
    const { dependences, changeDependences } = this.state;
    const { store, location, sendAction } = this.props;
    const { moduleTemplates, tempalateMap } = store;
    const context = { dependences, changeDependences };
    const map = {
      F: <NormalForm />,
      T: <TableForm />,
      S: <NormalForm formType="search" />,
      G: <SearchTable />,
    };
    return (
      <DependencesContext.Provider value={context}>
        {moduleTemplates && Object.keys(moduleTemplates).length ? (
          <div>
            {(moduleTemplates || []).map(it => {
              const props = {
                wrappedComponentRef: form => {
                  this.forms[it.templateName] = form;
                },
                changeDependences: this.changeDependences,
                formItems: it.pageTemplateInputUiList,
                dataSource: null,
                title: it.templateName,
                onValuesChange: (prevFormValues, currentFormValues, extra) => {
                  console.log(prevFormValues, currentFormValues, extra);
                },
              };

              const columnDefs = getUiList([it]).map(getColumnDef);
              if (columnDefs[0] && columnDefs[0].field !== '$select') {
                columnDefs.unshift(getThCheckedColumn());
              }

              return React.cloneElement(map[tempalateMap[it.templateName]], {
                ...(tempalateMap[it.templateName] === 'G'
                  ? {
                      store: { columnDefs, searchParams: { columnDefs }, dataSource: [] },
                      location,
                      sendAction,
                    }
                  : props),
              });
            })}
            <div>
              <Button type="primary" style={{ marginRight: '10px' }} onClick={this.doSave}>
                保存
              </Button>
            </div>
          </div>
        ) : (
          <div />
        )}
      </DependencesContext.Provider>
    );
  }
}

export default Test;
