// @ts-nocheck
import React, { Component } from 'react';
import { Button, Row, Col, Input } from 'antd';
import IloopForm from '../iloop-form/index';

const { TableForm, NormalForm, DependencesContext, validateForms } = IloopForm;

function assignInitialValue(items, values) {
  return (items || []).map(item => ({ ...item, initialValue: values[item.field] }));
}

export function getColumnDef(data) {
  return {
    headerName: data.fieldHeader,
    field: data.fieldName,
    fieldLinkkeys: data.fieldLinkkeys,
    text: '',
  };
}


class Test extends Component {
  constructor(props) {
    super(props);
    this.changeDependences = dependences => {
      this.setState({ dependences });
    };
    this.state = {
      dependences: { transportMethod: '' },
      changeDependences: this.changeDependences,
      tempalateMap: {},
      moduleTemplates: []
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
    validateForms([...Object.values(this.forms)], () => {
      // @ts-ignore
      (Object.keys(this.forms) || []).forEach(it => {
        console.log(it, this.forms[it].getDataSource());
      });
    });
  };

  doSearch = () => {
    const { text } = this.state;

    const templateName = text;
    const names = templateName.split(',');
    const tempalateMap = {};
    const moduleTemplates = [];
    const ns = names.map(name => {
      tempalateMap[name.split('|')[0]] = name.split('|')[1] || 'F';
      return name.split('|')[0];
    });
    (ns || []).forEach((it)=>{
      moduleTemplates.push(JSON.parse(localStorage.getItem(it)));
    })
    this.setState({moduleTemplates, tempalateMap});
    console.log('moduleTemplates', tempalateMap, moduleTemplates);
  };

  render() {
    const { dependences, changeDependences, moduleTemplates, tempalateMap } = this.state;
    const context = { dependences, changeDependences };
    const map = {
      F: <NormalForm />,
      T: <TableForm />,
      S: <NormalForm formType="search" />,
    };
    return (
      <DependencesContext.Provider value={context}>
        <div style={{ height: '40px', background: '#fff', padding: '3px', marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col span={15} offset={3}>
              <Input
                onChange={e => {
                  this.setState({ text: e.target.value });
                }}
              />
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                onClick={() => {
                  this.doSearch();
                }}
              >
                查询
              </Button>
            </Col>
          </Row>
        </div>
        {moduleTemplates && Object.keys(moduleTemplates).length ? (
          <div>
            {(moduleTemplates || []).map(it => {
              const props = {
                wrappedComponentRef: form => {
                  this.forms[it.templateName] = form;
                },
                changeDependences: this.changeDependences,
                formItems: it.pageTemplateInputUiDTOList,
                dataSource: null,
                title: it.templateName,
                onValuesChange: (prevFormValues, currentFormValues, extra) => {
                  console.log(prevFormValues, currentFormValues, extra);
                },
              };

              return React.cloneElement(map[it.type || tempalateMap[it.templateName]], props);
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
