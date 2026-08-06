import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import './mobile.css'
import {
  logoContabinex,
  icSearch,
  icLogin,
  heroBg,
  engenheiros,
  btnAbrirEmpresa,
  icEncontrar,
  icTrocar,
  infraBand,
  ecoGestao,
  ecoSuporte,
  ecoEmissao,
  ecoCentralDocs,
  icCheck,
  icArrow,
  mulherEscritorio,
  premiumFolha,
  premiumConsultoria,
  premiumModulos,
  premiumCertificado,
  watermarkCx,
  logoBranco,
  icEmail,
  socialLinkedin,
  socialFacebook,
  socialInstagram,
  socialYoutube,
} from '../assets/index.js'

/* ---- Dados (mesma cópia do layout desktop) ---- */
const NAV_LINKS = [
  { label: 'Solicitar Proposta', href: '#' },
  { label: 'Nossas Soluções', href: '#solucoes' },
  { label: 'Planos', href: '#planos' },
]

const HERO_CTAS = [
  { icon: icEncontrar, label: 'Encontrar o Plano Ideal para Minha Empresa', href: '#/descobrir-plano' },
  { icon: 'abrir', label: 'Abrir uma Empresa', href: '#/abrir-empresa' },
  { icon: icTrocar, label: 'Trocar de Contador', href: '#/trocar-contador' },
]

function IconAbrirEmpresa() {
  return (
    <svg width="44" height="50" viewBox="37 11 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.5631 48.4999H68.2506C69.8833 48.4999 71.2192 47.2343 71.3443 45.6306C71.2897 44.9086 70.9927 44.2578 70.5318 43.7601L63.7191 36.9969C61.4535 34.7268 61.4535 31.0469 63.7191 28.776L67.8442 24.6564V24.6617C68.1566 24.3517 68.5866 24.1586 69.0628 24.1586C70.0082 24.1586 70.7738 24.9276 70.7738 25.8751C70.7738 26.3486 70.5865 26.7758 70.2741 27.0861V27.0885L65.5865 31.7737C64.977 32.3875 64.977 33.3852 65.5865 34.0023L72.688 41.0993C73.7898 42.2132 74.4772 43.7447 74.4928 45.4375C74.4614 48.8594 71.6803 51.6249 68.2508 51.6249H63.5632C62.6959 51.6249 62.0007 50.9251 62.0007 50.0625C62.0007 49.2 62.6961 48.4999 63.5632 48.4999H63.5631ZM38.5631 14.125C37.6958 14.125 37.0005 13.425 37.0005 12.5626C37.0005 11.7 37.6958 11 38.5631 11C39.4226 11 40.1256 11.7 40.1256 12.5626C40.1256 13.4249 39.4224 14.125 38.5631 14.125ZM83.0941 39.125H80.3598C79.7114 39.125 79.1878 39.6508 79.1878 40.297V40.6877C79.1878 41.55 78.4846 42.2501 77.6254 42.2501C76.7581 42.2501 76.0628 41.5502 76.0628 40.6877V39.9063C76.0628 37.7501 77.813 36.0002 79.969 36.0002H82.3129C83.1722 36.0002 83.8753 35.3002 83.8753 34.4376V31.3126C83.8753 30.4503 83.1722 29.7502 82.3129 29.7502H79.969C77.8129 29.7502 76.0628 28 76.0628 25.844V25.0627C76.0628 24.615 75.8674 24.2158 75.5707 23.9299C75.4301 23.8025 75.2737 23.693 75.1096 23.6252C75.1019 23.6228 75.1019 23.6195 75.0941 23.6195C74.9223 23.5517 74.7424 23.5235 74.5628 23.5181C74.5393 23.5157 74.5315 23.4999 74.5004 23.4999C72.7737 23.4999 71.3754 22.1016 71.3754 20.3749V17.25C71.3754 15.5234 69.977 14.125 68.2504 14.125H47.6644C47.2347 14.125 46.8832 14.4742 46.8832 14.9063C46.8832 15.1483 47.0003 15.365 47.1721 15.5078L55.7267 21.9243C57.6407 23.3461 58.8752 25.6227 58.8752 28.1875V47.7189V48.4999V51.6249V52.4063V57.0938C58.8752 59.2501 57.1251 61 54.9688 61C54.0861 61 53.2736 60.7085 52.6173 60.2188C48.3362 57.0055 42.8674 52.9063 39.6718 50.5048C39.6486 50.49 39.633 50.4665 39.6094 50.4508C38.0312 49.315 37 47.469 37 45.3751V44.5939V18.8129C37 17.9502 37.6953 17.2503 38.5626 17.2503C39.4221 17.2503 40.1251 17.9502 40.1251 18.8129V45.3751C40.1251 46.3907 40.6094 47.2947 41.3593 47.8649L54.5001 57.7212C54.6327 57.818 54.7891 57.8752 54.9687 57.8752C55.3986 57.8752 55.75 57.526 55.75 57.0938V27.4063C55.75 26.3876 55.2581 25.4844 54.5078 24.9142L43.7033 16.8102C42.9532 16.2134 42.4688 15.2945 42.4688 14.2601C42.4688 12.4586 43.922 11 45.7266 11H68.2501C71.703 11 74.5001 13.7992 74.5001 17.25V19.6664C74.5001 20.0572 74.7812 20.3774 75.1562 20.4376C75.1562 20.4376 75.1485 20.4562 75.1485 20.4633C75.2657 20.4736 75.3904 20.4688 75.5079 20.4891C77.6093 20.9532 79.1875 22.8203 79.1875 25.0627V25.4533C79.1875 26.1018 79.7111 26.6252 80.3594 26.6252H83.0938C85.2501 26.6252 87 28.3753 87 30.5312V35.2188C87 37.3751 85.2501 39.125 83.0938 39.125H83.0941ZM52.6255 40.6876C52.6255 41.5498 51.9224 42.25 51.063 42.25C50.196 42.25 49.5006 41.55 49.5006 40.6876C49.5006 39.8249 50.196 39.125 51.063 39.125C51.9225 39.125 52.6255 39.8249 52.6255 40.6876Z"
        fill="#33376F"
      />
    </svg>
  )
}

const ECO_CARDS = [
  { icon: ecoGestao, title: 'Gestão & Inteligência', body: 'Contabilidade digital integral conectada a um sistema de gestão empresarial intuitivo, centralizando sua organização financeira.' },
  { icon: ecoSuporte, title: 'Suporte com IA', body: 'Inteligência Artificial nativa integrada à plataforma para sanar dúvidas operacionais e oferecer orientação imediata.' },
  { icon: ecoEmissao, title: 'Emissão de Notas', body: 'Emissor de notas fiscais integrado e simplificado, estruturado para agilizar a rotina diária da sua equipe.' },
  { icon: ecoCentralDocs, title: 'Central de Documentos', body: 'Ambiente seguro e automatizado para o arquivamento, recepção e controle de certidões e guias fiscais.' },
]

const PLANS = [
  {
    title: 'Plano MEI',
    subtitle: 'Ideal para autônomos e microempreendedores.',
    benefits: [
      'Contabilidade digital completa e controle financeiro',
      'Emissão mensal de guias DAS e entrega da Declaração Anual',
      '3 notas fiscais gratuitas por competência',
      'Suporte e orientação por Inteligência Artificial',
    ],
    ctaText: 'Ativar Plano MEI',
    ctaHref: '#/abrir-empresa',
  },
  {
    title: 'Plano Simples Nacional',
    subtitle: 'Ideal para empresas em crescimento. (ME e EPP)',
    benefits: [
      'Apuração tributária especializada e entrega de obrigações acessórias',
      'Painel empresarial com relatórios gerenciais estruturados',
      '3 notas fiscais gratuitas por competência',
      'Atendimento digital e suporte por IA integrada',
    ],
    ctaText: 'Selecionar Simples Nacional',
    ctaHref: '#/abrir-empresa',
  },
  {
    title: 'Plano Classes Profissionais',
    subtitle: 'Ideal para médicos, advogados e engenheiros.',
    benefits: [
      'Contabilidade completa adaptada à regulamentação da sua categoria',
      'Painel de gestão financeira dedicado',
      'Habilitação para inclusão de módulos operacionais específicos da profissão',
      'Atendimento digital especializado',
    ],
    ctaText: 'Consultar Minha Categoria',
    ctaHref: '#/descobrir-plano',
  },
]

const FEATURES = [
  { icon: premiumFolha, title: 'Folha de Pagamento', body: 'Gestão simplificada e recorrente por colaborador registrado ou sócio com pró-labore.' },
  { icon: premiumConsultoria, title: 'Consultoria Especializada', body: 'Agendamento avulso de reuniões estratégicas de 40 minutos via Google Meet diretamente pelo painel.' },
  { icon: premiumModulos, title: 'Módulos por Nicho', body: 'Ativação opcional de ferramentas dedicadas (ex: Gestão processual para Advogados ou Prontuário para Médicos).' },
  { icon: premiumCertificado, title: 'Certificado Digital', body: 'Emissão e renovação individual integrada e desimpedida para PF ou PJ.' },
]

const NAV_SERVICOS = ['Nossas Soluções', 'Nossos Planos', 'Abrir uma Empresa', 'Trocar de Contador']
const NAV_INSTITUCIONAL = ['Política de Privacidade', 'Termos de Uso', 'Central de Ajuda', 'Trabalhe Conosco', 'Segurança de Dados']
const SOCIALS = [
  { icon: socialLinkedin, alt: 'LinkedIn' },
  { icon: socialFacebook, alt: 'Facebook' },
  { icon: socialInstagram, alt: 'Instagram' },
  { icon: socialYoutube, alt: 'YouTube' },
]

/* Dica visual "arraste para o lado" */
function DragHint() {
  return (
    <div className="m-drag-hint" aria-hidden="true">
      <span>arraste para o lado</span>
      <span className="m-drag-hint__track">
        <span className="m-drag-hint__dot" />
      </span>
    </div>
  )
}

/* Carrossel horizontal com arraste (mouse) + scroll nativo (touch) */
function HScroll({ children }) {
  const ref = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerDown = (e) => {
      // Touch/pen já usam o overflow nativo; drag custom só no mouse
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag.current = {
        active: true,
        startX: e.clientX,
        scrollLeft: el.scrollLeft,
        moved: false,
      }
      el.setPointerCapture(e.pointerId)
      el.classList.add('is-dragging')
    }

    const onPointerMove = (e) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.startX
      if (Math.abs(dx) > 4) drag.current.moved = true
      el.scrollLeft = drag.current.scrollLeft - dx
    }

    const endDrag = () => {
      if (!drag.current.active) return
      drag.current.active = false
      el.classList.remove('is-dragging')
    }

    // Evita clicar em CTAs depois de um arraste
    const onClickCapture = (e) => {
      if (!drag.current.moved) return
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointercancel', endDrag)
    el.addEventListener('lostpointercapture', endDrag)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointercancel', endDrag)
      el.removeEventListener('lostpointercapture', endDrag)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [])

  return (
    <div ref={ref} className="m-hscroll">
      {children}
    </div>
  )
}

/* ============================ HEADER ============================ */
function MobileHeader() {
  const [open, setOpen] = useState(false)

  // Bloqueia o scroll do body quando o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="m-header">
        <a href="/" aria-label="Início" onClick={close}>
          <img className="m-header__logo" src={logoContabinex} alt="CONTABINEX" />
        </a>
        <button
          className={`m-burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`m-menu__overlay${open ? ' is-open' : ''}`} onClick={close} />
      <nav className={`m-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {NAV_LINKS.map((l) => (
          <a key={l.label} className="m-menu__link" href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <div className="m-menu__actions">
          <button className="m-btn m-btn--outline" onClick={close}>
            PESQUISAR
            <img src={icSearch} alt="" />
          </button>
          <button className="m-btn m-btn--navy" onClick={close}>
            <img src={icLogin} alt="" style={{ filter: 'brightness(0) invert(1)' }} />
            LOGIN
          </button>
        </div>
      </nav>
    </>
  )
}

/* ============================ HERO ============================ */
function MobileHero() {
  return (
    <section className="m-hero">
      <Reveal as="h1" className="m-title" delay={0}>
        Simplifique sua contabilidade.
      </Reveal>
      <Reveal as="h2" className="m-subtitle" delay={100} style={{ marginTop: 14 }}>
        <span style={{ color: 'var(--navy)' }}>Menos burocracia. </span>
        <span style={{ color: 'var(--teal)' }}>Mais tempo para o seu negócio.</span>
      </Reveal>
      <Reveal className="m-hero__divider m-divider" delay={180} />
      <Reveal as="p" className="m-lead m-hero__lead" delay={240}>
        A CONTABINEX une contabilidade digital, tecnologia e atendimento especializado para
        empresas que buscam mais controle e crescimento.
      </Reveal>

      <Reveal className="m-hero__visual" variant="fromRight" delay={120}>
        <img className="m-hero__bg" src={heroBg} alt="" />
        <img className="m-hero__people" src={engenheiros} alt="Equipe de profissionais" />
      </Reveal>

      <div className="m-hero__ctas">
        {HERO_CTAS.map((c, i) => (
          <Reveal key={c.label} delay={i * 80}>
            <a className="m-cta-row" href={c.href}>
              <span className="m-cta-row__icon">
                {c.icon === 'abrir' ? <IconAbrirEmpresa /> : <img src={c.icon} alt="" />}
              </span>
              <span className="m-cta-row__label">{c.label}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ========================= ECOSSISTEMA ========================= */
function MobileEcossistema() {
  return (
    <section id="solucoes" className="m-section m-section--gray">
      <div className="m-section__head">
        <Reveal className="m-divider" delay={0} style={{ marginBottom: 22 }} />
        <Reveal as="h2" className="m-title" delay={80}>
          O elo estratégico entre a precisão e a sua liberdade.
        </Reveal>
        <Reveal as="p" className="m-lead" delay={160} style={{ color: 'var(--teal)', fontWeight: 500, marginTop: 14 }}>
          Enquanto você cuida do crescimento da empresa, a CONTABINEX cuida da burocracia.
        </Reveal>
      </div>

      <Reveal className="m-infra" delay={0}>
        <img src={infraBand} alt="Infraestrutura moderna" />
        <div className="m-infra__overlay">
          <span className="k">INFRAESTRUTURA MODERNA</span>
          <span className="t">Ecossistema Tecnológico</span>
        </div>
      </Reveal>

      <DragHint />
      <HScroll>
        {ECO_CARDS.map((c, i) => (
          <Reveal key={c.title} className="m-eco-card" delay={i * 70}>
            <img src={c.icon} alt="" />
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </Reveal>
        ))}
        <span className="m-hscroll__end" aria-hidden="true" />
      </HScroll>
    </section>
  )
}

/* =========================== PLANOS =========================== */
function MobilePlanos() {
  return (
    <section id="planos" className="m-section">
      <div className="m-section__head">
        <Reveal as="span" className="m-eyebrow" delay={0}>ESCOLHA SEU MODELO</Reveal>
        <Reveal as="h2" className="m-title" delay={80}>Planos sob medida para o seu negócio</Reveal>
      </div>

      <DragHint />
      <HScroll>
        {PLANS.map((p, i) => (
          <Reveal key={p.title} className="m-plan" delay={i * 80}>
            <div className="m-plan__header">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
            </div>
            <div className="m-plan__body">
              {p.benefits.map((b, j) => (
                <div key={j} className="m-plan__benefit">
                  <img src={icCheck} alt="" />
                  <p>{b}</p>
                </div>
              ))}
            </div>
            <div className="m-plan__footer">
              <a className="m-btn m-btn--navy m-plan__cta" href={p.ctaHref || '#'}>
                <span>{p.ctaText}</span>
                <img src={icArrow} alt="" />
              </a>
            </div>
          </Reveal>
        ))}
        <span className="m-hscroll__end" aria-hidden="true" />
      </HScroll>
    </section>
  )
}

/* ========================== EXPANSÃO ========================== */
function MobileExpansao() {
  return (
    <section
      className="m-section m-section--gray m-section--expansao"
      style={{ '--expansao-bg': `url(${mulherEscritorio})` }}
    >
      <div className="m-section__head">
        <Reveal as="span" className="m-eyebrow" delay={0}>EXPANSÃO PREMIUM</Reveal>
        <Reveal as="h2" className="m-title" delay={80}>Sua empresa cresce. Sua plataforma acompanha.</Reveal>
        <Reveal as="p" className="m-lead" delay={160} style={{ color: '#000' }}>
          Adicione funcionalidades avançadas de acordo com a maturidade e a necessidade da sua operação:
        </Reveal>
      </div>

      <DragHint />
      <HScroll>
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} className="m-pill" delay={i * 60}>
            <img src={f.icon} alt="" />
            <div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          </Reveal>
        ))}
        <span className="m-hscroll__end" aria-hidden="true" />
      </HScroll>
    </section>
  )
}

/* ========================== CTA FINAL ========================== */
function MobileCtaFinal() {
  return (
    <section className="m-cta">
      <img className="m-cta__watermark" src={watermarkCx} alt="" aria-hidden="true" />
      <Reveal as="h2" delay={0}>
        Pronto para dar o próximo passo na gestão do seu negócio?
      </Reveal>
      <Reveal delay={200} style={{ display: 'block' }}>
        <a className="m-btn m-btn--light m-cta__btn" href="#">
          Falar com um Consultor CX
        </a>
      </Reveal>
    </section>
  )
}

/* =========================== FOOTER =========================== */
function MobileFooter() {
  return (
    <footer className="m-footer">
      <img className="m-footer__logo" src={logoBranco} alt="CONTABINEX" />

      <div className="m-footer__cols">
        <div className="m-footer__col">
          <h4>Serviços</h4>
          {NAV_SERVICOS.map((item) => (
            <a key={item} href="#">{item}</a>
          ))}
        </div>
        <div className="m-footer__col">
          <h4>Institucional</h4>
          {NAV_INSTITUCIONAL.map((item) => (
            <a key={item} href="#">{item}</a>
          ))}
        </div>
      </div>

      <div className="m-footer__contact">
        <a className="mail" href="mailto:atendimento@contabinex.com.br">
          <img src={icEmail} alt="" />
          atendimento@contabinex.com.br
        </a>
        <div className="m-footer__socials">
          {SOCIALS.map((s) => (
            <a key={s.alt} href="#" aria-label={s.alt}>
              <img src={s.icon} alt={s.alt} />
            </a>
          ))}
        </div>
      </div>

      <p className="m-footer__legal">
        © 2026 CONTABINEX — Contabilidade digital com inteligência de mercado. Todos os direitos reservados.
        <br />
        Design by, Marcodesign Publicidade e Propaganda Ltda
      </p>
    </footer>
  )
}

export default function MobileApp() {
  return (
    <div className="m-root">
      <MobileHeader />
      <MobileHero />
      <MobileEcossistema />
      <MobilePlanos />
      <MobileExpansao />
      <MobileCtaFinal />
      <MobileFooter />
    </div>
  )
}
