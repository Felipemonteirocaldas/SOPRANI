import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProductsPage from '@/components/pages/ProductsPage';
import CompanyPage from '@/components/pages/CompanyPage';
import EventsPage from '@/components/pages/EventsPage';
import NewsPage from '@/components/pages/NewsPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "products",
        element: <ProductsPage />,
        routeMetadata: {
          pageIdentifier: 'products',
        },
      },
      {
        path: "company",
        element: <CompanyPage />,
        routeMetadata: {
          pageIdentifier: 'company',
        },
      },
      {
        path: "events",
        element: <EventsPage />,
        routeMetadata: {
          pageIdentifier: 'events',
        },
      },
      {
        path: "news",
        element: <NewsPage />,
        routeMetadata: {
          pageIdentifier: 'news',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
