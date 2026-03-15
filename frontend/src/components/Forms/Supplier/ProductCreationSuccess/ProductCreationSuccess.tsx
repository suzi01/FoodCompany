import Tick from '@/assets/icons/tick.svg';
import { Image } from '@/components/common/Image';

export const ProductCreationSuccess = () => {
  return (
    <div>
      <Image src={Tick} alt="Success" width={80} height={80} />
      <p>Link confirmed!</p>
      <p>
        The supplier has been successfully linked to the product. All associated
        products have been added and are active.
      </p>
    </div>
  );
};
