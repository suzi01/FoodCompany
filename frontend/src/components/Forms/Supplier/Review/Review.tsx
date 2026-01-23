import { CreateSupplier } from '@/models/Supplier';

interface ReviewProps {
  data: CreateSupplier;
  setActive: (step: number) => void;
}

interface ReviewSectionProps {
  title: string;
  stepNumber: number;
  items: Array<{ label: string; value: string | number }>;
  setActive: (step: number) => void;
}

const ReviewSection = ({
  title,
  stepNumber,
  items,
  setActive,
}: ReviewSectionProps) => (
  <div>
    <div className="flex justify-between font-medium text-lg mb-4">
      <h2 className="font-medium text-xl">{title}</h2>
      <button onClick={() => setActive(stepNumber)}>Edit</button>
    </div>
    <div className="md:grid grid-cols-2 gap-6 mb-6">
      {items.map((item, index) => (
        <div key={index}>
          <h4 className="text-gray-500 font-semibold mb-1">{item.label}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

// const MiniCards = ({ item }: { item: string }) => (
//   <div className=“p-2 border border-gray-400 rounded-md bg-white”>
//     <p>{item}</p>
//   </div>
// );

export const Review = ({ data, setActive }: ReviewProps) => {
  const basicInfoItems = [
    { label: 'Supplier Name', value: data.companyName },
    { label: 'Years Active', value: '0 years' },
    { label: 'Documentation', value: 'supplier_agreement.pdf' },
  ];

  const contactDetailsItems = [
    { label: 'Contact Name', value: data.mainContactName },
    { label: 'Email Address', value: data.email },
    {
      label: 'Phone number',
      value: data.phoneNumber !== undefined ? data.phoneNumber : 'N/A',
    },
    {
      label: 'Office Address',
      value: data.address !== undefined ? data.address : 'N/A',
    },
  ];

  return (
    <div className="p-4 md:p-10 flex flex-col gap-6">
      <ReviewSection
        title="Basic Info"
        stepNumber={0}
        items={basicInfoItems}
        setActive={setActive}
      />
      <ReviewSection
        title="Contact Details"
        stepNumber={1}
        items={contactDetailsItems}
        setActive={setActive}
      />
    </div>
  );
};
