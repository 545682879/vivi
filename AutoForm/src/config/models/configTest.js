/* eslint-disable no-unused-vars */
import { message } from 'antd';
import services from '../services';
// import otmService from '@/services/otm';
const otmService = {};

const initState = {
  isModelShow: false,
  query: {},
  rightAllFields: [],
  leftFields: [],
  rightSortKeys: [],
  dicData: [],
};

export default {
  namespace: 'configTest',

  state: { ...initState },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *$init({ payload }, { put }) {
      // template20200318
      // console.log('(payload.location.query || {}).templateName',(payload.location.query || {}).templateName);
      // console.log('(payload.location.query || {}).templateName',(payload.location.query || {}).templateNames);
      const { templateName } = payload.location.query || {};
      const names = templateName.split(',');
      const tempalateMap = {};
      const ns = names.map(name => {
        tempalateMap[name.split('|')[0]] = name.split('|')[1] || 'F';
        return name.split('|')[0];
      });
      // console.log('init', ns, tempalateMap);
      yield put({
        type: 'update',
        payload: {
          tempalateMap,
        },
      });
      yield put({
        type: 'getTemplates',
        payload: { templateName: ns.join(',') },
      });
    },
    // @ts-ignore
    *$updateState(action, { put }) {
      // console.log('payload', payload);
      yield put({ type: 'update' });
      return null;
    },
    // 查询所有字段
    *create({ payload }, { call }) {
      const data = yield call(services.create, payload);
      if (data.code === 0) {
        message.success('创建模版成功');
      }
    },
    // 查询所有字段
    // eslint-disable-next-line require-yield
    *getDataSource({ payload }) {
      //  console.log('getDataSource', payload);
      // const data = yield call(services.getDataSource, payload);
      //  console.log('getDataSource', data);
      // @ts-ignore
      const data = [{}, {}, {}].map(it => {
        const dt = {};
        (payload.columnDefs || [])
          .filter(it1 => {
            return it1.field !== '$select';
          })
          .forEach((it1, index) => {
            dt[it1.field] = `col${index}`;
          });
        return dt;
      });
      // console.log('data',data);
      return {
        code: 0,
        msg: 'success',
        count: 86,
        data,
        success: true,
      };
    },
    *getTemplates({ payload, doSuccess }, { call, put }) {
      const response = yield call(otmService.findPageTemplateByTemplateName, payload);
      if (response.code === 0) {
        const result = response.data || [];
        yield put({
          type: 'update',
          payload: {
            moduleTemplates: result,
          },
        });
        if (doSuccess) {
          doSuccess(result);
        }
      }
      message.error(response.message || '请求错误');
    },
  },
};
