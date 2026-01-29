import React from 'react';

interface PillProps {
  status: 'active' | 'inactive' | 'pending';
}

const statusColors = {
  active: 'green',
  inactive: 'red',
  pending: 'yellow',
};

export const Pill = ({ status }: PillProps) => {
  return (
    <div
      className={`uppercase inline-flex items-center rounded-md bg-${statusColors[status]}-600/10 px-2 py-1 text-sm font-medium text-${statusColors[status]}-600 inset-ring inset-ring-${statusColors[status]}-600/30`}
    >
      <span>{status}</span>
    </div>
  );
};
