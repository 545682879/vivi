import Mock from 'mockjs';

// import fetchMock from 'fetch-mock';

export const warehouseInfo = Mock.mock(/\/api\/warehouseInfo\/list/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      id: "1",
      warehouseName: '东阳快牛'
    },
    {
      id: "2",
      warehouseName: '东阳保税'
    }
  ]
})

export const contact = Mock.mock(/\/api\/contact\/autoComplete/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      contactId: "1",
      contactName: '张三',
      contactPerson: '李😊丽',
      operatorName: '皮皮虾',
    },
    {
      contactId: "2",
      contactName: '李四',
      contactPerson: '花花',
      operatorName: '小米',
    }
  ]
})

export const contact1 = Mock.mock(/\/api\/transport\/autoComplete/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      transportCode: "天跃物流"
    },
    {
      transportCode: "菜鸟物流"
    }
  ]
})


export const res = Mock.mock(/\/api\/res\/list/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      rkey: "玻璃",
      rvalue: '玻璃'
    },
    {
      rkey: "塑料桶",
      rvalue: '塑料桶'
    },
    {
      rkey: "箱子",
      rvalue: '箱子'
    }
  ]
})


export const iloopConsignor1111 = Mock.mock(/\/otm\/iloopConsignor\/list1111/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      id: '1',
      consignorCode: "货主编码1",
      consignorName: '货主名称1'
    },
    {
      id: '2',
      consignorCode: "货主编码2",
      consignorName: '货主名称2'
    }
  ]
})

export const iloopConsignor = Mock.mock(/\/otm\/iloopConsignor\/list/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      id: '1',
      consignorCode: "货主编码1",
      consignorName: '货主名称1',
      carTypeRequire: '普通车型',
      carLengthRequire: '3米',
      paymentOrgName: "万"
    },
    {
      id: '2',
      consignorCode: "货主编码2",
      consignorName: '货主名称2',
      carTypeRequire: '大货车',
      carLengthRequire: '10米',
      paymentOrgName: "亿"
    }
  ]
})

export const ship = Mock.mock(/\/api\/ship\/autoComplete/, 'get', {
  "code":0,
  "msg":"success",
  "count":0,
  "data":[
    {
      shipId: "123",
      shipName: '东极岛'
    },
    {
      shipId: "234",
      shipName: '威海'
    }
  ]
})