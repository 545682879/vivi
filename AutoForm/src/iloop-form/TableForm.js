/* eslint-disable no-param-reassign */
import React from 'react';
import classNames from 'classnames';
import { Form, Row, Button, Table, Checkbox } from 'antd';
import { cloneDeep, debounce, isEmpty } from 'lodash';
import Control from './Control';
import common from './utils/common';
// @ts-ignore
import { Statistic } from './utils/calculate';
import md5 from 'md5';
import BaseForm from './BaseForm';
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.scss';
const { guid, generateFieldName } = common;


/**
 * 
 */
class CreateForm extends BaseForm {
    // @ts-ignore
    constructor(props) {
        super(props);
        const {
            defaultEmptyRow,
            dataSource,
            statisticCols,
        } = props;
        const theFormItems = this.wrapFormItems(props);
        const path = window.location.pathname + window.location.search;
        const pageKey = props.pageKey ? props.pageKey : md5(path);
        const formKey = props.formKey ? props.formKey : (theFormItems && theFormItems[0] ? theFormItems[0].tableName : guid());

        const emptyRow = (defaultEmptyRow ? [{}] : []);
        this.state = {
            statisticCols,
            totalRow: statisticCols && statisticCols.length ? {
                [theFormItems[0].fieldName]: '总计：',
                key: 'TOTAL',
                ...Statistic.stat(dataSource || [], statisticCols),
            } : {},
            initialDataSource: dataSource,
            // @ts-ignore
            dataSource: (dataSource && dataSource.length ? dataSource : emptyRow).map(item => ({...item, key: guid() })),
            formItems: theFormItems,
            allDependences: this.getAllDependences(theFormItems),
            pageKey,
            formKey,
            columns: this.generataColumns(theFormItems, pageKey, formKey),
            autocompleteOptions: {},
        };
    }

    // @ts-ignore
    generataColumns = (theFormItems, pageKey, formKey) => {
      const { formType, canDelete, fixedNumber, form } = this.props;
      const enerateActionColumn = (formType === 'detail' && !canDelete) || fixedNumber ? [] : [{
              title: '操作',
              dataIndex: 'action',
              key: 'action',
              width: 80,
              align: 'center',
              // @ts-ignore
              render: (text, record) =>
                  record.key === 'TOTAL' ? (
                      ''
                  ) : ( canDelete && typeof canDelete === 'function' && !canDelete(text, record) ? <span style={{color: 'rgba(0, 0, 0, 0.25)'}}>删除</span> : <a onClick = { this.doRemove.bind(this, (record || {}).key)} href="javasrcipt:void(0)"> 删除 </a>
                  ),
          }, ];

        const theColumns = enerateActionColumn.concat(
            // @ts-ignore
            (theFormItems || []).filter((it)=>{return !it.isHidden}).map(item => ({
                title: ( <span> {
                        item.isOptional && formType !== 'detail' ? ( <span style = {
                                { color: '#f5222d', paddingRight: '3px' }
                            } > * </span>
                        ) : (
                            ''
                        )
                    } { item.fieldHeader } </span>
                ),
                dataIndex: item.fieldName,
                key: item.fieldName,
                width: Math.max(item.posWidth, 120),
                // @ts-ignore
                render: (text, record) => {
                    const { autocompleteOptions } = this.state;
                    if(item.render && (typeof item.render === 'function')){
                      return item.render(text, record);
                    }
                    let initialValue = this.parseInitValue(item, record, formType);
                    
                    let detail = '';
                    if (formType === 'detail') {
                      if(item.inputType === 'checkbox'){
                        // @ts-ignore
                        detail = <Checkbox disabled checked = { initialValue } />;
                      }else{
                        detail = initialValue;  
                      }
                    } else if (record.key === 'TOTAL') {
                        // @ts-ignore
                        detail = <span style = {
                            { paddingLeft: '12px' }
                        }> { initialValue } </span>;
                    } else {
                        // @ts-ignore
                        detail = Control({
                            control: {...item, initialValue , isDisable: (typeof item.isDisable === 'function') ? item.isDisable(text, record) : item.isDisable},
                            form,
                            formType: formType === 'form' ? 'tableform' : formType || 'table',
                            pageKey,
                            formKey,
                            key: (record || {}).key,
                            autocompleteOptions,
                            setAutocompleteOptions: this.setAutocompleteOptions,
                            onChange: debounce(this.onValuesChange, 500),
                        });
                    }
                    return detail;
                },
            }))
        );
        return theColumns;
    }
    
    // @ts-ignore
    wrapFormItems(props) {
        return this.convertFormItem(this.attachRules(props.formItems, props.rules),props.convertFormItem)
    }

    // @ts-ignore
    componentWillReceiveProps(nextProps) {
        const { defaultEmptyRow } = this.props;
        const { initialDataSource } = this.state;
        const before = JSON.stringify(initialDataSource);
        const after = JSON.stringify(nextProps.dataSource);
        if (before !== after) {
            const emptyRows = defaultEmptyRow ? [{}]: [];
            this.setState({
                initialDataSource: nextProps.dataSource,
                // @ts-ignore
                dataSource: (!isEmpty(nextProps.dataSource) ? nextProps.dataSource : emptyRows).map(item => ({...item, key: guid() })),
            });
        }
    }

    // @ts-ignore
    initFormContext(targetDataSource){
      const { pageKey, formKey, dataSource, allDependences } = this.state;
      const { dependences, changeDependences } = this.context;
      const targetValue = {};
      const ds = targetDataSource ? targetDataSource : (dataSource || [])
      allDependences.forEach((it)=>{
        // @ts-ignore
        ds.forEach((value, key)=>{
          targetValue[generateFieldName(pageKey, formKey, it, key)] = ds[it];
        })
      })
      if(Object.keys(targetValue).length && changeDependences){
        changeDependences({...dependences, ...targetValue });
      }
    }

    componentDidMount(){
      this.initFormContext();
    }
    
    componentWillUnmount() {
        this.setState({
            pageKey: null,
            formKey: null,
            // initialValus: props.dataSource || {},
            dataSource: null,
            // initialValue: null,
            formItems: null,
        });
    }

    /**
     * @param values - 控件的返回值
     * @param inputType - 控件类型
     * @param isExtjson - 是否扩展字段
     * @param tableName - 表名
     */
    // @ts-ignore
    onValuesChange = (values, inputType, isExtjson, tableName, extra) => {
        const { dataSource, totalRow, statisticCols } = this.state;
        const { dependences, changeDependences } = this.context;
        const fullName = Object.keys(values)[0];
        const change = fullName.split('-');
        // const pageKey = change[0]; // 页面ID
        // const formKey = change[1]; // 表单ID
        const name = change[2]; // 字段名称
        const key = change[3]; // 字段key
        const targetData = cloneDeep(dataSource);
        // @ts-ignore
        const idx = targetData.findIndex(item => item.key === key);
        const resultVal = Object.values(values)[0];
        this.assignFormItem(targetData[idx], inputType, isExtjson, tableName, name, resultVal);
        const targetTotalRow = this.hasStatistic(name) ? Statistic.stat(targetData, statisticCols) : {};
        this.setState({ dataSource: targetData, totalRow: {...totalRow, ...targetTotalRow } }, () => {
            const { onValuesChange } = this.props;
            if (onValuesChange) {
                onValuesChange(
                    dataSource,
                    targetData,
                    key,
                    name, ['autocomplete', 'select'].includes(inputType) ? { rowKey: key, ...extra } : null
                );
            }
            if (Object.keys(dependences).includes(fullName) && changeDependences) {
                changeDependences({...dependences, [fullName]: resultVal });
            }
        });
    };

    // @ts-ignore
    isNotNull = value => {
        return value !== undefined && value !== null;
    };

    /**
     * 获取总的记录数
     */
    getTotal = () => {
        const { totalRow } = this.state;
        return totalRow;
    };

    /**
     * 设置新值
     * @param formValues - 设置的数据值，
     * 如果是Array类型，设置多条数据值，需在每条记录里制定rowKey, rowKey 为dataSource里每条记录的key，
     * 如为Object类型，为一条记录设置值，可以不制定rowKey
     * @param rowKey - 如果第一个参数为Object， 可以在这里制定要修改的行的Key。
     *
     */
    // @ts-ignore
    setFieldsValue = (formValues, rowKey) => {
        const { form } = this.props;
        const { dataSource, pageKey, formKey, formItems, statisticCols, totalRow } = this.state;
        const { dependences, changeDependences } = this.context;
        const targeFormValue = {};
        const targetDataSource = cloneDeep(dataSource);
        const targetContextValue = {};
        const itemsCatch = {};
        (Array.isArray(formValues) ? formValues : [{ rowKey, ...formValues }]).forEach(values => {
            // @ts-ignore
            const rowIndex = targetDataSource.findIndex(it => {
                return it.key === values.rowKey;
            });
            Object.entries(values).forEach(it => {
                // eslint-disable-next-line prefer-destructuring
                const name = it[0];
                const value = it[1];
                const targetName = generateFieldName(pageKey, formKey, name, values.rowKey);
                targeFormValue[targetName] = value;
                if(Object.keys(dependences).includes(targetName)){
                  targetContextValue[targetName] = it[1];
                }
                
                let item = itemsCatch[name];
                if (!item) {
                    // @ts-ignore
                    item = formItems.find(it1 => {
                        return it1.fieldName === it[0];
                    });
                    itemsCatch[name] = item;
                }
                if (item) {
                    this.assignFormItem(
                        targetDataSource[rowIndex],
                        item.inputType,
                        item.isExtjson,
                        item.tableName,
                        name,
                        value
                    );
                }
            });
        });
        const targetTotalRow = this.hasStatistic(Object.keys(formValues)) ?
            Statistic.stat(targetDataSource, statisticCols) : {};
        form.setFieldsValue(targeFormValue);
        this.setState({ dataSource: targetDataSource, totalRow: {...totalRow, ...targetTotalRow } }, ()=>{
            if (Object.keys(targetContextValue).length && changeDependences) {
                changeDependences({...dependences, ...targetContextValue});
            }
        });
    };

    /**
     * 添加一行记录
     */
    doAdd = () => {
        const { formItems, dataSource,  pageKey, formKey, allDependences } = this.state;
        const { onValuesChange } = this.props;
        const { dependences, changeDependences } = this.context;
        const newDependences = cloneDeep(dependences);
        const k = guid();
        const newRow = formItems.reduce(
            // @ts-ignore
            (result, current) => ({...result, [current.fieldName]: (current.initialValue || null )}), { key: k }
        );
        const targetData = cloneDeep(dataSource);
        this.setState({ dataSource: [...targetData, newRow] }, ()=>{
          (allDependences || []).forEach((it)=>{
            newDependences[generateFieldName(pageKey, formKey, it, k)] = null;
          });
          if(allDependences.length && changeDependences){
            changeDependences({ ...newDependences });
          }
          if(onValuesChange){
            onValuesChange(dataSource, [...targetData, newRow], "ADD");
          }
        });
        
    };

    /**
     * 删除一行记录
     */
    // @ts-ignore
    doRemove = key => {
        const { dataSource, statisticCols, totalRow, allDependences, pageKey, formKey } = this.state;
        const { dependences, changeDependences } = this.context;
        const { onValuesChange } = this.props;
        const targetData = cloneDeep(dataSource);
        // @ts-ignore
        const idx = targetData.findIndex(item => item.key === key);
        targetData.splice(idx, 1);
        const targetTotalRow = this.hasStatistic() ? Statistic.stat(targetData, statisticCols) : {};
        this.setState({ dataSource: [...targetData], totalRow: {...totalRow, ...targetTotalRow } },()=>{
          const newDependences = cloneDeep(dependences);
          (allDependences || []).forEach((it)=>{
            // 如果是行内关联，删除行的依赖
            const name = generateFieldName(pageKey, formKey, it, key);
            if((name||'').split('-').pop() === key){
              delete newDependences[generateFieldName(pageKey, formKey, it, key)];
            }
          });
          if(allDependences.length && changeDependences){
            changeDependences({ ...newDependences });
          }
          if(onValuesChange){
            onValuesChange(dataSource, [...targetData], "REMOVE");
          }
        });
    };

    /**
     * 是否设置统计字段
     */
    // @ts-ignore
    hasStatistic = fieldName => {
        // eslint-disable-next-line no-nested-ternary
        let fieldNames = [];
        if (fieldName) {
            fieldNames = Array.isArray(fieldName) ? fieldName : [fieldName];
        }
        const { statisticCols } = this.state;
        return (
            statisticCols &&
            statisticCols.length &&
            (!fieldNames.length ||
                (fieldNames.length &&
                    fieldNames.some(it => {
                        return statisticCols.includes(it);
                    })))
        );
    };

    /**
     * 重置表单
     */
    // @ts-ignore
    resetForm = (targetDataSource) => {
        const {initialDataSource, statisticCols, formItems} = this.state;  
        const ds = (targetDataSource ? targetDataSource : initialDataSource);
        const { defaultEmptyRow } = this.props;
        const emptyRow = (defaultEmptyRow ? [{}] : []);
        // @ts-ignore
        this.setState({ dataSource: ( ds && ds.length ? ds : emptyRow ).map(item => ({...item, key: guid() })), totalRow: statisticCols && statisticCols.length ? {
          [formItems[0].fieldName]: '总计：',
          key: 'TOTAL',
          ...Statistic.stat(ds || [], statisticCols),
        } : {}, }, ()=>{
          this.initFormContext(targetDataSource);
        });
    };

    render() {
        const {
            className, // 表单样式
            title, // 标题
            fixedNumber,
            style,
            formType,
            prefixFormCls,
            inline,
            doAdd,
            addText,
            ...rest
        } = this.props;

        const {
            columns, // 列头
            dataSource,
            totalRow,
        } = this.state;
        const clsString = classNames({ 
          [prefixFormCls]: true,      
          [className]: true, 
          inline: inline,
          block: !inline
        });
        
        return ( <div className = { clsString }
            style = { style } > {
                title ? <div className = 'title' > { title } </div> : ''} <Form>
                <Table
                {...rest}
                bordered
                // @ts-ignore
                columns = { columns }
                dataSource = { this.hasStatistic() ? dataSource.concat([totalRow]) : dataSource }
                pagination = { false }
                scroll = {
                    { x: 120 * columns.length }
                }
                showHeader = { formType !== 'form' }
                /> {
                formType === 'detail' || fixedNumber ? (
                    ''
                ) : ( <Row className = 'buttonRow' >
                    <Button type = "primary"
                    onClick = { (doAdd && typeof doAdd === 'function') ? doAdd : this.doAdd } >
                    {addText||'新增'} </Button> </Row>
                )
            } </Form> </div>
        );
    }
}

CreateForm.defaultProps = {
    prefixFormCls: 'iloopc-form'
};

export default Form.create()(CreateForm);