import { useEffect, useRef, useState } from 'react'

const steps = [
  { title: 'Permission kontrak', detail: 'Mint, freeze, dan akses khusus' },
  { title: 'Distribusi holder', detail: 'Konsentrasi dan keterkaitan alamat' },
  { title: 'Aktivitas wallet', detail: 'Deployer dan pergerakan yang terkait' },
]

const findings = [
  { label: 'Izin kontrak', value: 'Perlu tinjauan', evidence: 'Mint authority masih aktif' },
  { label: 'Konsentrasi holder', value: 'Risiko tinggi', evidence: '10 alamat teratas memegang 64%' },
  { label: 'Likuiditas', value: 'Perlu tinjauan', evidence: 'Masa lock tersisa 2 hari' },
  { label: 'Aktivitas deployer', value: 'Terdeteksi', evidence: '3 wallet menunjukkan keterkaitan' },
]

export default function AnalysisDemo() {
  const [phase, setPhase] = useState(3)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const running = phase < steps.length

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  function runDemo() {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(3)
      return
    }

    setPhase(0)
    timers.current = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
    ]
  }

  return (
    <div className="demo-shell" aria-label="Simulasi analisis RiskRover">
      <div className="demo-topline">
        <div>
          <p className="demo-product">Laporan token contoh</p>
          <p className="demo-network">Simulasi untuk BNB Chain</p>
        </div>
        <span className="demo-fiction">Data fiktif</span>
      </div>

      <div className="demo-progress" aria-hidden="true">
        <div
          className="demo-progress__bar"
          style={{ transform: `scaleX(${(phase + 1) / 4})` }}
        />
      </div>

      <div className="demo-body">
        <div className="demo-steps">
          {steps.map((step, index) => {
            const status = phase > index ? 'Selesai' : phase === index ? 'Memeriksa' : 'Menunggu'
            return (
              <div className={`demo-step ${phase >= index ? 'is-active' : ''}`} key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
                <span>{status}</span>
              </div>
            )
          })}
        </div>

        <div className="demo-report" aria-live="polite">
          {running ? (
            <div className="demo-working">
              <p className="demo-working__label">Sedang membaca bukti</p>
              <p className="demo-working__step">{steps[phase].title}</p>
              <p className="demo-working__note">Tahap {phase + 1} dari 3. Tidak ada token nyata yang sedang dianalisis.</p>
            </div>
          ) : (
            <>
              <div className="demo-verdict">
                <div>
                  <p>Kesimpulan simulasi</p>
                  <h3>Perlu pemeriksaan lanjutan</h3>
                </div>
                <span>Risiko tinggi</span>
              </div>
              <table>
                <caption>Temuan pada data token fiktif</caption>
                <tbody>
                  {findings.map((finding) => (
                    <tr key={finding.label}>
                      <th scope="row">{finding.label}</th>
                      <td>
                        <strong>{finding.value}</strong>
                        <span>{finding.evidence}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      <div className="demo-footer">
        <p>Ini simulasi antarmuka, bukan analisis on-chain langsung atau rekomendasi beli.</p>
        <button className="button button--signal" type="button" onClick={runDemo} disabled={running}>
          {running ? 'Memeriksa data contoh' : phase === 3 ? 'Putar ulang simulasi' : 'Putar simulasi'}
        </button>
      </div>
    </div>
  )
}
