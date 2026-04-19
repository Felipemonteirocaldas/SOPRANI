/**
 * LOCAL MOCK — BaseCrudService
 * Reads data from src/data/*.json so the app works without a Wix backend.
 * Keeps the exact same public API as the real Wix implementation.
 */

// ---------------------------------------------------------------------------
// JSON data imports (Vite/Astro resolve these at build time)
// ---------------------------------------------------------------------------
// @ts-ignore – JSON imports work fine with Vite; TS may complain without resolveJsonModule
import newsData from '../../src/data/news.json';
// @ts-ignore
import eventsData from '../../src/data/events.json';
// @ts-ignore
import productsData from '../../src/data/productsolutions.json';
// @ts-ignore
import subsidiariesData from '../../src/data/subsidiaries.json';

// ---------------------------------------------------------------------------
// Types (mirror the real service so consumers don't need changes)
// ---------------------------------------------------------------------------
export interface WixDataItem {
  _id: string;
  [key: string]: any;
}

export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  hasNext: boolean;
  currentPage: number;
  pageSize: number;
  nextSkip: number | null;
}

export interface RefFieldMeta {
  totalCount: number;
  returnedCount: number;
  hasMore: boolean;
}

// ---------------------------------------------------------------------------
// Collection registry
// ---------------------------------------------------------------------------
const COLLECTIONS: Record<string, any[]> = {
  news: newsData as any[],
  events: eventsData as any[],
  productsolutions: productsData as any[],
  products: productsData as any[],
  subsidiaries: subsidiariesData as any[],
};

function getCollection(collectionId: string): any[] {
  const key = collectionId.toLowerCase();
  if (COLLECTIONS[key]) return COLLECTIONS[key];
  console.warn(`[MockBaseCrudService] Collection "${collectionId}" not found – returning [].`);
  return [];
}

// ---------------------------------------------------------------------------
// BaseCrudService — same public API as the real Wix service
// ---------------------------------------------------------------------------
export class BaseCrudService {
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[],
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    const allItems = getCollection(collectionId) as T[];
    const limit = Math.min(pagination?.limit ?? 50, 1000);
    const skip = pagination?.skip ?? 0;
    const page = allItems.slice(skip, skip + limit);
    const hasNext = skip + limit < allItems.length;

    return {
      items: page,
      totalCount: allItems.length,
      hasNext,
      currentPage: Math.floor(skip / limit),
      pageSize: limit,
      nextSkip: hasNext ? skip + limit : null,
    };
  }

  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    _includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[]
  ): Promise<T | null> {
    const allItems = getCollection(collectionId) as T[];
    return allItems.find((item) => item._id === itemId) ?? null;
  }

  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    _multiReferences?: Record<string, any>
  ): Promise<T> {
    console.warn('[MockBaseCrudService] create() is a no-op in mock mode.');
    return { _id: 'mock-id', ...itemData } as T;
  }

  static async update<T extends WixDataItem>(
    collectionId: string,
    itemData: T
  ): Promise<T> {
    console.warn('[MockBaseCrudService] update() is a no-op in mock mode.');
    return itemData;
  }

  static async delete<T extends WixDataItem>(
    collectionId: string,
    itemId: string
  ): Promise<T> {
    console.warn('[MockBaseCrudService] delete() is a no-op in mock mode.');
    return { _id: itemId } as T;
  }

  static async addReferences(
    _collectionId: string,
    _itemId: string,
    _references: Record<string, string[]>
  ): Promise<void> {
    console.warn('[MockBaseCrudService] addReferences() is a no-op in mock mode.');
  }

  static async removeReferences(
    _collectionId: string,
    _itemId: string,
    _references: Record<string, string[]>
  ): Promise<void> {
    console.warn('[MockBaseCrudService] removeReferences() is a no-op in mock mode.');
  }
}
