/**
 *
 * @author czw
 * @since 2019/8/1
 */
import React from 'react';
import { Cascader } from 'antd';
import districts from '../../utils/districtData';

// 模版配置方式
/*
"rspFields":'{"provinceName":"unloadingProvince","provinceCode":"unloadingProvinceNo","cityName":"unloadingCity","cityCode":"unloadingCityNo","regionName":"unloadingRegion","regionCode":"unloadingRegionNo"}'
*/

class IloopAddress extends React.Component {
  constructor(props) {
    super(props);
    const value = props.value || {};
    const rspFields = JSON.parse(props.rspFields || '{}');

    const names = [
      rspFields.provinceCode || props.fieldName,
      rspFields.provinceName || 'PN',
      rspFields.cityCode || 'CC',
      rspFields.cityName || 'CN',
      rspFields.regionCode || 'RC',
      rspFields.regionName || 'RN',
    ];

    this.state = {
      PC: names[0], // 省编码
      PN: names[1], // 省名称
      CC: names[2], // 市编码
      CN: names[3], // 市名称
      RC: names[4], // 区编码
      RN: names[5], // 区名称

      [names[1]]: value[names[1]] || '',
      [names[0]]: value[names[0]] || '',
      [names[3]]: value[names[3]] || '',
      [names[2]]: value[names[2]] || '',
      [names[5]]: value[names[5]] || '',
      [names[4]]: value[names[4]] || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { PN, PC, CN, CC, RN, RC } = this.state;

    const defaultValue = {
      [PN]: '',
      [PC]: '',
      [CN]: '',
      [CC]: '',
      [RN]: '',
      [RC]: '',
    };

    if ('value' in nextProps) {
      this.setState(nextProps.value ? nextProps.value : defaultValue);
      return {
        ...(nextProps.value || {}),
      };
    }
    this.setState(defaultValue);
    return null;
  }

  handleChange = (value, option) => {
    const { PN, PC, CN, CC, RN, RC } = this.state;
    
    const iloopAddress = option && option.length ?  {
      [PN]: option[0] ? option[0].label : '',
      [PC]: option[0] ? option[0].value : '',
      [CN]: option[1] ? option[1].label : '',
      [CC]: option[1] ? option[1].value : '',
      [RN]: option[2] ? option[2].label : '',
      [RC]: option[2] ? option[2].value : '',
    } : null;
    if (!('value' in this.props)) {
      this.setState(iloopAddress);
    }
    this.triggerChange(iloopAddress);
  };

  triggerChange = iloopAddress => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(iloopAddress);
    }
  };

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // console.log(targetOption);

    let url = 'https://ilooptest.tf56.com/iloopBase/regionName/findByParentCode?parentCode=';
    url += targetOption.value;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'https://ilooptest.tf56.com',
      },
    })
      .then(res => res.json())
      .then(json => {
        const { code, data } = json;
        if (code === 0) {
          targetOption.children = [];
          targetOption.loading = false;
          data.forEach(item => {
            const { id, regionCode, regionName } = item;
            const last = regionCode.lastIndexOf('000');

            targetOption.children.push({
              value: regionCode,
              label: regionName,
              key: id,
              isLeaf: last === -1,
            });
          });
          const { options } = this.state;
          this.setState({
            options: [...options],
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const {disabled} = this.props;
    const { PC, CC, RC } = this.state;
    const { [PC]: provinceNoValue, [CC]: cityNoValue, [RC]: regionNoValue } = this.state;
    return (
      <Cascader
        disabled={disabled}
        showSearch
        changeOnSelect
        placeholder="请选择地址"
        options={window.g_address || districts}
        onChange={this.handleChange}
        value={provinceNoValue ? [provinceNoValue, cityNoValue, regionNoValue] : null}
      />
    );
  }
}
export default IloopAddress;
