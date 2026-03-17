/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: events
 * Interface for IndustryEvents
 */
export interface IndustryEvents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  boothDetails?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage?: string;
  /** @wixFieldType url */
  eventUrl?: string;
}


/**
 * Collection ID: news
 * Interface for NewsandUpdates
 */
export interface NewsandUpdates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  headline?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType text */
  author?: string;
}


/**
 * Collection ID: productsolutions
 * Interface for ProductSolutions
 */
export interface ProductSolutions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  solutionName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  keyFeatures?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  solutionImage?: string;
  /** @wixFieldType text */
  specifications?: string;
}


/**
 * Collection ID: subsidiaries
 * Interface for Subsidiaries
 */
export interface Subsidiaries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  subsidiaryName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  websiteLink?: string;
  /** @wixFieldType number */
  foundingYear?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  logo?: string;
}
