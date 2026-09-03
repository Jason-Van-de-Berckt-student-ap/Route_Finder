# De Palethoeve Routeplanner

Mobiele MVP voor planners en chauffeurs van maaltijdleveringen. De huidige versie bevat een dashboard met fictieve demo-data, CSV-import feedback, routeoverzicht, Google Maps-deeplink en chauffeursmodus.

## Lokaal starten

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

## Belangrijkste interacties

- Klik op **Nieuwe route** om een CSV/Excel-bestand te kiezen.
- Klik op **Chauffeursmodus** om de mobiele flow te testen.
- Gebruik **Geleverd** of **Overslaan**; de volgende actieve stop wordt automatisch gekozen.
- **Navigeer** opent Google Maps met het huidige adres.

De demo gebruikt uitsluitend fictieve klanten en adressen in de regio Brecht. Database, authenticatie, echte geocoding en route-optimalisatie zijn bewust als volgende backendlaag opengehouden.

## Server starten met Docker Compose

1. Installeer Docker Engine en de Docker Compose-plugin op de server.
2. Maak een productieomgeving aan:

```bash
cp .env.production.example .env.production
```

Vul daarna eventuele provider-sleutels in. Start de app met:

```bash
docker compose up -d --build
docker compose ps
```

De app is dan beschikbaar op `http://SERVER-IP:3000`. Gebruik voor publiek verkeer een reverse proxy zoals Caddy of Nginx met HTTPS. Stoppen kan met `docker compose down`; logs bekijk je met `docker compose logs -f palethoeve`.

De huidige MVP heeft geen database nodig om te starten. `DATABASE_URL` en `AUTH_SECRET` staan al in het voorbeeldbestand klaar voor de volgende backendfase.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
