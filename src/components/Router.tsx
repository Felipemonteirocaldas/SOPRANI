import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import SEOHead from '@/components/SEOHead';
import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import '../i18n/config';

// Lazy loading das páginas (Mantenha como está, é ótimo para performance)
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const MachineryPage = lazy(() => import('@/components/pages/MachineryPage'));
const SparePartsPage = lazy(() => import('@/components/pages/SparePartsPage'));
const TechnicalAssistancePage = lazy(() => import('@/components/pages/TechnicalAssistancePage'));
const TradingMaterialsPage = lazy(() => import('@/components/pages/TradingMaterialsPage'));
const IndustriesPage = lazy(() => import('@/components/pages/IndustriesPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const RequestQuotationPage = lazy(() => import('@/components/pages/RequestQuotationPage'));
const ProductsPage = lazy(() => import('@/components/pages/ProductsPage'));
const CompanyPage = lazy(() => import('@/components/pages/CompanyPage'));
const EventsPage = lazy(() => import('@/components/pages/EventsPage'));
const NewsPage = lazy(() => import('@/components/pages/NewsPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-primary">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
  </div>
);

function Layout() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <ScrollProgressBar />
      {/* ✦ Dynamic SEO: title, description, og tags, html[lang] */}
      <SEOHead />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
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
      },
      { path: "home", element: <Navigate to="/" replace /> },
      { path: "about", element: <Suspense fallback={<LoadingFallback />}><AboutPage /></Suspense> },
      { path: "services", element: <Suspense fallback={<LoadingFallback />}><ServicesPage /></Suspense> },
      { path: "machinery", element: <Suspense fallback={<LoadingFallback />}><MachineryPage /></Suspense> },
      { path: "spare-parts", element: <Suspense fallback={<LoadingFallback />}><SparePartsPage /></Suspense> },
      { path: "technical-assistance", element: <Suspense fallback={<LoadingFallback />}><TechnicalAssistancePage /></Suspense> },
      { path: "trading-materials", element: <Suspense fallback={<LoadingFallback />}><TradingMaterialsPage /></Suspense> },
      { path: "industries", element: <Suspense fallback={<LoadingFallback />}><IndustriesPage /></Suspense> },
      { path: "contact", element: <Suspense fallback={<LoadingFallback />}><ContactPage /></Suspense> },
      { path: "request-quotation", element: <Suspense fallback={<LoadingFallback />}><RequestQuotationPage /></Suspense> },
      { path: "products", element: <Suspense fallback={<LoadingFallback />}><ProductsPage /></Suspense> },
      { path: "company", element: <Suspense fallback={<LoadingFallback />}><CompanyPage /></Suspense> },
      { path: "events", element: <Navigate to="/news?tab=events" replace /> },
      { path: "news", element: <Suspense fallback={<LoadingFallback />}><NewsPage /></Suspense> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
], {
  basename: "/",
});

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}