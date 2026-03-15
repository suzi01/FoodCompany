import { StoryObj, Meta } from '@storybook/react-vite';
import { ContactDetails } from './ContactDetails';
import { CreateSupplier } from '@/models/Supplier';

type Story = StoryObj<typeof ContactDetails>;

const meta: Meta<typeof ContactDetails> = {
  title: 'Forms/Supplier/ContactDetails',
  component: ContactDetails,
  tags: ['autodocs'],
  render: ({ ...args }) => <ContactDetails {...args} />,
};

export default meta;

export const Default: Story = {
  args: {
    data: {
      mainContactName: 'John Doe',
      address: '123 Main St',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    } as CreateSupplier,
    changedData: (field: string, value: string) => {
      console.log(`Field changed: ${field}, New value: ${value}`);
    },
  },
};
