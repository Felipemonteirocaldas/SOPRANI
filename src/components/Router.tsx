import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { lazy, Suspense } from 'react';

const SplashPage = lazy(() => import('@/components/pages/SplashPage'));
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const MachineryPage = lazy(() => import('@/components/pages/MachineryPage'));
const SparePartsPage = lazy(() => import('@/components/pages/SparePartsPage'));
const TechnicalAssistancePage = lazy(() => import('@/components/pages/TechnicalAssistancePage'));
const TradingMaterialsPage = lazy(() => import('@/components/pages/TradingMaterialsPage'));
const IndustriesPage = lazy(() => import('@/components/pages/IndustriesPage'));
const MPHPage = lazy(() => import('@/components/pages/MPHPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const RequestQuotationPage = lazy(() => import('@/components/pages/RequestQuotationPage'));
const ProductsPage = lazy(() => import('@/components/pages/ProductsPage'));
const CompanyPage = lazy(() => import('@/components/pages/CompanyPage'));
const EventsPage = lazy(() => import('@/components/pages/EventsPage'));
const NewsPage = lazy(() => import('@/components/pages/NewsPage'));

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
        path: "splash",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SplashPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'splash',
        },
      },
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
        path: "about",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ServicesPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'services',
        },
      },
      {
        path: "machinery",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MachineryPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'machinery',
        },
      },
      {
        path: "spare-parts",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SparePartsPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'spare-parts',
        },
      },
      {
        path: "technical-assistance",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TechnicalAssistancePage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'technical-assistance',
        },
      },
      {
        path: "trading-materials",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TradingMaterialsPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'trading-materials',
        },
      },
      {
        path: "industries",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <IndustriesPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'industries',
        },
      },
      {
        path: "mph",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MPHPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'mph',
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
        path: "request-quotation",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RequestQuotationPage />
          </Suspense>
        ),
        routeMetadata: {
          pageIdentifier: 'request-quotation',
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
