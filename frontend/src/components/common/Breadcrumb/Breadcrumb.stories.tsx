import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const BreadcrumbWrapper = ({ initialPath }: { initialPath: string }) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="*" element={<Breadcrumb />} />
    </Routes>
  </MemoryRouter>
);

export const Root: Story = {
  render: () => <BreadcrumbWrapper initialPath="/" />,
};

export const SingleLevel: Story = {
  render: () => <BreadcrumbWrapper initialPath="/branches" />,
};

export const MultiLevel: Story = {
  render: () => <BreadcrumbWrapper initialPath="/branches/edit/12345" />,
};
