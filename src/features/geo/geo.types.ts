interface AddressDto {
  region: string;
  typeLocality: string;
  locality: string;
  street: string;
  district: string;
  houseNumber: string;
  fullAddress: string;
}

export interface Geo {
  id: string;
  name: string;
  type: string;
  latitude: string;
  longitude: string;
  description: string;
  note: string;
  designation: string;
  addressDto: AddressDto;
  photoList: string[];
  videoList: string[];
  audioList: string[];
}
