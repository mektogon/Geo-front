interface AddressDto {
  region: string;
  typeLocality: string;
  locality: string;
  street: string;
  district: string;
  houseNumber: string;
  fullAddress: string;
}

export interface Response {
  Search: Search[];
  totalResults: string;
  Response: string;
}

export interface Search {
  name: string;
  id: number;
}

export interface Photo {
  id: number;
  url: string;
}

export interface Video {
  id: number;
  url: string;
}

export interface Audio {
  id: number;
  url: string;
}

export interface Geo {
  id?: number;
  name?: string;
  type?: string;
  latitude?: string;
  isPlaying?: boolean;
  longitude?: string;
  description?: string;
  note?: string;
  designation?: string;
  addressDto?: AddressDto;
  photoList?: Photo[];
  videoList?: Video[];
  audioList?: Audio[];
}

export type TGeo = Geo[];
