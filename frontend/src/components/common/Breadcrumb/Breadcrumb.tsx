import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();
  let currentLink = '';

  const paths = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .map((path, index, array) => {
      const isLast = index === array.length - 1;
      currentLink += `/${path}`;
      return (
        <Link
          key={currentLink}
          to={currentLink}
          className={`capitalize text-xl ml-4 ${isLast ? 'text-blue-700 font-medium' : ''}`}
        >
          {path}
          {!isLast && ' > '}
        </Link>
      );
    });

  const breadcrumbs = [
    <Link key="home" to="/" className="flex flex-row">
      <p className="mr-4">{paths.length > 0 ? 'Home' : ''}</p>
      {paths.length > 0 && ' > '}
    </Link>,
    ...paths,
  ];

  return (
    <div className="capitalize text-xl pt-2 pb-2 mr-4 flex flex-row w-full">
      {breadcrumbs}
    </div>
  );
};
