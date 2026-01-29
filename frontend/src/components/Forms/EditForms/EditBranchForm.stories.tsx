import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditBranchForm } from './EditBranchForm';

type Story = StoryObj<typeof EditBranchForm>;

const meta: Meta<typeof EditBranchForm> = {
  title: 'Forms/EditBranchForm',
  component: EditBranchForm,
  tags: ['autodocs'],
  render: ({ ...args }) => <EditBranchForm {...args} />,
};

export default meta;

export const EditBranchFormStory: Story = {
  args: {
    branch: {
      branchName: 'Main Branch',
      yearsActive: '10',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      branchEmail: 'mainbranch@example.com',
      mainContactName: 'John Doe',
      mainContactPhoneNumber: '098-765-4321',
      mainContactEmail: 'johndoe@example.com',
    },
    onSubmit: (data) => {
      console.log('Form submitted:', data);
    },
  },
};
