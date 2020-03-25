// @ts-nocheck
// eslint-disable-next-line import/no-named-as-default
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
import validator from './utils/validator';
import { Calculate, Statistic } from 'iloop-fe-utils/lib/calculate';
import { dependences, DependencesContext } from './context';
import constant from './utils/constant';


/**
 * 表单校验
 * @param {*} forms
 * @param {*} callback
 */
function validateForms(forms, callback) {
    let validateresult = 0;
    (forms || []).forEach(item => {
        new Promise((resolve, reject) => {
                item.props.form.validateFields(err => {
                    if (!err) {
                        validateresult += 1;
                    }
                    if (validateresult === forms.length) {
                        resolve(true);
                    } else {
                        reject(new Error());
                    }
                });
            })
            .then(value => {
                if (value) {
                    callback();
                }
            })
            .catch(() => {
                console.log('has error');
            });
    });
}


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
    validator,

    dependences,
    DependencesContext,
};