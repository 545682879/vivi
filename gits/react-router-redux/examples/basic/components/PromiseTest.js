import React from 'react'
import { connect } from 'react-redux'
import { addTodoWithPromise } from '../actions/count'

function Home({ promiseTest, dispatch}) {
  function doClick(){
    dispatch(addTodoWithPromise("Promise Test."))
  };

  return (
    <div>
      PromiseTest content:
      {promiseTest}
      <button onClick={doClick}>Click</button>
    </div>
  )
}

export default connect(
  state => ({ promiseTest: state.promiseTest.promiseTest}),
)(Home)
