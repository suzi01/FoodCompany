import Export from '@/assets/export.svg';
import Filter from '@/assets/filter.svg';

import { useState } from 'react';

import { BasicMenu } from '../../BasicMenu';
import { Drawer } from '../../Drawer';
import { FilterAndSortForm } from '../../Form/FilterAndSortForm';
import { Image } from '../../Image/Image';

interface TablePropsWithFilter {
  hasStatusFilter: true;
  filteredStatus: string;
  setFilterStatus: (value: string) => void;
  filterItems: string[];
}

interface TablePropsWithNoFilter {
  hasStatusFilter: false;
  filteredStatus?: never;
  setFilterStatus?: never;
  filterItems: string[];
}

type TableFilterProps = TablePropsWithFilter | TablePropsWithNoFilter;

const exportMenuItems = [
  { label: 'CSV' },
  { label: 'Excel' },
  { label: 'PDF' },
];

const StatusButton = ({
  status,
  isActive,
  onClick,
}: {
  status: string;
  isActive: boolean;
  onClick: (status: string) => void;
}) => (
  <button
    onClick={() => onClick(status)}
    className={`p-2.5 ${
      isActive
        ? 'border-b-[3px] border-[#3C4CE3] pt-[2px]'
        : 'border-b-transparent pt-[0px]'
    }`}
  >
    {status}
  </button>
);

export const TableFilter = ({
  hasStatusFilter = false,
  filteredStatus,
  setFilterStatus,
  filterItems,
}: TableFilterProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex mb-4 pb-4 border-b border-gray-[#ccc]">
      {hasStatusFilter &&
        filteredStatus !== undefined &&
        setFilterStatus !== undefined && (
          <>
            <div className="hidden md:flex place-items-start">
              <StatusButton
                status="All"
                isActive={filteredStatus === 'All'}
                onClick={setFilterStatus}
              />
              <StatusButton
                status="Pending"
                isActive={filteredStatus === 'Pending'}
                onClick={setFilterStatus}
              />
              <StatusButton
                status="Inactive"
                isActive={filteredStatus === 'Inactive'}
                onClick={setFilterStatus}
              />
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
          </>
        )}
      <div className="flex gap-[12px] place-items-end ml-auto">
        <button
          className="border border-[#bcbcbc] rounded-[8px] px-3 py-1.5"
          onClick={() => setOpened(true)}
        >
          <div className="flex items-center gap-1.5">
            <Image src={Filter} alt="filter icon" className="w-[15px]" />
            <p className="hidden md:block">Filter & Sort</p>
          </div>
        </button>

        <Drawer
          opened={opened}
          setOpened={setOpened}
          children={<FilterAndSortForm filterItems={filterItems} />}
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
