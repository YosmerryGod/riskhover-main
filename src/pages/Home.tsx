import { useRef } from 'react'
import AnalysisDemo from '../components/AnalysisDemo'

const checks = [
  {
    title: 'Contract',
    description: "Permissions that can alter the token, admin controls, and liquidity conditions are examined before trusting the token's narrative.",
    evidence: 'Supporting evidence: contract functions and related transactions.',
  },
  {
    title: 'Distribution',
    description: 'Holder concentration, linked addresses, and early distribution patterns help distinguish a broad community from one dominant group.',
    evidence: 'Supporting evidence: addresses, ownership shares, and transaction relationships.',
  },
  {
    title: 'Wallet',
    description: 'Deployer history and wallet movements are mapped so suspicious behavior is not hidden behind volume and social chatter.',
    evidence: 'Supporting evidence: traceable transaction history.',
  },
  {
    title: 'Decision',
    description: 'Findings are summarized into risks and follow-up questions. Users still inspect the evidence and make their own decisions.',
    evidence: 'Not an automated buy signal or a promise of profit.',
  },
]

const depthLayers = [8, 7, 6, 5, 4, 3, 2, 1]

export default function Home() {
  const visualRef = useRef<HTMLDivElement>(null)

  function moveMark(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const node = visualRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    node.style.transform = `perspective(1100px) rotateX(${3 - y * 12}deg) rotateY(${-12 + x * 18}deg) scale(1.025)`
  }

  function resetMark() {
    if (visualRef.current) {
      visualRef.current.style.transform = 'perspective(1100px) rotateX(3deg) rotateY(-12deg) scale(1)'
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="RiskRover, back to top">
            <img src="/riskrover-mark.svg" alt="" width="38" height="38" />
            <span>RiskRover</span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#demo">Example</a>
            <a href="#metode">Method</a>
            <a href="#token">Token</a>
            <a href="#pertanyaan">FAQ</a>
          </nav>
          <a className="button button--signal header-cta" href="#demo">View demo</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="wrap grid-24 hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title"><span>Don’t guess</span><span>the token.</span></h1>
            </div>
            <div
              className="hero-visual"
              ref={visualRef}
              onPointerMove={moveMark}
              onPointerLeave={resetMark}
            >
              <div className="hound-scene">
                <span className="hound-shadow" aria-hidden="true" />
                <div className="hound-extrusion" aria-hidden="true">
                  {depthLayers.map((depth) => (
                    <img
                      className="hound-layer"
                      src="/riskrover-hound-depth.svg"
                      alt=""
                      key={depth}
                      style={{ transform: `translate3d(${depth * 2.4}px, ${depth * 2.8}px, ${-depth * 10}px)` }}
                    />
                  ))}
                </div>
                <img
                  className="hound-face"
                  src="/riskrover-hound.svg"
                  alt="RiskRover’s lime-green hound mascot with dark ears, bright eyes, and a radar nose"
                />
              </div>
            </div>
            <div className="hero-support">
              <p>RiskRover turns contract permissions, holder distribution, and wallet activity into a risk report you can trace back to the evidence.</p>
              <a className="button button--signal" href="#demo">View sample analysis</a>
              <p className="hero-note">Every finding needs evidence. Every decision stays yours.</p>
            </div>
          </div>
        </section>

        <section className="section-paper" id="demo" aria-labelledby="demo-title">
          <div className="wrap grid-24 section-grid">
            <div className="section-intro">
              <h2 id="demo-title">Evidence before conclusions.</h2>
              <p>See how RiskRover organizes each check into a readable report—without guessing what the score means.</p>
              <p className="section-aside">The example uses a fictional token and data so it cannot be mistaken for live market analysis.</p>
            </div>
            <div className="demo-position">
              <AnalysisDemo />
            </div>
          </div>
        </section>

        <section className="section-dark" id="metode" aria-labelledby="method-title">
          <div className="wrap grid-24 section-grid">
            <div className="method-intro">
              <h2 id="method-title">What gets checked, not what’s trending.</h2>
              <p>RiskRover is designed to separate on-chain findings, interpretation, and unknowns.</p>
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
              <h2 id="token-title">The token gets its own page.</h2>
              <p>The product remains the main reason to visit. Token information will be published after its parameters and utility are final.</p>
            </div>
            <div className="token-content">
              <p className="token-status"><strong>Current status:</strong> in preparation, not available for purchase.</p>
              <p>No contract address, price, launch date, or allocation is presented as fact before official documentation is available.</p>
              <details>
                <summary>Information required at launch</summary>
                <ul>
                  <li>Official contract address and blockchain.</li>
                  <li>Supply, allocation, vesting, and liquidity terms.</li>
                  <li>Utility already working inside the product.</li>
                  <li>Risks, documentation, and audit results if an audit has actually been performed.</li>
                </ul>
              </details>
              <details>
                <summary>Token utility principles</summary>
                <p>Users should be able to access RiskRover’s core value without buying a token. Any additional utility will be described plainly, without price targets or promises of returns.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="section-dark faq-section" id="pertanyaan" aria-labelledby="faq-title">
          <div className="wrap grid-24 section-grid">
            <div className="faq-intro">
              <h2 id="faq-title">Reasonable questions.</h2>
            </div>
            <div className="faq-list">
              <details>
                <summary>Does RiskRover provide buy signals?</summary>
                <p>No. Its focus is organizing research, showing evidence, and flagging risk. Transaction decisions remain with the user.</p>
              </details>
              <details>
                <summary>Do I need to connect a wallet?</summary>
                <p>For read-only research, a public address is enough. RiskRover must never ask for a seed phrase or private key.</p>
              </details>
              <details>
                <summary>Does the report on this page use a real token?</summary>
                <p>No. Every name, finding, and figure in the simulation is fictional and only demonstrates the interface.</p>
              </details>
              <details>
                <summary>Which chains will be supported?</summary>
                <p>BNB Chain is an initial candidate. Final coverage will depend on data quality, user needs, and integration readiness.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="wrap closing-inner">
            <h2 id="closing-title">Read the token before the crowd.</h2>
            <a className="button button--signal" href="#demo">Inspect a sample report</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="brand" href="#top" aria-label="RiskRover, back to top">
            <img src="/riskrover-mark.svg" alt="" width="34" height="34" />
            <span>RiskRover</span>
          </a>
          <p>Evidence-based memecoin research. Not financial advice.</p>
          <p>© 2026 RiskRover</p>
        </div>
      </footer>
    </>
  )
}
