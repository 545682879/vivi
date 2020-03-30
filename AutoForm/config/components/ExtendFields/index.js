/* eslint-disable prefer-destructuring */
/* eslint-disable compat/compat */
import React, { PureComponent } from 'react';
import { Input, Button, Checkbox, message, Select } from 'antd';
import TableForm from '../../../iloop-form/TableForm';

export default class ReqFields extends PureComponent {
  constructor(props) {
    super(props);
    const { value } = props;
    let dataSource = [];

    try {
      dataSource = JSON.parse(value) || [{}];
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
    const target = dataSource1[index] || {};
    if (key !== 'name' && !target.name) {
      message.error('请指定名称');
      return;
    }
    target[key] = value;
    if (key === 'type') {
      target.value = '';
    }
    dataSource1.splice(index, 1, target);
    this.setState({ dataSource: dataSource1 }, () => {
      onChange(JSON.stringify(dataSource1));
    });
  };

  getValueFields(it, index) {
    const props = {
      style: { width: '100px' },
      placeholder: '值',
      value: it.value || '',
      onChange: e => {
        if (it.type === 'boolean') {
          this.setValue(index, 'value', e.target.checked);
        } else {
          this.setValue(index, 'value', e.target.value);
        }
      },
    };
    if (it.type === 'number') {
      return <IloopNumber {...props} />;
    }
    if (it.type === 'boolean') {
      return <Checkbox {...props} checked={it.value || false} />;
    }
    return <Input {...props} />;
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        {(dataSource || []).map((it, index) => {
          return (
            <div>
              <Input
                style={{ width: '100px' }}
                placeholder="名称"
                value={it.name || ''}
                onChange={e => {
                  this.setValue(index, 'name', e.target.value);
                }}
              />
              <Select
                placeholder="类型"
                style={{ margin: '2px', width: '100px' }}
                value={it.type || ''}
                onChange={e => {
                  this.setValue(index, 'type', e);
                }}
              >
                <Select.Option value="boolean">boolean</Select.Option>
                <Select.Option value="number">number</Select.Option>
                <Select.Option value="string">string</Select.Option>
                <Select.Option value="object">object</Select.Option>
              </Select>
              {this.getValueFields(it, index)}
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
              placeholder="名称"
              onChange={e => {
                this.setValue(-1, 'key', e.target.value);
              }}
            />
            <Select
              placeholder="类型"
              style={{ margin: '5px', width: '100px' }}
              onChange={e => {
                this.setValue(-1, 'type', e);
              }}
            >
              <Select.Option value="boolean">boolean</Select.Option>
              <Select.Option value="number">number</Select.Option>
              <Select.Option value="string">string</Select.Option>
              <Select.Option value="object">object</Select.Option>
            </Select>
            <Input
              style={{ width: '100px' }}
              placeholder="值"
              value={Object.values(it).length > 0 ? Object.values(it)[0] : ''}
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
