import { createContext, useContext } from 'react';

export interface AccordionContextProps {
  openIndex: number | null;
  toggleIndex: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextProps>({
  openIndex: null,
  toggleIndex: () => {},
});

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within a <Accordion />');
  }
  return context;
};

export { AccordionContext, useAccordion };
