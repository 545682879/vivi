import { message } from 'antd';
import otmService from '@/services/otm';

const initState = {
  isModelShow: false,
  moduleTemplate: {},
  tables: [],
  tablecolumns: [],
  columnsKey: Date.now(),
};

export default {
  namespace: 'configIndex',

  state: { ...initState },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    // 查询所有字段
    *create({ payload, doSuccess }, { call }) {
      const data = yield call(otmService.templateCreate, payload);
      if (data.code === 0) {
        message.success('创建模版成功');
        if (doSuccess) {
          doSuccess(data);
        }
      }
    },

    *modify({ payload, doSuccess }, { call }) {
      const data = yield call(otmService.templateModify, payload);
      if (data.code === 0) {
        message.success('更新模版成功');
        if (doSuccess) {
          doSuccess(data);
        }
      }
    },

    *getTemplates({ payload, doSuccess }, { call }) {
      const response = yield call(otmService.findPageTemplateByTemplateName, payload);
      if (response.code === 0) {
        const result = response.data && response.data.length ? response.data[0] : {};
        if (doSuccess) {
          doSuccess(result);
        }
      } else {
        message.error(response.message || '请求错误');
      }
    },

    *getTables({ payload, doSuccess }, { call }) {
      const response = yield call(otmService.tables, payload);
      if (response.code === 0) {
        if (doSuccess) {
          doSuccess(response.data || []);
        }
      } else {
        message.error(response.message || '请求错误');
      }
    },

    *getTableColumns({ payload, doSuccess }, { call }) {
      const response = yield call(otmService.tablecolumns, payload);
      if (response.code === 0) {
        if (doSuccess) {
          doSuccess(response.data || []);
        }
      } else {
        message.error(response.message || '请求错误');
      }
    },

    *dataDictionary(action, { call, put }) {
      const data = yield call(otmService.dataDictionary, { pageSize: 10000 });
      if (data.code === 0) {
        const dicData = (data.data || []).reduce((total, currentValue) => {
          const lastrow = total.length ? total[total.length - 1] : '';
          if (lastrow !== currentValue.rgroup) {
            // total.push({label:currentValue.rgroup , name: currentValue.rgroupName })
            total.push(currentValue.rgroup);
          }
          return total;
        }, []);
        yield put({
          type: 'update',
          payload: {
            dicData,
          },
        });
      }
    },
  },

  subscriptions: {
    setup({ history }) {
      history.listen(({ pathname }) => {
        console.log(pathname);
      });
    },
  },
};
