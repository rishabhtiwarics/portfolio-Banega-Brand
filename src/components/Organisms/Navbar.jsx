import { useState, useEffect, useRef } from 'react'
import InquiryPage from './InquiryPage'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (y > lastY.current + 10 && y > 200) setHidden(true)
      else if (y < lastY.current) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = inquiryOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [inquiryOpen])

  const closeDrawer = () => setDrawerOpen(false)
  const openInquiry = () => {
    closeDrawer()
    setInquiryOpen(true)
  }

  const links = [
    { href: '#bbAbout', label: 'About' },
    { href: '#bbServices', label: 'Services' },
    { href: '#bbSkills', label: 'Skills' },
    { href: '#bbBrands', label: 'Brands' },
    { href: '#bbContact', label: 'Contact' },
  ]

  return (
    <>
      <div
        className={`bb-overlay ${drawerOpen ? 'bb-overlay-show' : ''}`}
        onClick={closeDrawer}
      />

      <nav className={`bb-nav ${scrolled ? 'bb-nav-scrolled' : ''} ${hidden ? 'bb-nav-hidden' : ''}`}>
        <div className="container bb-nav-inner">
          <a className="bb-nav-logo" href="#bbHero">
            <img
              src="https://banegabrand.com/public/frontend/assets/img/logo-KcH5C46Q.webp"
              alt="Banega Brand"
            />
          </a>

          <div className="bb-nav-links align-items-center">
            {links.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
            <button
              onClick={openInquiry}
              className="bb-nav-cta ms-3"
              style={{ border: 'none' }}
            >
              Enquire Now
            </button>
          </div>

          <button
            className={`bb-burger ${drawerOpen ? 'bb-burger-open' : ''}`}
            onClick={() => setDrawerOpen(o => !o)}
          >
            <span className="bb-burger-bar" />
            <span className="bb-burger-bar" />
            <span className="bb-burger-bar" />
          </button>
        </div>
      </nav>

      <div className={`bb-drawer ${drawerOpen ? 'bb-drawer-open' : ''}`}>
        <button className="bb-drawer-close" onClick={closeDrawer}>
          <i className="fas fa-times" />
        </button>
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="bb-drawer-link"
            onClick={closeDrawer}
          >
            {l.label}
          </a>
        ))}
        <button
          className="bb-drawer-link bb-drawer-fire"
          onClick={openInquiry}
          style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0, width: '100%' }}
        >
          Enquire Now →
        </button>
      </div>

      {inquiryOpen && (
        <InquiryPage onClose={() => setInquiryOpen(false)} />
      )}
    </>
  )
}