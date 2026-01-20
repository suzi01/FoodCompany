import Calendar from '@/assets/calendar.svg';
import Export from '@/assets/export.svg';
import Filter from '@/assets/filter.svg';

import { useState } from 'react';

import { BasicMenu } from '../../BasicMenu';
import { Drawer } from '../../Drawer';
import { Image } from '../../Image/Image';

interface TableFilterProps {
  filteredStatus: string;
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
  filteredStatus,
  setFilterStatus,
  filterItems,
}: TableFilterProps) => {
  const [opened, setOpened] = useState(false);

  const StatusButton = ({ status }: { status: string }) => {
    return (
      <button
        onClick={() => setFilterStatus(status)}
        className={`p-2.5 ${
          filteredStatus === status
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
      <div className="hidden md:flex ">
        <StatusButton status="All" />
        <StatusButton status="Pending" />
        <StatusButton status="Inactive" />
      </div>

      <div className="flex gap-3 md:hidden">
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filteredStatus}
          className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-[12px]">
        <button
          className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5"
          onClick={() => setOpened(true)}
        >
          <div className="flex items-center gap-1.5">
            <Image src={Calendar} alt="calendar icon" className="w-[15px]" />
            <p className="hidden md:block">Filter</p>
          </div>
        </button>

        <Drawer
          opened={opened}
          setOpened={setOpened}
          filterItems={filterItems}
        />

        <BasicMenu
          target={
            <button className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <Image src={Filter} alt="filter icon" className="w-[15px]" />
                <p className="hidden md:block">Sort</p>
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
                <p className="hidden md:block">Export</p>
              </div>
            </button>
          }
          items={exportMenuItems}
        />
      </div>
    </div>
  );
};
