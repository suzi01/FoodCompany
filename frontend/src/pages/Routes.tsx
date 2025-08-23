import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>hello</p>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
