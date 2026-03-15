import { StoryObj, Meta } from '@storybook/react-vite';
import { BasicInfo } from './BasicInfo';
import { CreateSupplier } from '@/models/Supplier';

type Story = StoryObj<typeof BasicInfo>;

const meta: Meta<typeof BasicInfo> = {
  title: 'Forms/Supplier/BasicInfo',
  component: BasicInfo,
  tags: ['autodocs'],
  render: ({ ...args }) => <BasicInfo {...args} />,
};

export default meta;

export const Default: Story = {
  args: {
    data: {
      companyName: 'Test Supplier',
      status: 'Active',
      mainContactName: 'John Doe',
      address: '123 Main St',
      email: '',
      phoneNumber: '',
    } as CreateSupplier,
    changedData: (field: string, value: string) => {
      console.log(`Field changed: ${field}, New value: ${value}`);
    },
  },
};
