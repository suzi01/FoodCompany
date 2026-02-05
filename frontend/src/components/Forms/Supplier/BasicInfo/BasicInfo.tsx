import Camera from '@/assets/icons/Camera.png';
import File from '@/assets/icons/OpenFolder.png';
import { Button } from '@/components/common/Button/Button';
import { Image } from '@/components/common/Image';
import { CreateSupplier } from '@/models/Supplier';
import { ChangeEvent, useRef } from 'react';
import { Input } from '@/components/common/Input';

interface BasicInfoProps {
  data: CreateSupplier;
  changedData: (field: string, value: string) => void;
}

export const BasicInfo = ({ data, changedData }: BasicInfoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      changedData('documentation', file.name);
      console.log('File selected:', file);
    }
  };

  const handleCameraCapture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      changedData('documentation', file.name);
      console.log('Photo taken:', file);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <Input
        required
        className="flex flex-col gap-1"
        label="Supplier Name *"
        id="supplier"
        value={data.companyName}
        onChange={(e) => changedData(e.target.name, e.target.value)}
      />

      <div className={`flex flex-col gap-1 `}>
        <label htmlFor="documentation" className=" text-gray-500">
          Documentation
        </label>
        <div className="flex justify-center items-center flex-col border-2 border-dashed border-gray-300 p-6 rounded-md">
          <p>Click to add or drop here</p>
          <div className="flex gap-4 mt-4">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            <Button
              variant="tertiary"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex gap-3 items-center ">
                <Image src={File} alt="file icon" className="w-7 flex" />
                Upload File
              </div>
            </Button>
            <input
              ref={cameraInputRef}
              type="file"
              onChange={handleCameraCapture}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />

            <Button
              variant="tertiary"
              onClick={() => cameraInputRef.current?.click()}
            >
              <div className="flex gap-3 items-center">
                <Image src={Camera} alt="camera icon" className="w-7 " />
                Use camera
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
