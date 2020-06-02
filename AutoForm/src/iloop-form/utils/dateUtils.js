// @ts-nocheck
import moment from 'moment';

export const DATE_MONTH = 'YYYY-MM';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_TIME_FULL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const TIME_HHMM_FORMAT = 'HH:mm';
export const TIME_ZERO = ' 00:00:00';
export const TIME_ROUND = ' 23:59:59';
export const TIME_MIN_ZERO = ':00';
export const TIME_MIN_ROUND = ':59';

/**
 * 以当前日期为基准，获取时间范围
 * @param {number} range
 * @param {string} unit
 * @param {boolean} formated
 */
export function getMomentRange(range, unit, formated) {
  const theUnit = unit || 'day';
  return formated
    ? [
        moment()
          .startOf('day')
          .subtract(range, theUnit)
          .format(DATE_FORMAT) + TIME_ZERO,
        moment()
          .endOf('day')
          .add(range, theUnit)
          .format(DATE_FORMAT) + TIME_ROUND,
      ]
    : [
        moment()
          .startOf('day')
          .subtract(range, theUnit),
        moment()
          .endOf('day')
          .add(range, theUnit),
      ];
}

/**
 * 当前日期前后几天
 * @param {number} range
 */
export function getDateRange(range) {
  // @ts-ignore
  return getMomentRange(range, 'day');
}

/**
 * 当前日期前后几天格式化
 * @param {number} range
 */
export function getDateRangeFormated(range) {
  return getMomentRange(range, 'day', true);
}

/**
 * 当前日期前后几个月
 * @param {number} range
 */
export function getMonthRange(range) {
  // @ts-ignore
  return getMomentRange(range, 'month');
}

/**
 * 当前日期前后几个月格式化
 */
export function getMonthRangeFormated(range) {
  return getMomentRange(range, 'month', true);
}

/**
 * 当月的第一天到最后一天
 */
export function getTotalThisMonth() {
  return [moment().startOf('month'), moment().endOf('month')];
}

/**
 * 当月的第一天到最后一天格式化
 */
export function getTotalThisMonthForamted() {
  return [
    moment()
      .startOf('month')
      .format(DATE_FORMAT) + TIME_ZERO,
    moment()
      .endOf('month')
      .format(DATE_FORMAT) + TIME_ROUND,
  ];
}

/**
 * 当月的第一天到今天
 */
export function getThisMonthToDaday() {
  return [moment().startOf('month'), moment()];
}

/**
 * 当月的第一天到今天格式化
 * @param {number} range
 */
export function getThisMonthToDadayFormated() {
  return [
    moment()
      .startOf('month')
      .format(DATE_FORMAT) + TIME_ZERO,
    moment().format(DATE_FORMAT) + TIME_ROUND,
  ];
}

/**
 * 格式化日期 YYYY-MM-DD + ' 00:00:00'
 * @param {number} date
 */
export function formatDateWith000000(date) {
  return date.format(DATE_FORMAT) + TIME_ZERO;
}

/**
 * 格式化日期 YYYY-MM-DD + ' 23:59:59'
 * @param {number} date
 */
export function formatDateWith235959(date) {
  return date.format(DATE_FORMAT) + TIME_ROUND;
}

/**
 * 格式化日期 YYYY-MM-DD HH:mm  + ':00'
 * @param {number} date
 */
export function formatDateWith00(date) {
  return date.format(DATE_TIME_FORMAT) + TIME_MIN_ZERO;
}

/**
 * 格式化日期 YYYY-MM-DD HH:mm  + ':59'
 * @param {number} date
 */
export function formatDateWith59(date) {
  return date.format(DATE_TIME_FORMAT) + TIME_MIN_ROUND;
}
