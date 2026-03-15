import { StoryObj, Meta } from '@storybook/react-vite';
import { SupplierCreationSuccess } from './SupplierCreationSuccess';

type Story = StoryObj<typeof SupplierCreationSuccess>;

const meta: Meta<typeof SupplierCreationSuccess> = {
  title: 'Forms/Supplier/SupplierCreationSuccess',
  component: SupplierCreationSuccess,
  tags: ['autodocs'],
  render: ({ ...args }) => <SupplierCreationSuccess {...args} />,
};

export default meta;

export const Default: Story = {
  args: {
    supplierName: 'Test Supplier',
    supplierId: 'SUP12345',
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    onSkip: () => console.log('Skip clicked'),
    onContinue: () => console.log('Continue clicked'),
  },
};
