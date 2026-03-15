import { CompoundAccordion } from '@/components/Accordion/AccordionProvider';

import {
  AccordionItem,
  AccordionContent,
  AccordionHeader,
} from '@/components/Accordion/Accordion';

export const ProductSearch = () => {
  return (
    <div>
      <p>ProductSearch</p>
      <CompoundAccordion>
        <AccordionItem>
          <AccordionHeader status="active" header="Is React hard?" index={0} />
          <AccordionContent index={0}>
            Only until you understand `useEffect`. Then it's just chaotic.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader header=" Why use Compound Components?" index={1} />
          <AccordionContent index={1}>
            Because passing 50 props is bad for your blood pressure.
          </AccordionContent>
        </AccordionItem>
      </CompoundAccordion>
    </div>
  );
};
