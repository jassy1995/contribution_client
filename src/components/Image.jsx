import React from 'react';
import PropTypes from 'prop-types';

const _bucket = import.meta.env.VITE_S3_BUCKET_NAME;

const Image = ({ src, hash, alt, bucket = _bucket, ...props }) => {
  const isAbsolute = /^https?:\/\//.test(src);
  const isPublicPath = src?.startsWith('/');
  const hasBucket = !!bucket;

  let url = src;
  if (!isAbsolute && !isPublicPath && hasBucket) {
    url = `https://${bucket}.s3.amazonaws.com/${src}`;
  }

  const withHash = hash ? (url.includes('?') ? `${url}&${hash}` : `${url}?${hash}`) : url;

  return <img src={withHash} alt={alt} {...props} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  hash: PropTypes.string,
  alt: PropTypes.string.isRequired,
  bucket: PropTypes.string,
};

export default Image;
