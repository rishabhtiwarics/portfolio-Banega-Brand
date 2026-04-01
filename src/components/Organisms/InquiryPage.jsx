import { useState, useEffect } from 'react'

const CATEGORIES = [
    { emoji: '🧴', label: 'Skincare' },
    { emoji: '💄', label: 'Cosmetics' },
    { emoji: '🍃', label: 'Herbal / Ayurvedic' },
    { emoji: '🥗', label: 'Food & Beverage' },
    { emoji: '👗', label: 'Fashion' },
    { emoji: '🏠', label: 'Home Care' },
    { emoji: '💊', label: 'Nutraceuticals' },
    { emoji: '🖨️', label: 'Custom Print' },
    { emoji: '📦', label: 'Other' },
]

const TIMELINES = [
    { emoji: '⚡', label: 'ASAP', sub: 'Under 30 days' },
    { emoji: '📅', label: '1–3 Months', sub: '' },
    { emoji: '🗓️', label: '3–6 Months', sub: '' },
    { emoji: '🧭', label: 'Exploring', sub: 'No deadline yet' },
]

const SOURCES = ['Google', 'Instagram', 'LinkedIn', 'Referral', 'YouTube', 'Word of Mouth']

const BUDGET_MAP = [
    '₹ 25,000', '₹ 35,000', '₹ 50,000', '₹ 75,000', '₹ 1,00,000',
    '₹ 1,50,000', '₹ 2,00,000', '₹ 2,50,000', '₹ 3,00,000', '₹ 4,00,000',
    '₹ 5,00,000', '₹ 7,50,000', '₹ 10,00,000', '₹ 15,00,000', '₹ 25,00,000',
    '₹ 50,00,000', '₹ 75,00,000', '₹ 1,00,00,000+',
]

const NEXT_STEPS = [
    { title: 'Team Review', sub: 'Our sourcing team reviews your requirement and identifies the best manufacturer matches from our verified network.' },
    { title: 'Shortlist Sent to You', sub: 'We send a curated list of 3–5 verified manufacturers with profiles, MOQ, and pricing range within 24–48 hours.' },
    { title: 'Intro Call Scheduled', sub: 'We facilitate a direct intro call between you and your selected manufacturer — no middlemen, just results.' },
    { title: 'Samples → Production → Launch 🚀', sub: 'From samples to first production run, we stay involved to ensure quality and timelines are met.' },
]

const STEP_LABELS = ['Inquiry', 'Review', 'Checkout', 'Confirmed']

function budgetFromSlider(val) {
    return BUDGET_MAP[Math.round((val / 100) * (BUDGET_MAP.length - 1))]
}

function genRef() {
    return `REF# BB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
}

const INIT = {
    name: '', phone: '', email: '', company: '',
    categories: [], description: '', service: '', moq: '',
    budgetSlider: 30, budget: budgetFromSlider(30),
    timeline: '1–3 Months', source: '', notes: '',
}

function ProgressBar({ onClose }) {
    return (
        <div className="inq-progress-wrap">
            <div className="inq-progress-top">
                <div className="inq-progress-logo">
                    <img alt="Banega Brand" src="https://banegabrand.com/public/frontend/assets/img/logo-KcH5C46Q.webp" />
                </div>
                <button className="inq-close" onClick={onClose} title="Close">
                    <i className="fas fa-times" />
                </button>
            </div>
        </div>
    )
}

function StepsBar({ step }) {
    return (
        <div className="inq-steps-bar">
            <div className="inq-progress-steps">
                {STEP_LABELS.map((label, i) => {
                    const n = i + 1
                    const isDone = step > n
                    const isActive = step === n
                    return (
                        <div key={n} style={{ display: 'flex', alignItems: 'center', flex: i < STEP_LABELS.length - 1 ? 1 : 'none' }}>
                            <div className={`inq-p-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                                <div className="inq-p-dot">
                                    {isDone ? <i className="fas fa-check" style={{ fontSize: '0.55rem' }} /> : n}
                                </div>
                                <span className="inq-p-label">{label}</span>
                            </div>
                            {i < STEP_LABELS.length - 1 && (
                                <div className={`inq-p-line ${isDone ? 'done' : ''}`} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function SectionTitle({ icon, children }) {
    return (
        <div className="inq-section-title">
            <i className={`fas ${icon}`} />{children}
        </div>
    )
}

function FieldGroup({ label, required, children, error }) {
    return (
        <div className="inq-field-group">
            <label className="inq-field-label">{label}{required && <span className="inq-req">*</span>}</label>
            {children}
            {error && <div className="inq-err-msg">{error}</div>}
        </div>
    )
}

function StepForm({ form, setForm, errors, onNext }) {
    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

    const toggleCat = (label) => setForm(f => ({
        ...f,
        categories: f.categories.includes(label)
            ? f.categories.filter(c => c !== label)
            : [...f.categories, label],
    }))

    const toggleSource = (label) => setForm(f => ({ ...f, source: f.source === label ? '' : label }))

    const handleBudget = (e) => {
        const val = Number(e.target.value)
        setForm(f => ({ ...f, budgetSlider: val, budget: budgetFromSlider(val) }))
    }

    return (
        <div className="inq-main">
            <div className="inq-header">
                <span className="bb-eyebrow">Portfolio Inquiry</span>
                <h2>Start Your <span className="bb-text-fire">Brand Journey</span></h2>
                <div className="bb-rule" />
                <p>Fill in a few details and we'll match you with the right manufacturing partner within 24–48 hours.</p>
            </div>

            <div className="bb-card">
                <SectionTitle icon="fa-user">Your Details</SectionTitle>
                <div className="inq-row2">
                    <FieldGroup label="Full Name" required error={errors.name}>
                        <input className={`bb-field ${errors.name ? 'error' : ''}`} type="text" placeholder="e.g. Rahul Sharma" value={form.name} onChange={set('name')} />
                    </FieldGroup>
                    <FieldGroup label="Phone Number" required error={errors.phone}>
                        <input className={`bb-field ${errors.phone ? 'error' : ''}`} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                    </FieldGroup>
                </div>
                <div className="inq-row2">
                    <FieldGroup label="Email Address" required error={errors.email}>
                        <input className={`bb-field ${errors.email ? 'error' : ''}`} type="email" placeholder="you@yourbrand.com" value={form.email} onChange={set('email')} />
                    </FieldGroup>
                    <FieldGroup label="Company / Brand Name">
                        <input className="bb-field" type="text" placeholder="Your Brand (optional)" value={form.company} onChange={set('company')} />
                    </FieldGroup>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <SectionTitle icon="fa-box-open">Product &amp; Category</SectionTitle>
                    <FieldGroup label="Category" required error={errors.categories}>
                        <div className="inq-chips">
                            {CATEGORIES.map(({ emoji, label }) => (
                                <button key={label} type="button" className={`inq-chip ${form.categories.includes(label) ? 'selected' : ''}`} onClick={() => toggleCat(label)}>
                                    {emoji} {label}
                                </button>
                            ))}
                        </div>
                    </FieldGroup>
                    <FieldGroup label="Product / Service Description" required error={errors.description}>
                        <textarea className={`bb-field ${errors.description ? 'error' : ''}`} rows={3} placeholder="Describe your product idea, formulation needs, or what you're looking for..." value={form.description} onChange={set('description')} />
                    </FieldGroup>
                    <div className="inq-row2">
                        <FieldGroup label="Service Type">
                            <select className="bb-field" value={form.service} onChange={set('service')}>
                                <option value="">Select service...</option>
                                <option>White Label Manufacturing</option>
                                <option>Private Label Manufacturing</option>
                                <option>Contract Manufacturing</option>
                                <option>Packaging Design</option>
                                <option>Full Brand Launch</option>
                                <option>Not Sure – Need Guidance</option>
                            </select>
                        </FieldGroup>
                        <FieldGroup label="Minimum Order Quantity">
                            <select className="bb-field" value={form.moq} onChange={set('moq')}>
                                <option value="">Select MOQ...</option>
                                <option>Under 500 units</option>
                                <option>500 – 1,000 units</option>
                                <option>1,000 – 5,000 units</option>
                                <option>5,000 – 10,000 units</option>
                                <option>10,000+ units</option>
                            </select>
                        </FieldGroup>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <SectionTitle icon="fa-rupee-sign">Budget &amp; Timeline</SectionTitle>
                    <FieldGroup label="Estimated Monthly Budget">
                        <div className="inq-budget-display">{form.budget}</div>
                        <input type="range" min={0} max={100} step={1} value={form.budgetSlider} onChange={handleBudget} className="inq-slider" style={{ '--pct': `${form.budgetSlider}%` }} />
                        <div className="inq-slider-labels">
                            <span>₹25K</span><span>₹5L</span><span>₹25L</span><span>₹1Cr+</span>
                        </div>
                    </FieldGroup>
                    <FieldGroup label="Launch Timeline">
                        <div className="inq-timeline-grid">
                            {TIMELINES.map(({ emoji, label, sub }) => (
                                <button key={label} type="button" className={`inq-tl-card ${form.timeline === label ? 'selected' : ''}`} onClick={() => setForm(f => ({ ...f, timeline: label }))}>
                                    <span className="inq-tl-icon">{emoji}</span>
                                    <div className="inq-tl-label">{label}</div>
                                    {sub && <div className="inq-tl-sub">{sub}</div>}
                                </button>
                            ))}
                        </div>
                    </FieldGroup>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <SectionTitle icon="fa-comment-dots">Additional Info</SectionTitle>
                    <FieldGroup label="How did you hear about us?">
                        <div className="inq-chips">
                            {SOURCES.map(s => (
                                <button key={s} type="button" className={`inq-chip ${form.source === s ? 'selected' : ''}`} onClick={() => toggleSource(s)}>{s}</button>
                            ))}
                        </div>
                    </FieldGroup>
                    <FieldGroup label="Any specific questions or notes?">
                        <textarea className="bb-field" rows={2} placeholder="Anything else you'd like us to know..." value={form.notes} onChange={set('notes')} />
                    </FieldGroup>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <button className="bb-submit w-100 justify-content-center" onClick={onNext}>
                        <i className="fas fa-arrow-right fa-sm" /> Review My Inquiry
                    </button>
                    <div className="inq-trust-row">
                        <div className="inq-trust-badge"><i className="fas fa-shield-alt" /> 100% Confidential</div>
                        <div className="inq-trust-badge"><i className="fas fa-clock" /> Response in 24–48 hrs</div>
                        <div className="inq-trust-badge"><i className="fas fa-handshake" /> No commitment required</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StepReview({ form, onBack, onSubmit }) {
    return (
        <div className="inq-main">
            <div className="inq-header">
                <span className="bb-eyebrow">Review</span>
                <h2>Confirm Your <span className="bb-text-fire">Details</span></h2>
                <div className="bb-rule" />
                <p>Please review your inquiry before submitting. You can go back to make changes.</p>
            </div>

            <div className="bb-card" style={{ marginBottom: '1.25rem' }}>
                <SectionTitle icon="fa-user">Contact Info</SectionTitle>
                <div className="inq-row2" style={{ marginBottom: '1.5rem' }}>
                    {[['Name', form.name], ['Phone', form.phone], ['Email', form.email], ['Brand', form.company || '—']].map(([k, v]) => (
                        <div key={k}>
                            <div className="inq-rv-key">{k}</div>
                            <div className="inq-rv-val">{v}</div>
                        </div>
                    ))}
                </div>
                <SectionTitle icon="fa-file-alt">Requirement</SectionTitle>
                <p style={{ marginBottom: form.notes ? '1rem' : 0 }}>{form.description}</p>
                {form.notes && <div className="inq-notes-box"><strong>Notes:</strong> {form.notes}</div>}
            </div>

            <div className="inq-summary-box">
                <div className="inq-summary-title">📋 Inquiry Summary</div>
                {[['Category', form.categories.join(', ') || '—'], ['Service', form.service || '—'], ['MOQ', form.moq || '—'], ['Budget', form.budget, true], ['Timeline', form.timeline]].map(([k, v, fire]) => (
                    <div key={k} className={`inq-summary-row ${fire ? 'fire' : ''}`}>
                        <span className="inq-summary-key">{k}</span>
                        <span className="inq-summary-val">{v}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <button className="bb-btn-ghost" onClick={onBack}><i className="fas fa-arrow-left" /> Edit Inquiry</button>
                <button className="bb-submit" style={{ flex: 1, minWidth: '200px', justifyContent: 'center' }} onClick={onSubmit}>
                    <i className="fas fa-paper-plane fa-sm" /> Submit Inquiry
                </button>
            </div>
            <div className="inq-trust-row" style={{ marginTop: '1rem' }}>
                <div className="inq-trust-badge"><i className="fas fa-lock" /> Encrypted &amp; Secure</div>
                <div className="inq-trust-badge"><i className="fas fa-ban" /> Zero Spam Policy</div>
            </div>
        </div>
    )
}

function StepCheckout({ form, onBack, onConfirm }) {
    const [agree, setAgree] = useState(false)

    return (
        <div className="inq-main">
            <div className="inq-header">
                <span className="bb-eyebrow">Checkout</span>
                <h2>Almost <span className="bb-text-fire">There!</span></h2>
                <div className="bb-rule" />
                <p>Review your final inquiry details and confirm to submit.</p>
            </div>

            <div className="inq-checkout-summary-card">
                <div className="inq-checkout-section-label"><i className="fas fa-user-circle" /> Submitting As</div>
                <div className="inq-checkout-identity">
                    <div className="inq-checkout-avatar">{form.name.charAt(0).toUpperCase() || 'U'}</div>
                    <div>
                        <div className="inq-checkout-name">{form.name}</div>
                        <div className="inq-checkout-meta">{form.email} &nbsp;·&nbsp; {form.phone}</div>
                        {form.company && <div className="inq-checkout-meta">{form.company}</div>}
                    </div>
                </div>
            </div>

            <div className="inq-checkout-summary-card" style={{ marginTop: '1.1rem' }}>
                <div className="inq-checkout-section-label"><i className="fas fa-box-open" /> Requirement Overview</div>
                <div className="inq-checkout-req-grid">
                    {[
                        ['Category', form.categories.join(', ') || '—'],
                        ['Service', form.service || '—'],
                        ['MOQ', form.moq || '—'],
                        ['Timeline', form.timeline],
                    ].map(([k, v]) => (
                        <div key={k} className="inq-checkout-req-item">
                            <div className="inq-checkout-req-key">{k}</div>
                            <div className="inq-checkout-req-val">{v}</div>
                        </div>
                    ))}
                </div>
                <div className="inq-checkout-budget-row">
                    <span className="inq-checkout-budget-label">Estimated Budget</span>
                    <span className="inq-checkout-budget-val">{form.budget}</span>
                </div>
                {form.description && (
                    <div className="inq-checkout-desc">
                        <div className="inq-checkout-req-key" style={{ marginBottom: '0.35rem' }}>Description</div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--bb-ink-mid)', lineHeight: 1.6 }}>{form.description}</div>
                    </div>
                )}
            </div>

            <div className="inq-checkout-promise">
                <div className="inq-checkout-promise-row"><i className="fas fa-shield-alt" /><span>Your data is encrypted and never sold to third parties.</span></div>
                <div className="inq-checkout-promise-row"><i className="fas fa-clock" /><span>Our team responds within 24–48 business hours.</span></div>
                <div className="inq-checkout-promise-row"><i className="fas fa-handshake" /><span>No commitment required — this is just an inquiry.</span></div>
            </div>

            <div className="inq-checkout-agree" onClick={() => setAgree(a => !a)}>
                <div className={`inq-agree-box ${agree ? 'checked' : ''}`}>
                    {agree && <i className="fas fa-check" style={{ fontSize: '0.6rem', color: '#fff' }} />}
                </div>
                <span>I confirm the details above are correct and agree to be contacted by the Banega Brand team.</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <button className="bb-btn-ghost" onClick={onBack}><i className="fas fa-arrow-left" /> Go Back</button>
                <button
                    className="bb-submit"
                    style={{ flex: 1, minWidth: '200px', justifyContent: 'center', opacity: agree ? 1 : 0.5, cursor: agree ? 'pointer' : 'not-allowed' }}
                    onClick={() => agree && onConfirm()}
                    disabled={!agree}
                >
                    <i className="fas fa-check-circle fa-sm" /> Confirm &amp; Submit
                </button>
            </div>
        </div>
    )
}

function StepConfirmation({ form, refNum, onClose, onNew }) {
    useEffect(() => {
        const container = document.getElementById('inq-confetti')
        if (!container) return
        const colors = ['#fe6418', '#ff8c4a', '#fff3ed', '#1a2340', '#ffd700']
        for (let i = 0; i < 60; i++) {
            const d = document.createElement('div')
            d.className = 'inq-confetti-piece'
            d.style.cssText = `left:${Math.random() * 100}%;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${2 + Math.random() * 2}s;animation-delay:${Math.random() * 1.2}s;width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;border-radius:${Math.random() > 0.5 ? '50%' : '3px'};`
            container.appendChild(d)
        }
        const t = setTimeout(() => { if (container) container.innerHTML = '' }, 5000)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="inq-main">
            <div id="inq-confetti" className="inq-confetti-wrap" />
            <div className="inq-checkout-hero">
                <div className="inq-check-circle"><i className="fas fa-check" /></div>
                <span className="bb-eyebrow">Confirmed</span>
                <h2>Inquiry <span className="bb-text-fire">Received!</span></h2>
                <p style={{ maxWidth: 480, margin: '0.75rem auto 0' }}>
                    Your brand journey starts now. Our team will reach out within <strong style={{ color: 'var(--bb-ink)' }}>24–48 hours</strong>.
                </p>
                <div className="inq-ref-tag">{refNum}</div>
            </div>

            <div className="inq-checkout-grid">
                <div className="inq-detail-card">
                    <div className="inq-detail-title"><i className="fas fa-user-circle" /> Contact Details</div>
                    {[['fa-user', 'Name', form.name], ['fa-envelope', 'Email', form.email], ['fa-phone', 'Phone', form.phone], ['fa-building', 'Brand', form.company || 'Not provided']].map(([icon, key, val]) => (
                        <div key={key} className="inq-detail-item">
                            <div className="inq-detail-icon"><i className={`fas ${icon}`} /></div>
                            <div><div className="inq-detail-key">{key}</div><div className="inq-detail-val">{val}</div></div>
                        </div>
                    ))}
                </div>
                <div className="inq-detail-card">
                    <div className="inq-detail-title"><i className="fas fa-box-open" /> Requirement Details</div>
                    {[['fa-tag', 'Category', form.categories.join(', ') || '—', false], ['fa-cogs', 'Service', form.service || '—', false], ['fa-layer-group', 'MOQ', form.moq || '—', false], ['fa-rupee-sign', 'Budget', form.budget, true], ['fa-calendar', 'Timeline', form.timeline, false]].map(([icon, key, val, fire]) => (
                        <div key={key} className="inq-detail-item">
                            <div className="inq-detail-icon"><i className={`fas ${icon}`} /></div>
                            <div><div className="inq-detail-key">{key}</div><div className="inq-detail-val" style={fire ? { color: 'var(--bb-fire)' } : {}}>{val}</div></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="inq-detail-card" style={{ marginTop: '1.5rem' }}>
                <div className="inq-detail-title"><i className="fas fa-map-signs" /> What Happens Next</div>
                {NEXT_STEPS.map((s, i) => (
                    <div key={i} className="inq-step-item">
                        <div className="inq-step-num">{i + 1}</div>
                        <div><div className="inq-step-key">{s.title}</div><div className="inq-step-sub">{s.sub}</div></div>
                    </div>
                ))}
            </div>

            <div className="inq-action-btns">
                <a href="https://banegabrand.com" target="_blank" rel="noreferrer" className="bb-btn-fire"><i className="fas fa-globe" /> Visit Platform</a>
                <button className="bb-btn-ghost" onClick={onNew}><i className="fas fa-plus" /> Submit Another</button>
                <button className="bb-btn-ghost" onClick={onClose}><i className="fas fa-times" /> Close</button>
            </div>
        </div>
    )
}

export default function InquiryPage({ onClose }) {
    const [step, setStep] = useState(1)
    const [form, setForm] = useState(INIT)
    const [errors, setErrors] = useState({})
    const [refNum, setRefNum] = useState('')

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    const scrollToTop = () => document.querySelector('.inq-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' })

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Please enter your name'
        if (!form.phone.trim() || form.phone.trim().length < 7) e.phone = 'Please enter a valid phone number'
        if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email'
        if (!form.description.trim()) e.description = 'Please describe your requirement'
        if (form.categories.length === 0) e.categories = 'Please select at least one category'
        return e
    }

    const handleNext = () => {
        const e = validate()
        if (Object.keys(e).length > 0) {
            setErrors(e)
            setTimeout(() => document.querySelector('.bb-field.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
            return
        }
        setErrors({})
        setStep(2)
        scrollToTop()
    }

    const handleSubmit = () => { setStep(3); scrollToTop() }
    const handleConfirm = () => { setRefNum(genRef()); setStep(4); scrollToTop() }
    const handleNew = () => { setForm(INIT); setErrors({}); setStep(1); scrollToTop() }

    return (
        <>
            <style>{STYLES}</style>
            <div className="inq-overlay" onClick={onClose} />
            <div className="inq-panel">
                <div id="inq-scroll-top" />
                <ProgressBar onClose={onClose} />
                <div className="inq-scroll-area">
                    <StepsBar step={step} />
                    {step === 1 && <StepForm form={form} setForm={setForm} errors={errors} onNext={handleNext} />}
                    {step === 2 && <StepReview form={form} onBack={() => { setStep(1); scrollToTop() }} onSubmit={handleSubmit} />}
                    {step === 3 && <StepCheckout form={form} onBack={() => { setStep(2); scrollToTop() }} onConfirm={handleConfirm} />}
                    {step === 4 && <StepConfirmation form={form} refNum={refNum} onClose={onClose} onNew={handleNew} />}
                </div>
            </div>
        </>
    )
}

const STYLES = `
.inq-overlay{position:fixed;inset:0;background:rgba(26,35,64,0.55);z-index:10100;animation:inqFadeIn 0.3s ease both}
.inq-panel{position:fixed;top:0;right:0;width:100%;max-width:760px;height:100vh;background:var(--bb-ground);z-index:10200;display:flex;flex-direction:column;box-shadow:-20px 0 80px rgba(26,35,64,0.18);animation:inqSlideIn 0.4s cubic-bezier(0.23,1,0.32,1) both}
@keyframes inqFadeIn{from{opacity:0}to{opacity:1}}
@keyframes inqSlideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}

.inq-progress-wrap{background:var(--bb-snow);border-bottom:1px solid var(--bb-line);padding:0.85rem 1.5rem 0.75rem;flex-shrink:0}
.inq-progress-top{display:flex;align-items:center;justify-content:space-between}
.inq-progress-logo img{height:36px;width:auto;display:block;object-fit:contain}

.inq-close{width:34px;height:34px;border-radius:50%;border:1px solid var(--bb-fire-ring);background:var(--bb-fire-tint);color:var(--bb-fire);font-size:0.85rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.2s,color 0.2s,transform 0.3s;flex-shrink:0}
.inq-close:hover{background:var(--bb-fire);color:#fff;transform:rotate(90deg)}

.inq-steps-bar{background:var(--bb-snow);border-bottom:1px solid var(--bb-line);padding:0.65rem 1.5rem 0.7rem;flex-shrink:0}
.inq-progress-steps{display:flex;align-items:center;width:100%}

.inq-p-step{display:flex;align-items:center;gap:0.35rem;font-size:0.72rem;font-weight:600;color:var(--bb-ink-muted);white-space:nowrap}
.inq-p-step.active{color:var(--bb-fire)}
.inq-p-step.done{color:var(--bb-ink-mid)}

.inq-p-dot{width:24px;height:24px;border-radius:50%;border:2px solid var(--bb-line);display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;background:var(--bb-snow);transition:all 0.3s;flex-shrink:0}
.inq-p-step.active .inq-p-dot{border-color:var(--bb-fire);background:var(--bb-fire);color:#fff;box-shadow:0 3px 10px var(--bb-fire-glow)}
.inq-p-step.done .inq-p-dot{border-color:var(--bb-ink-mid);background:var(--bb-ink-mid);color:#fff}

.inq-p-label{font-size:0.72rem}

.inq-p-line{flex:1;min-width:12px;height:2px;background:var(--bb-line);border-radius:2px;margin:0 0.3rem;transition:background 0.4s}
.inq-p-line.done{background:var(--bb-ink-mid)}

.inq-scroll-area{flex:1;overflow-y:auto;overflow-x:hidden;scroll-behavior:smooth}
.inq-main{max-width:680px;margin:0 auto;padding:2rem 1.5rem 4rem}
.inq-header{margin-bottom:1.75rem}
.inq-row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.inq-field-group{margin-bottom:1.1rem}
.inq-field-label{display:block;font-size:0.8rem;font-weight:700;color:var(--bb-ink-mid);margin-bottom:0.4rem}
.inq-req{color:var(--bb-fire);margin-left:2px}
.bb-field.error{border-color:#e53e3e;box-shadow:0 0 0 3px rgba(229,62,62,0.1)}
.inq-err-msg{font-size:0.73rem;color:#e53e3e;margin-top:0.3rem}
.inq-section-title{font-family:"Cormorant Garamond",serif;font-weight:700;font-size:1.05rem;color:var(--bb-ink);margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:1px solid var(--bb-line-soft);display:flex;align-items:center;gap:0.6rem}
.inq-section-title i{color:var(--bb-fire);font-size:0.85rem}
.inq-chips{display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.4rem}
.inq-chip{padding:0.38rem 0.9rem;border-radius:50px;border:1.5px solid var(--bb-line);font-size:0.76rem;font-weight:600;color:var(--bb-ink-mid);cursor:pointer;background:var(--bb-snow);transition:all 0.2s;font-family:"Plus Jakarta Sans",sans-serif}
.inq-chip:hover{border-color:var(--bb-fire-ring);color:var(--bb-fire)}
.inq-chip.selected{background:var(--bb-fire-tint);border-color:var(--bb-fire);color:var(--bb-fire)}
.inq-budget-display{font-family:"Cormorant Garamond",serif;font-size:1.5rem;font-weight:800;color:var(--bb-fire);margin-bottom:0.4rem}
.inq-slider{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:50px;background:linear-gradient(to right,var(--bb-fire) 0%,var(--bb-fire) var(--pct,30%),var(--bb-line-soft) var(--pct,30%),var(--bb-line-soft) 100%);outline:none;cursor:pointer}
.inq-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--bb-fire);box-shadow:0 3px 10px var(--bb-fire-glow);cursor:pointer}
.inq-slider-labels{display:flex;justify-content:space-between;font-size:0.7rem;color:var(--bb-ink-muted);margin-top:0.3rem;font-weight:600}
.inq-timeline-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:0.6rem;margin-top:0.4rem}
.inq-tl-card{border:1.5px solid var(--bb-line);border-radius:14px;padding:0.8rem 0.6rem;text-align:center;cursor:pointer;background:var(--bb-snow);font-family:"Plus Jakarta Sans",sans-serif;transition:all 0.25s}
.inq-tl-card:hover{border-color:var(--bb-fire-ring)}
.inq-tl-card.selected{border-color:var(--bb-fire);background:var(--bb-fire-tint)}
.inq-tl-icon{font-size:1.3rem;display:block;margin-bottom:0.3rem}
.inq-tl-label{font-size:0.75rem;font-weight:700;color:var(--bb-ink-mid)}
.inq-tl-card.selected .inq-tl-label{color:var(--bb-fire)}
.inq-tl-sub{font-size:0.68rem;color:var(--bb-ink-muted);margin-top:0.2rem}
.inq-trust-row{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}
.inq-trust-badge{display:flex;align-items:center;gap:0.35rem;font-size:0.72rem;font-weight:600;color:var(--bb-ink-muted)}
.inq-trust-badge i{color:var(--bb-fire);font-size:0.75rem}
.inq-rv-key{font-size:0.72rem;color:var(--bb-ink-muted);font-weight:600;margin-bottom:0.15rem}
.inq-rv-val{font-size:0.9rem;font-weight:700;color:var(--bb-ink)}
.inq-notes-box{background:var(--bb-fire-tint);border-radius:10px;padding:0.8rem 1rem;font-size:0.84rem;color:var(--bb-ink-mid);margin-top:0.75rem}
.inq-summary-box{background:var(--bb-fire-tint);border:1px solid var(--bb-fire-ring);border-radius:16px;padding:1.4rem;margin-bottom:1.25rem}
.inq-summary-title{font-family:"Cormorant Garamond",serif;font-weight:700;font-size:1rem;color:var(--bb-ink);margin-bottom:0.9rem}
.inq-summary-row{display:flex;justify-content:space-between;align-items:center;padding:0.45rem 0;border-bottom:1px solid rgba(254,100,24,0.12);font-size:0.84rem}
.inq-summary-row:last-child{border-bottom:none}
.inq-summary-key{color:var(--bb-ink-muted);font-weight:600}
.inq-summary-val{color:var(--bb-ink);font-weight:700;text-align:right;max-width:220px}
.inq-summary-row.fire .inq-summary-val{color:var(--bb-fire)}

.inq-checkout-summary-card{background:var(--bb-snow);border:1px solid var(--bb-line-soft);border-radius:16px;padding:1.35rem 1.4rem;box-shadow:0 2px 14px var(--bb-dust-sm)}
.inq-checkout-section-label{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--bb-fire);margin-bottom:0.9rem;display:flex;align-items:center;gap:0.4rem}
.inq-checkout-identity{display:flex;align-items:center;gap:1rem}
.inq-checkout-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--bb-fire),var(--bb-fire-soft));display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",serif;font-size:1.35rem;font-weight:800;color:#fff;flex-shrink:0}
.inq-checkout-name{font-size:1rem;font-weight:700;color:var(--bb-ink);margin-bottom:0.15rem}
.inq-checkout-meta{font-size:0.76rem;color:var(--bb-ink-muted)}
.inq-checkout-req-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.7rem 1.2rem;margin-bottom:1rem}
.inq-checkout-req-item{}
.inq-checkout-req-key{font-size:0.7rem;font-weight:700;color:var(--bb-ink-muted);margin-bottom:0.15rem}
.inq-checkout-req-val{font-size:0.88rem;font-weight:700;color:var(--bb-ink)}
.inq-checkout-budget-row{display:flex;align-items:center;justify-content:space-between;background:var(--bb-fire-tint);border:1px solid var(--bb-fire-ring);border-radius:10px;padding:0.6rem 1rem;margin-bottom:0.85rem}
.inq-checkout-budget-label{font-size:0.76rem;font-weight:700;color:var(--bb-ink-mid)}
.inq-checkout-budget-val{font-family:"Cormorant Garamond",serif;font-size:1.2rem;font-weight:800;color:var(--bb-fire)}
.inq-checkout-desc{padding-top:0.75rem;border-top:1px solid var(--bb-line-soft)}
.inq-checkout-promise{background:var(--bb-ground);border:1px solid var(--bb-line-soft);border-radius:14px;padding:1rem 1.2rem;margin-top:1.1rem;display:flex;flex-direction:column;gap:0.55rem}
.inq-checkout-promise-row{display:flex;align-items:flex-start;gap:0.65rem;font-size:0.8rem;color:var(--bb-ink-mid)}
.inq-checkout-promise-row i{color:var(--bb-fire);margin-top:0.1rem;flex-shrink:0}
.inq-checkout-agree{display:flex;align-items:flex-start;gap:0.75rem;margin-top:1.25rem;cursor:pointer;font-size:0.82rem;color:var(--bb-ink-mid);line-height:1.55}
.inq-agree-box{width:20px;height:20px;border-radius:5px;border:2px solid var(--bb-line);background:var(--bb-snow);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;margin-top:0.05rem}
.inq-agree-box.checked{background:var(--bb-fire);border-color:var(--bb-fire)}

.inq-checkout-hero{text-align:center;padding:1.5rem 0 1.25rem;animation:inqFadeIn 0.5s ease both}
.inq-check-circle{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--bb-fire),var(--bb-fire-soft));display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;box-shadow:0 16px 36px rgba(254,100,24,0.32);animation:inqPopIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both}
@keyframes inqPopIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.inq-check-circle i{color:#fff;font-size:1.75rem}
.inq-ref-tag{display:inline-block;background:var(--bb-fire-tint);border:1px solid var(--bb-fire-ring);border-radius:8px;padding:0.3rem 0.85rem;font-size:0.78rem;font-weight:700;color:var(--bb-fire);margin-top:0.75rem;letter-spacing:0.06em}
.inq-checkout-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:1.75rem}
.inq-detail-card{background:var(--bb-snow);border:1px solid var(--bb-line-soft);border-radius:16px;padding:1.4rem;box-shadow:0 2px 14px var(--bb-dust-sm)}
.inq-detail-title{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--bb-fire);margin-bottom:0.9rem;display:flex;align-items:center;gap:0.4rem}
.inq-detail-item{display:flex;gap:0.7rem;padding:0.5rem 0;border-bottom:1px solid var(--bb-line-soft)}
.inq-detail-item:last-child{border-bottom:none}
.inq-detail-icon{width:30px;height:30px;border-radius:8px;background:var(--bb-fire-tint);border:1px solid var(--bb-fire-ring);display:flex;align-items:center;justify-content:center;color:var(--bb-fire);font-size:0.72rem;flex-shrink:0}
.inq-detail-key{font-size:0.7rem;color:var(--bb-ink-muted);font-weight:600;margin-bottom:0.1rem}
.inq-detail-val{font-size:0.85rem;color:var(--bb-ink);font-weight:700}
.inq-step-item{display:flex;gap:0.85rem;padding:0.65rem 0;border-bottom:1px solid var(--bb-line-soft)}
.inq-step-item:last-child{border-bottom:none}
.inq-step-num{width:28px;height:28px;border-radius:50%;background:var(--bb-fire);color:#fff;display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",serif;font-weight:800;font-size:0.95rem;flex-shrink:0}
.inq-step-key{font-size:0.84rem;font-weight:700;color:var(--bb-ink);margin-bottom:0.15rem}
.inq-step-sub{font-size:0.76rem;color:var(--bb-ink-muted);line-height:1.55}
.inq-action-btns{display:flex;gap:0.85rem;margin-top:2rem;flex-wrap:wrap}
.inq-confetti-wrap{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10300;overflow:hidden}
.inq-confetti-piece{position:absolute;top:-10px;animation:inqConfetti var(--dur,3s) linear var(--delay,0s) forwards;border-radius:2px}
@keyframes inqConfetti{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
@media(max-width:560px){.inq-row2{grid-template-columns:1fr}.inq-panel{max-width:100%}.inq-checkout-grid{grid-template-columns:1fr}.inq-p-label{display:none}.inq-checkout-req-grid{grid-template-columns:1fr}}
`