import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchParamsCapture = ({
  onParamsChange,
}: {
  onParamsChange: (params: string) => void;
}) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    onParamsChange(searchParams.toString());
  }, [searchParams, onParamsChange]);
  return null;
};
