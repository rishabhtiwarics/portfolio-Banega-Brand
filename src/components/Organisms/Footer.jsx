export default function Footer() {
  return (
    <footer className="bb-footer">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
          <img
            src="https://banegabrand.com/public/frontend/assets/img/logo-KcH5C46Q.webp"
            alt="Banega Brand"
            style={{ height: '34px' }}
          />
          <p className="bb-footer-copy mb-0">© 2025 Banega Brand. All rights reserved.</p>
          <a href="https://banegabrand.com" target="_blank" rel="noreferrer" className="bb-footer-link">
            banegabrand.com →
          </a>
        </div>
      </div>
    </footer>
  )
}
