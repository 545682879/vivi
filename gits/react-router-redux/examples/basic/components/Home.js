import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease, newstate, plaint } from '../actions/count'

function Home({ number, increase, decrease, newstate, plaint }) {
  return (
    <div>
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
      <button onClick={() => newstate("1")}>New</button>
      <button onClick={() => plaint("abc")}>Plaint</button>
    </div>
  )
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {
    increase: (a) => dispatch(increase(a)),
    decrease: (a) => dispatch(decrease(a)),
    newstate: (a) => dispatch(newstate(a)),
    plaint: (a) => dispatch(plaint(a)),
  };
}

export default connect(
  state => ({ number: state.count.number, newState: state.handlenewstate.newState }),
  /*{ increase, decrease, newstate }*/
  mapDispatchToProps

)(Home)
