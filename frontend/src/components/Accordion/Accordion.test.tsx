import { render, userEvent, screen } from '@/testUtils';
import { CompoundAccordion as CompoundAccordion } from './AccordionProvider';
import { AccordionItem, AccordionContent, AccordionHeader } from './Accordion';

describe('Accordion Component', () => {
  test('renders header content', () => {
    render(
      <CompoundAccordion>
        <AccordionItem>
          <AccordionHeader header="Header" index={0} />
          <AccordionContent index={0}>Content</AccordionContent>
        </AccordionItem>
      </CompoundAccordion>,
    );

    const headerText = screen.getByText('Header');
    const contentText = screen.queryByText('Content');

    expect(contentText).not.toBeInTheDocument();
    expect(headerText).toBeInTheDocument();
  });

  test('renders content when open', async () => {
    render(
      <CompoundAccordion>
        <AccordionItem>
          <AccordionHeader header="Header" index={0} />
          <AccordionContent index={0}>Content</AccordionContent>
        </AccordionItem>
      </CompoundAccordion>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('toggles content visibility on header click', async () => {
    render(
      <CompoundAccordion>
        <AccordionItem>
          <AccordionHeader header="Header" index={0} />
          <AccordionContent index={0}>Content</AccordionContent>
        </AccordionItem>
      </CompoundAccordion>,
    );
    const headerButton = screen.getByRole('button');
    await userEvent.click(headerButton);
    expect(screen.getByText('Content')).toBeInTheDocument();
    await userEvent.click(headerButton);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('only one accordion item is open at a time', async () => {
    render(
      <CompoundAccordion>
        <AccordionItem>
          <AccordionHeader header="Header 1" index={0} />
          <AccordionContent index={0}>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader header="Header 2" index={1} />
          <AccordionContent index={1}>Content 2</AccordionContent>
        </AccordionItem>
      </CompoundAccordion>,
    );
    const headerButton1 = screen.getAllByRole('button')[0];
    const headerButton2 = screen.getAllByRole('button')[1];
    await userEvent.click(headerButton1);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await userEvent.click(headerButton2);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('renders status pill when status prop is provided', () => {
    render(
      <CompoundAccordion>
        <AccordionItem>
          <AccordionHeader header="Header" index={0} status="active" />
          <AccordionContent index={0}>Content</AccordionContent>
        </AccordionItem>
      </CompoundAccordion>,
    );
    const pill = screen.getByText('active');
    expect(pill).toBeInTheDocument();
  });
});
