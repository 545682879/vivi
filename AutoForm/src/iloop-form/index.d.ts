import * as React from 'react';
import NormalForm from './NormalForm';
import TableForm from './TableForm';
import IloopSelect from './controls/IloopSelect/index';
import IloopAutoComplete from './controls/IloopAutoComplete/index';
import IloopAddress from './controls/IloopAddress/index';
import IloopNumber from './controls/IloopNumber/index';
import IloopTreeSelectAddress from './controls/IloopTreeSelectAddress/index';
import IloopUpload from './controls/IloopUpload/index';
import Control from './Control';
import common from './utils/common';
import districtData from './utils/districtData';
import responsive from './utils/responsive';
import validators from './utils/validator';
import { Calculate, Statistic } from './utils/calculate';
import { dependences, DependencesContext } from './context';
import constant from './utils/constant';

declare function convertFormItem (formItems: Array<object>) : Array<object>;

declare type convertFormItem =  Array<object> | typeof convertFormItem

declare interface INormalFormProps {
  formType?: string;
  formItems: Array<object>;
  dataSource: object;
  title?: string;
  pageKey?: string;
  className?: string;
  colClassName?:  string;
  formKey?: string;
  convertFormItem?: convertFormItem;
  rules?: Array<object>;
  inline?: boolean;
  col?:number;
  gutter?:number;
  trimLength?:number; // 显示的组件数
  style?: object;
  onValuesChange: (dataSource: object, targetData: object, extra:object)=>void
}

declare interface ITableFormProps {
  formType?: string;
  formItems: Array<object>;
  dataSource: Array<Object>;
  title?: string;
  pageKey?: string;
  className?: string;
  formKey?: string;
  convertFormItem?: convertFormItem;
  rules?: Array<object>;
  inline?: boolean;            
  fixedNumber?: boolean,
  defaultEmptyRow?: boolean,
  statisticCols?: Array<string>,
  style?: object;
  onValuesChange: (dataSource: object, targetData: object, key: string, name:string, extra:object)=>void
}

export class BaseForm extends React.Component<INormalFormProps, any>{
  constructor(someParam?: object)
  setAttributes(names: string|Array<string>, property: string, value: string): void
  getAllDependences(formItems: Array<string>): Array<string>
  assignValue(source: object, name: string, resultVal: any, inputType: string):void
  assignFormItem(targetData: object, inputType: string, isExtjson: boolean, tableName: string, name: string, resultVal: any):void 
  parseInitValue(item: object, record: object, formType: string): any
  getDataSource(): object
  attachRules(formItem: Array<object>, rules: Array<object>): Array<string>
  convertFormItem(formItem: Array<object>, convert: (arg: convertFormItem)=>Array<object>): Array<object>
}

export class NormalForm extends React.Component<INormalFormProps, any>{
  constructor(someParam?: object)
  wrapFormItems(props: object): Array<object>
  initFormContext(targetDataSource: object): Array<object>
  onValuesChange(values: object, inputType: string, isExtjson: boolean, tableName: string, extra: object): void
  getColumnSpan(column: number, inputType: string, posWidth: number, formType: string):void
  resetForm(targetDataSource: object): void
  setFieldsValue(formValues: object): void
  toggleFields(fieldsName: string, hidden: boolean):void
  assignInitialValue(items: Array<string>, values: object, formType: string):void
}

export class TableForm extends React.Component<ITableFormProps, any>{
  constructor(someParam?: object)
  wrapFormItems(props: object): Array<object>
  initFormContext(targetDataSource: object): Array<object>
  onValuesChange(values: object, inputType: string, isExtjson: boolean, tableName: string, extra: object): void
  getColumnSpan(column: number, inputType: string, posWidth: number, formType: string):void
  isNotNull(value: any):boolean
  getTotal(): object
  resetForm(targetDataSource: object): void
  setFieldsValue(formValues: object, rowKey: string): void
  doAdd():void
  doRemove(key: string):void
  hasStatistic(fieldName: string): boolean 
  toggleFields(fieldsName: string, hidden: boolean):void
  assignInitialValue(items: Array<string>, values: object, formType: string):void
}

export function validateForms(forms: Array<object>, callback: ()=>{}): void;


export default {
  NormalForm,
  TableForm,
  validateForms,

  IloopSelect,
  IloopAutoComplete,
  IloopAddress,
  IloopNumber,
  IloopTreeSelectAddress,
  IloopUpload,
  Control,

  Calculate,
  Statistic,

  common,
  constant,
  districtData,
  responsive,
  validators,

  dependences,
  DependencesContext,
};