import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/global/Button.jsx';
import Drawer from '@/components/global/Drawer.jsx';
import { useAddTransactionMutation } from '@/lib/api/transactions.js';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/lib/contexts/toast.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { z } from 'zod';
 
const schema = z.object({
  description: z.string().nonempty('Description is required'),
  transactionAmount: z.string().nonempty('Amount is required'),
  transactionDate: z.string().nonempty('Transaction date is required'),
  type: z.enum(['debit', 'credit'], { required_error: 'Type is required' }),
});

const NewTransaction = ({ isOpen, onClose }) => {
  const toast = useToast();
  const qc = useQueryClient();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      transactionAmount: '',
      transactionDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      type: '',
    },
  });
 
  const { mutateAsync: add, isPending: isAddLoading } = useAddTransactionMutation();
 
  const submit = async (values) => {
    try {
      const payload = {
        ...values,
        transactionAmount: Number(values.transactionAmount),
      };
      await add(payload);
      onClose();
      form.reset();
      toast.success('Transaction added successfully');
      await qc.invalidateQueries({ queryKey: ['transactions'] });
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? 'Something went wrong, please try again');
    }
  };
 
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Add new transaction">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="space-y-8">
            <FormField
                  control={form.control}
                  name="transactionAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="Enter amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
            />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debit">Debit</SelectItem>
                            <SelectItem value="credit">Credit</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" className="mt-6" loading={isAddLoading}>
            Add transaction
          </Button>
        </form>
      </Form>
    </Drawer>
  );
};
 
NewTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
 
export default NewTransaction;
