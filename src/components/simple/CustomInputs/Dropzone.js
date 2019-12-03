import React from 'react';

import { useDropzone } from 'react-dropzone';

import Button from '../Button/Button';

const DropzoneField = props => {
  const {
    input: { onChange },
    multiple,
    label,
  } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => onChange(files),
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input multiple={multiple} {...getInputProps()} />
        {label}
        <Button type="button" style={{ maxWidth: '500px' }}>
          {console.log(getInputProps())}
          {getInputProps().ref.current && !!getInputProps().ref.current.value
            ? getInputProps().ref.current.value
            : 'Kliknij tutaj, żeby dodać pliki'}
        </Button>
      </div>
    </div>
  );
};

export default DropzoneField;
