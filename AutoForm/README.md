

npm install
npm start

---
category: Components
type: General
title: CreateForm
subtitle: 创建表单
cols: 1
---


## 表单控件类型及属性

- text
   * maxLength
- textarea
   * maxLength
- date
   * showTime
- time
   * showTime
- select
   * mode - 'multiple' | 'tags'
   * dictionaryType - 数据字典
   * reqUrl - 同autocomplete
   * reqParams - "{"pageSize":1000}"
   * rspFields - 初始数据列表  
      - 不设置dictionaryType，reqUrl，直接硬编码设置值: ["铁路", "公路"] 或 [{label: 'water', name: '水路'}, {label: 'road', name: '陆路'}]
      - 使用reqUrl: {"rspKey": "consignorCode", "rspValues": ["consignorCode","consignorName"]}
   * dependencyTemplateInputUiId - 表单关联字段
      - '["carTypeRequire", "warehouse_input_order.operatorName", ":abc"]',
      - 同一模版下的字段(fieldName)，不同模版下的字段(tableName.fieldName)，其他脱离模版的自定义字段
- integer
- float
   * toFix
- autocomplete
   * dictionaryType - "truck.length"
   * valueInOptions - 校验数据是否在列表里
   * reloadOnChange - 根据输入内容自动查询下拉列表
   * reqParams - "{"pageSize":1000}"
   * reqUrl - "/otm/iloopCar/list"
   * rspFields 
      - "{"rspKey": "plateNumber", "rspValues": ["plateNumber"]}"
      - 不设置dictionaryType，reqUrl，直接硬编码设置值: ["铁路", "公路"] 
   * dependencyTemplateInputUiId - 表单关联字段
      - '["carTypeRequire", "warehouse_input_order.operatorName", ":abc"]',
      - 同一模版下的字段(fieldName)，不同模版下的字段(tableName.fieldName)，其他脱离模版的自定义字段，
      - 自定义模版需要手动设置 this.setState({dependences:{rgroup: extra.rkey}})，其他情况不需要
- address
   * changeOnSelect - 
   * rspFields -  '{"provinceName":"shipmentProvince","provinceCode":"shipmentProvinceNo","cityName":"shipmentCity","cityCode":"shipmentCityNo","regionName":"shipmentRegion","regionCode":"shipmentRegionNo"}'
- checkbox
- treeaddress
- upload
   * type - picture / file
   * fileSize -  文件大小 默认10M
   * readonly - 只读
   * template - 下载模版
   * action - 上传路径
   * accept - 文件类型
   * multiple - 支持上传多个文件
   * maxLength - 上传文件个数
   * autoupload - 模版下载，导入文件
   * uploadAction - 如没有提供handleUpload手动上传方法，可设置上传地址
   * handlerProgress - 如没有提供handleUpload手动上传方法，可设置上传进度方法
   * handleUpload - 点击上传附件按钮上传, 如不传，默认Upload行为选择文件后直接上传
   * rest - Upload组件属性
    返回值getDataSource获取值- （IloopUpload既可作为Form内组件，可以作为肚独立组件使用，作用独立组件使用时，用getDataSource获取值

- plain
    纯文本，用于表单里有输入框和文本多情况

- component
   非配置，前端自定义扩展组件
   自定义组件的初始值应该在模版里用initialValue指定，不会像其他固定固定组件一样自动处理

## NormalForm

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| formType | 表单的类型, search / form / detail | String | form |
| formItems | 从后端返回的模版结构 | Array | [] |
| dataSource | 数据源 | Object | {} |
| title | 标题 | String | '' |
| pageKey | 页面Key | String | undefined |
| formKey | 表单ID | String | guid() |
| className | 表单样式 | String | '' |
| colClassName | Col className | String | '' |
| trimLength | 显示的组件数, 超过这个数量的控件隐藏 | number | undefined
| style | 表单样式 | Object | undefined
| inline | 内连表单还是块级表单，块级表单有 padding: 20px 24px 24px 24px, 在页面上作为独立的模块 | Boolean | false
| rules | 校验规则 | Array | []
| canDelete | 是否可以删除该行 | boolean/function | true
| convertFormItem | 改变formItems(可用于生成复合组件) | function,object | undefined
| wrappedComponentRef | 设置form ref | function | undefined
| changeDependences | 用于表单及联，关联项改变时，更新及联列表，主要用于autocomplete | function | undefined
| onValuesChange | 表单值改变的回调函数（prevFormValues - 之前表单值, currentFormValues - 改变后的表单值, extra - select/autocomplete返回的当前行） | function | undefined


```jsx
    import NormalForm from '@/components/CreateForm/NormalForm';
    <NormalForm
      wrappedComponentRef={form => {
        this.templateSendRef = form;
      }}
      pageKey="templateSend"
      formItems={templates[1].pageTemplateInputUiList}
      dataSource={pageData.sendForm || null}
      formType={query.type === 'detail' ? 'detail' : 'form'}
      // formType="search"
      title="发货信息"
    />
```

## TableForm

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| formType | 表单的类型, table/detail/form | String | table |
| formItems | 从后端返回的模版结构 | Array | [] |
| dataSource | 数据源 | Object | [] |
| title | 标题 | String | '' |
| pageKey | 页面Key | String | undefined |
| formKey | 表单ID | String | guid() |
| className | 表单样式 | String | '' |
| style | 表单样式 | Object | undefined
| fixedNumber | 行数属否固定 | Boolean | false
| defaultEmptyRow | 默认显示一条空行 | Boolean | false
| statisticCols | 需要统计的字段, 设置该参数显示统计行 | Array | []
| inline | 内连表单还是块级表单，块级表单有 padding: 20px 24px 24px 24px 在页面上作为独立的模块 | Boolean | false
| convertFormItem | 改变formItems(可用于生成复合组件) | function,object | undefined
| wrappedComponentRef | 设置form ref | function | undefined
| changeDependences | 用于表单及联，关联项改变时，更新及联列表，主要用于autocomplete | function | undefined
| onValuesChange | 表单值改变的回调函数 (prevFormValues - 之前表单值, currentFormValues - 改变后的表单值, rowKey, extra - select/autocomplete返回的当前行) | function | undefined
| doAdd | 自定义默认添加方法 | function | undefined

```jsx
    import TableForm from '@/components/CreateForm/TableForm';
    <TableForm
      className="marginButtomToFooter"
      wrappedComponentRef={form => {
        this.templateMaterialRef = form;
      }}
      pageKey="TableForm"
      formItems={templates[3].pageTemplateInputUiList}
      dataSource={pageData.materialForm || null}
      title="货物信息"
      formType={query.type === 'detail' ? 'detail' : 'table'}
    />
```

#### 接口API
| API | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| getDataSource | 获取数据源 | N/A | 表单的数据源 |
| resetForm | 重置表单 | N/A  newDataSource |  N/A |
| setFieldsValue | 设置表单值 | {Key:Value} | N/A |
| toggleFields | 显示隐藏字段 | fieldsName / 字段名<br/>hidden  true/false | N/A |
| setAttributes | 设置formItems | names, property, value | N/A|


#### 组合控件

1. 省成组件

```jsx

class ContractPayCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || {},
    };
  }

  triggerChange = (field, e) => {
    const targetValue = field === 'monthType' ? e : e.target.value;
    const { value } = this.state;
    const newValue = { ...value, [field]: targetValue };
    const { onChange } = this.props;
    if (
      newValue.settleStartDate &&
      newValue.settleEndDate &&
      Number(newValue.settleStartDate) > Number(newValue.settleEndDate)
    ) {
      message.error('结算起始日在结算截止日之后');
    }
    if (onChange) {
      onChange(newValue);
    }
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;
    const { disabled, dictionaryType } = this.props;
    return (
      <div>
        <IloopSelect
          style={{ width: '34%' }}
          disabled={disabled}
          name="monthType"
          onChange={this.triggerChange.bind(this, 'monthType')}
          dictionaryType={dictionaryType}
          value={value.monthType}
        />
        <IloopNumber
          style={{ marginLeft: '1%', width: '30%' }}
          disabled={disabled}
          addonAfter="号"
          onChange={this.triggerChange.bind(this, 'settleStartDate')}
          value={value.settleStartDate}
        />
        <span style={{ display: 'inline-block', width: '3%', marginLeft: '1%' }}>～</span>
        <IloopNumber
          style={{ width: '30%', marginLeft: '1%' }}
          disabled={disabled}
          addonAfter="号"
          onChange={this.triggerChange.bind(this, 'settleEndDate')}
          value={value.settleEndDate}
        />
      </div>
    );
  }
}

```

2. 生成复合组件formitem, 设置visible = false隐藏不需要显示的项目
```jsx
function createCompositComponents(Component, type, store) {
  return (formItems)=>{
    (formItems || []).forEach(it => {
        if (it.fieldName === 'monthType') {
          Object.assign(it, {
            inputType: 'component',
            posWidth: 2,
            component: Component,
            initialValue: {
              monthType: store.details.monthType,
              settleStartDate: store.details.settleStartDate,
              settleEndDate: store.details.settleEndDate,
            },
          });
        }
        if (it.fieldName === 'billGenDate') {
          Object.assign(it, {
            prefix: '每月',
            suffix: '日',
          });
        }
        if(it.fieldName === 'addValueTaxRate'){
          Object.assign(it, {
            suffix: '%',
          });
        }
        if (['settleStartDate', 'settleEndDate'].includes(it.fieldName)) {
          Object.assign(it, {
            visible: false,
          });
        }
        return it;
      });
      return formItems;
  }
}
```

3. 使用convertFormItem做初始化formItems转换
  
```jsx
<NormalForm
  wrappedComponentRef={form => {
    this.accountForm = form;
  }}
  formItems={templates.contract_save_account}
  dataSource={details}
  formType={type === 'info' ? 'detail' : 'form'}
  title=""
  inline
  convertFormItem={createCompositComponents(<ContractPayCycle />, type, store)}
/>

```


#### 复合组件

1. 用wrappedComponentRef向上传递表单数组
  
  wrappedComponentRef={form => {
    if (!this.feeYfForm) {
      this.feeYfForm = form;
      this.forms.push(this.feeYfForm);
    }
    wrappedComponentRef(this);
  }}

2. 用getDataSource获取复合组件值

  getDataSource = () => {
    const feeYS = (this.feeYfForm.getDataSource() || []).map(item => {
      return { ...item, feeType: '运输费' };
    });

    const feeFYS = (this.feeQtForm.getDataSource() || []).map(item => {
      return { ...item, feeType: '非运输费' };
    });
    return [...feeYS, ...feeFYS];
  };
  

```jsx
/* eslint-disable compat/compat */
import React, { Component } from 'react';
import classnames from 'classnames';
import { IloopForm } from 'iloopc';
import styles from './index.less';

const { TableForm, Calculate } = IloopForm;

export default class Fees extends Component {
  constructor(props) {
    super(props);
    this.forms = [];
  }

  getDataSource = () => {
    const feeYS = (this.feeYfForm.getDataSource() || []).map(item => {
      return { ...item, feeType: '运输费' };
    });

    const feeFYS = (this.feeQtForm.getDataSource() || []).map(item => {
      return { ...item, feeType: '非运输费' };
    });
    return [...feeYS, ...feeFYS];
  };

  render() {
    const {
      templates,
      feeItemsList,
      type,
      wrappedComponentRef,
      statisticCols,
      onValuesChange,
    } = this.props;

    const ysf = ['update', 'info'].includes(type)
      ? (feeItemsList || []).filter(it => {
          return it.feeType === '运输费';
        })
      : null;

    const fysf = ['update', 'info'].includes(type)
      ? (feeItemsList || []).filter(it => {
          return it.feeType === '非运输费';
        })
      : null;

    return (
      <div className={classnames({ [styles.fees]: true })}>
        {/** 运输费 */}
        <TableForm
          className={styles.fee}
          wrappedComponentRef={form => {
            if (!this.feeYfForm) {
              this.feeYfForm = form;
              this.forms.push(this.feeYfForm);
            }
            wrappedComponentRef(this);
          }}
          pageKey="feeYf"
          formItems={templates.way_bill_stowage_fee_yf}
          dataSource={ysf}
          formType={type === 'info' ? 'detail' : 'table'}
          title=""
          statisticCols={statisticCols}
          onValuesChange={(dataSource, targetData, key, name) => {
            if (name === 'amount') {
              const total = Calculate.of((this.feeQtForm.getTotal() || {}).amount).add(
                (this.feeYfForm.getTotal() || {}).amount
              );
              if (onValuesChange) {
                onValuesChange({ amount: total });
              }
            }
          }}
        />
        {/** 非运输费 */}
        <TableForm
          className={styles.fee}
          wrappedComponentRef={form => {
            if (!this.feeQtForm) {
              this.feeQtForm = form;
              this.forms.push(this.feeQtForm);
            }
            wrappedComponentRef(this);
          }}
          pageKey="feeQt"
          formItems={templates.way_bill_stowage_fee_qt}
          dataSource={fysf}
          formType={type === 'info' ? 'detail' : 'table'}
          title=""
          statisticCols={statisticCols}
          onValuesChange={(dataSource, targetData, key, name) => {
            if (name === 'amount') {
              const total = Calculate.of((this.feeQtForm.getTotal() || {}).amount).add(
                (this.feeYfForm.getTotal() || {}).amount
              );
              if (onValuesChange) {
                onValuesChange({ amount: total });
              }
            }
          }}
        />
      </div>
    );
  }
}

```


#### 校验及获取表单值

1. 校验并获取值 

```jsx
validateForms(
  [
    this.basicForm, //单个的表单
    ...this.feeForm.forms, // 复合组件形成的forms
  ],
  () => {
    const dispatchOrderList = (details.dispatchOrderList || []).map(it => {
      return {
        dispatchOrderId: it.dispatchOrderId,
        orderDetailId: it.orderDetailId,
        packageNumber: it.packageNumber,
        weight: it.weight,
        volume: it.volume,
        iloopPackingList: this.packingForm[it.key].getDataSource(),
      };
    });

    const param = {
      dispatchOrderList,
      stowageOrder: this.basicForm.getDataSource()
      stowageFeeItemsList: this.feeForm.getDataSource(),
    };
  }
);
```

1. 表单设置 
```jsx
      <NormalForm
          wrappedComponentRef={form => {
            this.basicForm = form;
          }}
          pageKey="stowageBasic"
          formItems={templates.way_bill_stowage_basic}
          // eslint-disable-next-line no-nested-ternary
          dataSource={
            // eslint-disable-next-line no-nested-ternary
            ['update', 'info'].includes(type)
              ? details.stowageOrder
              : user.currentUserInfo && user.currentUserInfo.meData
              ? { dispatcher: user.currentUserInfo.meData.name }
              : null
          }
          formType={type === 'info' ? 'detail' : 'form'}
          title=""
          onValuesChange={(prev, cur, extra) => {
            if (extra) {
              if (prev.mainDriver !== cur.mainDriver) {
                this.basicForm.setFieldsValue({
                  mainDriverPhone: extra.mobileFirst,
                  mainDriverIdcard: extra.identityCardNo,
                  carDrivingLicense: extra.roadNo,
                });
              } else if (prev.escort !== cur.escort) {
                this.basicForm.setFieldsValue({
                  escortPhone: extra.mobileFirst,
                });
              } else if (prev.secondDriver !== cur.secondDriver) {
                this.basicForm.setFieldsValue({
                  secondDriverPhone: extra.mobileFirst,
                });
              } else if (prev.carNo !== cur.carNo) {
                this.basicForm.setFieldsValue({
                  carType: extra.carType,
                  carLength: extra.length,
                  fleetName: extra.motorcadeName,
                  ownershipType: extra.ownershipType,
                  carStatus: extra.status,
                  gpsCode: extra.gpsNo,
                  trailerNo: extra.headstock,
                });
              }
            }
          }}
        />
```

```jsx
          <Fees
            templates={templates}
            feeItemsList={details.stowageFeeItemsList}
            ref={this.feeFormRef}
            wrappedComponentRef={form => {
              if (!this.feeForm) {
                this.feeForm = form;
              }
            }}
            type={type}
          />

```

#### IloopForm 结构
- Form
  NormalForm,
  TableForm,

- 校验
  validateForms,

- 组件
  IloopSelect,
  IloopAutoComplete,
  IloopAddress,
  IloopNumber,
  IloopTreeSelectAddress,
  IloopUpload,

- 数据
  fieldsname, 组件属性集
  districtData, 地址数据集
  responsive, 响应式布局设置

- 公共组件
  common, 
- 计算与统计
  Calculate,
  Statistic,

- context - 用来处理表单组件及联
  dependences,
  DependencesContext,

#### 数据初始化提纯
过滤掉多余数据，只返回与数据模版对应的初始化数据
  common.createInitialValue(
    templates.logistics_order_create_tag, //元素模版
    detailValue //初始化数据
  ),
