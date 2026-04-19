// Local type definitions (no Wix dependency needed)
export interface WixDataItem {
  _id: string;
  [key: string]: any;
}

export type WixDataQueryResult = {
  items: WixDataItem[];
  totalCount?: number;
  hasNext: () => boolean;
};
