# Our Little World

Website cerita interaktif kecil untuk Panda dan Bebek, dibuat dengan Next.js, TypeScript, Tailwind CSS, dan Framer Motion.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Content editing

Semua content configuration ada di `src/data/content.ts`:

- `relationshipConfig.startDate` menyalakan live relationship counter.
- `characters` berisi nama, nickname, background, dan fun fact Panda/Bebek.
- `memories` berisi tanggal, lokasi, caption, cover image, dan foto tambahan. Urutkan object secara chronological.
- `projects` berisi project bersama. Link kosong otomatis menjadi `Coming soon` tanpa fake URL.
- `siteConfig.instagramUrl` dan `social.handles` mengatur akun Instagram. Tombol hanya muncul jika URL asli diisi.
- `messages` berisi copy utama halaman.

Asset foto dapat diletakkan memakai struktur `public/images/memories/memory-01/main.jpg` dan foto tambahannya di folder yang sama. Asset project ada di `public/images/projects/`, asset karakter di `public/images/panda/` dan `public/images/duck/`, serta audio opsional di `public/audio/`. Versi awal menggunakan karakter CSS dan fallback visual agar website tetap tampil tanpa asset wajib.
