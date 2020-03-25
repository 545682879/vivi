import * as React from 'react';


declare interface IGetControl{
  inputType: string, 
  formType: string, 
  // 组件参数
  params: object, 
  // pagekey, formKey, fieldName, key 的组合
  keys: object
}

export declare function getControl(
  //params: IGetControl
  inputType: string, 
  formType: string, 
  // 组件参数
  params: object, 
  // pagekey, formKey, fieldName, key 的组合
  keys: object
): React.ReactNode

declare interface IGetControlValue{
  eventValue: any, 
  inputType: string, 
  formType: string, 
  rest: object
}
declare function getControlValue(
  params: IGetControlValue
): string | object | Array<any>

declare interface IGetDetailValue{
  initialValue: any, 
  inputType: string
}

declare function getDetailValue(
  params: IGetDetailValue
): string | React.ReactNode

declare interface IGetRules{
  required: boolean, 
  validation: string, 
  extraRules: object
}
declare function getRules(
  params: IGetRules
): object

declare interface IControl{
  control: object,
  formKey: string,
  pageKey: string,
  key?: string,
  form: object,
  formType: string,
  value: object,
  autocompleteOptions: object,
  setAutocompleteOptions: any,
  onChange: (values: object, inputType:string, isExtjson: boolean, tableName: string, extra: Object) => void
}

declare function Control(
  params: IControl
): React.ReactNode


export default Control