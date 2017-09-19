
'use strict';

import { handleActions } from 'redux-actions';

import { PROMISE } from '../constants'


export default handleActions({
    [PROMISE]:{
        next(state,action){
            return Object.assign({},state,{
                promiseTest:action.payload.value
            });
        },
        throw(state,action){
            return Object.assign({},state);
        }
    }
},{
    promiseTest:"promiseTest"
})