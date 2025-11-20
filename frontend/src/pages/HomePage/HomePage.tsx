import { Card } from '@/components/common/Card';
import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 mt-7">
      <p>Home</p>
      <Card borderColor="green">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-3xl font-bold mb-4">
              Awards & Accomplishments
            </h1>
            <p className="mb-4 text-xl">
              At our core, we're dedicated to excellence—from the quality of our
              ingredients to the relationships we build with our partners. We're
              proud of the recognition we've received, as it reflects our
              commitment to innovation, sustainability, and community. Here are
              some of our notable achievements:
            </p>

            <p className="mb-4">
              "Best New Restaurant" (2024): Awarded for our innovative approach
              to flavor and our commitment to using locally-sourced ingredients.
            </p>

            <p className="mb-4">
              "Sustainable Supplier of the Year" (2023): Acknowledged for our
              strong partnerships with eco -friendly and ethical food suppliers,
              a testament to our focus on responsible business practices.
            </p>
          </div>
          <div className="width-1/3">
            <img src="/awards/award1.jpg" alt="Award 1" />
          </div>
        </div>
      </Card>
      <div className="flex gap-4">
        <Card className="flex flex-col gap-6">
          <img src="/awards/award1.jpg" alt="Award 1" />
          <p>
            We believe that great food has the power to bring people together,
            and we're honored to be recognized for our efforts in creating
            memorable dining experiences. These awards inspire us to continue
            pushing the boundaries of culinary excellence and to uphold our
            values in everything we do.
          </p>
          <Link to="/awards" className="text-blue-500 underline">
            Learn more about our awards
          </Link>
        </Card>
        <Card>
          <p>
            We believe that great food has the power to bring people together,
            and we're honored to be recognized for our efforts in creating
            memorable dining experiences. These awards inspire us to continue
            pushing the boundaries of culinary excellence and to uphold our
            values in everything we do.
          </p>
        </Card>
        <Card>
          <p>
            We believe that great food has the power to bring people together,
            and we're honored to be recognized for our efforts in creating
            memorable dining experiences. These awards inspire us to continue
            pushing the boundaries of culinary excellence and to uphold our
            values in everything we do.
          </p>
        </Card>
      </div>
    </div>
  );
};
