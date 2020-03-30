import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableForm from '../../iloop-form/TableForm';
import constant from '../utils/constant';
import Control from '../../iloop-form/Control'

export default class FormFields extends PureComponent {
  static Proptype = {
    dataSource: PropTypes.object,
    fields: PropTypes.array,
    form: PropTypes.object.isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    dataSource: {},
    fields: [],
  };

  constructor(props) {
    super(props);
    this.renderFieldItem = this.renderFieldItem.bind(this);
  }

  renderFieldItem(field) {
    const { dataSource, form, type } = this.props;

    const { render } = field;

    if (render) {
      return render(field, dataSource);
    }

    const props = {
      control: {
        ...field,
        placeholder: constant.PLATEHOLDERS[field.inputType] || '',
        inputType: type === 'G' ? 'plain' : field.inputType,
        initialValue: type === 'G' ? field.fieldName : field.initialValue,
      },
      form,
    };

    return <Control {...props} />;
  }

  render() {
    const { render, fields } = this.props;

    return fields.map((field, index) => {
      if (render) {
        return render({
          field,
          index,
          children: this.renderFieldItem(field),
        });
      }

      return <React.Fragment key={field.fieldName}>{this.renderFieldItem(field)}</React.Fragment>;
    });
  }
}
