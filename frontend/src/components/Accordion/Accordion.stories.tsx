import { Meta, StoryObj } from '@storybook/react-vite';
import { CompoundAccordion as CompoundAccordion } from './AccordionProvider';
import { AccordionItem, AccordionContent, AccordionHeader } from './Accordion';

type Story = StoryObj<typeof CompoundAccordion>;

const meta: Meta<typeof CompoundAccordion> = {
  title: 'Compound Accordion',
  component: CompoundAccordion,
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  render: () => (
    <CompoundAccordion>
      <AccordionItem>
        <AccordionHeader header="Is React hard?" index={0} />
        <AccordionContent index={0}>
          Only until you understand `useEffect`. Then it's just chaotic.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeader header="Is JavaScript fun?" index={1} />
        <AccordionContent index={1}>
          Only when you understand closures. Then it's just magical.
        </AccordionContent>
      </AccordionItem>
    </CompoundAccordion>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <CompoundAccordion>
      <AccordionItem>
        <AccordionHeader header="Is React hard?" index={0} status="active" />
        <AccordionContent index={0}>
          Only until you understand `useEffect`. Then it's just chaotic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader
          header="Is JavaScript fun?"
          index={1}
          status="pending"
        />
        <AccordionContent index={1}>
          Only when you understand closures. Then it's just magical.
        </AccordionContent>
      </AccordionItem>
    </CompoundAccordion>
  ),
};
