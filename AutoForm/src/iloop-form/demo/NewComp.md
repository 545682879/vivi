---
order: 3
title: ContractPayCycle
---

````jsx

import ContractPayCycle from '../controls/ContractPayCycle/index';
import data from '../data1';
import { Row, Col } from 'antd';

class NewCompExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {formItems, tableValues} = this.state;
    return (
      <div >
        <Row>
          <Col span="12">
            <ContractPayCycle />
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(
  <NewCompExample />,
  mountNode);
````
