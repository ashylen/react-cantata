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
        <Button
          type="button"
          style={{
            maxWidth: '500px',
            fontSize:
              getInputProps().ref.current && !!getInputProps().ref.current.value ? '7px' : '12px',
          }}
        >
          {getInputProps().ref.current && !!getInputProps().ref.current.files
            ? Array.from(getInputProps().ref.current.files).map(file => (
                <>
                  {file.name}
                  <br />
                </>
              ))
            : 'Kliknij tutaj, żeby dodać pliki'}
          {console.log(getInputProps())}
        </Button>
      </div>
    </div>
  );
};

export default DropzoneField;
