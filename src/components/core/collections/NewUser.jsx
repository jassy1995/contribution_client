import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/global/Button.jsx';
import Drawer from '@/components/global/Drawer.jsx';
import { useAddUserMutation } from '@/lib/api/auth.js';
import { useGetCategoriesQuery } from '@/lib/api/collections.js';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/lib/contexts/toast.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Input } from '@/components/ui/input.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  middleName: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .email('Invalid email address')
    .or(z.literal(''))
    .optional(),
  category: z.string().nonempty('Category is required'),
  phone: z
    .string()
    .nonempty('Phone number is required')
    .regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number'),
  password: z.string().nonempty('Password is required'),
});

const NewUser = ({ isOpen, onClose }) => {
  const toast = useToast();
  const qc = useQueryClient();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName:'',
      middleName:'',
      username:'',
      email:'',
      category: '',
      phone:'',
      password:'',
    },
  });
  const { data: { categories = [] } = {}, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  const { mutateAsync: add, isPending: isAddLoading } = useAddUserMutation();
 
  const submit = async (values) => {
    try {
      await add({...values, email: values.email || undefined});
      onClose();
      form.reset();
      toast.success('User created successfully');
      await qc.invalidateQueries({ queryKey: ['users'] });
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? 'Something went wrong, please try again');
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width={700} title="Add new user">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="space-y-8">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                    return (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter first name" className="h-12" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    );
                }}
                />
                </div>
                <div className="col-span-6">
                <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                    return (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter last name" className="h-12"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    );
                }}
                />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter middle name" className="h-12"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter username" className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} placeholder="Enter email" className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} placeholder="Enter phone number" className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder='Select category' />
                          </SelectTrigger>
                          <SelectContent>
                            {isCategoriesLoading && (
                              <SelectItem value="__loading__" disabled>
                                Loading...
                              </SelectItem>
                            )}
                            {categories.map((category) => (
                              <SelectItem key={category._id} value={category._id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={passwordVisible ? 'text' : 'password'} {...field} placeholder="Enter password" className="h-12" />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600"
                          >
                            {passwordVisible ? <IoEyeOutline size={20} aria-label="Hide password" /> : <IoEyeOffOutline size={20} aria-label="Show password" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-6" loading={isAddLoading}>
            Add user
          </Button>
        </form>
      </Form>
    </Drawer>
  );
};

NewUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewUser;
