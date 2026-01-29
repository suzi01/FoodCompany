import ChevronDown from '@/assets/icons/chevron-down.svg';
import { Image } from '@/components/common/Image';
import { ReactNode } from 'react';
import { Pill } from '../Pill';

interface AccordionProps {
  isOpen: boolean;
  onClick: () => void;
  content: ReactNode;
  headerContent: ReactNode;
  status?: 'active' | 'inactive' | 'pending';
}

export const Accordion = ({
  isOpen,
  onClick,
  status,
  headerContent,
  content,
}: AccordionProps) => {
  return (
    <div className="border-2 border-blue-300 rounded-md bg-blue-100">
      <div className="flex justify-between items-center cursor-pointer w-full px-4 py-8 ">
        {headerContent}
        <div className="flex items-center gap-2">
          {status && <Pill status={status} />}
          <button onClick={() => onClick()}>
            <Image
              src={ChevronDown}
              alt="Expand"
              width={16}
              height={16}
              className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
      {isOpen && content}
    </div>
  );
};
