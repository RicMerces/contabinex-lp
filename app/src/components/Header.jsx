import { logoContabinex, icSearch, icLogin } from '../assets/index.js'

const NAV_GAP = 48

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Header() {
  const handleLogoClick = (e) => {
    e.preventDefault()
    if (window.scrollY === 0) {
      window.location.href = '/'
      return
    }
    scrollToTop()
  }

  return (
    <>
      {/* Logo */}
      <a
        href="/"
        className="abs header-logo"
        aria-label="Voltar ao início"
        onClick={handleLogoClick}
        style={{ left: 60, top: 31, width: 473, height: 137, display: 'block' }}
      >
        <img src={logoContabinex} alt="CONTABINEX" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </a>

      {/* Navegação — gap uniforme entre os itens */}
      <nav
        className="header-nav abs"
        style={{
          left: 599,
          top: 66,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          gap: NAV_GAP,
        }}
      >
        <a href="#">Solicitar Proposta</a>
        <a href="#solucoes">Nossas Soluções</a>
        <a href="#planos">Planos</a>
      </nav>

      {/* Botão PESQUISAR */}
      <button
        className="box-btn box-btn--outline abs"
        style={{
          left: 1418,
          top: 68,
          width: 210,
          height: 39,
          border: '2px solid var(--teal)',
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: 7,
            transform: 'translateX(-50%)',
            color: 'var(--teal)',
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: '0.96px',
            whiteSpace: 'nowrap',
          }}
        >
          PESQUISAR
        </span>
        <img src={icSearch} alt="" style={{ position: 'absolute', right: 8, top: 8, width: 22, height: 23 }} />
      </button>

      {/* Botão LOGIN */}
      <button
        className="box-btn box-btn--navy abs"
        style={{
          left: 1641,
          top: 68,
          width: 210,
          height: 39,
          background: 'var(--navy)',
          borderRadius: '20px 0 0 20px',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 3,
            top: 2,
            width: 34,
            height: 34,
            background: '#fffbfb',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <img
            src={icLogin}
            alt=""
            style={{ position: 'absolute', left: '11.76%', top: '8.82%', width: '73.53%', height: '73.53%' }}
          />
        </span>
        <span
          style={{
            position: 'absolute',
            left: 83,
            top: 9,
            color: 'var(--teal)',
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: '1.92px',
            whiteSpace: 'nowrap',
          }}
        >
          LOGIN
        </span>
      </button>
    </>
  )
}
