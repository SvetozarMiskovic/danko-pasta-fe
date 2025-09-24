import env from '../env';
const isDev = env.VITE_NODE_ENV === 'development';

export const ENDPOINTS = {
  POKEMON_ALL: '/api/pokemons?',
  POKEMON_ID: '/api/pokemons/',
  REFRESH: '/api/auth/refresh',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/auth/register',
  LOCATIONS: '/api/pokemons/locations?',
};

export const URL_CONSTANTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    
  },
  REFRESH_USER: () =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.REFRESH}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.REFRESH}`,
  LOGIN_USER: () =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.LOGIN}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.LOGIN}`,
  LOGOUT_USER: () =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.LOGOUT}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.LOGOUT}`,
  REGISTER_USER: () =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.REGISTER}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.REGISTER}`,
  FETCH_POKEMON_ID: (id: string) =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.POKEMON_ID}${id}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.POKEMON_ID}${id}`,
  FETCH_POKEMON_ALL: (searchQuery: string) =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.POKEMON_ALL}${searchQuery}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.POKEMON_ALL}${searchQuery}`,
  FETCH_LOCATIONS: (searchQuery: string) =>
    isDev
      ? `${env.VITE_DEV_SERVER}${ENDPOINTS.LOCATIONS}${searchQuery}`
      : `${env.VITE_PROD_SERVER}${ENDPOINTS.LOCATIONS}${searchQuery}`,
};

export const LINK_CONSTANTS = {
  HOME: '/',
  POKEMONS: '/pokemons',
  LOCATIONS: '/pokemons/locations',
};
