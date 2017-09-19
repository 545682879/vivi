import { INCREASE, DECREASE, NEW, PLAINT, PROMISE } from '../constants'
import {createAction} from 'redux-actions';

export function increase(n) {
  return {
    type: INCREASE,
    amount: n
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}

export function newstate(n) {
	console.log("newstate action");
  return {
    type: NEW,
    payload: "I am a new state" + n
  }
}

export function plaint(payload){
  return {
    type: PLAINT,
    payload: payload
  }
}

//async with promise
export let addTodoWithPromise = createAction(PROMISE, (val) =>
    (
    async (dispatch, getState)=>{
        let value = await Promise.resolve(val + ' promise');
        return {
            value
        };
    }
    )()
);