# Reddit-Like-App

Reddit-Like-App to aplikacja webowa inspirowana Redditem, stworzona przy użyciu React, TypeScript oraz szeregu nowoczesnych narzędzi takich jak Vite, Bun, TailwindCSS, Jotai, Docker, Nginx oraz PocketBase (BaaS). Użytkownicy mogą rejestrować konta, dodawać posty oraz głosować na nie w czasie rzeczywistym. Posty są dynamicznie sortowane według liczby głosów, a zmiany są automatycznie aktualizowane dzięki funkcjom real-time PocketBase.

## Technologie
- **Frontend**: React, Vite, TypeScript, TailwindCSS, PostCSS, Jotai
- **Backend**: PocketBase (Backend as a Service)
- **Serwowanie aplikacji**: Nginx, Docker
- **Inne**: Obsługa realtime za pomocą PocketBase

## Funkcje
- Tworzenie kont użytkowników
- Dodawanie postów
- Głosowanie na posty (dodawanie/odejmowanie punktów)
- Dynamiczne sortowanie postów według liczby głosów
- Aktualizacje w czasie rzeczywistym dzięki PocketBase

## Wymagania
- Bun
- Docker (jeśli chcesz uruchomić aplikację w kontenerze)
- PocketBase (BaaS) - uruchomiony lokalnie lub zdalnie
