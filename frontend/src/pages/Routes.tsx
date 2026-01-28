import { Layout } from '@/components/Layout/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { BranchSearch } from './BranchSearch';
import { ProductSearch } from './ProductSearch';
import { SupplierSearch } from './SuppliersSearch';
import { ROUTES } from '@/contants/routes';
import { EditBranchDetails } from './BranchDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.BRANCHES,
        element: <BranchSearch />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductSearch />,
      },
      {
        path: ROUTES.SUPPLIERS,
        element: <SupplierSearch />,
      },
      {
        path: ROUTES.BRANCH_EDIT,
        element: <EditBranchDetails />,
      },
      {
        path: ROUTES.BRANCH_TEST,
        element: <p>This is a test branch page</p>,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
