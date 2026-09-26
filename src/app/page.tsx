"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Heart, Instagram, MapPin, Stars } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { characters, memories, messages, vlogs, relationshipConfig, siteConfig, social } from "@/data/content";

type CharacterKind = "panda" | "duck";

function Character({ kind, onClick }: { kind: CharacterKind; onClick: () => void }) {
  const isPanda = kind === "panda";
  return (
    <motion.button type="button" className={`character ${isPanda ? "panda" : "duck"}`} onClick={onClick} aria-label={`Ketuk ${isPanda ? "Panda" : "Bebek"}`} whileTap={{ scale: 0.92, rotate: isPanda ? -5 : 5 }} animate={{ y: [0, -7, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: isPanda ? 0 : 0.45 }}>
      <span className="head"><span className="ear left" /><span className="ear right" />{isPanda && <><span className="eye-patch left" /><span className="eye-patch right" /></>}<span className="face-eye left" /><span className="face-eye right" />{isPanda ? <span className="mouth" /> : <span className="beak" />}</span>
      <span className="body"><span className="belly" /><span className="arm left" /><span className="arm right" /></span>
    </motion.button>
  );
}

function Duration() {
  const [now, setNow] = useState<Date | null>(null);
  const validStart = /^\d{4}-\d{2}-\d{2}$/.test(relationshipConfig.startDate);
  useEffect(() => { if (!validStart) return; setNow(new Date()); const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, [validStart]);
  if (!validStart) return <div className="rounded-2xl border border-dashed border-[#2d2b2a]/20 bg-[#fffaf3]/60 p-6 text-center text-sm text-[#85766d]">Tambahkan tanggal mulai hubungan di <strong>src/data/content.ts</strong>.</div>;
  const start = new Date(`${relationshipConfig.startDate}T00:00:00`);
  const totalSeconds = now ? Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000)) : 0;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[[days, "days"], [hours, "hours"], [minutes, "minutes"], [seconds, "seconds"]].map(([value, label]) => <div key={label} className="rounded-xl bg-[#fffaf3] p-4 text-center shadow-[.3rem_.3rem_0_#e2d1b8]"><p className="display text-3xl font-extrabold sm:text-4xl">{String(value).padStart(2, "0")}</p><p className="mt-1 text-xs font-bold uppercase tracking-[.15em] text-[#a85d4e]">{label}</p></div>)}</div>;
}

type MemoryItem = (typeof memories)[number];

function MemoryCard({ memory, index }: { memory: MemoryItem; index: number }) {
  const [open, setOpen] = useState(false);
  const rotate = index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-1" : "-rotate-1";
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="memory-carousel-card"
    >
      <button
        type="button"
        className={`memory-photo tone-${memory.tone} ${rotate}`}
        onClick={() => setOpen((c) => !c)}
        aria-expanded={open}
        aria-label={`${open ? "Sembunyikan" : "Tampilkan"} foto ${memory.title}`}
      >
        {memory.coverImage && (
          <img className="photo-image" src={memory.coverImage} alt={memory.title} onError={(e) => { e.currentTarget.style.display = "none"; }} />
        )}
        <AnimatePresence>
          {open && memory.photos.map((photo, i) => (
            <motion.span
              key={photo}
              className={`extra-photo extra-${i}`}
              initial={{ opacity: 0, scale: 0.7, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, x: i % 2 ? 95 : -95, y: i % 2 ? -20 : 25, rotate: i % 2 ? 8 : -8 }}
              exit={{ opacity: 0, scale: 0.7, x: 0, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 170, damping: 18 }}
            >
              <img src={photo} alt={`foto ${i + 1}`} onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </motion.span>
          ))}
        </AnimatePresence>
      </button>
      {/* Hanya tampilkan lokasi */}
      <div className="mt-4 flex items-center gap-1.5 text-[#ffe1be]">
        <MapPin size={12} aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[.14em]">{memory.location}</p>
      </div>
    </motion.article>
  );
}

function Scrubber({ trackRef, accent }: { trackRef: React.RefObject<HTMLDivElement | null>; accent?: string }) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollMax, setScrollMax] = useState(1);
  const [clientWidth, setClientWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(1);
  const trackBarRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function sync() {
      if (!track) return;
      setScrollLeft(track.scrollLeft);
      setScrollMax(Math.max(1, track.scrollWidth - track.clientWidth));
      setClientWidth(track.clientWidth);
      setScrollWidth(track.scrollWidth);
    }
    track.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(track);
    sync();
    return () => { track.removeEventListener("scroll", sync); ro.disconnect(); };
  }, [trackRef]);

  // Thumb width = percentage of visible area vs total scroll width
  const thumbRatio = scrollWidth > 0 ? Math.max(0.08, clientWidth / scrollWidth) : 0.3;
  // Thumb left offset = progress * (1 - thumbRatio)
  const progress = scrollMax > 0 ? scrollLeft / scrollMax : 0;
  const thumbLeft = progress * (1 - thumbRatio) * 100;

  // Click on track → jump to that position
  function onTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    if (dragging.current) return;
    const bar = trackBarRef.current;
    const track = trackRef.current;
    if (!bar || !track) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    track.scrollLeft = ratio * scrollMax;
  }

  // Drag thumb
  function onThumbMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current?.scrollLeft ?? 0;
    const onMove = (ev: MouseEvent) => {
      const bar = trackBarRef.current;
      const track = trackRef.current;
      if (!bar || !track) return;
      const dx = ev.clientX - dragStartX.current;
      const barW = bar.offsetWidth;
      track.scrollLeft = dragStartScroll.current + (dx / barW) * scrollMax / (1 - thumbRatio);
    };
    const onUp = () => { dragging.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  const trackBg = accent ? "rgba(255,255,255,0.2)" : "rgba(45,43,42,0.1)";
  const thumbBg = accent ?? "#2d2b2a";

  return (
    <div
      ref={trackBarRef}
      className="scrubber-track"
      style={{ background: trackBg }}
      onClick={onTrackClick}
      role="scrollbar"
      aria-controls=""
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-orientation="horizontal"
      tabIndex={0}
      onKeyDown={(e) => {
        const track = trackRef.current;
        if (!track) return;
        const step = track.clientWidth * 0.75;
        if (e.key === "ArrowRight") track.scrollBy({ left: step, behavior: "smooth" });
        if (e.key === "ArrowLeft") track.scrollBy({ left: -step, behavior: "smooth" });
      }}
    >
      <div
        className="scrubber-thumb"
        style={{
          left: `${thumbLeft}%`,
          width: `${thumbRatio * 100}%`,
          background: thumbBg,
        }}
        onMouseDown={onThumbMouseDown}
      />
    </div>
  );
}


function MemoryCarousel() {
  const [items, setItems] = useState<MemoryItem[]>(memories);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    fetch("/api/memories")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setItems(data); })
      .catch(() => {});
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current);
  }
  function onMouseUp() { isDragging.current = false; }

  return (
    <div className="memory-carousel-wrapper">
      <div
        ref={trackRef}
        className="memory-carousel-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {items.map((m, i) => <MemoryCard key={m.id} memory={m} index={i} />)}
      </div>
      <Scrubber trackRef={trackRef} accent="#fffaf3" />
    </div>
  );
}

function VlogCarousel({ vlogs }: { vlogs: typeof import("@/data/content").vlogs }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current);
  }
  function onMouseUp() { isDragging.current = false; }

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {vlogs.map((vlog) => (
          <article key={vlog.id} className="carousel-card project-card">
            <div className="project-image">
              <iframe
                className="project-video"
                src={vlog.video}
                title={vlog.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="display text-lg font-extrabold">{vlog.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#66584e]">{vlog.description}</p>
            </div>
          </article>
        ))}
      </div>
      <Scrubber trackRef={trackRef} />
    </div>
  );
}

function Profile({ kind }: { kind: CharacterKind }) {
  const profile = characters[kind];
  return <article className={`profile-card ${kind === "panda" ? "profile-panda" : "profile-duck"}`}><div className="flex items-center justify-between"><span className="eyebrow">{profile.eyebrow}</span><span className="text-xl">{kind === "panda" ? "◒" : "✳"}</span></div><div className="profile-character"><Character kind={kind} onClick={() => undefined} /></div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a85d4e]">{profile.name} · {profile.nickname}</p><p className="mt-3 text-sm leading-7 text-[#66584e]">{profile.story}</p><p className="mt-4 text-sm font-bold text-[#85766d]">{profile.details}</p><p className="mt-5 border-t border-[#2d2b2a]/10 pt-4 text-sm italic text-[#a85d4e]">{profile.funFact}</p></article>;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [reaction, setReaction] = useState("Mereka sedang menunggumu.");
  const [hearts, setHearts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  function reactTo(kind: CharacterKind) { setReaction(kind === "panda" ? "Panda mengedip malu." : "Bebek membalas dengan satu kepakan kecil."); }
  function addHeart() { setHearts((current) => current + 1); setRevealed(true); setReaction("Satu lagi alasan kecil untuk tersenyum."); }
  const jumpToStory = () => { setStarted(true); document.getElementById("duration")?.scrollIntoView({ behavior: "smooth" }); };

  return <main className="story-shell">
    {/* ── Hero ── */}
    <section className="hero-glow relative flex min-h-[100svh] flex-col justify-between px-6 pb-6 pt-5 sm:px-10">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between" aria-label="Navigasi utama">
        <div className="display text-sm font-extrabold tracking-tight">{siteConfig.title}<span className="text-[#e98672]">.</span></div>
        <div className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#8d7768] sm:flex"><span className="h-2 w-2 rounded-full bg-[#e98672]" /> all of us</div>
      </nav>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 py-6 lg:grid-cols-[1fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-xl">
          <p className="eyebrow mb-4">{siteConfig.eyebrow}</p>
          <h1 className="display max-w-[12ch] text-4xl font-extrabold leading-[1.08] sm:text-5xl">{messages.hero.title}</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#66584e]">{messages.hero.body}</p>
          <button onClick={jumpToStory} className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#2d2b2a] px-5 text-sm font-bold text-[#fffaf3] shadow-[0_8px_0_#d8b26a] transition hover:-translate-y-1 hover:shadow-[0_10px_0_#d8b26a]">{messages.hero.cta}<ArrowDown size={16} aria-hidden="true" /></button>
        </motion.div>
        <div className="relative flex min-h-[18rem] items-center justify-center">
          <span className="flower left-[12%] top-[12%] rotate-12 text-[#e98672]">✦</span>
          <span className="flower right-[12%] top-[18%] text-[#e7ae3f]">✳</span>
          <span className="flower bottom-[10%] left-[18%] text-[#98aa85]">✦</span>
          <div className="absolute h-52 w-52 rounded-full bg-[#fffaf3]/80 sm:h-64 sm:w-64" />
          <div className="relative flex items-end"><Character kind="panda" onClick={() => reactTo("panda")} /><Character kind="duck" onClick={() => reactTo("duck")} /></div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-[#2d2b2a]/10 pt-4 text-xs font-bold uppercase tracking-[.16em] text-[#8d7768]">
        <span>scroll slowly</span><span>01 / 05</span>
      </div>
    </section>

    {/* ── Duration ── */}
    <section id="duration" className="paper-grid px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">How long we have been together</p>
            <h2 className="display max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">Waktu berjalan, cerita kita ikut tumbuh perlahan.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#85766d]">{relationshipConfig.label}</p>
        </div>
        <Duration />
      </div>
    </section>

    {/* ── Profiles ── */}
    <section className="bg-[#a7ced1] px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow !text-[#4d777c]">Our backgrounds</p>
          <h2 className="display mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">Sebelum menjadi kita, ada dua cerita yang berbeda.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#405f62]">Kenalan dulu dengan dua tokoh yang membuat dunia kecil ini punya warna.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2"><Profile kind="panda" /><Profile kind="duck" /></div>
      </div>
    </section>

    {/* ── Soundtrack ── */}
    <section className="soundtrack-section px-6 py-10 sm:px-10 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
        <div>
          <p className="eyebrow">Our little soundtrack</p>
          <h2 className="display mt-3 max-w-md text-xl font-extrabold leading-tight sm:text-3xl">Lagu-lagu yang menemani dunia kecil kita.</h2>
        </div>
        <div className="spotify-list">
          {siteConfig.spotifyEmbedUrls.map((url, index) => (
            <div className="spotify-frame" key={url}>
              <iframe data-testid={`spotify-embed-${index + 1}`} src={url} title={`Our little soundtrack ${index + 1}`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Memories ── */}
    <section className="bg-[#e98672] overflow-hidden px-6 py-16 text-[#fffaf3] sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow !text-[#ffe1be]">Our memories</p>
            <h2 className="display mt-3 max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">Little moments, big memories.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#fff0dd]">Geser untuk melihat semua memory. Ketuk foto untuk membuka potongan lainnya.</p>
        </div>
        <div className="mt-10">
          <MemoryCarousel />
        </div>
      </div>
    </section>

    {/* ── Vlogs ── */}
    <section className="paper-grid px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Our projects</p>
        <h2 className="display mt-3 max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">Hal-hal yang pernah kita buat bersama.</h2>
        <div className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-block rounded-full bg-[#e98672] px-3 py-1 text-xs font-extrabold uppercase tracking-[.16em] text-[#fffaf3]">🎬 Vlog Kita</span>
          </div>
          <VlogCarousel vlogs={vlogs} />
        </div>
      </div>
    </section>

    {/* ── Closing / Social ── */}
    <section className="relative overflow-hidden bg-[#2d2b2a] px-6 py-20 text-[#fffaf3] sm:px-10 sm:py-28">
      <Stars className="absolute right-[12%] top-16 text-[#f3c866]" size={24} />
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow !text-[#f3c866]">{social.eyebrow}</p>
        <h2 className="display mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-6xl">{social.title}</h2>
        <div className="mx-auto mt-10 flex items-end justify-center"><Character kind="panda" onClick={() => reactTo("panda")} /><Character kind="duck" onClick={() => reactTo("duck")} /></div>
        {social.handles[0].url
          ? <a href={social.handles[0].url} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-bold text-[#f3c866] hover:underline underline-offset-4 transition-opacity hover:opacity-80">{social.handles[0].username}</a>
          : <p className="mt-5 text-sm font-bold text-[#f3c866]">{social.handles[0].username}</p>
        }
      </div>
    </section>

    <footer className="bg-[#2d2b2a] px-6 pb-8 text-center text-xs font-bold uppercase tracking-[.18em] text-[#bba48d]">
      <div className="border-t border-[#fffaf3]/10 pt-6">Made with love <Heart className="mx-1 inline-block text-[#e98672]" size={12} fill="currentColor" /> <a href="https://restehcode.vercel.app/#hero" target="_blank" rel="noreferrer" className="hover:text-[#fffaf3] transition-colors">restehcode</a> × <a href="https://gemma-r.vercel.app/#top" target="_blank" rel="noreferrer" className="hover:text-[#fffaf3] transition-colors">gm.dev</a> · © 2026</div>
      {started && <span className="sr-only">{reaction} {hearts} hearts saved {revealed ? "and message revealed" : ""}</span>}
    </footer>
  </main>;
}
