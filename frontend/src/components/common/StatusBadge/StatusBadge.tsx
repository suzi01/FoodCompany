import React from 'react';

export type StatusType = 'active' | 'inactive' | 'pending';

export interface StatusBadgeProps {
  value: StatusType;
}

const statusColorClass = {
  active: 'bg-green-500',
  inactive: 'bg-red-600',
  pending: 'bg-yellow-400',
};

export const StatusBadge = ({ value }: StatusBadgeProps) => {
  return (
    <div
      data-testid="status-badge"
      className={`w-[10px] h-[10px] rounded-full mr-2 inline-block ${statusColorClass[value]}`}
    />
  );
};
