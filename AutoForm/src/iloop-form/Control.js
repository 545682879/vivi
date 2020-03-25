// @ts-nocheck
import React from 'react';
import { Input, DatePicker, Form, Checkbox, TimePicker } from 'antd';
import {
    DATE_TIME_FORMAT,
    DATE_FORMAT,
    DATE_TIME_FULL_FORMAT,
    TIME_ZERO,
    TIME_ROUND,
    TIME_MIN_ZERO,
    TIME_MIN_ROUND,
    TIME_FORMAT,
    TIME_HHMM_FORMAT,
} from './utils/dateUtils';
import IloopSelect from './controls/IloopSelect/index';
import IloopAutoComplete from './controls/IloopAutoComplete/index';
import IloopAddress from './controls/IloopAddress/index';
import IloopNumber from './controls/IloopNumber/index';
import IloopTreeSelectAddress from './controls/IloopTreeSelectAddress/index';
import IloopUpload from './controls/IloopUpload/index';
import common from './utils/common';
import validators from './utils/validator';
const { getContainer, generateFieldName } = common;

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

function empty(){

}


/**
 * 创建/更新页面创建控件
 * @param {string} inputType
 * @param {string} formType
 * @param {string} fieldName
 * @param {object} params
 * @param {{ pageKey: any; formKey: any; fieldName: any; key: any; }} keys
 * @param {any} tableName
 * @param {any} required
 * @param {any} valueInOptions
 * @param {any} setAutocompleteOptions
 */
function getControl(inputType, formType, fieldName, params, keys, tableName, required, valueInOptions, setAutocompleteOptions) {
    let control = null;
    // @ts-ignore
    const { maxLength, isDisable, component, placeholder, prefix, suffix, addonBefore, addonAfter, onClick  } = params;
    const addons = {
        prefix,
        suffix,
        addonBefore,
        addonAfter
    }
    
    switch (inputType) {
        case 'text':
            control = <Input maxLength = { maxLength }
            disabled = { isDisable } {...addons }
            placeholder = { placeholder }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'textarea':
            control = <Input type = "textarea"
            maxLength = { maxLength }
            disabled = { isDisable }
            placeholder = { placeholder }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'integer':
            control = <IloopNumber disabled = { isDisable }
            maxLength = { maxLength } {...addons }
            placeholder = { placeholder }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'float':
            // @ts-ignore
            control = ( <IloopNumber toFix = { params.toFix || '3' }
                disabled = { isDisable }
                maxLength = { maxLength } {...addons }
                placeholder = { placeholder }
                onClick = { onClick ? onClick: empty }
                />
            );
            break;
        case 'select':
            control = <IloopSelect {...params }
            disabled = { isDisable }
            keys = { keys }
            formType={ formType }
            tableName = { tableName }
            required = { required }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'autocomplete':
            control = < IloopAutoComplete {...params }
            keys = { keys }
            formType={ formType }
            disabled = { isDisable }
            tableName = { tableName }
            valueInOptions = { valueInOptions }
            setAutocompleteOptions = { setAutocompleteOptions }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'date':
            control =
                formType === 'search' ? ( <RangePicker format = { params.showTime ? DATE_TIME_FORMAT : DATE_FORMAT }
                    disabled = { isDisable }
                    getCalendarContainer = { getContainer }
                    placeholder = { placeholder }
                    />
                ) : ( <DatePicker showTime = { params.showTime }
                    disabled = { isDisable }
                    getCalendarContainer = { getContainer }
                    placeholder = { placeholder }
                    format = { params.showTime ? DATE_TIME_FORMAT : DATE_FORMAT }
                    />
                );
            break;
        case 'daterange':
            control = <RangePicker format = { DATE_FORMAT }
              disabled = { isDisable }
              placeholder = { placeholder }
              />
            break;
        case 'time':
            control = < TimePicker disabled = { isDisable }
            format = { params.format || (params.showTime ? TIME_FORMAT : TIME_HHMM_FORMAT) }
            placeholder = { placeholder }
            />;
            break;
        case 'address':
            control = < IloopAddress fieldName = { fieldName } {...params }
            disabled = { isDisable }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'treeaddress':
            control = < IloopTreeSelectAddress {...params }
            disabled = { isDisable }
            />;
            break;
        case 'checkbox':
            control = < Checkbox disabled = { isDisable }
            onClick = { onClick ? onClick: empty }
            />;
            break;
        case 'upload':
            control = < IloopUpload disabled = { isDisable } {...params }
            />;
            break;
        case 'component':
            control = React.cloneElement(component, {
                disabled: isDisable,
                ...params
            });
            break;
        default:
            control = < Input maxLength = { maxLength }
            disabled = { isDisable } {...addons }
            placeholder = { placeholder }
            onClick = { onClick ? onClick : empty }
            />;
            break;
    }
    return control;
}

/**
 * 获取各种控件的值
 * @param {*} eventValue
 * @param {*} inputType
 * @param {string} formType
 * @param {{ showTime: any; format: any; }} rest
 */
function getControlValue(eventValue, inputType, formType, rest) {
    let value = null;
    switch (inputType) {
        case 'select':
        case 'autocomplete':
        case 'address':
        case 'upload':
        case 'component':
            value = eventValue;
            break;
        case 'treeaddress':
            /**
         * @param {{ label: string; }} item
         */
            value = (eventValue || []).map(item => {
                return item.label.includes('-') ? item.label.replace(/-/g, ',') : item.label;
            });
            break;
        case 'checkbox':
            value = eventValue.target.checked;
            break;
        case 'date':
            if (formType === 'search') {
                value = eventValue && eventValue.length ? [
                    eventValue[0].format(rest.showTime ? DATE_TIME_FORMAT : DATE_FORMAT) + (rest.showTime ? TIME_MIN_ZERO : TIME_ZERO),
                    eventValue[1].format(rest.showTime ? DATE_TIME_FORMAT : DATE_FORMAT) + (rest.showTime ? TIME_MIN_ROUND : TIME_ROUND),
                ] : [];
            } else {
                value = eventValue ? eventValue.format(DATE_TIME_FULL_FORMAT) : null;
            }
            break;
        case 'time':
            value = eventValue ? eventValue.format(rest.format || (rest.showTime ? TIME_FORMAT : TIME_HHMM_FORMAT)) : null;
            break;
        case 'daterange':
            value = eventValue && eventValue.length ? [
                eventValue[0].format(DATE_TIME_FORMAT) + rest.showTime ? TIME_MIN_ZERO : TIME_ZERO,
                eventValue[1].format(DATE_TIME_FORMAT) + rest.showTime ? TIME_MIN_ROUND : TIME_ROUND,
            ] : [];
            break;
        default:
            // eslint-disable-next-line prefer-destructuring
            value = eventValue.target.value;
            break;
    }
    return value;
}


/**
 * 详情页面的展示值
 * @param {boolean | undefined} initialValue
 * @param {string} inputType
 */
function getDetailValue(initialValue, inputType) {
    if (inputType === 'checkbox') {
        return <Checkbox disabled checked = { initialValue }
        />;
    }
    return initialValue;
}

/**
 * @param {any} required
 * @param {string} validation
 * @param {any} extraRules
 * @param {string} inputType
 * @param {any} valueInOptions
 * @param {any} autocompleteOptions
 * @param {string} name
 */
function getRules(required, validation, extraRules, inputType, valueInOptions, autocompleteOptions, name) {
    const rules = required ? [{ required: true, message: '不能为空' }] : [];
    let theValidation = [];
    try {
        theValidation = validation && (typeof validation === 'string') ? JSON.parse(validation) : [];
    } catch (e) {
        theValidation = [];
    }
    //if(theValidation && Array.isArray(theValidation)){
    /**
   * @param {React.ReactText} it
   */
    theValidation.forEach((it) => {
            if (validators[it].pattern && (typeof validators[it].pattern === 'function')) {
                rules.push(
                {
                    // @ts-ignore
                    validator: (rule, value, callback) => {
                        if (value && !validators[it].pattern(value)) {
                            callback(validators[it].message);
                        } else {
                            callback();
                        }
                    }
                });
            } else if (validators[it].pattern) {
                rules.push({
                    pattern: validators[it].pattern,
                    message: validators[it].message,
                });
            }
        })
        //}
    if (extraRules && Array.isArray(extraRules)) {
        rules.push(...extraRules);
    }
    if(inputType === 'autocomplete' && valueInOptions){
        rules.push(
        {
            // @ts-ignore
            validator: (rule, value, callback) => {
              if(value && !((autocompleteOptions||{})[name] || []).includes(value)){
                callback("请从下拉列表中选择数据");
              } else {
                callback();
              }
            }
        });
    }
    return rules;
}

/**
 * @props - 生成控件
 * @param {{ control: any; formKey: any; pageKey: any; key: any; form: { getFieldDecorator: any; }; formType: any; onChange: any; autocompleteOptions: any; setAutocompleteOptions: any; }} props
 */
function Controls(props) {
    // 页面属性
    const {
        control,
        formKey,
        pageKey,
        key,
        form: { getFieldDecorator },
        formType,
        onChange,
        autocompleteOptions,
        setAutocompleteOptions,
    } = props;

    // 控件属性
    const {
        fieldHeader: label,
        fieldName,
        initialValue,
        isOptional: required,
        validation,
        isExtjson,
        inputType,
        tableName,
        isHidden,
        extraRules,
        valueInOptions,
        ...rest
    } = control;
    const keys = { pageKey: pageKey, formKey: formKey, fieldName: fieldName, key: key };
    const name = generateFieldName(pageKey, formKey, fieldName, key, inputType);
    const rules = ['detail'].includes(formType) || isHidden ? null : getRules(required, validation, extraRules, inputType, valueInOptions, autocompleteOptions, name);
    const valuePropName = inputType === 'checkbox' ? 'checked' : 'value';
    const itemLabel = formType === 'table' ? '' : label;

    return ( <FormItem label = { itemLabel } > {
            getFieldDecorator(name, /**
               * @param {any} e
               * @param {any} currentItem
               */
 {
                // eslint-disable-next-line no-nested-ternary
                initialValue,
                rules,
                valuePropName,
                onChange: (e, currentItem) => {
                    const value = getControlValue(e, inputType, formType, rest);
                    onChange({
                        [name]: value
                    }, inputType, isExtjson, tableName, currentItem);
                },
            })(
                // 详情
                formType === 'detail' || inputType === 'plain' ? ( <span className = 'detailSpan' > { getDetailValue(initialValue, inputType) } </span>) : (
                    // 创建编辑控件
                    getControl(inputType, formType, fieldName, rest, keys, tableName, required, valueInOptions, autocompleteOptions, setAutocompleteOptions)
                )
            )
        } </FormItem>
    );
}

export default Controls