import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('@/components/pages/HomePage'));
const ProductsPage = lazy(() => import('@/components/pages/ProductsPage'));
const CompanyPage = lazy(() => import('@/components/pages/CompanyPage'));
const EventsPage = lazy(() => import('@/components/pages/EventsPage'));
const NewsPage = lazy(() => import('@/components/pages/NewsPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));

const LoadingFallback = () => <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductsPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'products',
        },
      },
      {
        path: "company",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CompanyPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'company',
        },
      },
      {
        path: "events",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EventsPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'events',
        },
      },
      {
        path: "news",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NewsPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'news',
        },
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ContactPage />
          </Suspense>
        ),
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
