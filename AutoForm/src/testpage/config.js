import React from 'react';
import TableForm from '../iloop-form/TableForm';
import { DependencesContext } from '../iloop-form/context';
import data from '../testdata/testData';
import {isPlainObject} from 'lodash';
import {Button} from 'antd';

export default  class TableFormExample extends React.Component {
  constructor(props) {
    super(props);

    this.changeDependences = dependences => {
      this.setState({ dependences });
    };

    this.state = {
      dependences: {"abc":"abc"},
      formItems: data.data[0].pageTemplateInputUiList,
      changeDependences: this.changeDependences,
      tableValues: null,
    };
    this.doReset=this.doReset.bind(this);
    this.doSave=this.doSave.bind(this);
  }

  doReset(){
    // console.log('this.tableform', this.tableform.resetForm());  
    this.tableform.resetForm()
  }

  doSave(){
     console.log('this.tableform', this.tableform.getDataSource());
  }
  
  render() {
    const {formItems, tableValues, dependences, changeDependences} = this.state;
    const context = { dependences, changeDependences };
    return (
      <DependencesContext.Provider value={context} >
        <div >
          <TableForm
            wrappedComponentRef={form => {
              this.tableform = form;
            }}
            // @ts-ignore
            formItems={formItems}
            dataSource={tableValues}
            formType="table"
            title="货物信息"
            statisticCols={['packageNumber', 'volume', 'weight']}
            canDelete={(_text, record)=>{
              // console.log(text, record);
              return record.carTypeRequire !== "普通车型";
            }}
            extraActions={
              [{
                title: '复制',
                doAction: (record)=>{
                  console.log('复制', this, record);
                  const ds = this.tableform.getDataSource();
                  this.tableform.resetForm([...ds, record]);
                },
                isDisable: true,
              },]
            }
            onValuesChange={(_prevFormValues, _currentFormValues, rowKey, name, extra) => {
              if (isPlainObject(extra)) {
                if(name === "shipperCode"){
                  this.tableform.setFieldsValue({ 
                        id: extra.id,
                        shipperName: extra.consignorName,
                        carTypeRequire: extra.carTypeRequire,
                        carLengthRequire: extra.carLengthRequire,
                        paymentOrgName: extra.paymentOrgName
                      }, rowKey);
                }
                if(name === "shipperName"){
                  this.tableform.setFieldsValue({ 
                        id: extra.id,
                        shipperCode: extra.consignorCode,
                        carTypeRequire: extra.carTypeRequire,
                        carLengthRequire: extra.carLengthRequire,
                        paymentOrgName: extra.paymentOrgName
                      }, rowKey);
                }
              }
            }}
          />
          <div>
            <Button onClick={this.doReset}>重置</Button>
            &nbsp;&nbsp;
            <Button onClick={this.doSave}>保存</Button>
          </div>
        </div>
      </DependencesContext.Provider>
    );
  }
}