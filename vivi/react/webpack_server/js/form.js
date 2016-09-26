import React from 'react';
//import Input from 'react-bootstrap/lib/Input';
import Input from 'react-bootstrap/lib/InputGroup';
import Radio from 'react-bootstrap/lib/Radio';
import form from 'react-bootstrap/lib/FormGroup';
import ButtonInput from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import Label from 'react-bootstrap/lib/Label';
import DataJson from './data.json';

const Forms = React.createClass({
  getInitialState() {
    return{
      value:''
    };
  },
  handleChange() {
    console.log('1'+this.refs.input1.value, this.refs.Radio1.value, this.refs.Radio2.value, this.refs.FormControl.value, this.refs.input.value)
    this.setState({
      value:this.refs.input1.value
    })
  },
  handleClick() {
    console.log('click');
  },

  validationState() {
    let length = this.state.value.length;
    if(length > 10) return 'success';
    else if(length > 5) return 'warning';
    else if(length > 0) return 'error';
  },
  render() {
    console.log(DataJson)
    return(
      <form className="formwrapper">
         <FormControl
          type="text"
          className="formInput"
          value={this.state.value}
          label="输入模块名："
          placeholder="Enter Text..."
          ref="input1"
          bsStyle={this.validationState()}
          hasFeedback
          groupClassName = "group-class"
          labelClassName = "label-class"
          onChange={this.handleChange} />
          <Radio label="Kissy" ref="Radio1" name="tad">Kissy</Radio>
          <Radio label="kimi" ref="Radio2" name="tad">kimi</Radio>
          <FormControl ref="FormControl" componentClass="textarea" label="请输入模块描述:" placeholder="模块描述" />
          <input ref="input"  placeholder="input" className="input" value={DataJson.greetText}/>
          <ButtonInput type="reset" value="很好">很好</ButtonInput>
          <ButtonInput type="reset" value="重置">重置</ButtonInput>
          <ButtonInput type="submit" value="提交" bsStyle="primary" onClick={this.handleClick}>提交</ButtonInput>
          <a href="secondPage.html">second page</a><br/>
          <a href="thirdPage.html">third page</a>
          <div className="penguins">penguins</div>
      </form>
    );
  }
});

export default Forms;