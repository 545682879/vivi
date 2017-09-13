import { INCREASE, DECREASE, NEW, PLAINT } from '../constants'

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