import React from 'react';
import { Button } from 'antd';



export default class IndexDb extends React.Component {

  db = null;

  componentDidMount(){
    const me = this;
    var db;
    var objectStore;
    var request = window.indexedDB.open("office", 1);
    
    request.onerror = function (event) {
      console.log('onerror', event);
    }
    
    request.onsuccess = function (event) {
      console.log('onsuccess', event);
      // @ts-ignore
      me.db = request.result//可以拿到数据库对象
    }
    
    //如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
    request.onupgradeneeded = function (event) {
      // @ts-ignore
      me.db = ((event||{}).target||{}).result;
        if (!db.objectStoreNames.contains('person')) {//判断是否存在
          objectStore = db.createObjectStore('person', { keyPath: 'id' });
          //自动生成主键db.createObjectStore(
          //  'person',
          //  { autoIncrement: true }
          //);
        }
        //新建索引，参数索引名称、索引所在的属性、配置对象
        objectStore.createIndex('email', 'email', { unique: true });
    }
  }

  // add, get, put
  dbAction = (action, data) => {
    var req = this.db.transaction(
      ['person'], 
      action === "get" ? 'readonly' : 'readwrite'
    ).objectStore('person')[action](
      ['get', 'delete'].includes(action) ? 1 :
      { id: 1, name: '张三', age: 24, email: 'zhangsan@example.com', ...(data ||{})}
    );

    req.onsuccess = function (event) {
      console.log('数据写入成功', event);
      console.log('dbAction result', req.result);
    };

    req.onerror = function (event) {
      console.log('数据写入失败',event);
    }
  }


  readAll = () => {
    // @ts-ignore
    var objectStore = this.db.transaction('person').objectStore('person');

    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        console.log('readAll');
        console.log('Id: ' + cursor.key);
        console.log('Name: ' + cursor.value.name);
        console.log('Age: ' + cursor.value.age);
        console.log('Email: ' + cursor.value.email);
        cursor.continue();
      } else {
        console.log('没有更多数据了！');
      }
    };
  }

  index = () => {
    var transaction = this.db.transaction(['person'], 'readonly');
    var store = transaction.objectStore('person');
    var index = store.index('email');
    var request = index.get('zhangsan@example.com');
    
    request.onsuccess = function (e) {
      var result = e.target.result;
      console.log(e.target);
      if (result) {
        console.log('index result', result)
        // ...
      } else {
        // ...
      }
    }
  }


  render(){
    return <div style={{padding: '5px', border: '1px'}}>
    <Button onClick={()=>{
      this.dbAction('add');
    }}>
      添加数据
    </Button>
    <Button onClick={()=>{
      this.dbAction('put', {age: 25});
    }}>
      更新数据
    </Button>
    <Button type="primary" onClick={()=>{
      this.dbAction('get')
    }}>
      获取数据
    </Button>
    <Button type="primary" onClick={()=>{
      this.dbAction('delete');
    }}>
      删除数据
    </Button>
    <Button type="primary" onClick={()=>{
      this.readAll()
    }}>
      遍历数据
    </Button>
    <Button type="primary" onClick={()=>{
      this.index();
    }}>
      index 
    </Button>
  </div>
  }
}