export interface SelectOption {
  value: string;
  label: string;
};

export interface UpdateControlProps {
  key: string;
  value: string | number;
};

export interface Rating {
  rate: number;
  count: number;
};

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageUrls: string[];
  tags: string[];
  rating: Rating;
};

export interface FilterControlsProps {
  categories: string[];
};

export interface FilterTypes {
  category: string;
  sort: string;
  ratings: string;
}