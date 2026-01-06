import { Layout } from '@/components/Layout/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { BranchesPage } from './BranchesPage/BranchesPage';
import { ProductsPage } from './ProductsPage/ProductsPage';
import { SuppliersPage } from './SuppliersPage/SuppliersPage';
import { ROUTES } from '@/contants/routes';

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
        element: <BranchesPage />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: ROUTES.SUPPLIERS,
        element: <SuppliersPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
