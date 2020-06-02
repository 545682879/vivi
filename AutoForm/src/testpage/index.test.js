import { mount } from 'enzyme';
import React from 'react';
import data from '../testdata/testData';
import NormalForm from '../iloop-form/NormalForm';

describe('NormalForm', () => {
  it('renders all items', () => {
   // console.log('NormalForm', index.NormalForm);
    const wrapper = mount(
      <NormalForm
      pageKey="NormalForm"
      formItems={data.data[0].pageTemplateInputUiList || []}
      dataSource={null}
      formType="form"
      title="基本信息"
    />
    );
    expect(wrapper.find('span').length).toBe(33);
  });
});
