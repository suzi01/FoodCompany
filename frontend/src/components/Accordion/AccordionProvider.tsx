import { useState, ReactNode } from 'react';
import { AccordionContext } from './AccordionContext';

export const CompoundAccordion = ({ children }: { children: ReactNode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return (
    <AccordionContext.Provider value={{ openIndex, toggleIndex }}>
      <div className="flex flex-col gap-3">{children}</div>
    </AccordionContext.Provider>
  );
};
