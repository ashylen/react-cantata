import React from 'react';

// Components
import Input from '../Input/Input';

const CustomInput = props => {
  const {
    input,
    label,
    type,
    placeholder,
    maxLength,
    meta: { touched, error },
    tag: Tag,
  } = props;

  const TagName = Tag || 'input';
  return (
    <Input
      tag={TagName}
      maxLength={maxLength}
      label={label}
      placeholder={placeholder}
      type={type}
      error={touched && error && { error }}
      {...input}
    />
  );
};

export default CustomInput;
