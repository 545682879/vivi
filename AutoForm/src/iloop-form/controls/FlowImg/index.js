/* eslint-disable no-param-reassign */
/**
 *
 * @author czw
 * @since 2019/8/15
 */
import React from 'react';
import img from './flow.png';

export default class FlowImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {    
    return (
      <div>
        <img src={img} width={500} height={500}/>
      </div>
    );
  }
}