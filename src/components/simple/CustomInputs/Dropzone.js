import React from 'react';

import { useDropzone } from 'react-dropzone';

const DropzoneField = props => {
  const {
    input: { onChange },
    multiple,
  } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => onChange(files),
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input multiple={multiple} {...getInputProps()} />
        <p>Kliknij tutaj, żeby dodać pliki</p>
      </div>
    </div>
  );
};

export default DropzoneField;
