---
order: 2
title: TableForm
---

````jsx

import TableForm from '../TableForm';
import NormalForm from '../NormalForm';
import { DependencesContext } from '../context';
import data from '../testData';
import {template1, datasource} from '../data4';
import {isPlainObject} from 'lodash';
import {Button} from 'antd';

class TableFormExample extends React.Component {
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
        <NormalForm
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
              onValuesChange={(prevFormValues, currentFormValues, extra) => {
             
              }}
            />
          <TableForm
            wrappedComponentRef={form => {
              this.tableform = form;
            }}
            formItems={formItems}
            dataSource={tableValues}
            formType="table"
            title="货物信息"
            statisticCols={['packageNumber', 'volume', 'weight']}
            canDelete={(text, record)=>{
              console.log(text, record);
              return record.carTypeRequire === "普通车型";
            }}
            onValuesChange={(prevFormValues, currentFormValues, rowKey, extra) => {
              if (isPlainObject(extra)) {
                this.tableform.setFieldsValue([
                  { shipperCode: extra.consignorName, rowKey },
                  { shipperCode: extra.consignorName, rowKey: currentFormValues[1].key },
                ]);
              }
            }}
          />
          <div>
            <Button onClick={this.doReset}>重置</Button>
            <Button onClick={this.doSave}>保存</Button>
          </div>
        </div>
      </DependencesContext.Provider>
    );
  }
}

ReactDOM.render(
  <TableFormExample />,
  mountNode);
````
