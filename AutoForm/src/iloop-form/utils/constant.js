const fieldsname = {
  pageTemplateInputUiId: 0,
  dependencyTemplateInputUiId: 'dependencyTemplateInputUiId',
  dictionaryType: 'dictionaryType',
  fieldHeader: 'fieldHeader',
  fieldLinkkeys: 'fieldLinkkeys',
  fieldName: 'fieldName',
  inputType: 'inputType',
  isDisable: 'isDisable',
  isExtjson: 'isExtjson',
  isHidden: 'isHidden',
  isOptional: 'isOptional',
  isSearch: 'isSearch',
  posIndex: 'posIndex',
  posWidth: 'posWidth',
  reqParams: 'reqParams',
  reqUrl: 'reqUrl',
  rspFields: 'rspFields',
  validation: 'validation',
};

const controlTypes = [{
  pageTemplateInputUiId: 1,
  inputType: 'text', 
  fieldName: 'text', 
  fieldHeader: '文本框',
  placeholder: '文本框',
}, {
  pageTemplateInputUiId: 2,
  inputType: 'textarea',
  fieldName: 'textarea', 
  fieldHeader: '多行文本框',
  placeholder: '多行文本框',
}, {
  pageTemplateInputUiId: 3,
  inputType: 'integer',
  fieldName: 'integer',
  fieldHeader: '整数',
  placeholder: '请输入整数',
}, {
  pageTemplateInputUiId: 4,
  inputType: 'float',
  fieldName: 'float',
  fieldHeader: '浮点数',
  placeholder: '请输入浮点框',
}, {
  pageTemplateInputUiId: 5,
  inputType: 'select',
  fieldName: 'select',
  fieldHeader: '下拉文本框',
  placeholder: '下拉文本框',
}, {
  pageTemplateInputUiId: 6,
  inputType: 'autocomplete',
  fieldName: 'autocomplete',
  fieldHeader: '自动填充',
  placeholder: '自动填充',
}, {
  pageTemplateInputUiId: 7,
  inputType: 'date',
  fieldName: 'date',
  fieldHeader: '日期',
  placeholder: '日期',
},{
  pageTemplateInputUiId: 8,
  inputType: 'time',
  fieldName: 'time',
  fieldHeader: '时间',
  placeholder: '时间',
}, {       
  pageTemplateInputUiId: 9,
  inputType: 'daterange',
  fieldName: 'daterange',
  fieldHeader: '日期范围',
  placeholder: '日期范围',
}, {
  pageTemplateInputUiId: 10,
  inputType: 'address',
  fieldName: 'address',
  fieldHeader: '地址',
  placeholder: '地址',
}, {
  pageTemplateInputUiId: 11,
  inputType: 'treeaddress',
  fieldName: 'treeaddress',
  fieldHeader: '树形地址选择',
  placeholder: '树形地址选择',
}, {
  pageTemplateInputUiId: 12,
  inputType: 'checkbox',
  fieldName: 'checkbox',
  fieldHeader: '单选',
  placeholder: '单选',
}, {
  pageTemplateInputUiId: 13,
  inputType: 'plain',
  fieldName: 'plain',
  fieldHeader: '纯文本',
  placeholder: '纯文本',
}, {
  pageTemplateInputUiId: 14,
  inputType: 'upload',
  fieldName: 'upload',
  fieldHeader: '附件上传',
  placeholder: '附件上传',
}];

export default {fieldsname, controlTypes};