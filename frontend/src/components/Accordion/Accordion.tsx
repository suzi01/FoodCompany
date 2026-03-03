import { ReactNode, useContext } from 'react';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import { Image } from '@/components/common/Image';
import { Pill } from '../common/Pill';
import { AccordionContext } from './AccordionContext';

export const AccordionItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-2 border-blue-300 rounded-md bg-blue-100">
      {children}
    </div>
  );
};

export const AccordionHeader = ({
  header,
  index,
  status,
}: {
  header: string;
  index: number;
  status?: 'active' | 'inactive' | 'pending';
}) => {
  const { toggleIndex, openIndex } = useContext(AccordionContext);
  const isActive = openIndex === index;
  return (
    <div className="flex justify-between items-center cursor-pointer w-full px-4 py-8 ">
      {header}
      <div className="flex items-center gap-2">
        {status && <Pill status={status} />}
        <button onClick={() => toggleIndex(index)}>
          <Image
            src={ChevronDown}
            alt="Expand"
            width={16}
            height={16}
            className={`flex-shrink-0 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export const AccordionContent = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  const { openIndex } = useContext(AccordionContext);

  if (openIndex !== index) return null;

  return <div className="p-4">{children}</div>;
};
