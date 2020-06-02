// @ts-nocheck

import React from 'react';
import NormalForm from '../iloop-form/NormalForm';
import TableForm from '../iloop-form/TableForm';
import index from '../iloop-form/index';
import ContractPayCycle from '../iloop-form/controls/ContractPayCycle';
import { DependencesContext } from '../iloop-form/context';
import common from '../iloop-form/utils/common';
import {isPlainObject} from 'lodash';
//import data from '../testData';
import data from '../testdata/data2';
import {template1, template2, datasource} from '../testdata/data4';
import tableData from '../testdata/testData';
//import data from '../data2';
import { errorValidator, errorMessage } from '../iloop-form/utils/validator';
import { Button } from 'antd';
const { validateForms } = index;
const dataSource = {
  transportMethod: 'method', 
  logisticsOrderNo: '123456',
  logisticsOrderExtJson: '{"transportAgreement": "abc", "transportAgreement1": "abc"}'
}

export default class NormalFormExample extends React.Component {
  constructor(props) {
    super(props);

    this.changeDependences = dependences => {
      this.setState((prevState) => {
        return {
          dependences: {...prevState.dependences, ...dependences}
        }
      });
    };

    this.state = {
      mode: 'form',
      dependences: {abc: 'def'},
      tableformItems: tableData.data[0].pageTemplateInputUiList,
      formItems: (data.data[0].pageTemplateInputUiList || []),
      changeDependences: this.changeDependences,
      dataSource1: common.createInitialValue((data.data[0].pageTemplateInputUiList || []), dataSource),
      formValues: {
        deviceNeeds: ['普通货车']
      },
    };
    this.doReset=this.doReset.bind(this);
  }


  doReset(){
    // console.log('this.tableform', this.tableform.resetForm());  
    this.tableform.resetForm()
  }

  clickButton = () => {
    validateForms(
        [
          this.normalform, //单个的表单
          this.normalform1,
          this.tableform
        ],
        // @ts-ignore
        () => {
            console.log('第一个表单', this.normalform.getDataSource());
            console.log('第二个表单', this.normalform1.getDataSource());
            console.log('第三个表单', this.tableform.getDataSource())
        }
    );
  }

  render() {
    const {dependences, changeDependences, tableformItems, tableValues, mode} = this.state;
    const context = { dependences, changeDependences };
    return (
      <DependencesContext.Provider value={context} >
        <div >
          <NormalForm
              ref={this.normalFormRef}
              wrappedComponentRef={form => {
                this.normalform = form;
              }}
              formType={mode}
              inline={false}
              changeDependences={this.changeDependences}
              formItems={template1}
              dataSource={datasource.orderBO}
              title="基本信息"
              convertFormItem={{
                transportType: {initialValue: '公路'},
                shipCompanyName: {
                  valueInOptions: true,
                },
                warehouseInfoId: {
                  onClick: () => {
                     console.log('warehouseInfoId click');
                  }
                },
                contactName:{
                  reloadOnChange: true
                }
                
              }}
              rules={{orderNo: [{
                  pattern: errorValidator.characterOrNumber,
                  message: errorMessage.characterOrNumber,
                }]
              }}
              onValuesChange={(prevFormValues, currentFormValues, _extra) => {
                if(_extra && prevFormValues.contactName !== currentFormValues.contactName){
                  this.normalform.setFieldsValue({
                    contactPerson: _extra.contactPerson,
                    operatorName: _extra.operatorName
                  })
                }

                if(prevFormValues.isSelfPurchase !== currentFormValues.isSelfPurchase){

                 // ('maxDays', constant.fieldsname.isDisable, false)
                  this.normalform.setAttributes({
                    proxyContractNo: {
                      isDisable: !prevFormValues.isSelfPurchase
                    }
                  })
                  // this.normalform.setAttributes("proxyContractNo", "isDisable", !prevFormValues.isSelfPurchase)
                }
              }}
            />
             <NormalForm
              // @ts-ignore
              ref={this.normalFormRef}
              formType={mode}
              wrappedComponentRef={form => {
                this.normalform1 = form;
              }}
              inline={false}
              changeDependences={this.changeDependences}
              formItems={template2}
              convertFormItem={{
                monthType: {
                  inputType: 'component', 
                  posWidth: 2, 
                  component: <ContractPayCycle/>, 
                  detailInitialValue: '自然月 1-6',
                  initialValue: mode === 'detail' ? '自然月 1-6' : {monthType: '自然月', settleStartDate: '1', settleEndDate: '6'}},
              }}
              dataSource={null}
              title="运输信息"
            />
            <TableForm
              wrappedComponentRef={form => {
                this.tableform = form;
              }}
              formType={mode === "form" ? "table" : "detail"}
              // @ts-ignore
              formItems={tableformItems}
              dataSource={tableValues}
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
            
            <div style={{padding: '5px', border: '1px'}}>
              <Button onClick={()=>{
                if(mode === 'form'){
                  this.normalform.setFieldsValue({
                    monthType: '自然月 1-6'
                  })
                }else{
                  this.normalform.setFieldsValue({
                    monthType: {monthType: '自然月', settleStartDate: '1', settleEndDate: '6'}
                  })
                }
                this.setState({mode: mode === 'form' ? "detail" : "form"})
              }}>{mode === 'form'? "详情模式":"编辑模式"}</Button>&nbsp;&nbsp;
              <Button onClick={this.doReset}>重置</Button>&nbsp;&nbsp;
              <Button type="primary" onClick={this.clickButton.bind(this)}>获取表单数据</Button>
            </div>
            
        </div>
      </DependencesContext.Provider>
    );
  }
}

