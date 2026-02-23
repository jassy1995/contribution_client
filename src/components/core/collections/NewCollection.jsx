import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/global/Button.jsx';
import Drawer from '@/components/global/Drawer.jsx';
import { useGetUsersQuery } from '@/lib/api/users.js';
import { useGetCategoriesQuery, useAddCollectionMutation } from '@/lib/api/collections.js';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/lib/contexts/toast.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Input } from '@/components/ui/input.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { z } from 'zod';
import { firstUpperCase } from '@/lib/utils';

const schema = z.object({
  amount: z.string().nonempty('Title is required'),
  category: z.string().nonempty('Category is required'),
  collectedAt: z.string().nonempty('Collection date is required'),
  contributor: z.string().nonempty('Contributor is required'),
});

const NewCollection = ({ isOpen, onClose }) => {
  const toast = useToast();
  const qc = useQueryClient();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
      category: '',
      collectedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      contributor: '',
    },
  });
  const { data: { categories = [] } = {}, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const selectedCategory = form.watch('category');
  const { data: { users = [] } = {}, isLoading: isUsersLoading } = useGetUsersQuery({ category: selectedCategory });

  const { mutateAsync: add, isPending: isAddLoading } = useAddCollectionMutation();
 
  const submit = async (values) => {
    try {
      const payload = {
        ...values,
        amount: Number(values.amount),
      };
      await add(payload);
      onClose();
      form.reset();
      toast.success('Collection added successfully');
      await qc.invalidateQueries({ queryKey: ['contributions'] });
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? 'Something went wrong, please try again');
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Add new collection">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Enter amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
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
                  name="collectedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
                  control={form.control}
                  name="contributor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contributor</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contributor" />
                          </SelectTrigger>
                          <SelectContent>
                            {isUsersLoading && (
                              <SelectItem value="__loading__" disabled>
                                Loading...
                              </SelectItem>
                            )}
                            {users.map((user) => (
                              <SelectItem key={user._id} value={user._id}>
                                {firstUpperCase(user.firstName)} {firstUpperCase(user.lastName)}
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
          <Button type="submit" className="mt-6" loading={isAddLoading}>
            Add collection
          </Button>
        </form>
      </Form>
    </Drawer>
  );
};

NewCollection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewCollection;
