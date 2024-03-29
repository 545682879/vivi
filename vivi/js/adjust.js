/*
* Sortable component for jQuery ( AMD Module )
*
* Copyright (c) 2017 Zhiwen Chen
* Released under the MIT Licenses
*
* Docs : https://github.com/chenmnkken/ecope/wiki/Sortable-%E6%8B%96%E5%8A%A8%E6%8E%92%E5%BA%8F
* Mail : chenmnkken@gmail.com
* Date : 2017-07-13
*/
(function(){

'use strict';
var mousedown = false;
var resizeable = false;
var targetTd;
var screenXStart =0;
var tdWidth = 0;
var headerWidth = 0;
var currentTable = null;
function getTarget(evt){
    return evt.target || evt.srcElement;
}

function addListener(element,type,listener,useCapture){
    element.addEventListener?element.addEventListener(type,listener,useCapture):element.attachEvent("on" + type,listener);
}

function onmousedown(event){
    if (resizeable == true){
        var evt =event||window.event;
        mousedown = true;
        screenXStart = evt.screenX;
        tdWidth = targetTd.offsetWidth;
        headerWidth = currentTable.offsetWidth;
    }
}

function onmousemove(event){
    var evt =event||window.event;
    var srcObj = getTarget(evt);
    var offsetX = evt.offsetX || (evt.clientX - srcObj.getBoundingClientRect().left);//这个比较关键，解决了Firefox无offsetX属性的问题
    if (mousedown == true){
        var nextSibling = targetTd.nextSibling;
        var adjustWidth = (evt.screenX - screenXStart);
        var width = (tdWidth + adjustWidth) + "px";//计算后的新的宽度
        targetTd.style.width = width;
        
/*        if(nextSibling)
        nextSibling.style.width = (nextSibling.offsetWidth - adjustWidth) +"px" ;*/
        currentTable.style.width = (headerWidth + (evt.screenX - screenXStart)) + "px";
    }else{
        var trObj = table.rows[0];
        if(srcObj.offsetWidth - offsetX <=4){//实际改变本单元格列宽
            targetTd=srcObj;
            resizeable = true;
            srcObj.style.cursor='col-resize';//修改光标样式
        }else if(offsetX <=4 && srcObj.cellIndex > 0){//实际改变前一单元格列宽，但是表格左边框线不可拖动
            targetTd=trObj.cells[srcObj.cellIndex - 1];
            resizeable = true;
            srcObj.style.cursor='col-resize';
        }else{
            resizeable = false;
            srcObj.style.cursor='default';
        }
    }
}



var Adjust = function( table, options ){
    document.onmouseup = function(event){
        //tartgetTd = null;
        resizeable = false;
        mousedown = false;
        document.body.style.cursor='default';
    }
    currentTable = table;
    var headerTds = table.rows[0].cells;
    for(var i = 0;i<headerTds.length;i++){
        addListener(headerTds[i],"mousedown",onmousedown);
        addListener(headerTds[i],"mousemove",onmousemove);
    }
};

Adjust.prototype = {
    
};

if( !$.ui ){
    $.ui = {};
}

$.ui.Adjust = Adjust;

})();