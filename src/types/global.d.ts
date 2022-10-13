interface NamedAPIResource {
  name: string;
  url: string;
}

interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}
