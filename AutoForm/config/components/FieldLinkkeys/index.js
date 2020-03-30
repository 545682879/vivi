/* eslint-disable prefer-destructuring */
import React, { PureComponent } from 'react';
import { Input, Button, message } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';

export default class FieldLinkKeys extends PureComponent {
  constructor(props) {
    super(props);
    const { value } = props;
    let dataSource = { url: '', params: [{}] };

    try {
      dataSource = JSON.parse(value);
    } catch (e) {
      dataSource = { url: '', params: [{}] };
    }

    if (isEmpty(dataSource)) {
      dataSource = { url: '', params: [{}] };
    }

    this.state = {
      dataSource,
    };
  }

  setValue = (index, key, value) => {
    const { dataSource } = this.state;
    const { onChange } = this.props;
    const dataSource1 = cloneDeep(dataSource);
    const target = {};
    if (key === 'key') {
      target[value] = Object.values(dataSource1.params[index])[0] || '';
    } else {
      if (Object.keys(dataSource1.params[index]).length === 0) {
        message.error('请指定label');
        return;
      }
      target[Object.keys(dataSource1.params[index])[0]] = value;
    }

    dataSource1.params.splice(index, 1, target);
    this.setState({ dataSource: dataSource1 }, () => {
      onChange(JSON.stringify(dataSource1));
    });
  };

  render() {
    const { dataSource } = this.state;
    const { onChange } = this.props;
    return (
      <div>
        <Input
          style={{ width: '285px' }}
          placeholder="Url"
          value={dataSource.url}
          onChange={e => {
            const dataSource1 = { ...dataSource, url: e.target.value };
            this.setState({ dataSource: { ...dataSource, url: e.target.value } }, () => {
              onChange(JSON.stringify(dataSource1));
            });
            // this.setValue(index, 'key', e.target.value);
          }}
        />
        {(dataSource.params || []).map((it, index) => {
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
                style={{ margin: '0 2px', color: '#d9d9d9' }}
                icon="plus-square"
                onClick={() => {
                  const dataSource1 = cloneDeep(dataSource);
                  if (!dataSource1.params) {
                    dataSource1.params = [];
                  }
                  dataSource1.params.push({});
                  this.setState({ dataSource: dataSource1 });
                }}
              />
              <Button
                style={{ color: '#d9d9d9' }}
                icon="minus-square"
                onClick={() => {
                  const dataSource1 = cloneDeep(dataSource);
                  dataSource1.params.splice(index, 1);
                  if (dataSource1.params.length === 0) {
                    dataSource1.params = [{}];
                  }
                  this.setState({ dataSource: dataSource1 }, () => {
                    onChange(JSON.stringify(dataSource1));
                  });
                }}
              />
            </div>
          );
        })}
        {dataSource.params && dataSource.params.length ? (
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
              style={{ margin: '0 2px', color: '#d9d9d9' }}
              icon="plus-square"
              onClick={() => {
                const dataSource1 = cloneDeep(dataSource);
                if (!dataSource1.params) {
                  dataSource1.params = [];
                }
                dataSource1.params.push({});
                this.setState({ dataSource: dataSource1 });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
