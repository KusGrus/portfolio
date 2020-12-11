export interface ShipList {
  id: number;
  image: string;
  name: string;
  weight_kg: number;
  weight_lbs: number;
  year_built: number;
  type: string;
  home_port: string;
  missions: Array<Mission>;
  active: boolean;
  roles: Array<string>;
  __typename?: string;
}

export interface ShipDetails {
  home_port: string;
  name: string;
  missions: Array<Mission>;
  weight_kg: number;
  weight_lbs: number;
  year_built: number;
  type: string;
  active: boolean;
}

export interface Filter {
  name: string;
  port: string;
  type: string;
}

export interface Mission {
  flight: string | number;
  name: string;
  __typename?: string;
}

export interface FilterOptions {
  port: Array<string>;
  type: Array<string>;
}

export interface PaginationConfig {
  page: number;
  itemPerPage: number;
  maximum: number;
}
