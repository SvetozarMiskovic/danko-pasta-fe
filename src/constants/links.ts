import { Bug, Home, LocateIcon } from 'lucide-react';

export const links = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: Home,
  },
  {
    id: 2,
    text: 'Pokemons',
    path: '/pokemons',
    Icon: Bug,
  },
  {
    id: 3,
    text: 'Locations',
    path: '/pokemons/locations',
    icon: LocateIcon,
  },
];
