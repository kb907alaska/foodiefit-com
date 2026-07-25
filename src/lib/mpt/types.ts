/**
 * Raw Meal Prep Tech (MPT) Production API Types
 */

export interface MPTImage {
  size: 'small' | 'medium' | 'large';
  url: string;
}

export interface MPTTag {
  id: string;
  name: string;
}

export interface MPTOption {
  id: string;
  text: string;
  price?: number;
}

export interface MPTVariation {
  id: string;
  name: string;
  options: MPTOption[];
}

export interface MPTProduct {
  id: string;
  sku?: string;
  name: string;
  description?: string;
  specifications?: string;
  price: number;
  categories?: string[];
  tags?: MPTTag[];
  images?: MPTImage[][];
  variations?: MPTVariation[];
  available?: boolean;
}

export interface MPTProductsAllResponse {
  products: MPTProduct[];
  status?: string;
  total?: number;
}

export interface MPTDeliveryZoneResponse {
  eligible: boolean;
  zipCode: string;
  earliestDate?: string;
  deliveryFee?: number;
  minOrder?: number;
  timeWindow?: string;
}
