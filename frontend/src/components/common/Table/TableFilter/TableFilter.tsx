import Calendar from '@/assets/calendar.svg';
import Export from '@/assets/export.svg';
import Filter from '@/assets/filter.svg';

import { BasicMenu } from '../../BasicMenu';
import { Image } from '../../Image/Image';

interface TableFilterProps {
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  filterItems: string[];
}

const sortMenuItems = [
  { label: 'A-Z' },
  { label: 'Z-A' },
  { label: 'Newest' },
  { label: 'Oldest' },
];

const exportMenuItems = [
  { label: 'CSV' },
  { label: 'Excel' },
  { label: 'PDF' },
];

export const TableFilter = ({
  filterStatus,
  setFilterStatus,
  filterItems,
}: TableFilterProps) => {
  const StatusButton = ({ status }: { status: string }) => {
    return (
      <button
        onClick={() => setFilterStatus(status)}
        className={`p-2.5 ${
          filterStatus === status
            ? 'border-b-[3px] border-[#3C4CE3] pt-[2px]'
            : 'border-b-transparent pt-[0px]'
        }`}
      >
        {status}
      </button>
    );
  };

  return (
    <div className="flex justify-between mb-4 pb-4 border-b border-gray-[#ccc]">
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatusButton status="All" />
        <StatusButton status="Pending" />
        <StatusButton status="Inactive" />
      </div>
      <div className="flex gap-[12px]">
        <BasicMenu
          target={
            <button className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <Image
                  src={Calendar}
                  alt="calendar icon"
                  className="w-[15px]"
                />
                Filter
              </div>
            </button>
          }
          items={filterItems.map((item) => ({ label: item }))}
        />

        <BasicMenu
          target={
            <button className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <Image src={Filter} alt="filter icon" className="w-[15px]" />
                Sort
              </div>
            </button>
          }
          items={sortMenuItems}
        />

        <BasicMenu
          target={
            <button className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <Image src={Export} alt="export icon" className="w-[15px]" />
                Export
              </div>
            </button>
          }
          items={exportMenuItems}
        />
      </div>
    </div>
  );
};
