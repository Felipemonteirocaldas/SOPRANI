import { useLocation } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

/**
 * SEOHead — mounts inside the RouterProvider tree.
 * Reads the current route and active language, then
 * imperatively updates <title>, <meta name="description">,
 * og:title, og:description, and <html lang="">.
 *
 * No external dependencies required (no react-helmet).
 */
export default function SEOHead() {
  const location = useLocation();
  useSEO(location.pathname);
  return null; // renders nothing — side-effects only
}
