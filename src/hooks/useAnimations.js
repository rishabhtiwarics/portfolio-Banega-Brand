import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('bb-visible')
        el.querySelectorAll('.bb-skill-fill').forEach(b => {
          b.style.width = b.dataset.width + '%'
        })
        obs.unobserve(el)
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

export function use3DTilt(selector = '.bb-card,.bb-cat-tile,.bb-photo-frame,.bb-brand-card') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    const onMove = (el, e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px) scale(1.03)`
      el.style.boxShadow = `${-x * 18}px ${-y * 18}px 40px var(--bb-fire-glow)`
    }
    const onLeave = (el) => { el.style.transform = ''; el.style.boxShadow = '' }
    els.forEach(el => {
      el._onMove = (e) => onMove(el, e)
      el._onLeave = () => onLeave(el)
      el.addEventListener('mousemove', el._onMove)
      el.addEventListener('mouseleave', el._onLeave)
    })
    return () => {
      els.forEach(el => {
        el.removeEventListener('mousemove', el._onMove)
        el.removeEventListener('mouseleave', el._onLeave)
      })
    }
  }, [selector])
}

export function useRipple() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = '@keyframes bb-ripple { to { transform: scale(4); opacity: 0; } }'
    document.head.appendChild(style)
    const els = document.querySelectorAll('.bb-ripple-host')
    const onClick = (el, e) => {
      const r = el.getBoundingClientRect()
      const rip = document.createElement('span')
      const size = Math.max(r.width, r.height)
      Object.assign(rip.style, {
        position: 'absolute', width: size + 'px', height: size + 'px',
        left: (e.clientX - r.left - size / 2) + 'px', top: (e.clientY - r.top - size / 2) + 'px',
        background: 'rgba(254,100,24,0.22)', borderRadius: '50%',
        transform: 'scale(0)', opacity: '1',
        animation: 'bb-ripple 0.6s ease-out forwards', pointerEvents: 'none'
      })
      el.appendChild(rip)
      setTimeout(() => rip.remove(), 700)
    }
    els.forEach(el => {
      el._onClick = (e) => onClick(el, e)
      el.addEventListener('click', el._onClick)
    })
    return () => {
      els.forEach(el => el.removeEventListener('click', el._onClick))
      document.head.removeChild(style)
    }
  }, [])
}
