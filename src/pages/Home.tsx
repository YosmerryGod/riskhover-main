import { useRef } from 'react'
import AnalysisDemo from '../components/AnalysisDemo'

const checks = [
  {
    title: 'Kontrak',
    description: 'Permission yang dapat mengubah token, kontrol admin, serta kondisi likuiditas dibaca sebelum narasi token dipercaya.',
    evidence: 'Bukti pendamping: fungsi kontrak dan transaksi terkait.',
  },
  {
    title: 'Distribusi',
    description: 'Konsentrasi holder, alamat yang saling terkait, dan pola distribusi awal membantu membedakan komunitas dari satu kelompok besar.',
    evidence: 'Bukti pendamping: alamat, proporsi kepemilikan, dan relasi transaksi.',
  },
  {
    title: 'Wallet',
    description: 'Riwayat deployer dan pergerakan wallet dipetakan agar perilaku mencurigakan tidak tersembunyi di balik volume dan percakapan sosial.',
    evidence: 'Bukti pendamping: jejak transaksi yang dapat ditelusuri.',
  },
  {
    title: 'Keputusan',
    description: 'Temuan diringkas menjadi risiko dan pertanyaan lanjutan. Pengguna tetap memeriksa bukti serta menentukan keputusannya sendiri.',
    evidence: 'Bukan sinyal beli otomatis dan bukan janji keuntungan.',
  },
]

export default function Home() {
  const visualRef = useRef<HTMLDivElement>(null)

  function moveMark(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const node = visualRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    node.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 13}deg) scale(1.015)`
  }

  function resetMark() {
    if (visualRef.current) {
      visualRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Langsung ke konten</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="RiskRover, kembali ke atas">
            <img src="/riskrover-mark.svg" alt="" width="38" height="38" />
            <span>RiskRover</span>
          </a>
          <nav className="site-nav" aria-label="Navigasi utama">
            <a href="#demo">Contoh</a>
            <a href="#metode">Metode</a>
            <a href="#token">Token</a>
            <a href="#pertanyaan">Pertanyaan</a>
          </nav>
          <a className="button button--signal header-cta" href="#demo">Lihat demo</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="wrap grid-24 hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title"><span>Jangan tebak</span><span>isi tokennya.</span></h1>
            </div>
            <div
              className="hero-visual"
              ref={visualRef}
              onPointerMove={moveMark}
              onPointerLeave={resetMark}
            >
              <img src="/riskrover-mark.svg" alt="Maskot anjing pelacak RiskRover dengan hidung radar" />
            </div>
            <div className="hero-support">
              <p>RiskRover membedah kontrak, distribusi holder, dan pergerakan wallet menjadi laporan risiko yang bisa kamu telusuri kembali.</p>
              <a className="button button--signal" href="#demo">Lihat contoh analisis</a>
              <p className="hero-note">Setiap temuan harus punya bukti. Setiap keputusan tetap milikmu.</p>
            </div>
          </div>
        </section>

        <section className="section-paper" id="demo" aria-labelledby="demo-title">
          <div className="wrap grid-24 section-grid">
            <div className="section-intro">
              <h2 id="demo-title">Bukti sebelum kesimpulan.</h2>
              <p>Lihat bagaimana RiskRover menyusun pemeriksaan menjadi laporan yang bisa dibaca tanpa menebak-nebak maksud skornya.</p>
              <p className="section-aside">Contoh di samping sengaja memakai token dan data fiktif agar tidak disalahartikan sebagai analisis pasar langsung.</p>
            </div>
            <div className="demo-position">
              <AnalysisDemo />
            </div>
          </div>
        </section>

        <section className="section-dark" id="metode" aria-labelledby="method-title">
          <div className="wrap grid-24 section-grid">
            <div className="method-intro">
              <h2 id="method-title">Yang diperiksa, bukan yang sedang ramai.</h2>
              <p>RiskRover dirancang untuk memisahkan temuan on-chain, interpretasi, dan hal yang belum diketahui.</p>
            </div>
            <div className="method-list">
              {checks.map((check) => (
                <article className="method-row" key={check.title}>
                  <h3>{check.title}</h3>
                  <div>
                    <p>{check.description}</p>
                    <p className="method-evidence">{check.evidence}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-paper token-section" id="token" aria-labelledby="token-title">
          <div className="wrap grid-24 section-grid">
            <div className="token-intro">
              <h2 id="token-title">Token punya halaman sendiri.</h2>
              <p>Produk tetap menjadi alasan utama untuk datang. Informasi token akan dipublikasikan setelah parameter dan utilitasnya final.</p>
            </div>
            <div className="token-content">
              <p className="token-status"><strong>Status saat ini:</strong> sedang disiapkan, belum tersedia untuk dibeli.</p>
              <p>Tidak ada contract address, harga, jadwal, atau alokasi yang ditampilkan sebagai fakta sebelum dokumentasi resminya tersedia.</p>
              <details>
                <summary>Informasi yang wajib tersedia saat peluncuran</summary>
                <ul>
                  <li>Contract address resmi dan chain yang digunakan.</li>
                  <li>Supply, alokasi, vesting, serta kondisi likuiditas.</li>
                  <li>Utilitas yang sudah berfungsi di dalam produk.</li>
                  <li>Risiko, dokumentasi, dan hasil audit jika memang telah dilakukan.</li>
                </ul>
              </details>
              <details>
                <summary>Prinsip utilitas token</summary>
                <p>Pengguna harus dapat merasakan manfaat utama RiskRover tanpa membeli token. Utilitas tambahan akan dijelaskan apa adanya, tanpa target harga atau janji imbal hasil.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="section-dark faq-section" id="pertanyaan" aria-labelledby="faq-title">
          <div className="wrap grid-24 section-grid">
            <div className="faq-intro">
              <h2 id="faq-title">Pertanyaan yang wajar.</h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>Apakah RiskRover memberi sinyal beli?</summary>
                <p>Tidak. Fokusnya adalah merapikan riset, menunjukkan bukti, dan menandai risiko. Keputusan transaksi tetap berada pada pengguna.</p>
              </details>
              <details>
                <summary>Apakah saya harus menghubungkan wallet?</summary>
                <p>Untuk tahap riset read-only, alamat publik sudah cukup. RiskRover tidak boleh meminta seed phrase atau private key.</p>
              </details>
              <details>
                <summary>Apakah laporan di halaman ini berasal dari token nyata?</summary>
                <p>Tidak. Semua nama, temuan, dan angka pada simulasi adalah data fiktif untuk menunjukkan bentuk antarmuka.</p>
              </details>
              <details>
                <summary>Chain apa yang akan didukung?</summary>
                <p>BNB Chain menjadi kandidat awal. Cakupan akhirnya akan mengikuti kualitas data, kebutuhan pengguna, dan kesiapan integrasi.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="wrap closing-inner">
            <h2 id="closing-title">Baca tokennya sebelum ramai.</h2>
            <a className="button button--signal" href="#demo">Periksa contoh laporan</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="brand" href="#top" aria-label="RiskRover, kembali ke atas">
            <img src="/riskrover-mark.svg" alt="" width="34" height="34" />
            <span>RiskRover</span>
          </a>
          <p>Alat riset memecoin berbasis bukti. Bukan nasihat keuangan.</p>
          <p>© 2026 RiskRover</p>
        </div>
      </footer>
    </>
  )
}
