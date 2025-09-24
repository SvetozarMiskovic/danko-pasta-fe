import { Bug, Home, LocateIcon } from 'lucide-react';
import { LINK_CONSTANTS } from '.';

export const links = [
  {
    id: 1,
    text: 'Home',
    path: LINK_CONSTANTS.HOME,
    icon: Home,
  },
  {
    id: 2,
    text: 'Pokemons',
    path: LINK_CONSTANTS.POKEMONS,
    Icon: Bug,
  },
  {
    id: 3,
    text: 'Locations',
    path: LINK_CONSTANTS.LOCATIONS,
    icon: LocateIcon,
  },
];
