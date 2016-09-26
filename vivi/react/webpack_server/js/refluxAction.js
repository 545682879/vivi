import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import $ from 'jquery';
import '../css/react.css';

var Actions = Reflux.createActions(['addItem', 'removeItem', 'editItem', 'getAll']);

// Stroe
var OperationStore = Reflux.createStore({
	items: ['item1', 'item2', 'item3'],
	listenables: [Actions],


	onAddItem: function(val){
		
		var me = this;
		me.items.push(val);
		me.trigger(me.items);
	},

	onRemoveItem: function(index){
		var me = this;
		if(index < me.items.length){
			me.items.splice(index,1);
		}
		me.trigger(me.items);
	},

	onEditItem: function(val, index){
		var me = this;
		if(index < me.items.length){
			me.items.splice(index, 1, val);
		}
		me.trigger(me.items);
	},

	onGetAll:function(){
		var me = this;
		me.trigger(me.items);
	}

});

// 业务主类
var OperationStoreForm = React.createClass({
	//mixins: [Reflux.listenTo(OperationStore, 'onStatusChange')],
	//mixins: [Reflux.connect(OperationStore, 'list')],
	//添加一个过滤
    mixins: [Reflux.connectFilter(OperationStore, 'list', function (list) {
        return list.filter(function (item) {
            return item.length > 1;
        });
    })],

	getInitialState: function () {
    	return {list: [], currentEditRow: -1, editValue:''};
	},

/*	onStatusChange: function (list) {
    	this.setState({list: list});
	},*/

	editRow: function(e){
		var rowNum = $(e.target).data('row');
		this.setState({currentEditRow:rowNum, editValue:this.state.list[rowNum]});
	},

	deleteRow: function(e){
		var rowNum = $(e.target).data('row');
		Actions.removeItem(rowNum);
	},

	handleRow: function(e){
		var value = this.refs.itemValue.value;
		if(value){
			this.state.currentEditRow >= 0 ? Actions.editItem(value, this.state.currentEditRow) : Actions.addItem(value);
			this.setState({currentEditRow: -1, editValue:""});
		}else{
			alert('值不能为空');
		}
	},

	changeValue:function(e){
		this.setState({editValue : this.refs.itemValue.value});
	},

	render: function(){
		var me = this;
		var buttonText = this.state.currentEditRow >= 0 ? "修改" : "添加";

		// 格式化数据
		return (
			<div className="main">
				<div className="title">React增删改查</div>
				<table className="table">
					<tbody>
	            	{ 
	            		this.state.list.map(function(val, index){
			        		return <tr className="row" key={index}>
			        			<td width='30'>{index+1}</td>
			        			<td>{val}</td>
			        			<td width='60'><a href="javascript:void(0);" onClick={me.editRow} data-row={index}>编辑</a><a href="javascript:void(0);" onClick={me.deleteRow} data-row={index}>删除</a></td>
			        			</tr>
			        	})
		        	}
		        	</tbody>
		        </table>
		        <div className="edit">
		        	<input type="text" value={this.state.editValue} name="item-value" ref="itemValue" onChange={me.changeValue}/><input type="button" value={buttonText} onClick={me.handleRow} />
		        </div>
	        </div>
	    );
	},
	
	componentDidMount: function(){
		Actions.getAll();
	}

});

export default OperationStoreForm;
