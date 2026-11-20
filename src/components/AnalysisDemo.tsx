import { useEffect, useRef, useState } from 'react'

const steps = [
  { title: 'Contract permissions', detail: 'Mint, freeze, and privileged access' },
  { title: 'Holder distribution', detail: 'Concentration and linked addresses' },
  { title: 'Wallet activity', detail: 'Deployer and related movements' },
]

const findings = [
  { label: 'Contract permissions', value: 'Review needed', evidence: 'Mint authority is still active' },
  { label: 'Holder concentration', value: 'High risk', evidence: 'Top 10 addresses hold 64%' },
  { label: 'Liquidity', value: 'Review needed', evidence: 'Only 2 days remain on the lock' },
  { label: 'Deployer activity', value: 'Detected', evidence: '3 wallets show links' },
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
    <div className="demo-shell" aria-label="RiskRover analysis simulation">
      <div className="demo-topline">
        <div>
          <p className="demo-product">Sample token report</p>
          <p className="demo-network">BNB Chain simulation</p>
        </div>
        <span className="demo-fiction">Fictional data</span>
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
            const status = phase > index ? 'Complete' : phase === index ? 'Checking' : 'Queued'
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
              <p className="demo-working__label">Reviewing evidence</p>
              <p className="demo-working__step">{steps[phase].title}</p>
              <p className="demo-working__note">Step {phase + 1} of 3. No real token is being analyzed.</p>
            </div>
          ) : (
            <>
              <div className="demo-verdict">
                <div>
                  <p>Simulation conclusion</p>
                  <h3>Further review needed</h3>
                </div>
                <span>High risk</span>
              </div>
              <table>
                <caption>Findings for a fictional token</caption>
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
        <p>This is an interface simulation, not live on-chain analysis or a buy recommendation.</p>
        <button className="button button--signal" type="button" onClick={runDemo} disabled={running}>
          {running ? 'Running sample analysis' : phase === 3 ? 'Replay simulation' : 'Run simulation'}
        </button>
      </div>
    </div>
  )
}
