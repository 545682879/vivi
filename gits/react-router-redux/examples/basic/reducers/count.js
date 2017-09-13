import { INCREASE, DECREASE, NEW } from '../constants'

const initialState = {
  number: 1
}

export default function update(state = initialState, action) {
	console.log("update");
  if(action.type === INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === DECREASE) {
    return { number: state.number - action.amount }
  }  
  return state
}


