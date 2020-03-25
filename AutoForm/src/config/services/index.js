import createService from '@/utils/createService';

export default createService({
  create: 'post /otm/pageTemplate/create',
  tables: 'get /otm/table/list',
  tablecolumns: 'get /otm/table/listTableColumn',
});
