import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image.jsx';
import { cn } from '../lib/utils.js';
import { RiUser3Fill } from 'react-icons/ri';

const Avatar = ({ src, hash, className }) => {
  return (
    <>
      {src ? (
        <Image src={src} hash={hash} className={className} />
      ) : (
        <div className={cn('w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center', className)}>
          <RiUser3Fill className="w-[70%] h-[70%] opacity-70" />
        </div>
      )}
    </>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  hash: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
