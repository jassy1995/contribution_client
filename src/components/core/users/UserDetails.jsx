import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '../../global/Drawer.jsx';
import Title from '../../global/Title.jsx';
import { format } from 'date-fns';
import EditUser from './EditUser.jsx';
import Avatar from '../../Avatar.jsx';
import { TbPencil } from 'react-icons/tb';

const UserDetails = ({ isOpen, onClose, user }) => {
  const [view, setView] = useState('details');

  const handleClose = () => {
    setView('details');
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose}>
      {!!user && (
        <>
          {view === 'details' && (
            <>
              <Title text="User details" />
              <Avatar src={user.image} hash={user.updatedAt} className="w-28 h-28 rounded-full mx-auto mb-8" />
              <div className="divide-y border rounded-xl">
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Name</small>
                  <div className="flex items-center">
                    {user.firstName}{' '}
                    {(user.role === 'admin') && (
                      <div className="px-2.5 py-1 text-xs ml-2 leading-none inline-block rounded-full border border-gray-600 text-gray-600">
                        {user.role}
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Middle name</small>
                  <div className="flex items-center">
                    {user.middleName || ''}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Last name</small>
                  <div className="flex items-center">
                    {user.lastName}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Username</small>
                  <div className="flex items-center">
                    {user.username}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Email</small>
                  <div className="flex items-center">
                    {user.email}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Phone</small>
                  <div className="flex items-center">
                    {user.phone || 'N/A'}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Category</small>
                  <div className="flex items-center">
                    {user.category?.name || 'N/A'}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Date Added</small>
                  <p>{format(new Date(user.createdAt), 'do MMM, yyyy')}</p>
                </div>
                <div className="px-4 py-2">
                  <small className="inline-flex mb-1">Last Login</small>
                  <p>{format(new Date(user.lastLogin), 'do MMM, yyyy')}</p>
                </div>
              </div>
                <div className="divide-y border rounded-xl mt-6 flex flex-col items-stretch overflow-hidden">
                  <button onClick={() => setView('edit')} className="px-4 py-3 hover:bg-zinc-100 flex items-center">
                    <TbPencil size="20" />
                    <p className="ml-3">Edit</p>
                  </button>
                </div>
            </>
          )}
          {view === 'edit' && (
            <>
              <EditUser onBack={() => setView('details')} user={user} />
            </>
          )}
        </>
      )}
    </Drawer>
  );
};

UserDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    image: PropTypes.string,
    updatedAt: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    verification: PropTypes.shape({
      email: PropTypes.bool,
      phone: PropTypes.bool,
    }),
    phone: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    lastLogin: PropTypes.string,
  }),
};

export default UserDetails;
