import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient';
import { SanityProduct, SanityNewsPost, SanityEvent } from '@/types/sanity';

export function useProducts(brand?: string) {
  const [data, setData] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const query = brand 
      ? `*[_type == "product" && brand == $brand] | order(order asc)`
      : `*[_type == "product"] | order(order asc)`;
    
    sanityClient.fetch(query, { brand })
      .then(setData)
      .catch(err => {
        console.error('Sanity fetch error (products):', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [brand]);

  return { data, loading, error };
}

export function useNewsPosts() {
  const [data, setData] = useState<SanityNewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Calculando a data de 2 anos atrás
    const d = new Date();
    d.setFullYear(d.getFullYear() - 2);
    const twoYearsAgo = d.toISOString();

    const query = `*[_type == "newsPost" && publishedAt >= $twoYearsAgo] | order(publishedAt desc)[0...10]`;
    
    sanityClient.fetch(query, { twoYearsAgo })
      .then(setData)
      .catch(err => {
        console.error('Sanity fetch error (news):', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useEvents() {
  const [data, setData] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Retain events from the past 6 months to display (and all future ones)
    const d = new Date();
    d.setMonth(d.getMonth() - 6);
    const sixMonthsAgo = d.toISOString();

    const query = `*[_type == "event" && date >= $sixMonthsAgo] | order(date desc)`;
    
    sanityClient.fetch(query, { sixMonthsAgo })
      .then(setData)
      .catch(err => {
        console.error('Sanity fetch error (events):', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
