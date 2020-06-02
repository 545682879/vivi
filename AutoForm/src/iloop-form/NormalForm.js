/* eslint-disable no-param-reassign */
import React from 'react';
import classNames from 'classnames';
import { Row, Col } from 'antd';
import { Form } from '@ant-design/compatible';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import Control from './Control';
import common from './utils/common';
import responsive from './utils/responsive';
import { DependencesContext } from './context';
import BaseForm from './BaseForm';
// @ts-ignore
import md5 from 'md5';
import  './index.scss';

const { guid, generateFieldName } = common;
class CreateForm extends BaseForm {
    static contextType = DependencesContext;
    /**
     * @param {{ pageKey: any; formKey: any; dataSource: any; }} props
     */
    constructor(props) {
        super(props);
        const theFormItems = this.wrapFormItems(props)
        const path = window.location.pathname + window.location.search;
        this.state = {
            pageKey: props.pageKey ? props.pageKey : md5(path),
            formKey: props.formKey ? props.formKey : (theFormItems && theFormItems[0] ? theFormItems[0].tableName : guid()),
            // initialValus: props.dataSource || {},
            dataSource: props.dataSource || {},
            initialValue: props.dataSource,
            formItems: theFormItems,
            allDependences: this.getAllDependences(theFormItems),
            autocompleteOptions: {},
        };
    }

    /**
   * 用convertFormItem, rules属性 封装formItem
   * @param {{ pageKey?: any; formKey?: any; dataSource: any; formItems?: any; rules?: any; convertFormItem?: any; formType?: any; }} props
   */
    wrapFormItems(props) {
        return this.assignInitialValue(this.convertFormItem(this.attachRules(props.formItems, props.rules), props.convertFormItem), props.dataSource || {}, props.formType)
    }

    /**
     * @param {object} nextProps - select/iloopautocomplete
     * @param {object} nextProps.dataSource
     */
    componentWillReceiveProps(nextProps) {
        const { initialValue } = this.state;
        const before = JSON.stringify(initialValue);
        const after = JSON.stringify(nextProps.dataSource);
        if (before !== after) {
            this.setState({
                dataSource: nextProps.dataSource || {},
                initialValue: nextProps.dataSource,
                formItems: this.wrapFormItems(nextProps),
            });
        }
    }

    /**
     * @param {object} targetDataSource - select/iloopautocomplete
     */
    initFormContext(targetDataSource) {
        const { pageKey, formKey, dataSource, allDependences } = this.state;
        const { dependences, changeDependences } = this.context;
        const targetValue = {};
        allDependences.forEach((it) => {
            targetValue[generateFieldName(pageKey, formKey, it)] = (targetDataSource ? targetDataSource : dataSource)[it];
        })
        if (Object.keys(targetValue).length && changeDependences) {
            changeDependences({...dependences, ...targetValue });
        }
    }

    componentDidMount() {
        // @ts-ignore
        this.initFormContext();
    }

    componentWillUnmount() {
        this.setState({
            pageKey: null,
            formKey: null,
            // initialValus: props.dataSource || {},
            dataSource: null,
            initialValue: null,
            formItems: null,
        });
    }

    /**
     * @param {object} values - 控件的返回值
     * @param {string} inputType - 控件类型
     * @param {boolean} isExtjson - 是否扩展字段
     * @param {string} tableName - 表名
     * @param {object} extra - select/iloopautocomplete
     */
    onValuesChange = (values, inputType, isExtjson, tableName, extra) => {
        const { dataSource } = this.state;
        const { dependences, changeDependences } = this.context;
        const fullName = Object.keys(values)[0];
        const change = fullName.split('-');
        // const pageKey = change[0]; // 页面ID
        // const formKey = change[1]; // 表单ID
        const name = change[2]; // 字段名称
        const targetData = cloneDeep(dataSource);
        const resultVal = Object.values(values)[0];
        this.assignFormItem(targetData, inputType, isExtjson, tableName, name, resultVal);
        this.setState({ dataSource: {...targetData } }, () => {
            const { onValuesChange } = this.props;
            if (onValuesChange) {
                onValuesChange(
                    dataSource, {...targetData }, ['autocomplete', 'select'].includes(inputType) ? extra : null
                );
            }
            if (Object.keys(dependences).includes(fullName) && changeDependences) {
                changeDependences({...dependences, [fullName]: resultVal });
            }
        });
    };

    /**
     *  @param column - 列数
     *  @param inputType - 组件类型
     *  @param posWidth - 组件占用宽度
     *  @param formType - 表单类型
     */
    /**
   * @param {number} column
   * @param {string} inputType
   * @param {any} posWidth
   * @param {string} formType
   */
    getColumnSpan = (column, inputType, posWidth, formType) => {
        const cols = column || 4;
        // return responsive[cols][posWidth||1] ;
        if (
            /* ['autocomplete', 'address'].includes(inputType) || */
            inputType === 'date' &&
            formType === 'search'
        ) {
            return responsive[cols][Math.min(Math.max(posWidth || 1, 2), cols)];
        }
        return responsive[cols][Math.min(Math.max(posWidth || 1, 1), cols)];
    };

    /**
     * 重置表单
     */
    /**
   * @param {object} targetDataSource
   */
    resetForm = (targetDataSource) => {
        const { form } = this.props;
        const { initialValue } = this.state;
        if (targetDataSource) {
            this.setState({ dataSource: targetDataSource, formKey: guid() }, () => {
                this.initFormContext(targetDataSource);
            });
        } else {
            form.resetFields();
            this.setState({ dataSource: (initialValue || {}) }, () => {
                // @ts-ignore
                this.initFormContext();
            });
        }
    };

    /**
     * 设置新值
     */
    /**
   * @param {ArrayLike<any> | { [s: string]: any; }} formValues
   */
    setFieldsValue = formValues => {
        const { form } = this.props;
        const { dataSource, pageKey, formKey, formItems } = this.state;
        const { dependences, changeDependences } = this.context;
        const targetDataSource = cloneDeep(dataSource);
        const targeFormValue = {};
        const targetContextValue = {};
        Object.entries(formValues).forEach(it => {
            // eslint-disable-next-line prefer-destructuring
            const targetName = generateFieldName(pageKey, formKey, it[0]);
            targeFormValue[targetName] = it[1];
            if (Object.keys(dependences).includes(targetName)) {
                targetContextValue[targetName] = it[1];
            }
            // @ts-ignore
            const item = formItems.find(it1 => {
                return it1.fieldName === it[0];
            });
            if (item) {
                this.assignFormItem(
                    targetDataSource,
                    item.inputType,
                    item.isExtjson,
                    item.tableName,
                    it[0],
                    it[1]
                );
            } else {
                Object.assign(targetDataSource, {
                    [it[0]]: it[1]
                });
                // targetDataSource[it[0]] = it[1];
            }
        });
        form.setFieldsValue(targeFormValue);
        this.setState({ dataSource: targetDataSource }, () => {
            if (Object.keys(targetContextValue).length && changeDependences) {
                changeDependences({...dependences, ...targetContextValue });
            }
        });
    };

    /**
     * 设置显示、隐藏字段
     */
    /**
   * @param {any} fieldsName
   * @param {boolean} hidden
   */
    toggleFields = (fieldsName, hidden) => {
        const needHiddenFields = Array.isArray(fieldsName) ? fieldsName : [fieldsName];
        const { formItems, dataSource } = this.state;
        const modifiedFormItems = cloneDeep(formItems);
        const modifiedDataSource = cloneDeep(dataSource);
        // 修改表单域为不可见
        // @ts-ignore
        modifiedFormItems.forEach(formItem => {
            if (needHiddenFields.includes(formItem.fieldName)) {
                // eslint-disable-next-line no-param-reassign
                formItem.visible = hidden || false;
            }
        });
        // 清空不可见表单值
        // @ts-ignore
        (fieldsName || []).forEach(item => {
            modifiedDataSource[item] = null;
        });
        this.setState({ formItems: modifiedFormItems, dataSource: modifiedDataSource });
    };


    /**
     * 赋值操作
     * @param {*} items
     * @param {*} values
     * @param {any} formType
     */
    assignInitialValue = (items, values, formType) => {
        if (values) {
            // @ts-ignore
            return (items || []).map(item => {
                let initialValue = this.parseInitValue(item, values, formType);
                if (item.initialValue) {
                    initialValue = item.initialValue;
                }
                return {...item, initialValue };
            });
        }
        return items;
    }

    render() {
        const {
            form,
            className,
            colClassName,
            title,
            col = 4,
            gutter = 8,
            formType,
            trimLength, // 显示的组件数
            style,
            prefixFormCls,
            prefixDetailCls,
            inline,
        } = this.props;
        const { formItems, dataSource } = this.state;
        const clsStringForm = classNames({
            [prefixFormCls]: true,
            [prefixDetailCls]: formType === 'detail',
            [className]: true,
            inline: inline,
            block: !inline,
        });
        const { pageKey, formKey, autocompleteOptions } = this.state;
        const clsStringCol = classNames('description', colClassName);
        return ( <div className = { clsStringForm }
                  style = { style } > {
                  title ? < div className = "title" > { title } </div> : ''} <Form>
                <Row gutter = { gutter } className = "wrapRow" > 
                  {
                    /**
                      * @param {{ visible: boolean; }} item
                      */
                    /**
                      * @param {{ visible: boolean; }} item
                      */
                    (formItems || [])
                    .slice(0, trimLength || undefined)
                    // @ts-ignore
                    .filter(item => item.visible !== false)
                    // @ts-ignore
                    .map(item => ( <Col className = { clsStringCol }
                        style = {
                            { display: item.isHidden ? 'none' : 'inline-block' }
                        }
                        key = { `col-key-${item.fieldName}` } {...this.getColumnSpan(col, item.inputType, item.posWidth, formType) } > {
                            Control({
                                control: item,
                                form,
                                formType,
                                pageKey,
                                formKey,
                                value: dataSource[item.fieldName],
                                autocompleteOptions,
                                setAutocompleteOptions: this.setAutocompleteOptions,
                                onChange: debounce(this.onValuesChange, 500),
                            })
                        } </Col>
                    ))
                } </Row></Form> </div>
            );
        }
    }

    CreateForm.defaultProps = {
        prefixFormCls: 'iloopc-form',
        prefixDetailCls: 'iloopc-detail'
    };

    // @ts-ignore
    export default Form.create()(CreateForm);