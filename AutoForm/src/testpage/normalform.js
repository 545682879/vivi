
import React from 'react';
import NormalForm from '../iloop-form/NormalForm';
import TableForm from '../iloop-form/TableForm';
import index from '../iloop-form/index';
import ContractPayCycle from '../iloop-form/controls/ContractPayCycle';
import { DependencesContext } from '../iloop-form/context';
import common from '../iloop-form/utils/common';
//import data from '../testData';
import data from '../testdata/data2';
import {template1, template2, datasource} from '../testdata/data4';
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
      this.setState({ dependences });
    };

    this.state = {
      dependences: {abc: 'abc'},
      formItems: (data.data[0].pageTemplateInputUiList || []),
      changeDependences: this.changeDependences,
      dataSource1: common.createInitialValue((data.data[0].pageTemplateInputUiList || []), dataSource),
      formValues: {
        deviceNeeds: ['普通货车']
      },
    };

  }

  clickButton = () => {
    // const a = common.getFormDataCombineExtJson({a: 'a', b: 'b', logisticsOrderExtJson: '{"transportAgreement": "abc666", "transportAgreement1": "abc6565"}'}, this.normalform.getDataSource());
    

    validateForms(
  [
    this.normalform, //单个的表单
  ],
  () => {
   console.log(this.normalform.getDataSource());
  }
);
  }

  render() {
    const {dependences, changeDependences} = this.state;
    const context = { dependences, changeDependences };
    return (
      <DependencesContext.Provider value={context} >
        <div >
          <NormalForm
              abg
              ref={this.normalFormRef}
              wrappedComponentRef={form => {
                this.normalform = form;
              }}
              inline={false}
              changeDependences={this.changeDependences}
              formItems={template1}
              dataSource={datasource.orderBO}
              formType="form"
              title="基本信息"
              convertFormItem={{
                transportType: {initialValue: '公路'},
                monthType: {inputType: 'component', posWidth: 2, component: <ContractPayCycle/>, initialValue: {monthType: '自然月', settleStartDate: '1', settleEndDate: '6'}},
                billGenDate: {
                  addonBefore: '每月',
                  addonAfter: '日',
                },
                settleStartDate:{
                  visible: false,
                },
                settleEndDate:{
                  visible: false,
                },
                warehouseInfoId: {
                  onClick: () => {
                    console.log('orderNo click');
                  }
                },
                contactPerson:{
                  onClick: () => {
                    console.log('contactPerson click');
                  }
                },
                contactName:{
                  reloadOnChange: true,
                  onClick: () => {
                    console.log('contactName click');
                  }
                }
              }}
              rules={{accountName: [{
                  pattern: errorValidator.carNumber,
                  message: errorMessage.carNumber,
                }]
              }}
              onValuesChange={(prevFormValues, currentFormValues, extra) => {
                if(currentFormValues.monthType === "非自然月"){
                  this.normalform.setAttributes({'addValueTaxRate': {isDisable: true}, 'remark': {isDisable: true}})
                }else{
                   this.normalform.setAttributes({'addValueTaxRate': {isDisable: false}, 'remark': {isDisable: false}})
                }
             
              }}
            />
             <TableForm
              ref={this.normalFormRef}
              wrappedComponentRef={form => {
                this.normalform = form;
              }}
              inline={false}
              changeDependences={this.changeDependences}
              formItems={template2}
              dataSource={null}
              title="其他信息"
            />
            <Button onClick={this.clickButton.bind(this)}>保存</Button>
        </div>
      </DependencesContext.Provider>
    );
  }
}

