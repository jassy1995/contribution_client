import * as React from 'react';
import PropTypes from 'prop-types';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { TbLoader2 } from 'react-icons/tb';

import { buttonVariants } from './button-variants';

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, children, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }), isLoading && 'disabled')} ref={ref} {...props}>
        {isLoading && <TbLoader2 className="animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  asChild: PropTypes.bool,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export { Button };
