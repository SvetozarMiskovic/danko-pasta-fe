import en from '../locales/en/translation.json';

export type TranslationKeys = keyof typeof en;
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface Version {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface HeldItemVersion {
  rarity: number;
  version: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: HeldItemVersion[];
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface SpriteMap {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    'official-artwork': {
      front_default: string | Blob | null | PokemonImageCache;
      front_shiny: string;
    };
  };
  // Sometimes extended with other nested sprite maps; adjust as needed
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface TypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export type PokemonImageCache = {
  blob: Blob;
  url: string;
};

export interface SpriteMapCache extends SpriteMap {
  other: {
    'official-artwork': {
      front_shiny: string;
      front_default: PokemonImageCache;
    };
  };
}
export interface PokemonCache extends Pokemon {
  sprites: SpriteMapCache;
}
export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string; // URL as string
  moves: Move[];
  name: string;
  order: number;
  species: NamedAPIResource;
  sprites: SpriteMap;
  stats: Stat[];
  types: TypeSlot[];
  weight: number;
  cries: Cries;
}

export interface PokemonByIdResponse {
  data: Pokemon;
  success: boolean;
  message: string;
}

export type LocalizedName = {
  name: string;
  language: {
    name: 'en' | 'de' | string;
    url: string;
  };
};

export interface Ability {
  id: number;
  name: string;
  names: LocalizedName[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
}

export interface PokemonMoves {
  id: number;
  name: string;
  type: NamedAPIResource;
  names: LocalizedName[];
  accuracy: number | null;
  power: number | null;
  pp: number;
  damage_class: { name: string };
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version_group: { name: string };
  }[];
}

export interface PokemonType {
  id: number;
  name: string;
  names: LocalizedName[];
  move_damage_class: {
    name: string;
    url: string;
  };
  damage_relations: {
    double_damage_from: { name: string }[];
    double_damage_to: { name: string }[];
    half_damage_from: { name: string }[];
    half_damage_to: { name: string }[];
    no_damage_from: { name: string }[];
    no_damage_to: { name: string }[];
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  names: LocalizedName[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  genera: {
    genus: string;
    language: { name: string };
  }[];
  growth_rate: { name: string };
  habitat: { name: string };
}

export interface PokemonForm {
  id: number;
  name: string;
  form_name: string;
  names: LocalizedName[];
  is_battle_only: boolean;
  is_mega: boolean;
  is_default: boolean;
  sprites: {
    front_default: string | null;
  };
}
export type Language = 'en' | 'de' | 'sr' | 'sr-Latn';

export type SectionDetails = {
  abilities: Ability[] | null;
  moves: PokemonMoves[] | null;
  types: PokemonType[] | null;
  species: PokemonSpecies[] | null;
  forms: PokemonForm[] | null;
};

export type SectionLoading = {
  abilities: boolean;
  types: boolean;
  moves: boolean;
  forms: boolean;
  species: boolean;
};

export type RegisterUserParams = LoginUserParams & { name: string };
export interface AuthContextType {
  isAuthenticated: boolean;
  login: ({ email, password }: LoginUserParams) => Promise<LoginResponse>;
  logout: () => void;
  register: ({
    email,
    password,
    name,
  }: RegisterUserParams) => Promise<RegisterResponse>;
  user: User | null;
  isLoading: boolean;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  id: string;
}
export interface LoginResponse {
  message: string;
  success: boolean;
  id: string;
  email: string;
  name: string;
}
export interface RegisterResponse {
  message: string;
  id: string;
  success: boolean;
}

export type AuthResponse = {
  message: string;
  success: boolean;
  [key: string]: unknown;
};

export interface SpritesResponse {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}

export interface SpritesData {
  backDefault: Blob | null;
  backShiny: Blob | null;
  frontDefault: Blob | null;
  frontShiny: Blob | null;
}
export interface PokemonListData {
  name: string;
  url: string;
  id: string | undefined;
  sprites: SpritesResponse | SpritesData;
}

export interface PaginationMeta {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PokemonListItemResponse {
  success: boolean;
  message: string;
  data: PokemonListData[];
  pagination: PaginationMeta;
}

export type SpriteKeys =
  | 'backDefault'
  | 'backShiny'
  | 'frontDefault'
  | 'frontShiny';
