import { forwardRef } from 'react';
import { Badge as NextUiBadge } from "@nextui-org/react";
import { BadgeProps } from './types';

export const Badge = forwardRef<HTMLSpanElement | null, BadgeProps>(
  (
    props,
    ref
  ) => {
    return (
      <NextUiBadge {...props} ref={ref} />
    );
  }
);