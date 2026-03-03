// test for AccordionContext
import { render, screen, userEvent } from '@/testUtils';
import { AccordionContext } from './AccordionContext';
import { CompoundAccordion } from './AccordionProvider';
import { useContext } from 'react';

const renderWithContext = (ui: React.ReactNode) => {
  return render(<CompoundAccordion>{ui}</CompoundAccordion>);
};

const TestComponent = () => {
  const contextValue = useContext(AccordionContext);
  return (
    <div>
      <p>Open Index: {contextValue.openIndex}</p>
      <button onClick={() => contextValue.toggleIndex(1)}>Toggle Index</button>
    </div>
  );
};

describe('AccordionContext', () => {
  it('provides default values', () => {
    renderWithContext(<TestComponent />);

    expect(screen.getByText('Open Index:')).toBeInTheDocument();
  });

  it('toggleIndex function updates openIndex', async () => {
    renderWithContext(<TestComponent />);

    await userEvent.click(screen.getByText('Toggle Index'));
    expect(screen.getByText('Open Index: 1')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Toggle Index'));
    expect(screen.getByText('Open Index:')).toBeInTheDocument();
  });
});
