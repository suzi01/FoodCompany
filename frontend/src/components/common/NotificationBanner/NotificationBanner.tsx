
import Info from '@/assets/icons/Information.png';
import { Image } from '@/components/common/Image/Image';

interface NotificationBannerProps {
  type: 'info' | 'warning' | 'error';
  message: string;
}

const typeToIconMap: Record<string, string> = {
  info: Info,
  warning: Info,
  error: Info,
};

const typeToColorMap: Record<string, string> = {
  info: 'blue',
  warning: 'yellow',
  error: 'red',
};

export const NotificationBanner = ({
  type,
  message,
}: NotificationBannerProps) => {
  return (
    <div
      className={`flex gap-3 p-4 border border-${typeToColorMap[type]}-200 bg-${typeToColorMap[type]}-50 rounded-md mb-4`}
    >
      <Image src={typeToIconMap[type]} alt={type} width={24} />
      <p>{message}</p>
    </div>
  );
};
