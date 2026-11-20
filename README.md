# RiskRover

Landing page RiskRover: alat riset memecoin yang menekankan bukti on-chain, transparansi risiko, dan keputusan yang tetap berada pada pengguna.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

Hasil build berada di `dist/`. Konfigurasi deployment Vercel tersedia di `vercel.json`.

## Struktur utama

- `src/pages/Home.tsx` — konten dan struktur landing page.
- `src/components/AnalysisDemo.tsx` — simulasi analisis tiga tahap.
- `src/index.css` — sistem visual, layout responsif, focus state, dan reduced motion.
- `public/` — maskot, favicon, dan ikon PWA.
- `vite.config.ts` — konfigurasi build dan PWA.

## Batasan

Laporan pada halaman ini adalah simulasi dengan token dan data fiktif. Belum ada koneksi ke data on-chain, backend analyzer, wallet, atau transaksi. Informasi token belum dipublikasikan sebagai penawaran; tidak ada contract address, harga, jadwal, atau janji imbal hasil.

Font disertakan secara lokal melalui Fontsource. Halaman mendukung instalasi PWA dasar dan mengambil dokumen navigasi dengan strategi network-first.
