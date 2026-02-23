import React, { forwardRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

const DropFileInput = (
  { label, disabled, value, onChange, accept = [], multiple = false, maxSize = Infinity, ...props },
  ref
) => {
  const onDrop = useCallback(
    (files) => {
      if (multiple) onChange(files);
      else onChange(files[0]);
    },
    [multiple, onChange]
  );
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    noClick: true,
    multiple,
    maxSize,
  });

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col">
        <div className="text-black text-sm">{label}</div>
        <label
          className={classNames(
            'bg-slate-600 bg-opacity-5 mt-2 hover:bg-opacity-10 cursor-pointer border-2 border-dashed border-gray-300 px-4 py-6 rounded-md w-full focus:ring-2 ring-offset-2 ring-primary-800 ring-opacity-30 transition duration-300',
            { 'opacity-60 pointer-events-none': disabled },
            { 'border-gray-500 bg-opacity-10': isDragActive },
            'flex justify-center items-center'
          )}
          {...getRootProps()}
        >
          {value ? (
            <div className="text-center whitespace-normal break-all">{value.name}</div>
          ) : (
            <div className="text-sm text-center opacity-70">
              {isDragActive ? 'Drop file here to add' : 'Drag & drop a file here, or click to add'}
            </div>
          )}
          <input hidden disabled={disabled} {...props} {...getInputProps()} ref={ref} />
        </label>
      </div>
      {fileRejections.map((r) => {
        return r.errors.map((err) => (
          <div key={err.code} className="text-sm text-red-500 mt-2">
            {err.message}
          </div>
        ));
      })}
    </div>
  );
};

DropFileInput.displayName = 'DropFileInput';

DropFileInput.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  accept: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
};

export default forwardRef(DropFileInput);
