import React, { PureComponent } from 'react';
import { Input, Button, Cascader } from 'antd';
//import request from '@/utils/request';
import columns from '../../../testdata/tableColumns';

export default class ReqFields extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      options: [],
    };
  }

  componentDidMount() {
    const { currenttable, tables, value } = this.props;
    let dataSource = [];
    try {
      dataSource = JSON.parse(value) || [''];
      dataSource = (dataSource || []).map(it => {
        const names = (it || '').split('.');
        return [names[1] ? names[0] : currenttable, names[1] || names[0]];
      });
    } catch (e) {
      dataSource = [[]];
    }
    const options = (tables || []).map(it => {
      const option = {
        value: it.tableName,
        label: currenttable === it.tableName ? 'this' : it.tableComment || it.tableName,
        isLeaf: false,
      };
      return option;
    });
    const newDataSource = new Set(
      (dataSource || []).map(ds => {
        return ds[0];
      })
    );
    newDataSource.add(currenttable);
    const maxLength = [...newDataSource].length;
    let count = 0;
    [...newDataSource].forEach(table => {
      count += 1;
      const children = ((columns[table]||{}).data || []).map(it => {
        return {
          label: it.columnComment || it.columnName,
          value: it.columnName,
        };
      });
      options.forEach(op => {
        if (op.value === table) {
          // eslint-disable-next-line no-param-reassign
          op.children = children;
        }
      });
      if (count === maxLength) {
        this.setState({
          options,
          dataSource,
        });
      }
      /*
      request(`/otm/table/listTableColumn?tableName=${table}`, {
        method: 'GET',
      }).then(response => {
        count += 1;
        if (response.code === 0) {
          const children = (response.data || []).map(it => {
            return {
              label: it.columnComment || it.columnName,
              value: it.columnName,
            };
          });
          options.forEach(op => {
            if (op.value === table) {
              // eslint-disable-next-line no-param-reassign
              op.children = children;
            }
          });
        }
        if (count === maxLength) {
          this.setState({
            options,
            dataSource,
          });
        }
      });
*/
    });
  }

  setValue = (index, value) => {
    const { dataSource } = this.state;
    const { onChange, currenttable } = this.props;
    const dataSource1 = [...dataSource];
    dataSource1.splice(index, 1, value);
    this.setState({ dataSource: dataSource1 }, () => {
      const dataSource2 = (dataSource1 || []).map(it => {
        if (it[0] === currenttable) {
          return it[1];
        }
        return `${it[0]}.${it[1]}`;
      });

      onChange(JSON.stringify(dataSource2));
    });
  };

  loadData = selectedOptions => {
    const { options } = this.state;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    
    const children = ((columns[selectedOptions[0].value]||{}).data || []).map(it => {
      return {
        label: it.columnComment || it.columnName,
        value: it.columnName,
      };
    });
    targetOption.children = children;
    targetOption.loading = false;
    this.setState({
      options: [...options],
    });
    /*
    request(`/otm/table/listTableColumn?tableName=${selectedOptions[0].value}`, {
      method: 'GET',
    }).then(response => {
      if (response.code === 0) {
        targetOption.loading = false;
        const children = (response.data || []).map(it => {
          return {
            label: it.columnComment || it.columnName,
            value: it.columnName,
          };
        });
        targetOption.children = children;
      }
      this.setState({
        options: [...options],
      });
    });
    */
  };

  render() {
    const { dataSource, options } = this.state;
    const { currenttable } = this.props;
    return (
      <div>
        {(dataSource || []).map((it, index) => {
          return (
            <div>
              <Cascader
                style={{ width: '250px' }}
                options={options}
                defaultValue={it && it.length ? it : [currenttable]}
                loadData={this.loadData}
                key={JSON.stringify(it)}
                onChange={e => {
                  this.setValue(index, e);
                }}
              />
              <Button
                style={{ verticalAlign: 'middle', margin: '0 2px', color: '#d9d9d9' }}
                icon="plus-square"
                onClick={() => {
                  this.setState({ dataSource: dataSource.concat(['']) });
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
                    dataSource1 = [[]];
                  }
                  this.setState({ dataSource: dataSource1 }, () => {
                    const dataSource2 = (dataSource1 || []).map(it1 => {
                      if (it1[0] === currenttable) {
                        return it1[1];
                      }
                      return `${it1[0]}.${it1[1]}`;
                    });
                    onChange(JSON.stringify(dataSource2));
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
              style={{ width: '250px' }}
              onChange={e => {
                this.setValue(-1, e);
              }}
            />
            <Button
              style={{ verticalAlign: 'middle', margin: '0 2px', color: '#d9d9d9' }}
              icon="plus-square"
              onClick={() => {
                this.setState({ dataSource: dataSource.concat([[]]) });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
