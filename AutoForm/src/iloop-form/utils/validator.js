/* eslint-disable no-useless-escape */

const validator = {};
const message = {};
message.default = '不能为空';


// －－－－－－－－－－－－－－－－－－－－－－export const patternPhone = /^0?1[3|4|5|7|8][0-9]{9}$/;//手机格式校验
// 手机号码
validator.patternPhone = /^0?1[0-9]{10}$/;// 手机格式校验熊总特别嘱咐
message.patternPhone = '请输入正确电话号码';

// 电话号码
validator.patternTel = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$/;
message.patternTel = '请输入正确固话号码';

// 电话号码
// export const patternPhoneAndTel = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$|^0?1[3|4|5|7|8][0-9]{9}$/;
validator.patternPhoneAndTel = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$|^0?1[0-9]{10}$/;
message.patternPhoneAndTel = '请输入正确联系电话';

// －－－－－－－－－－－－－－－－－－－－－－export const patternPhoneAndTelSecond = /^(0[0-9]{2,3}\-?)?([0-9]{1,8})(\-?[0-9]{1,4})?$|^0?1[3|4|5|7|8][0-9]{9}$/;

// 二级电话号码
validator.patternPhoneAndTelSecond = /^(0[0-9]{2,3}\-?)?([0-9]{1,8})(\-?[0-9]{1,4})?$|^0?1[0-9]{10}$/;
message.patternPhoneAndTelSecond = '请输入正确联系电话';

// 银行卡号
validator.patternBankCard = /^([0-9]{16,20})$/;
message.patternBankCard = '请输入正确联系电话';

// 联系电话
validator.patternNumber = /^(([0-9]|([1-9][0-9]{0,7}))((\.[0-9]{1,2})?))$/;
message.patternNumber = '请输入正确联系电话';


// 全部车牌号
validator.carNumber = '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$';
message.carNumber = '请输入正确的车牌号';

// 车牌号
validator.carNumberNormal = '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9学警港澳]{1}$';
message.carNumberNormal = '请输入正确的车牌号';

// 挂车号
validator.carNumberTrail = '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}挂$';
message.carNumberTrail = '请输入正确挂车号';

// 中文和英文字母
validator.specialCharacter = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
message.specialCharacter = '只可输入英文、汉字和数字';

validator.specialCharacterDot = /^[\u4e00-\u9fa5a-zA-Z0-9.]+$/;
message.specialCharacterDot = '只可输入英文、汉字、数字或.';


// 中文英文中文标点
validator.partSpecialCharacter = /^[\u4e00-\u9fa5-().（），。？！%*+=_a-zA-Z0-9 ]+$/;
message.partSpecialCharacter = '只可输入英文、汉字和数字及常用中文标点';

// 全部中文或者全部英文
validator.pureChineseOrEnglish = /^[\u4e00-\u9fa5]+$|^[a-zA-Z]+$/;
message.pureChineseOrEnglish = '只可输入纯中文字符或纯英文字符';

validator.chineseOrEnglish = /^[\u4e00-\u9fa5a-zA-Z]+$/;
message.chineseOrEnglish = '只可输入汉字或英文字符';

// 正浮点数
validator.floatNumber = /^\d+(\.\d+)?$/;
message.floatNumber = '只可输入正浮点数';

// 全部空字符
validator.emptyString = /\S+/;
message.emptyString = '不能只输入空字符';

validator.notEmpty = /^[^\s]+$/; // 不允许输入空格
message.notEmpty = '不允许输入空格';

// 保存非数字， 校验纯数字
validator.pureNumber = /[\D]/;
message.pureNumber = '不能输入纯数字';

// 纯汉字
validator.chineseCharacter = /^[\u4e00-\u9fa5]+$/;
message.chineseCharacter = '只支持汉字';

// 不能为特殊字符或汉字
validator.characterOrNumber = /^[a-zA-Z0-9]+$/;
message.characterOrNumber = '只支持字符或数字';

// 银行卡号
validator.bankAccount = /^\d{16,19}$/;
message.bankAccount = '银行账号为16到19位的纯数字';

// 数字大于0小于1
validator.numberRange = /^(1|0\.\d{1,8})$/;

// 验证是否是手机号
validator.isPhone = str => validator.patternPhone.test(str);
message.isPhone = '请输入正确的手机号';

// 验证是否是固话
validator.isTel = str => validator.patternTel.test(str);
message.isTel = '请输入正确的固话号码';

// 验证是否是手机号和固话
validator.isPhoneAndTel = str => validator.patternPhoneAndTel.test(str);
message.isPhoneAndTel = '请输入正确的电话号码或固化号码';

// 数字(整数<9位,小数<3位)
validator.isNumber = str => validator.patternNumber.test(str);
message.isNumber = '请输入正确的电话号码或固化号码';

// 金额
validator.isAmount = str => /^\d+(\.\d{1,2})?$/.test(str);
message.isAmount = '请输入正确的金额';

// 验证是否是银行卡
validator.isBankCard = str => validator.patternBankCard.test(str);
message.isBankCard = '请输入正确的银行卡号';

// 验证是否包含特殊字符
validator.hasSpecialCharacter = str => validator.specialCharacter.test(str);
message.hasSpecialCharacter = '含有特殊字符';



// special character
export const sc = /[`~!@#$%^&*()_+-={}|\[\]\\:;"'<>,.\?/～｀！@＃¥％……&＊（）——＋＝－｛｝［］｜、；：‘“《》，。？／]/;
export const numberFixedtwo = /^(?=[\d.]{1,15})([1-9]\d{1,14}|\d)([.][0-9]{0,2})?$/; // 验证格式，x or x.x or x.xx ,x为数字，最多2位小数，允许0，但是不允许01之类的0开头的数字
export const numberFixedSix = /^(?=[\d.]{1,15})([1-9]\d{1,14}|\d)([.][0-9]{0,6})?$/; // 验证格式，x or x.x or x.xx ,x为数字，最多2位小数，允许0，但是不允许01之类的0开头的数字

// 身份证有些是15位的
function isValidityBrithBy15IdCard(idCard15) {
    const year = idCard15.substring(6, 8);
    const month = idCard15.substring(8, 10);
    const day = idCard15.substring(10, 12);
    const tmpDate = new Date(year, parseFloat(month) - 1, parseFloat(day));

    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    return tmpDate.getYear() !== parseFloat(year) || tmpDate.getMonth() !== parseFloat(month) - 1 || tmpDate.getDate() !== parseFloat(day);
}


/**
 * 校验身份证合法性
 * @param {String} code
 * @returns {Boolean} true:合法，false:非法
 */
validator.isIdentityCodeValid = (code) => {
    let reg;
    const city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 ',
    };

    code = code.toUpperCase();

    if (!city[code.substr(0, 2)]) {
        return false;
    }

    if (code.length === 15) {
        reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

        if (reg.test(code)) {
            return isValidityBrithBy15IdCard(code);
        }
        return false;
    } if (code.length === 18) {
        reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

        if (!reg.test(code)) {
            return false;
        }
            code = code.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }

            return parity[sum % 11].toString() === code[17];
    }
    return false;
}
message.isIdentityCodeValid = '请输入正确的身份证号';

// 校验营业执照号码15位
function businessLicense15(ints) {
    // let ints14 = ints.substr(0,14);
    // let ints15 = ints.substr(14);

    let ti = 0;
    let si = 0;// pi|11+ti
    let cj = 0;// （si||10==0？10：si||10）*2
    let pj = 10;// pj=cj|11==0?10:cj|11
    let lastNum = '';
    for (let i = 0; i < ints.length; i++) {
        ti = parseInt(ints[i]);
        si = pj + ti;
        cj = (si % 10 === 0 ? 10 : si % 10) * 2;
        pj = cj % 11;

        if (i === ints.length - 1) {
            // lastNum =(1 - pj < 0 ? 11 - pj : 1 - pj) % 10;
            lastNum = si % 10;
        }
    }
    if (lastNum === 1) {
        return true;
    }
        return false;
}
message.businessLicense15 = '请输入正确的营业执照';

// 校验营业执照号码
validator.businessLicense = (value) => {
    if (value.length === 15) {
        return businessLicense15(value);
    }
        // var reg = /^([0-9ABCDEFGHJKLMNPQRTUWXY]{2})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9Y])$/;
        const reg = /^([159Y]{1})([1239]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY])$/;
        if (!reg.test(value)) {
            return false;
        }
        const str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
        const ws = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
        const codes = [];
        codes[0] = value.substr(0, value.length - 1);
        codes[1] = value.substr(value.length - 1, value.length);
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += str.indexOf(codes[0].charAt(i)) * ws[i];
        }
        let c18 = 31 - (sum % 31);
        if (c18 === 31) {
            // alert("第18位 == 31");
            c18 = 'Y';
        } else if (c18 === 30) {
            // alert("第18位 == 30");
            c18 = '0';
        }
        if (str.charAt(c18) !== codes[1].charAt(0)) {
            // alert("社会信用代码有误！"+c18);
            return false;
        }

        return true;
}
message.businessLicense = '请输入正确的营业执照';

// 截去收尾对象属性收尾空白
export function trim(obj) {
    for (const k in obj) {
        if ((typeof obj[k]) === 'string') {
            obj[k] = (obj[k] || '').trim();
        } else if ((typeof obj[k]) === 'object') {
            trim(obj[k]);
        }
    }
}


validator.checkFloat = (parms, rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }
    if ((String(value).split('.')[0] && String(value).split('.')[0].length <= parms[0]) && (String(value).split('.')[1] ? String(value).split('.')[1].length <= parms[1] : true)) {
        callback();
        return;
    }
    callback(`点前最多${parms[0]}位,后最多${parms[1]}位`);
};

const validators = {
  patternPhone: {
    name: '手机号码',
    pattern: /^0?1[0-9]{10}$/,
    message: '请输入正确手机号码',
  },
  patternTel: {
    name: '电话号码',
    pattern: /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$/,
    message: '请输入正确电话号码',
  },
  patternPhoneAndTel: {
    name: '手机号码或电话号码',
    pattern: /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$|^0?1[0-9]{10}$/,
    message: '请输入正确联系方式',
  },
  patternBankCard: {
    name: '银行卡号',
    pattern: /^([0-9]{16,20})$/,
    message: '请输入正确银行卡号',
  },
  carNumber: {
    name: '车牌号',
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    message: '请输入正确车牌号',
  },
  carNumberNormal: {
    name: '机动车车牌号',
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9学警港澳]{1}$/,
    message: '请输入正确机动车车牌号',
  },
  carNumberTrail: {
    name: '挂车号',
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}挂$/,
    message: '请输入正确挂车号',
  },
  specialCharacter: {
    name: '英文、汉字、特殊字符',
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
    message: '只可输入英文、汉字和数字',
  },
  specialCharacterDot: {
    name: '英文、汉字、特殊字或.',
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9.]+$/,
    message: '只可输入英文、汉字、数字或.',
  },
  partSpecialCharacter: {
    name: '英文、汉字和数字及常用中文标点',
    pattern: /^[\u4e00-\u9fa5-().（），。？！%*+=_a-zA-Z0-9 ]+$/,
    message: '只可输入英文、汉字和数字及常用中文标点',
  },
  pureChineseOrEnglish: {
    name: '纯中文字符或纯英文字符',
    pattern: /^[\u4e00-\u9fa5]+$|^[a-zA-Z]+$/,
    message: '只可输入纯中文字符或纯英文字符',
  },
  chineseOrEnglish: {
    name: '汉字或英文字符',
    pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
    message: '只可输入汉字或英文字符',
  },
  floatNumber: {
    name: '正浮点数',
    pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
    message: '只可输入正浮点数',
  },
  emptyString: {
    name: '不全部为空',
    pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
    message: '不能只输入空字符',
  },
  notEmpty: { 
    name: '非空',
    pattern: /^[^\s]+$/,
    message: '不允许输入空格',
  },
  pureNumber:{
    name: '非空',
    pattern: /[\D]/,
    message: '不能输入纯数字',
  },
  chineseCharacter: {
    name: '纯汉字',
    pattern: /^[\u4e00-\u9fa5]+$/,
    message: '只支持汉字',
  },
  characterOrNumber: {
    name: '字符或数字',
    pattern: /^[a-zA-Z0-9]+$/,
    message: '只支持字符或数字',
  },
  bankAccount: {
    name: '银行账号',
    pattern: /^\d{16,19}$/,
    message: '请输入16到19位的银行卡号',
  },
  isIdentityCodeValid: {
    name: '身份证号',
    pattern: validator.isIdentityCodeValid,
    message: '请输入正确的身份证号',
  },
  businessLicense: {
    name: '营业执照',
    pattern: validator.businessLicense,
    message: '请输入正确的营业执照',
  }
}

export default validators;

export const errorValidator = { ...validator };

export const errorMessage = { ...message };