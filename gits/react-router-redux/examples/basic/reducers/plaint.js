import { PLAINT } from '../constants'

export default function plaint(state = "PLAINT", action) {
  if(action.type === PLAINT) {
    return state + action.payload;
  }
  return state
}