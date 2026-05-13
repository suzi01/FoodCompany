import { Sidebar } from '@/components/Sidebar';

export const Header = () => {
  return (
    <div className="flex border-b border-gray-300 bg-white justify-center">
      <div className="flex justify-between items-center p-4 flex-row w-full max-w-7xl">
        <Sidebar
          pages={[
            { name: 'Home', path: '/' },
            { name: 'Suppliers', path: '/suppliers' },
            { name: 'Products', path: '/products' },
            { name: 'Branches', path: '/branches' },
          ]}
        />
        <div className="text-sm md:text-2xl">
          <p>NaturalFoods</p>
        </div>
        <div className="text-xs font-normal">
          <div>
            <p>Janine Wilson</p>
          </div>
          <div>
            <p>Janine.wilson@food.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
