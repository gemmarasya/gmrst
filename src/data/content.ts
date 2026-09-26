export const siteConfig = {
  title: "Our Little World",
  eyebrow: "little things, somehow everything",
  description: "Sebuah ruang kecil untuk menyimpan hangatnya kita.",
  instagramUrl: "https://www.instagram.com/quacknboo",
  spotifyEmbedUrls: [
    "https://open.spotify.com/embed/album/5aelly3dAJd7yZlgUHpLBw?utm_source=generator&si=494c9bdbff994375",
    "https://open.spotify.com/embed/track/0BPOskXqLW4DaFTPodiPjD?utm_source=generator&si=788c243448944fed",
  ],
};

export const relationshipConfig = {
  startDate: "2025-09-25",
  label: "Since the day our little world began",
};

export const characters = {
  panda: {
    name: "Panda",
    nickname: "Resti Kamilah G",
    eyebrow: "The quiet one",
    story: "Sebelum menjadi bagian dari cerita kecil ini, Panda sudah lebih dulu mengumpulkan banyak ide kecil, tempat-tempat yang menenangkan, dan alasan untuk terus melangkah.",
    details: "Probolinggo · Kalem di awal · Fotografi",
    funFact: "Fun fact: Physical attack",
  },
  duck: {
    name: "Bebek",
    nickname: "Gemma Rasya A",
    eyebrow: "The bright one",
    story: "Sebelum dunia ini memiliki dua karakter, Bebek sudah lebih dulu membawa sedikit warna, rasa ingin tahu, dan keceriaan ke dalam setiap hari yang biasa.",
    details: "Surabaya · Sabar banget · Olahraga",
    funFact: "Fun fact: Turu an",
  },
};

export const messages = {
  hero: {
    title: "Di luasnya dunia, kita hanya perlu satu ruang untuk berdua.",
    body: "Tempat Panda dan Bebek pulang, tertawa, dan menulis halaman berikutnya bersama.",
    cta: "Masuk ke dunia kecil kita",
  },
  introduction: {
    eyebrow: "Meet the two of us",
    title: "Dua karakter. Satu cerita yang terus bergerak.",
    body: "Tidak semua momen perlu dijelaskan panjang-panjang. Beberapa cukup dirasakan, lalu disimpan baik-baik di sini.",
  },
  playful: {
    eyebrow: "A little pocket of joy",
    title: "Ketuk mereka. Lihat apa yang terjadi.",
    body: "Ada beberapa kejutan kecil yang sengaja ditinggalkan untuk kamu temukan.",
    reveal: "Kita selalu punya alasan kecil untuk tersenyum.",
  },
  closing: {
    eyebrow: "One more thing",
    title: "Halaman berikutnya masih menunggu kita.",
    body: "Dan kalau cerita ini punya satu hal yang pasti, aku masih mau menulis halaman berikutnya sama kamu.",
  },
};

const TONES = ["coral", "butter", "sky", "leaf", "coral", "butter", "sky", "leaf"] as const;

// ⬇ Tambah memory baru cukup tambah entry di sini.
// Kalau mau auto-detect 100%, lihat /api/memories route.
export const memories = [
  {
    id: 1,
    date: "YYYY-MM-DD",
    location: "Perpustakaan",
    title: "Perpus Date",
    description: "Awal yang sederhana. Duduk berdua di perpustakaan, diam-diam mulai nyaman.",
    coverImage: "/images/memories/memory-01/main.jpg",
    photos: ["/images/memories/memory-01/01.jpg", "/images/memories/memory-01/02.jpg"],
    tone: TONES[0],
  },
  {
    id: 2,
    date: "YYYY-MM-DD",
    location: "MEMOJI Studio",
    title: "First Studio Session",
    description: "Pose-pose konyol di depan kamera. Ternyata bareng kamu, gaya apapun jadi terasa natural.",
    coverImage: "/images/memories/memory-02/main.jpg",
    photos: ["/images/memories/memory-02/01.jpg", "/images/memories/memory-02/02.jpg"],
    tone: TONES[1],
  },
  {
    id: 3,
    date: "YYYY-MM-DD",
    location: "Puthuk Gragal",
    title: "first hiking date",
    description: "Mendaki bersama ke Puncak Puthuk Gragal. Capek, tapi pemandangan dan orangnya sama-sama worth it.",
    coverImage: "/images/memories/memory-03/main.jpg",
    photos: ["/images/memories/memory-03/01.jpg", "/images/memories/memory-03/02.jpg"],
    tone: TONES[2],
  },
  {
    id: 4,
    date: "YYYY-MM-DD",
    location: "MT. Pundak",
    title: " Moment",
    description: "Selfie bareng di depan cermin MEMOJI Studio. Senyum yang nggak perlu diarahkan.",
    coverImage: "/images/memories/memory-04/main.jpg",
    photos: ["/images/memories/memory-04/01.jpg", "/images/memories/memory-04/02.jpg"],
    tone: TONES[3],
  },
  {
    id: 5,
    date: "YYYY-MM-DD",
    location: "Photomatics Studio",
    title: "Silly Faces, Real Feels",
    description: "Photobooth session yang penuh tawa. Setiap frame punya ceritanya sendiri.",
    coverImage: "/images/memories/memory-05/main.jpg",
    photos: ["/images/memories/memory-05/01.jpg", "/images/memories/memory-05/02.jpg"],
    tone: TONES[4],
  },
  {
    id: 6,
    date: "YYYY-MM-DD",
    location: "Pakuwon City Mall",
    title: "Malam di Pakuwon",
    description: "Jalan-jalan malam di Pakuwon City Mall. Lampu-lampu taman jadi latar yang paling pas buat berdua.",
    coverImage: "/images/memories/memory-06/main.jpeg",
    photos: ["/images/memories/memory-06/01.jpg", "/images/memories/memory-06/02.jpg"],
    tone: TONES[5],
  },
];

export const vlogs = [
  {
    id: 1,
    title: "Our First Vlog",
    description: "Awal dari cerita kecil kita. Vlog pertama yang berisi momen sederhana, seru, dan jadi kenangan yang nggak terlupakan. ❤️",
    video: "https://www.youtube.com/embed/QtFnhOLGXiE?modestbranding=1&rel=0&showinfo=0",
  },
  {
    id: 2,
    title: "Mall Date at Galaxy Mall",
    description: "Menghabiskan waktu bersama di Galaxy Mall. Mulai dari jalan-jalan, ngobrol, makan, sampai menikmati waktu berdua. 🛍️✨",
    video: "https://www.youtube.com/embed/5XrKCAxSpAQ?modestbranding=1&rel=0&showinfo=0",
  },
  {
    id: 3,
    title: "Taman Harmoni Date",
    description: "Date santai di Taman Harmoni. Menikmati suasana, berjalan bersama, dan mengabadikan momen sederhana yang terasa spesial. 🌿🤍",
    video: "https://www.youtube.com/embed/B70diXvYjN4?modestbranding=1&rel=0&showinfo=0",
  },
  {
    id: 4,
    title: "Taman Prestasi & Boat Date",
    description: "Petualangan kecil kita di Taman Prestasi. Jalan-jalan, menikmati suasana, lalu ditutup dengan naik perahu bersama. 🚤🌅❤️",
    video: "https://www.youtube.com/embed/r7xlDH5imG4?modestbranding=1&rel=0&showinfo=0",
  },
];

export const projects = [
  { id: 1, title: "[PROJECT NAME]", description: "[SHORT PROJECT DESCRIPTION]", video: "", link: "", status: "coming-soon" },
  { id: 2, title: "[PROJECT NAME]", description: "[SHORT PROJECT DESCRIPTION]", video: "", link: "", status: "coming-soon" },
];

export const social = {
  eyebrow: "A door back to the real world",
  title: "Follow our little world.",
  handles: [{ label: "Our Instagram", username: "@quacknboo", url: siteConfig.instagramUrl }],
};
