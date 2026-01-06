import { Card } from '@/components/common/Card';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Image } from '@/components/common/Image';
import { Heading } from '@/components/common/Heading';
import Fruits from '@/assets/FruitsAndVeg.jpg';
import Branch from '@/assets/Branches.png';
import FreshProduce from '@/assets/FreshProduce.png';
import SupplierIcon from '@/assets/Suppliers.png';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 mt-7">
      <p>Home</p>
      <Card borderColor="green">
        <div className="justify-center mb-6">
          <Heading
            level={1}
            className="text-3xl mt-4 mb-6 underline underline-offset-8 text-[#2d5016] font-semibold"
          >
            Awards & Accomplishments
          </Heading>
          <Image src={Fruits} alt="food bowl" className="rounded-lg" />
        </div>
        <div>
          <p className="mb-4">
            At our core, we're dedicated to excellence—from the quality of our
            ingredients to the relationships we build with our partners. We're
            proud of the recognition we've received, as it reflects our
            commitment to innovation, sustainability, and community. Here are
            some of our notable achievements:
          </p>
          <p className="mb-4">
            <span className="text-[#2d5016] font-medium text-lg">
              "Best New Restaurant"
            </span>{' '}
            (2024): Awarded for our innovative approach to flavor and our
            commitment to using locally-sourced ingredients.
          </p>

          <p className="mb-4">
            <span className="text-[#2d5016] font-medium text-lg">
              "Sustainable Supplier of the Year"
            </span>{' '}
            (2023): Acknowledged for our strong partnerships with eco-friendly
            and ethical food suppliers, a testament to our focus on responsible
            business practices.
          </p>
        </div>
      </Card>
      <div className="flex flex-col gap-6 md:flex-row md:gap-4">
        <Card className="flex flex-col gap-6 items-center">
          <Image src={Branch} alt="branch icon" className="w-1/3 flex" />
          <p>
            Find a store near you and learn more about our local teams and
            offerings.
          </p>
          <ButtonLink to="/branches">Find a branch</ButtonLink>
        </Card>
        <Card className="flex flex-col gap-6 items-center">
          <Image src={FreshProduce} alt="produce icon" className="w-1/3 flex" />
          <p>
            Browse our full selection of food products, from fresh produce to
            gourmet specialties.
          </p>
          <ButtonLink to="/products">View all products</ButtonLink>
        </Card>
        <Card className="flex flex-col gap-6 items-center">
          <Image
            src={SupplierIcon}
            alt="suppliers icon"
            className="w-1/3 flex"
          />
          <p>
            Explore the trusted companies who provide us with the highest
            quality ingredients.
          </p>
          <ButtonLink to="/suppliers">Discover our suppliers</ButtonLink>
        </Card>
      </div>
    </div>
  );
};
