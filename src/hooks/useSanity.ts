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
      .catch(setError)
      .finally(() => setLoading(false));
  }, [brand]);

  return { data, loading, error };
}

export function useNewsPosts() {
  const [data, setData] = useState<SanityNewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const query = `*[_type == "newsPost"] | order(publishedAt desc)`;
    
    sanityClient.fetch(query)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useEvents() {
  const [data, setData] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const query = `*[_type == "event"] | order(date asc)`;
    
    sanityClient.fetch(query)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
