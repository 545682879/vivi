/* eslint-disable no-param-reassign */
// https://jsbin.com/wuboxerowo/edit?html,js,console
import _ from 'lodash';
import BigNumber from 'bignumber.js';

class Calculate {
  constructor(val) {
    this.value = Number(val) || 0;
  }

  static of(val) {
    return new Calculate(Calculate.flat(val));
  }

  /**
   * 加/加权
   * @param {} otherValue
   * @param {*} ratio
   */
  add(otherValue, ratio) {
    const anotherValue = Calculate.of(otherValue)
      .ratio(ratio)
      .valueOf();
    this.value = new BigNumber(this.value).plus(anotherValue).toNumber();
    return this;
  }

  static flat(otherValue) {
    if (Array.isArray(otherValue)) {
      return otherValue.map(
        () => Number(otherValue) || (otherValue instanceof Calculate ? otherValue.value : 0)
      );
    }
    if (_.isObject(otherValue)) {
      if (otherValue instanceof Calculate) {
        return otherValue.value;
      }
      // eslint-disable-next-line no-return-assign
      Object.keys(otherValue).map(item => (otherValue[item] = otherValue[item].value));
      return otherValue;
    }
    return Number(otherValue) || 0;
  }

  /**
   * 加权计算
   */
  ratio(ratio) {
    this.value = new BigNumber(this.value).multipliedBy(ratio || 1).toNumber();
    return this;
  }

  /**
   * 乘法计算
   */
  multi(otherValue) {
    this.value = new BigNumber(this.value).multipliedBy(otherValue).toNumber();
    return this;
  }

  /**
   * 除法计算
   */
  divide(otherValue) {
    this.value = new BigNumber(this.value).dividedBy(otherValue).toNumber();
    return this;
  }

  /**
   * 格式化日期
   */
  format(num) {
    const val = this.value.toFixed(num || 2).split('.');
    return `${(val[0] || 0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}.${val[1]}`;
  }

  toString() {
    return (this.value || 0).toFixed(3);
  }

  valueOf() {
    return this.value;
  }

  toBigNumber() {
    return new BigNumber(this.value);
  }
}

const a = Calculate.of(10000);
a.add(6)
  .add(10)
  .add(Calculate.of(9));
// console.log(a);
// console.log(a.format());
// console.log(Calculate.flat({ a: Calculate.of(5) }));
// console.log(_.isPlainObject(Calculate.of(5)));

// const bignumber = Calculate.of(0.003);
// console.log('add', bignumber.add(0.005).valueOf());
// const bignumber1 = Calculate.of(0.003);
// console.log('sub', bignumber1.add(0.005, -1).valueOf());
// const bignumber2 = Calculate.of(0.003);
// console.log('multi', bignumber2.multi(0.005).valueOf());
// const bignumber3 = Calculate.of(0.003);
// console.log('divide', bignumber3.divide(0.005).valueOf());

class Statistic {
  /**
   * 计算多个值的和
   * 参数为多个要计算的值，数组
   */
  static sum() {
    // eslint-disable-next-line prefer-rest-params
    const params = Array.isArray(arguments[0]) ? Array.from(arguments[0]) : Array.from(arguments);
    const total = Calculate.of();
    params.forEach(item => {
      total.add(item);
    });
    return Calculate.flat(total);
  }

  /**
   * 计算一个对象里多个值的和
   * @param {*} record - 要计算的记录
   * @param {*} items - 要统计的字段/如果不传默认所有字段
   * @param {*} totalname - 统计和
   */
  static getTotal(record, items, totalname) {
    const fields = items && Array.isArray(items) ? items : Object.keys(record);
    const total = Calculate.of();
    fields.forEach(item => {
      total.add(record[item]);
    });
    if (totalname) {
      // eslint-disable-next-line no-param-reassign
      record[totalname] = total;
    }
    // console.log('record',record);
    return Calculate.flat(total);
  }

  /**
   * 统计一个对象数组的多个字段的和并生成一个统计行
   */
  static stat(records, fields, totalname) {
    const countFields = fields && Array.isArray(fields) ? fields : Object.keys(records[0]);
    const final = {};

    countFields.forEach(field => {
      final[field] = Calculate.of();
    });

    (records || []).forEach(record => {
      if (totalname) {
        Statistic.getTotal(record, countFields, totalname);
      }
      countFields.forEach(field => {
        final[field].add(record[field]);
      });
    });

    if (totalname) {
      Statistic.getTotal(final, countFields, totalname);
    }

    return Calculate.flat(final);
  }

  /**
   * 三值计算
   */
  static three(records, fields, middleValue) {
    if (_.isPlainObject(records)) {
      if (fields.length === 2) {
        records[fields[1]] = Calculate.of(records[fields[0]]).add(middleValue, -1).value;
        return records;
      }
      if (fields.length === 3) {
        if (middleValue) {
          records[fields[1]] = Calculate.flat(middleValue);
          records[fields[2]] = Calculate.of(records[fields[0]]).add(middleValue, -1).value;
        } else {
          records[fields[2]] = Calculate.of(records[fields[0]]).add(records[fields[1]], -1).value;
        }

        return records;
      }
    } else {
      if (Number(records) || records === 0) {
        return Calculate.of(Number(records) || 0).add(Number(fields || middleValue) || 0, -1);
      }
      return null;
    }
    return null;
  }
}

// console.log('Statistic', Statistic.sum(1, 2, 3, 4, 5, 6, 7, Calculate.of(9).add(8)));
// console.log('Statistic', Statistic.sum([1, 2, 3, 4, 5, 6, 7, Calculate.of(9).add(8)]));

// example
const obj = { a: 100, b: 200.03, c: 35.05, d: 80 };
// console.log(Statistic.getTotal(obj, ['a', 'b', 'c']));

// example
const objs = [
  { a: 100, b: 200.03, c: 35.05, d: 80 },
  { a: 50, b: Calculate.of().add(101.3, -0.5), c: 30.05, d: 60 },
  { a: 60, b: 200.03, c: 35.05, d: 70 },
  { a: 70, b: 150.08, c: 66, d: 90 },
];

// console.log(Statistic.stat(objs, ['a', 'b', 'c'], 'total'));

// console.log(Statistic.three(obj, ['a', 'b', 'c']));

// console.log(Statistic.three(obj, ['a', 'c'], Calculate.of(11).add(30)));

// console.log(Statistic.three(100, 11));

export { Calculate, Statistic };
