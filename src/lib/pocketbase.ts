import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://rla-pb.garandplg.com').autoCancellation(false);

// Inicjacja połączenia z moją instancją pocketbase
// oraz wyeksportowanie tego połączenia
// by było łatwo dostępne w projekcie.
