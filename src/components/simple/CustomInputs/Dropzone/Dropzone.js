import React from 'react';

import { useDropzone } from 'react-dropzone';

import Button from '../../Button/Button';
import styles from './Dropzone.module.scss';

const DropzoneField = props => {
  const {
    input: { onChange },
    multiple,
    label,
  } = props;
  const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: files => onChange(files),
  });

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  return (
    <div className={styles.dropzoneWrapper}>
      <div {...getRootProps()}>
        <input multiple={multiple} {...getInputProps()} />
        {label}
        <Button
          type="button"
          style={{
            maxWidth: '500px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize:
              getInputProps().ref.current && !!getInputProps().ref.current.value ? '9px' : '12px',
          }}
        >
          {getInputProps().ref.current && getInputProps().ref.current.files.length > 0
            ? (
              <>
                <aside>
                  <h4>Zaakceptowane pliki:</h4>
                  <ul>
                    {acceptedFilesItems}
                  </ul>
                  <h4>Odrzucone pliki:</h4>
                  <ul>
                    {rejectedFilesItems}
                  </ul>
                </aside>
              </>
            ) : 'Kliknij tutaj, żeby dodać pliki'}
        </Button>
      </div>
    </div>
  );
};

export default DropzoneField;
