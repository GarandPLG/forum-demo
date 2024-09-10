import { atom } from 'jotai';
import { pb } from '../lib/pocketbase';

export const authAtom = atom(pb.authStore.isValid);

export const updateAuthAtom = atom(
  (get) => get(authAtom),
  (_, set) => {
    set(authAtom, pb.authStore.isValid);
  }
);

// Utworzenie store przy użyciu Jotai 
// do przechowywania danych o zalogowanym 
// użytkowniku między komponentami.
