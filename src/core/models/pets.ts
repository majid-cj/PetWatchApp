export type Weight = {
  imperial: string;
  metric: string;
};

export type Breed = {
  weight: Weight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
};

export type Category = {
  id: number;
  name: string;
};

export type PetImage = {
  breeds: Array<Breed>;
  id: string;
  url: string;
  width: number;
  height: number;
  categories?: Array<Category>;
};

export type PetApiResponse = PetImage[];

export type PetImageWithBreed = {
  breeds: [Breed, ...Array<Breed>];
} & PetImage;

export type PetImageWithoutBreed = {
  breeds: [];
} & PetImage;

export type Pets = PetImageWithBreed | PetImageWithoutBreed;

export type PetsList = Array<Pets>;
