---
order: 4
title: IloopUpload
---

````jsx

import IloopUpload from '../controls/IloopUpload/index';
import data from '../data1';
import { Row, Col, Dropdown } from 'antd';

class IloopUploadExample extends React.Component {
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
            <IloopUpload
              type="file"
              ref={child => {
                this.uploadForm = child;
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(
  <IloopUploadExample />,
  mountNode);
````
