import * as React from 'react';
import PropTypes from 'prop-types';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import useFormField from '@/hooks/use-form-field';

const Form = FormProvider;

const FormFieldContext = React.createContext({});
export { FormFieldContext };

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
};

const FormItemContext = React.createContext({});
export { FormItemContext };

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

FormItem.propTypes = {
  className: PropTypes.string,
};

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-red-500 dark:text-red-900', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
  className: PropTypes.string,
};

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

FormDescription.propTypes = {
  className: PropTypes.string,
};

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-red-500 dark:text-red-900', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

FormMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
