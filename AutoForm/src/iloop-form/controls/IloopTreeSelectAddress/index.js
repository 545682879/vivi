/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* 基于TreeSelect控件实现的地址多选控件
 * @Author: yuge
 * @Date: 2019-04-03 09:55:12
 */

import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import districtData from '../../utils/districtData';

const { SHOW_PARENT } = TreeSelect;
export default class MultiAreaTreeSelect extends Component {
  /**
   * returned value ['浙江省‘,'杭州市','萧山区']、['浙江省’]、['浙江省‘,'杭州市']
   * 根据传入的地址Value（即地址code）查询其对应的完成地址
   * @param {String} selectedValue 传入的Value '100982'
   * @return {Array}
   */
  getCompleteAreaByCode = selectedValue => {
    const selectedAddressLabels = [];
    outermostLabel: for (let i = 0; i < districtData.length; i++) {
      // 获取省份的Item
      const provinceItem = districtData[i];
      const provinceValue = provinceItem && provinceItem.value;
      const provinceLabel = provinceItem && provinceItem.label;
      // 当前选中的Code===省份的Code时
      if (selectedValue === provinceValue) {
        selectedAddressLabels.push(provinceLabel);
        break;
      } else {
        // 获取省份对应的城市列表
        const cityChildren = (provinceItem && provinceItem.children) || [];
        for (let j = 0; j < cityChildren.length; j++) {
          const cityItem = cityChildren[j];
          const cityValue = cityItem && cityItem.value;
          const cityLabel = cityItem && cityItem.label;
          if (selectedValue === cityValue) {
            selectedAddressLabels.push(provinceLabel);
            selectedAddressLabels.push(cityLabel);
            break outermostLabel;
          } else {
            // 获取城市对应的区列表
            const regionChildren = (cityItem && cityItem.children) || [];
            for (let k = 0; k < regionChildren.length; k++) {
              const regionItem = regionChildren[k];
              const regionValue = regionItem && regionItem.value;
              const regionLabel = regionItem && regionItem.label;
              if (selectedValue === regionValue) {
                selectedAddressLabels.push(provinceLabel);
                selectedAddressLabels.push(cityLabel);
                selectedAddressLabels.push(regionLabel);
                break outermostLabel;
              }
            }
          }
        }
      }
    }
    return selectedAddressLabels;
  };

  /**
     * 更新地址数据源（带有完整地址completeArea）
     * 变更后的数据字段如下：
     * {
        "value": "330109",
        "label": "萧山区",
        "completeArea": "浙江省-杭州市-萧山区" // add
        "children": null
      }
     */
  getCompleteAreaData = () => {
    const tempdistrictData = districtData;
    tempdistrictData.forEach(item => {
      const cityChildren = item.children || [];
      item.completeArea = item.label;
      cityChildren.forEach(cityItem => {
        const regionChildren = cityItem.children || [];
        if (regionChildren.length > 0) {
          cityItem.completeArea = this.getCompleteAreaByCode(cityItem.value).join('-');
          regionChildren.forEach(regionItem => {
            regionItem.completeArea = this.getCompleteAreaByCode(regionItem.value).join('-');
          });
        }
      });
    });
    return tempdistrictData;
  };

  triggerChange = values => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(values);
    }
  };

  render() {
    const {disabled} = this.props;
    return (
      <TreeSelect
        style={{ width: '100%' }}
        dropdownStyle={{
          maxHeight: 250,
          overflow: 'auto',
        }}
        disabled={disabled}
        treeData={this.getCompleteAreaData()}
        placeholder="请选择地址（可多选）"
        treeCheckable
        showCheckedStrategy={SHOW_PARENT}
        allowClear
        showSearch
        labelInValue
        treeNodeFilterProp="label" // 根据Label进行筛选
        treeNodeLabelProp="completeArea" // 选中后的Tag按照'completeArea'字段来展示
        {...this.props}
        onChange={this.triggerChange}
      />
    );
  }
}
