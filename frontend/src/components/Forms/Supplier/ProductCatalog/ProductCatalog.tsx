import React from 'react';

import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';

export const ProductCatalog = () => {
  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2  py-4 max-h-[620px] overflow-y-auto p-6">
          <Card className="flex justify-between p-3 items-center">
            <div>
              <p className="font-semibold">Organic Eggs(Organic)</p>
              <p className="text-gray-400">Category: Dairy & eggs</p>
            </div>
            <p className="text-gray-400">£4.50/lb</p>
            <Button variant="primary">Add</Button>
          </Card>
        </div>

        <div className="flex flex-col max-h-[620px] overflow-y-auto gap-2 py-4 p-6">
          <Card className="flex justify-between p-3 items-center">
            <div>
              <p className="font-semibold">Organic Eggs(Organic)</p>
              <p className="text-gray-400">Category: Dairy & eggs</p>
            </div>
            <p className="text-gray-400">£4.50/lb</p>
            <Button variant="primary">Remove</Button>
          </Card>
          <Button variant="tertiary" className="p-3 border mt-auto">
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};
