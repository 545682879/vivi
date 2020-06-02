// @ts-nocheck
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import Sortable from 'react-sortablejs';
import { Input, Button, Modal, Radio, Row, Col, Checkbox } from 'antd';
import { Icon, Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { cloneDeep } from 'lodash';
import AddField from './addField';
import FormFields from './components';
import './create.scss';
import responsive from './utils/responsive';
import localconstant from './utils/constant';
import tables from '../testdata/tables';
import columns from '../testdata/tableColumns';
import data2 from '../testdata/data1';
import qs from 'querystring'
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};


class ConfigIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableName: '',
      drawerVisible: true,
      topDrawerVisible: true,
      pageTemplateInputUiList: [],
      type: 'F',
      currenttable: [],
      isModelShow: false,
      templates: [],
      currentTemplate: {},
      modalType: '',
      tables: tables.data,
      tablecolumns: [
        /*
        {
          columnName: 'columnName',
          columnComment: 'columnName',
          isNullable: 'NO',
          characterMaximumLength:'6',
          numericPrecision:'6',
          numericScale:'6'
        }
        */
      ],
      moduleTemplate: {},
      deleteItems: [],
      store: {},
      columnsKey: null,
      currentField: null,
      fieldName: null,
    };
    this.onChangeFieldWidth = this.onChangeFieldWidth.bind(this);
  }

  componentDidMount() {
   // const { location } = this.props;
  //  const me = this;
    //if (windiow.location.query.templateName) {
      // dispatch({
      //   type: 'configIndex/getTemplates',
      //   payload: {
      //     templateName: windiow.location.query.templateName,
      //   },
      //   doSuccess: data => {
      //     const inputList = data.pageTemplateInputUiList || [];
      //     const tbName = inputList[0] ? inputList[0].tableName : [];
      //     this.setState({
      //       moduleTemplate: data,
      //       pageTemplateInputUiList: inputList,
      //       currenttable: tbName,
      //     });
      //     dispatch({
      //       type: 'configIndex/getTableColumns',
      //       payload: {
      //         tableName: tbName,
      //       },
      //       doSuccess: result => {
      //         me.setState({
      //           tablecolumns: result,
      //           columnsKey: Date.now(),
      //         });
      //       },
      //     });
      //   },
      // });
    // }
     // eslint-disable-next-line no-undef
     const tn = qs.parse((window.location.search||'').replace("?", '')).templateName ;
     if (tn) {
      const template = JSON.parse(localStorage.getItem(tn));
      const inputList = template.pageTemplateInputUiDTOList || [];
      const tbName = inputList[0] ? inputList[0].tableName : '';
      console.log('tbName', tbName);
      this.setState({
        moduleTemplate: template,
        pageTemplateInputUiList: inputList,
        currenttable: tbName,
        tablecolumns: columns[tbName].data,
        columnsKey: Date.now(),
      });
    }
    // }
  }

  ondblclick = () => {
    // console.log('ondblclick');
  };

  onDelete = posIndex => {
    let index;
    const { pageTemplateInputUiList, deleteItems } = this.state;
    const newDeleteItems = cloneDeep(deleteItems);
    // @ts-ignore
    for (const [i, k] of pageTemplateInputUiList.entries()) {
      if (k.posIndex === posIndex) {
        index = i;
        if (k.pageTemplateInputUiId) {
          newDeleteItems.push({ ...k, isDeleted: true });
        }
        break;
      }
    }

    const newPageTemplateInputUiList = [
      ...pageTemplateInputUiList.slice(0, index),
      ...pageTemplateInputUiList.slice(index + 1),
    ];
    (newPageTemplateInputUiList || []).forEach((it, idx) => {
      Object.assign(it, { posIndex: idx });
    });

    this.setState({
      pageTemplateInputUiList: newPageTemplateInputUiList,
      deleteItems: newDeleteItems,
      columnsKey: Date.now(),
    });
  };

  /**
   * @param {any} field
   * @param {any} colSpan
   */
  onChangeFieldWidth(field, colSpan) {
    const { pageTemplateInputUiList } = this.state;
    const idx = pageTemplateInputUiList.findIndex(it => {
      // @ts-ignore
      return it.pageTemplateInputUiId === field;
    });

    this.setState({
      pageTemplateInputUiList: [
        ...pageTemplateInputUiList.slice(0, idx),
        // @ts-ignore
        { ...pageTemplateInputUiList[idx], posWidth: colSpan },
        ...pageTemplateInputUiList.slice(idx + 1),
      ],
    });
  }

  handleSave = () => {
    const { form } = this.props;
    const { pageTemplateInputUiList, currenttable, moduleTemplate, deleteItems } = this.state;
    form.validateFields(['templateName'], (errors, values) => {
      // console.log('values', errors, values);
      // eslint-disable-next-line array-callback-return
      pageTemplateInputUiList.map(it => {
        Object.assign(it, {
          tableName: Array.isArray(currenttable) ? currenttable[0] : currenttable,
        });
      });

      const param = {
        templateName: (values || {}).templateName,
        pageTemplateInputUiDTOList: (deleteItems || []).concat(
          // @ts-ignore
          (pageTemplateInputUiList || []).map(it => {
            // @ts-ignore
            return { ...it, isDeleted: it.isDeleted || false};
          })
        ),
      };

      if (moduleTemplate.pageTemplateId) {
        param.pageTemplateId = moduleTemplate.pageTemplateId;
        param.companyId = moduleTemplate.companyId;
        param.parentTemplateId = moduleTemplate.parentTemplateId;
        param.posIndex = moduleTemplate.posIndex;
        param.isDeleted = moduleTemplate.isDeleted;
        param.posRows = moduleTemplate.posRows;
        param.templateName = moduleTemplate.templateName;
      }

      console.log('模版参数', JSON.stringify(param));
      localStorage.setItem((values || {}).templateName, JSON.stringify(param));
      // dispatch({
      //   type: `configIndex/${moduleTemplate.pageTemplateId ? 'modify' : 'create'}`,
      //   payload: param,
      //   doSuccess: () => {
      //     sendAction({
      //       type: 'tabPages/update',
      //       payload: {
      //         url: window.location.pathname + window.location.search,
      //       },
      //     });
      //   },
      // });
    });
  };

  openDrawer = () => {
    const { drawerVisible } = this.state;
    this.setState({ drawerVisible: !drawerVisible });
  };

  openTopDrawer = () => {
    const { topDrawerVisible } = this.state;
    this.setState({ topDrawerVisible: !topDrawerVisible });
  };

  onEdit = id => {
    const { pageTemplateInputUiList } = this.state;
    let a = {};
    (pageTemplateInputUiList || []).forEach(it => {
      // @ts-ignore
      if (it.posIndex === id) {
        a = it;
      }
    });
    this.setState({
      isModelShow: true,
      templates: localconstant.getAttributes(a.inputType),
      currentTemplate: a,
      modalType: 'update',
    });
  };

  addWidth = id => {
    const { pageTemplateInputUiList } = this.state;
    const newpageTemplateInputUiList = cloneDeep(pageTemplateInputUiList);
    (newpageTemplateInputUiList || []).forEach(it => {
      if (it.posIndex === id) {
        Object.assign(it, { posWidth: Math.min(Number(it.posWidth || 1) + 1, 4) });
      }
    });
    this.setState({ pageTemplateInputUiList: newpageTemplateInputUiList });
  };

  minusWidth = id => {
    const { pageTemplateInputUiList } = this.state;
    const newpageTemplateInputUiList = cloneDeep(pageTemplateInputUiList);
    (newpageTemplateInputUiList || []).forEach(it => {
      if (it.posIndex === id) {
        Object.assign(it, { posWidth: Math.max(Number(it.posWidth || 1) - 1, 1) });
      }
    });
    this.setState({ pageTemplateInputUiList: newpageTemplateInputUiList });
  };

  doMouseEnter = e => {
    if (e.target && e.target.querySelector('[name="deleteIcon"]')) {
      e.target.querySelector('[name="deleteIcon"]').style.display = 'inline-block';
    }
  };

  doMouseLeave = e => {
    if (e.currentTarget && e.currentTarget.querySelector('[name="deleteIcon"]')) {
      e.currentTarget.querySelector('[name="deleteIcon"]').style.display = 'none';
    }
  };

  getMenu = item => {
    const { type } = this.state;
    return (
      <span
        name="deleteIcon"
        className="delete"
        style={{ display: 'none', width: type !== 'F' ? '45px' : '80px' }}
      >
        <Icon type="edit" style={{marginRight:'5px'}} onClick={this.onEdit.bind(this, item.posIndex)} />
        {type === 'F' ? (
          <Icon type="plus-circle" style={{marginRight:'5px'}} onClick={this.addWidth.bind(this, item.posIndex)} />
        ) : (
          ''
        )}
        {type === 'F' ? (
          <Icon type="minus-circle" style={{marginRight:'5px'}} onClick={this.minusWidth.bind(this, item.posIndex)} />
        ) : (
          ''
        )}
        <Icon type="close-circle" style={{marginRight:'5px'}} onClick={this.onDelete.bind(this, item.posIndex)} />
      </span>
    );
  };

  getFields = (tablecolumns, pageTemplateInputUiList) => {
    const fields = (tablecolumns || [])
      .filter(it => {
        const flag = !pageTemplateInputUiList.find(item => {
          return item.fieldName === it.columnName;
        });
        return flag;
      })
      .concat(tablecolumns.length ? [{ columnName: '扩展字段', columnComment: '扩展字段' }] : [])
      .map(it => {
        return (
          <div
            title={it.columnName}
            className="field"
            data-id={`field-${it.columnName}`}
            key={`field-${it.columnName}`}
          >
            {it.columnComment || it.columnName}
          </div>
        );
      });
    return fields;
  };

  render() {
    const {
      pageTemplateInputUiList,
      topDrawerVisible,
      drawerVisible,
      type,
      tableName,
      currenttable,
      isModelShow,
      templates,
      columnsKey,
      currentField,
      fieldName,
      currentTemplate,
      modalType,
      tables,
      tablecolumns,
      moduleTemplate,
    } = this.state;

    const {
      form: { getFieldDecorator },
      form,
      history,
      saveLoading,
      dicData,
    } = this.props;

    const me = this;

    const addFileldProps = {
      modalType,
      isModelShow,
      templates,
      currentTemplate,
      dicData,
      tableName,
      fieldName,
      currentField,
      tables,
      currenttable,
      type,
      onCancel() {
        me.setState({
          isModelShow: false,
        });
      },
      /**
       * @param {any} values
       * @param {() => void} callback
       */
      onSave(values, callback) {
        const newpageTemplateInputUiList = cloneDeep(pageTemplateInputUiList);
        if (currentTemplate.fieldName) {
          (newpageTemplateInputUiList || []).forEach(it => {
            if (it.posIndex === currentTemplate.posIndex) {
              Object.assign(it, values);
            }
          });
        } else {
          newpageTemplateInputUiList.push({
            ...values,
            posIndex: newpageTemplateInputUiList.length + 1,
          });
        }

        me.setState(
          {
            pageTemplateInputUiList: newpageTemplateInputUiList,
            columnsKey: modalType === 'create' ? Date.now() : columnsKey,
            modalType: '',
          },
          () => {
            if (['T', 'G'].includes(type)) {
              // @ts-ignore
              document.querySelector('#fieldsBox > div').style.width =
                newpageTemplateInputUiList.length > 3
                  ? `${newpageTemplateInputUiList.length * 210 + 50}px`
                  : '100%';
            }
            callback();
          }
        );
      },
    };

    const width = drawerVisible ? '75%' : 'calc(100% - 15px)';
    return (
      <div className="container">
        <div
          id="fields"
          className="fields"
          style={{ display: topDrawerVisible ? 'block' : 'none' }}
        >
          <div className="label">字段名称：</div>
          <div className="fieldContainer">
            <Sortable
              key={columnsKey}
              options={{
                group: { name: 'right', pull: 'clone' },
                ghostClass: "blueBg",
              }}
              tag="div"
            >
              {this.getFields(tablecolumns, pageTemplateInputUiList)}
            </Sortable>
          </div>
        </div>

        <div className="scalingVartival" onClick={this.openTopDrawer}>
          {topDrawerVisible ? (
            <Icon type="caret-up" style={{ verticalAlign: 'top' }} />
          ) : (
            <Icon type="caret-down" style={{ verticalAlign: 'top' }} />
          )}
        </div>

        <div
          className="clearfix"
          style={{ height: topDrawerVisible ? 'calc(100vh - 330px)' : 'calc(100vh - 200px)' }}
        >
          <div
            className={`square right`}
            style={{ display: drawerVisible ? 'block' : 'none' }}
          >
            <div className="title">所有字段</div>
            <div className="fieldsBox">
              {
                <Checkbox.Group
                  disabled={moduleTemplate.pageTemplateId}
                  options={(tables || []).map(it => {
                    return { value: it.tableName, label: `${it.tableComment}(${it.tableName})` };
                  })}
                  value={currenttable}
                  onChange={e => {
                    const changeTable = () => {
                      const aa = e.find(item => {
                        // @ts-ignore
                        return !currenttable.includes(item);
                      });
                     // console.log('changeTable', columns, aa);
                      me.setState({ currenttable: [aa], tablecolumns: (columns[aa] || {}).data || [], columnsKey: Date.now(), pageTemplateInputUiList: [] });
                    };
                    if (pageTemplateInputUiList.length) {
                      Modal.confirm({
                        title: '修改之前请先确认保存页面修改，否在将被清空，是否继续？',
                        onOk() {
                          changeTable();
                        },
                        onCancel() {},
                      });
                    } else {
                      changeTable();
                    }
                  }}
                />
              }
            </div>
          </div>
          <div
            className="scaling"
            onClick={this.openDrawer}
            style={{ borderLeft: drawerVisible ? 'none' : '1px solid #e9e9e9' }}
          >
            {drawerVisible ? <Icon type="step-backward" /> : <Icon type="step-forward" />}
          </div>
          <Form
            className={`${"square"} ${
              ['T', 'G'].includes(type) ? "lefttable" : "left"
            }`}
            style={{ width }}
            {...formItemLayout}
            layout="horizontal"
          >
            <div className="extraBox">
              <Row>
                <Col span={12}>
                  <Form.Item label="模板名称">
                    {getFieldDecorator('templateName', {
                      initialValue: moduleTemplate.templateName,
                      rules: [{ required: true, message: '不能为空' }],
                    })(
                      moduleTemplate.pageTemplateId ? (
                        <span>{moduleTemplate.templateName}</span>
                      ) : (
                        <Input disabled={moduleTemplate.pageTemplateId} />
                      )
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator('type', {
                      initialValue: type,
                      onChange: e => {
                        Modal.confirm({
                          title: '修改之前请先确认保存页面修改，否在将被清空，是否继续？',
                          onOk() {
                            const newType = e.target.value;
                            me.setState(
                              {
                                type: e.target.value,
                                pageTemplateInputUiList: pageTemplateInputUiList.map(tt => {
                                  const attrs = {};
                                  const att =
                                    newType === 'G'
                                      ? localconstant.GRID_ATTRIBUTES
                                      : localconstant.COMMON_ATTRIBUTES;
                                  att.forEach(it1 => {
                                    attrs[it1] = tt[it1];
                                  });
                                  if (newType === 'G') {
                                    attrs.posWidth = 120;
                                  } else {
                                    attrs.posWidth = 1;
                                    attrs.inputType = 'text';
                                  }
                                  return attrs;
                                }),
                              },
                              () => {
                                const {
                                  pageTemplateInputUiList: pageTemplateInputUiList1,
                                  type: type1,
                                } = me.state;
                                if (type1 === 'F') {
                                  // @ts-ignore
                                  document.querySelector('#fieldsBox > div').style.width = '100%';
                                } else {
                                  // @ts-ignore
                                  document.querySelector('#fieldsBox > div').style.width =
                                    pageTemplateInputUiList1.length > 3
                                      ? `${pageTemplateInputUiList1.length * 210 + 50}px`
                                      : '100%';
                                }
                              }
                            );
                          },
                          onCancel() {},
                        });
                      },
                    })(
                      <Radio.Group value={type}>
                        <Radio value="F">Form</Radio>
                        <Radio value="T">Table</Radio>
                        {/* <Radio value="G">Grid</Radio> */}
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="fieldsBox" id="fieldsBox">
              <Sortable
                // See all Sortable options at https://github.com/RubaXa/Sortable#options
                options={{
                  group: { name: 'left', put: 'right' },
                  ghostClass: "blueBg",
                }}
                tag="div"
                onChange={items => {
                  const idx = items.findIndex(it => {
                    return it.indexOf('-') > 0;
                  });
                  if (idx >= 0) {
                    const tableName1 = currenttable[0];
                    const fieldName1 = items[idx].split('-')[1];
                    const currentField1 = (tablecolumns || []).find(it => {
                      // @ts-ignore
                      if (fieldName1 === it.columnName) {
                        return true;
                      }
                      return false;
                    });
                    this.setState({
                      tableName: tableName1,
                      isModelShow: true,
                      fieldName: fieldName1,
                      currentTemplate: {},
                      currentField: {
                        fieldName: currentField1 ? currentField1.columnName : '',
                        fieldHeader: currentField1 ? currentField1.columnComment : '',
                        isOptional: currentField1 ? currentField1.isNullable !== 'YES' : false,
                        maxLength: currentField1
                          ? currentField1.characterMaximumLength ||
                            currentField1.numericPrecision ||
                            null
                          : null,
                        toFix: currentField1 ? currentField1.numericScale || null : null,
                        inputType: currentField1
                          ? localconstant.DATABASE_COLUMNS_TYPE_MAP[
                              currentField1.dataType || 'null'
                            ]
                          : null,
                      },
                      modalType: 'create',
                    });
                  } else {
                    const newpageTemplateInputUiList = pageTemplateInputUiList.sort((a, b) => {
                      // @ts-ignore
                      const aIdx = items.findIndex(it => Number(it) === Number(a.posIndex));
                      // @ts-ignore
                      const bIdx = items.findIndex(it => Number(it) === Number(b.posIndex));
                      return aIdx - bIdx;
                    });

                    newpageTemplateInputUiList.forEach((it, index) => {
                      Object.assign(it, { posIndex: index + 1 });
                    });

                    this.setState({ pageTemplateInputUiList: newpageTemplateInputUiList });
                  }
                }}
              >
                {
                  <FormFields
                    fields={pageTemplateInputUiList}
                    form={form}
                    type={type}
                    onChangeFieldWidth={this.onChangeFieldWidth}
                    render={({ children, index }) => {
                      const item = pageTemplateInputUiList[index];
                      return (
                        <div
                          className="tag"
                          style={{
                            width:
                              type === 'F'
                                // @ts-ignore
                                ? responsive[item.posWidth ? item.posWidth || 1 : 1]
                                : '120px',
                          }}
                          // @ts-ignore
                          data-id={`${item.posIndex}`}
                          // @ts-ignore
                          key={`${item.posIndex}`}
                          onMouseEnter={this.doMouseEnter}
                          onMouseLeave={this.doMouseLeave}
                        >
                          <div className="mask" />
                          {this.getMenu(item)}
                          {children}
                        </div>
                      );
                    }}
                  />
                }
              </Sortable>
            </div>
          </Form>
        </div>
        <AddField {...addFileldProps} />
        <div className="footer">
          <Button onClick={this.handleSave} type="primary" disabled={saveLoading}>
            保存
          </Button>
          <Button style={{ marginLeft: '20px' }} onClick={() => history.goBack()}>
            返回
          </Button>
        </div>
      </div>
    );
  }
}


export default Form.create()(ConfigIndex)