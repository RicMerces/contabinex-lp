import {
  logoBranco,
  logoCx,
  icEmail,
  socialLinkedin,
  socialFacebook,
  socialInstagram,
  socialYoutube,
} from '../assets/index.js'

// Rodapé azul (a faixa navy vem de Backgrounds)
const NAV_SERVICOS = ['Serviços', 'Nossas Soluções', 'Nossos Planos', 'Abrir uma Empresa', 'Trocar de Contador']
const NAV_INSTITUCIONAL = ['Política de Privacidade', 'Termos de Uso', 'Central de Ajuda', 'Trabalhe Conosco', 'Segurança de Dados']

const SOCIALS = [
  { icon: socialLinkedin, left: 1301, alt: 'LinkedIn' },
  { icon: socialFacebook, left: 1379, alt: 'Facebook' },
  { icon: socialInstagram, left: 1457, alt: 'Instagram' },
  { icon: socialYoutube, left: 1534, alt: 'YouTube' },
]

const navColStyle = (left) => ({
  left,
  top: 4787,
  fontWeight: 700,
  fontSize: 24,
  lineHeight: '50px',
  letterSpacing: '-0.96px',
  whiteSpace: 'nowrap',
})

export default function Footer() {
  return (
    <>
      {/* Logo branco */}
      <div className="abs" style={{ left: 35, top: 4565, width: 446, height: 121 }}>
        <img src={logoBranco} alt="CONTABINEX" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Colunas de navegação */}
      <nav className="footer-nav abs" style={navColStyle(93)}>
        {NAV_SERVICOS.map((item) => (
          <a key={item} href="#" style={{ display: 'block' }}>
            {item}
          </a>
        ))}
      </nav>
      <nav className="footer-nav abs" style={navColStyle(604)}>
        {NAV_INSTITUCIONAL.map((item) => (
          <a key={item} href="#" style={{ display: 'block' }}>
            {item}
          </a>
        ))}
      </nav>

      {/* Contato */}
      <img src={icEmail} alt="" className="abs" style={{ left: 1301, top: 4795, width: 30, height: 30 }} />
      <a
        className="footer-link abs"
        href="mailto:atendimento@contabinex.com.br"
        style={{
          left: 1358,
          top: 4787,
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '50px',
          letterSpacing: '-0.96px',
          whiteSpace: 'nowrap',
        }}
      >
        atendimento@contabinex.com.br
      </a>
      <p
        className="abs"
        style={{
          left: 1301,
          top: 4862,
          color: 'var(--white)',
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '50px',
          letterSpacing: '-0.96px',
          whiteSpace: 'nowrap',
        }}
      >
        Siga-nos nas redes sociais:
      </p>
      {SOCIALS.map((s) => (
        <a key={s.alt} className="footer-social abs" href="#" style={{ left: s.left, top: 4915, width: 38, height: 38 }}>
          <img src={s.icon} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </a>
      ))}

      {/* Assinatura inferior */}
      <div className="abs" style={{ left: 80, top: 5339, width: 93, height: 53 }}>
        <img src={logoCx} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div className="abs" style={{ left: 178, top: 5331, width: 1, height: 76, background: 'var(--teal)' }} />
      <p
        className="abs"
        style={{
          left: 192,
          top: 5345,
          color: 'var(--white)',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '-0.56px',
        }}
      >
        © 2026 CONTABINEX — Contabilidade digital com inteligência de mercado. Todos os direitos reservados.
        <br />
        Design by, Marcodesign Publicidade e Propaganda Ltda
      </p>
    </>
  )
}
