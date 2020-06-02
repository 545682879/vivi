export function generateLayout(labelSpan, controlSpan) {
  return {
    labelCol: { span: labelSpan },
    wrapperCol: { span: controlSpan },
  };
}

export function generateLayoutResponsive(labelSpan, controlSpan) {
  return {
    labelCol: {
      sm: { span: labelSpan / 2 },
      md: { span: labelSpan },
      xl: { span: labelSpan * 2 },
    },
    wrapperCol: {
      sm: { span: controlSpan / 2 },
      md: { span: controlSpan },
      xl: { span: controlSpan * 2 },
    },
  };
}

/**
 * @constant 标签／控件占位百分比 8／16, label width span: 8, control width span: 16
 */
export const FORM_LAYOUT_8_16 = generateLayout(8, 16);

export const TABLE_ITEM_WITH_LABEL = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const TABLE_ITEM_WITHOUT_LABEL = {
  wrapperCol: { span: 24 },
};
