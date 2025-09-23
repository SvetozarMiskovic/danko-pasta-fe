import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/i18n.ts';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeContextProvider } from './contexts/ThemeContextProvider.tsx';
import Login from './Components/AuthComponents/Login.tsx';
import Register from './Components/AuthComponents/Register.tsx';
import PokemonList from './Components/PokemonList/PokemonList.tsx';
import PokemonDetails from './Components/PokemonDetails/PokemonDetails.tsx';
import Layout from './Components/Layout/Layout.tsx';
import AuthProvider from './contexts/AuthContextProvider.tsx';
import { ToastProvider } from './contexts/ToastProvider.tsx';
import ProtectedComponent from './Components/AuthComponents/ProtectedComponent.tsx';
import GuestComponent from './Components/AuthComponents/GuestComponent.tsx';
import PokemonLocations from './Components/PokemonLocations.tsx';
import { SidebarProvider } from './contexts/SidebarProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedComponent>
        <Layout />
      </ProtectedComponent>
    ), // Wrap main app routes with Layout
    children: [
      {
        index: true, // Make App the index route
        element: (
          <ProtectedComponent>
            <App />
          </ProtectedComponent>
        ),
      },
      {
        path: 'pokemons',
        element: (
          <ProtectedComponent>
            <PokemonList />
          </ProtectedComponent>
        ),
      },
      {
        path: 'pokemons/:pokemonId',
        element: (
          <ProtectedComponent>
            <PokemonDetails />
          </ProtectedComponent>
        ),
      },
      {
        path: 'pokemons/locations',
        element: (
          <ProtectedComponent>
            <PokemonLocations />
          </ProtectedComponent>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <GuestComponent>
        <Login />
      </GuestComponent>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestComponent>
        {' '}
        <Register />
      </GuestComponent>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <SidebarProvider>
        <ToastProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ToastProvider>
      </SidebarProvider>
    </ThemeContextProvider>
  </StrictMode>
);
