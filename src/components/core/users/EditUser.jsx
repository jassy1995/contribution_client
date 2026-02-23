import React, { useState } from 'react';
import Input from '../../global/Input.jsx';
import Button from '../../global/Button.jsx';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/lib/api/users.js';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/lib/contexts/toast.js';
import Title from '../../global/Title.jsx';
import FileInput from '../../global/FileInput.jsx';
import IconButton from '../../global/IconButton.jsx';
import Avatar from '../../Avatar.jsx';
import { TbX } from 'react-icons/tb';
import PropTypes from 'prop-types';
import Select from '../../global/Select.jsx';

const EditUser = ({ user, onBack }) => {
  const toast = useToast();
  const qc = useQueryClient();
  const [showChangeImage, setShowChangeImage] = useState(false);
  const [image, setImage] = useState(null);
  const { mutateAsync: update, isPending: isUpdateLoading } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      : null,
  });

  const submit = async (values) => {
    if (showChangeImage && !image) return toast.error('Image is required');
    try {
      const fd = new FormData();
      Object.keys(values).forEach((key) => fd.append(key, values[key]));
      if (showChangeImage && image) fd.append('image', image);
      await update({ id: user._id, data: fd });
      toast.success('User updated!');
      onBack();
      await qc.invalidateQueries({
        queryKey: ['users'],
      });
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? 'Something went wrong, please try again');
    }
  };

  return (
    <>
      <Title onBack={onBack} text="Edit user" />
      <form onSubmit={handleSubmit(submit)}>
        <div className="space-y-4">
          <Input
            label="First Name"
            bordered
            error={errors?.firstName?.message}
            {...register('firstName', { required: 'First Name is required' })}
            disabled={isUpdateLoading}
          />
          <Input
            label="Last Name"
            bordered
            error={errors?.lastName?.message}
            {...register('lastName', { required: 'Last Name is required' })}
            disabled={isUpdateLoading}
          />
          <Input
            label="Middle Name"
            bordered
            error={errors?.middleName?.message}
            {...register('middleName')}
            disabled={isUpdateLoading}
          />
          <Input
            label="Username"
            bordered
            error={errors?.username?.message}
            {...register('username', { required: 'Username is required' })}
            disabled={isUpdateLoading}
          />
          <Input
            label="Email"
            bordered
            error={errors?.email?.message}
            {...register('email', { required: 'Email is required' })}
            disabled={isUpdateLoading}
          />
          <Select
            label="Role"
            bordered
            options={[
              { text: 'Admin', value: 'admin' },
              { text: 'User', value: 'user' },
            ]}
            placeholder="Select role"
            error={errors?.role?.message}
            {...register('role', { required: 'Role is required' })}
            disabled={isUpdateLoading}
          />
          {!showChangeImage ? (
            <div className="border border-zinc-300 rounded-xl px-6 py-6">
              <div className="flex items-center justify-between">
                <Avatar src={user.image} hash={user.updatedAt} alt="image" className="w-16 rounded-lg" />
                <Button onClick={() => setShowChangeImage(true)} variant="outlined" color="black">
                  Change
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <FileInput
                  label="Image"
                  bordered
                  id="image"
                  value={image}
                  onChange={setImage}
                  disabled={isUpdateLoading}
                />
              </div>
              <IconButton
                onClick={() => {
                  setShowChangeImage(false);
                  setImage(null);
                }}
                icon={<TbX />}
                variant="outlined"
                color="red"
              />
            </div>
          )}
        </div>
        <Button type="submit" color="green" className="mt-10" loading={isUpdateLoading}>
          Save
        </Button>
      </form>
    </>
  );
};

EditUser.propTypes = {
  onBack: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    updatedAt: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default EditUser;
