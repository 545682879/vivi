/* eslint-disable prefer-destructuring */
/* eslint-disable compat/compat */
import React, { PureComponent } from 'react';
import { Input, Button, message } from 'antd';

export default class ReqFields extends PureComponent {
  constructor(props) {
    super(props);
    const { value } = props;
    let dataSource = [];

    try {
      dataSource = JSON.parse(value);
    } catch (e) {
      dataSource = [{}];
    }

    this.state = {
      dataSource,
    };
  }

  setValue = (index, key, value) => {
    const { dataSource } = this.state;
    const { onChange } = this.props;
    const dataSource1 = [...dataSource];
    const target = {};

    if (key === 'key') {
      target[value] = Object.values(dataSource1[index])[0] || '';
    } else {
      if (Object.keys(dataSource1[index]).length === 0) {
        message.error('请指定label');
        return;
      }
      target[Object.keys(dataSource1[index])[0]] = value;
    }

    dataSource1.splice(index, 1, target);
    this.setState({ dataSource: dataSource1 }, () => {
      onChange(JSON.stringify(dataSource1));
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        {(dataSource || []).map((it, index) => {
          return (
            <div>
              <Input
                style={{ width: '100px' }}
                placeholder="Key"
                value={Object.keys(it).length > 0 ? Object.keys(it)[0] : ''}
                onChange={e => {
                  this.setValue(index, 'key', e.target.value);
                }}
              />{' '}
              ：
              <Input
                style={{ width: '100px' }}
                placeholder="Value"
                value={Object.values(it).length > 0 ? Object.values(it)[0] : ''}
                onChange={e => {
                  this.setValue(index, 'value', e.target.value);
                }}
              />
              <Button
                style={{ verticalAlign: 'middle', margin: '0 2px', color: '#d9d9d9' }}
                icon="plus-square"
                onClick={() => {
                  this.setState({ dataSource: dataSource.concat([{}]) });
                }}
              />
              <Button
                style={{ verticalAlign: 'middle', color: '#d9d9d9' }}
                icon="minus-square"
                onClick={() => {
                  const { onChange } = this.props;
                  let dataSource1 = [...dataSource];
                  dataSource1.splice(index, 1);
                  if (dataSource1.length === 0) {
                    dataSource1 = [''];
                  }
                  this.setState({ dataSource: dataSource1 }, () => {
                    onChange(JSON.stringify(dataSource1));
                  });
                }}
              />
            </div>
          );
        })}
        {dataSource && dataSource.length ? (
          ''
        ) : (
          <div>
            <Input
              style={{ width: '100px' }}
              placeholder="Key"
              onChange={e => {
                this.setValue(-1, 'key', e.target.value);
              }}
            />{' '}
            ：
            <Input
              style={{ width: '100px' }}
              placeholder="Value"
              onChange={e => {
                this.setValue(-1, 'value', e.target.value);
              }}
            />
            <Button
              style={{ verticalAlign: 'middle', margin: '0 2px', color: '#d9d9d9' }}
              icon="plus-square"
              onClick={() => {
                this.setState({ dataSource: dataSource.concat([{}]) });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
