import React, { Component } from 'react';
import { Modal, Form, Select, Row } from 'antd';
import IloopForm from '../iloop-form/index';
import { isEmpty } from 'lodash';
import styles from './addField.scss';
import AddressFields from './components/AddressFields';
import ReqFields from './components/ReqFields';
import Reqparams from './components/ReqParams';
import FieldLinkkeys from './components/FieldLinkkeys';
// import KeyValue from './components/KeyValue';
// import ExtendFields from './components/ExtendFields';
import ReqFieldsList from './components/ReqFieldsList';
import DependencyFields from './components/DependencyFields';
import localconstant from './utils/constant';

const { constant } = IloopForm;
const { NormalForm, validateForms, validator } = IloopForm;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class AddField extends Component {
  state = {
    k: Date.now(),
    templates: [],
    modalkey: Date.now(),
    validatorOptions: Object.keys(validator).map(it => ({ label: validator[it].name, name: it })),
    inputType: '',
    initialDataSource: [],
  };

  componentWillReceiveProps(nextProps) {
    const { isModelShow } = this.props;
    const { currentTemplate, currentField, modalType, type } = nextProps;
    const ds = modalType === 'create' ? currentField : currentTemplate;
    if (nextProps.isModelShow && !isModelShow) {
      if (!isEmpty(currentTemplate)) {
        this.setState({
          initialDataSource: {
            ...ds,
            list: ds.reqUrl ? [] : (currentTemplate || {}).rspFields,
          } || { k: Date.now() },
          inputType: currentTemplate.inputType,
          templates:
            type === 'G'
              ? localconstant.getGridAttributes()
              : localconstant.getAttributes(currentTemplate.inputType),
          k: Date.now(),
        });
      } else if (!isEmpty(currentField)) {
        this.setState({
          initialDataSource: { ...ds, list: ds.reqUrl ? [] : (currentField || {}).rspFields } || {
            k: Date.now(),
          },
          inputType: currentField.inputType,
          templates:
            type === 'G'
              ? localconstant.getGridAttributes()
              : localconstant.getAttributes(currentField.inputType),
          k: Date.now(),
        });
      }
    }
  }

  handleSave = () => {
    const { onSave, fieldName } = this.props;
    const { inputType } = this.state;
    validateForms([this.templateBaseRef], () => {
      const dataSource = this.templateBaseRef.getDataSource();
      const ds = { ...dataSource, inputType };
      if (ds.maxLength) {
        ds.maxLength = Number(ds.maxLength);
      }
      if (fieldName === '扩展字段') {
        ds.isExtjson = true;
      } else {
        ds.fieldName = ds.fieldName || fieldName;
        ds.isExtjson = false;
      }
      if (['select', 'autocomplete'].includes(ds.inputType)) {
        if (!ds.reqUrl) {
          ds.rspFields = ds.list;
        }
      }
      if (ds.validation) {
        ds.validation = Array.isArray(ds.validation)
          ? JSON.stringify(ds.validation)
          : ds.validation;
      }
      delete ds.list;
      // if(ds.dependencyTemplateInputUiId){
      //   ds.dependencyTemplateInputUiId = `[${ds.dependencyTemplateInputUiId}]`
      // }
      // console.log('ds', ds);
      onSave(ds, this.handleCancel);
    });
  };

  handleCancel = () => {
    const { form, onCancel } = this.props;
    form.resetFields();
    this.setState({ modalkey: Date.now(), templates: [], initialDataSource: {}, inputType: '' });
    onCancel();
  };

  render() {
    const {
      isModelShow,
      currentTemplate = {},
      dicData,
      fieldName,
      modalType,
      currentField,
      tables,
      currenttable,
      type,
    } = this.props;
    const { modalkey, validatorOptions, templates, k, inputType, initialDataSource } = this.state;

    return (
      <div>
        <Modal
          title={`新增字段（${modalType === 'create' ? fieldName : initialDataSource.fieldName}）`}
          centered
          visible={isModelShow}
          key={modalkey}
          onOk={this.handleSave}
          onCancel={this.handleCancel}
          maskClosable={false}
          okText="保存"
          width="1000px"
          wrapClassName="wrapper"
        >
          <Form {...formItemLayout}>
            <Row>
              {type !== 'G' ? (
                <Select
                  placeholder="类型"
                  defaultValue={(modalType === 'create' ? currentField : currentTemplate).inputType}
                  onChange={e => {
                    const changeInputType = () => {
                      const newDataSource = {};
                      (localconstant.COMMON_ATTRIBUTES || []).forEach(data => {
                        newDataSource[data] = initialDataSource[data];
                      });
                      this.setState({
                        inputType: e,
                        templates: localconstant.getAttributes(e),
                        initialDataSource: newDataSource,
                        k: Date.now(),
                      });
                    };
                    if (modalType === 'create') {
                      changeInputType();
                    } else {
                      Modal.confirm({
                        title: '确定修改控件类型?',
                        okText: '确定',
                        cancelText: '取消',
                        onOk() {
                          changeInputType();
                        },
                        onCancel() {},
                      });
                    }
                  }}
                >
                  {constant.controlTypes.map(item => {
                    return <Select.Option value={item.inputType}>{item.fieldHeader}</Select.Option>;
                  })}
                </Select>
              ) : (
                ''
              )}
            </Row>
            <div className='box'>
              <NormalForm
                wrappedComponentRef={form => {
                  this.templateBaseRef = form;
                }}
                inline
                formItems={templates}
                onValuesChange={(before, after) => {
                  if (after.reqUrl !== before.reqUrl) {
                    if (after.reqUrl) {
                      this.templateBaseRef.setAttributes({
                        reqParams: {
                          isHidden: false,
                        },
                        rspFields: {
                          isHidden: false,
                        },
                        list: {
                          isHidden: true,
                        },
                      });
                    } else {
                      this.templateBaseRef.setAttributes({
                        reqParams: {
                          isHidden: true,
                        },
                        rspFields: {
                          isHidden: true,
                        },
                        list: {
                          isHidden: false,
                        },
                      });
                    }
                  }
                }}
                convertFormItem={formItems => {
                  (formItems || []).forEach(it => {
                    if (fieldName === '扩展字段') {
                      if (it.fieldName === 'fieldName') {
                        Object.assign(it, { isHidden: false });
                      }
                      if (it.fieldName === 'isExtjson') {
                        Object.assign(it, { initialValue: true });
                      }
                    }
                    if (it.fieldName === 'dictionaryType') {
                      Object.assign(it, { rspFields: JSON.stringify(dicData) });
                    }
                    if (
                      ['select', 'autocomplete'].includes(inputType) &&
                      it.fieldName === 'reqParams'
                    ) {
                      Object.assign(it, {
                        inputType: 'component',
                        isHidden: !currentTemplate.reqUrl,
                        posWidth: 2,
                        component: <Reqparams />,
                      });
                    }
                    if (
                      ['select', 'autocomplete'].includes(inputType) &&
                      it.fieldName === 'rspFields'
                    ) {
                      Object.assign(it, {
                        inputType: 'component',
                        posWidth: 2,
                        isHidden: !currentTemplate.reqUrl,
                        component: <ReqFields />,
                      });
                    }
                    if (
                      ['select', 'autocomplete'].includes(inputType) &&
                      it.fieldName === 'dependencyTemplateInputUiId'
                    ) {
                      Object.assign(it, {
                        inputType: 'component',
                        posWidth: 2,
                        tables,
                        currenttable: Array.isArray(currenttable) ? currenttable[0] : currenttable,
                        component: <DependencyFields />,
                      });
                    }
                    if (['select', 'autocomplete'].includes(inputType) && it.fieldName === 'list') {
                      Object.assign(it, {
                        inputType: 'component',
                        isHidden: currentTemplate.reqUrl,
                        posWidth: 2,
                        component: <ReqFieldsList />,
                      });
                    }
                    if (inputType === 'address' && it.fieldName === 'rspFields') {
                      Object.assign(it, {
                        inputType: 'component',
                        posWidth: 2,
                        isHidden: false,
                        component: <AddressFields />,
                      });
                    }
                    if (it.fieldName === 'fieldLinkkeys') {
                      Object.assign(it, {
                        inputType: 'component',
                        posWidth: 2,
                        isHidden: false,
                        component: <FieldLinkkeys />,
                      });
                    }
                    if (it.fieldName === 'posWidth' && type === 'G') {
                      Object.assign(it, {
                        isHidden: false,
                      });
                    }
                    if (it.fieldName === 'validation') {
                      Object.assign(it, { rspFields: JSON.stringify(validatorOptions) });
                    }
                  });
                  // console.log('formItems', formItems);
                  return formItems;
                }}
                dataSource={{ ...initialDataSource, k }}
              />
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddField);
