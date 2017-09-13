import { NEW } from '../constants'

const initialState = {
  newState: "newState"
}

export default function handlenewstate(state = initialState, action) {
	console.log("newstate");
  if(action.type === NEW) {
    return { newState: action.payload }
  }
  return state
}