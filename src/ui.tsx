import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Menu, MessageCircle, X } from 'lucide-react'
import { altOf, biz, fileOf, nav, stays, waLink } from './data'

export function useMeta(title: string, desc: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name=description]')?.setAttribute('content', desc)
  }, [title, desc])
}

export function Photo({ id, className = '', eager = false, contain = false, fade = false, sizes = '(min-width:1024px) 50vw, 100vw' }:
  { id: string; className?: string; eager?: boolean; contain?: boolean; fade?: boolean; sizes?: string }) {
  const f = fileOf(id)
  const alt = altOf(id)
  const [bad, setBad] = useState(false)
  const [loaded, setLoaded] = useState(!fade)
  if (bad) return <div role="img" aria-label={alt} className={`grid h-full w-full place-items-center bg-forest p-4 text-center text-xs text-ivory/60 ${className}`}>{import.meta.env.DEV ? `Missing public/images/${f}.webp (run npm run photos)` : ''}</div>
  return <img src={`/images/${f}.webp`} srcSet={`/images/${f}-800.webp 800w, /images/${f}.webp 1600w`} sizes={sizes}
    alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setBad(true)} onLoad={() => setLoaded(true)}
    ref={(el) => { if (el?.complete && el.naturalWidth) setLoaded(true) }}
    className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'} ${fade ? `transition-opacity duration-[1400ms] ease-out ${loaded ? 'opacity-100' : 'opacity-0'}` : ''} ${className}`} />
}

export const Logo = () => (
  <Link to="/" aria-label="Koselig Homes, home" className="inline-flex items-center gap-2.5 leading-none">
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15 16 5l12 10" /><path d="M8 13.5V24h16V13.5" /><path d="M4 28c3-2 5 2 8 0s5 2 8 0 5 2 8 0" /></svg>
    <span className="font-display text-2xl font-semibold">Koselig <span className="font-medium italic opacity-80">Homes</span></span>
  </Link>
)

export function Header() {
  const { pathname } = useLocation()
  const [y, setY] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const f = () => setY(scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [pathname])
  const solid = y || open || pathname !== '/'
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'bg-ivory/95 text-charcoal shadow-[0_1px_0_rgba(41,42,37,.1)] backdrop-blur' : 'text-ivory'}`}>
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-9 text-[0.95rem] md:flex">
          {nav.map(([l, to]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `border-b py-1 transition-colors ${isActive ? 'border-terracotta' : 'border-transparent hover:border-current'}`}>{l}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact#enquire" className={`btn ${solid ? 'btn-primary' : 'btn-light'} !min-h-10 !px-4`}>Reserve<span className="hidden sm:inline">&nbsp;a Stay</span></Link>
          <button className="-mr-2 p-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav aria-label="Mobile" className="border-t border-charcoal/10 bg-ivory text-charcoal md:hidden"><ul className="wrap py-3">
        {nav.map(([l, to]) => <li key={to}><Link to={to} className="block py-3 font-display text-2xl">{l}</Link></li>)}
      </ul></nav>}
    </header>
  )
}

export const WaFab = () => (
  <a href={waLink('Hello Koselig Homes. I would like to check availability and rates for a stay in Nanyuki.')} target="_blank" rel="noopener noreferrer"
    aria-label="Chat with Koselig Homes on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-forest text-ivory shadow-lg transition-colors hover:bg-charcoal">
    <MessageCircle size={22} />
  </a>
)

export function Footer() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="wrap grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="text-ivory"><Logo /></div>
          <p className="mt-3 max-w-sm">Private riverside stays in Nanyuki, Laikipia. Comfortable, quiet and close to town.</p>
        </div>
        <ul className="space-y-2 md:col-span-2">{nav.map(([l, to]) => <li key={to}><Link className="hover:text-ivory" to={to}>{l}</Link></li>)}</ul>
        <div className="space-y-2 md:col-span-5">
          <p>{biz.address}</p>
          <p><a className="hover:text-ivory" href={`tel:${biz.tel}`}>{biz.phone}</a></p>
          {biz.email && <p><a className="hover:text-ivory" href={`mailto:${biz.email}`}>{biz.email}</a></p>}
          <p><a className="hover:text-ivory" href={waLink('Hello Koselig Homes.')} {...ext}>WhatsApp</a></p>
          <p className="pt-2 text-sm">Also book on {stays.map((s, i) => <span key={s.slug}><a className="underline hover:text-ivory" href={s.airbnb} {...ext}>Airbnb ({i + 1})</a>, </span>)}<a className="underline hover:text-ivory" href={biz.booking} {...ext}>Booking.com</a></p>
        </div>
      </div>
      <p className="border-t border-ivory/10 py-5 text-center text-sm">© {new Date().getFullYear()} Koselig Homes. Website demo.</p>
    </footer>
  )
}

const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', '', 'md:col-span-2', 'col-span-2 md:col-span-1']

export function Gallery({ ids, editorial = false }: { ids: string[]; editorial?: boolean }) {
  const [i, setI] = useState<number | null>(null)
  const x = useRef(0)
  const go = (d: number) => setI((v) => (v === null ? v : (v + d + ids.length) % ids.length))
  const open = i !== null
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open])
  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 ${editorial ? 'auto-rows-[42vw] md:grid-cols-4 md:auto-rows-[17vw]' : 'auto-rows-[32vw] md:auto-rows-[20vw]'}`}>
        {ids.map((id, n) => (
          <li key={id} className={`overflow-hidden rounded-[6px] ${editorial ? spans[n] ?? '' : ''}`}>
            <button className="block h-full w-full" onClick={() => setI(n)} aria-label={`Open photo: ${altOf(id)}`}>
              <Photo id={id} className="transition-transform duration-700 hover:scale-[1.03]" sizes="(min-width:768px) 40vw, 50vw" />
            </button>
          </li>
        ))}
      </ul>
      {i !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[60] grid place-items-center bg-charcoal/95"
          onTouchStart={(e) => { x.current = e.touches[0].clientX }}
          onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - x.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1) }}>
          <button autoFocus aria-label="Close viewer" onClick={() => setI(null)} className="absolute right-3 top-3 p-3 text-ivory"><X /></button>
          <button aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-1 p-3 text-ivory md:left-6"><ChevronLeft size={32} /></button>
          <div className="h-[78vh] w-[min(90vw,1100px)]"><Photo id={ids[i]} contain eager sizes="100vw" /></div>
          <button aria-label="Next photo" onClick={() => go(1)} className="absolute right-1 p-3 text-ivory md:right-6"><ChevronRight size={32} /></button>
          <p className="absolute bottom-4 px-6 text-center text-sm text-ivory/80">{altOf(ids[i])}</p>
        </div>
      )}
    </>
  )
}

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
    {children}
    {error && <p id={`${id}-e`} role="alert" className="mt-1 text-sm text-[#8F3F26]">{error}</p>}
  </div>
)
const input = 'min-h-12 w-full rounded border border-charcoal/30 bg-white/70 px-4 py-2 focus:border-forest'

export function EnquiryForm({ initial = '' }: { initial?: string }) {
  const [v, setV] = useState({ name: '', phone: '', inn: '', out: '', guests: '2', stay: initial, msg: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const [link, setLink] = useState('')
  const today = new Date().toISOString().slice(0, 10)
  const set = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((p) => ({ ...p, [k]: e.target.value }))
  const a = (k: string) => ({ 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `${k}-e` : undefined })
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (v.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!/^\+?[0-9\s-]{9,15}$/.test(v.phone.trim())) x.phone = 'Enter a phone number, for example +254 7XX XXX XXX.'
    if (!v.inn || v.inn < today) x.inn = 'Choose a check-in date from today onwards.'
    if (!v.out || v.out <= v.inn) x.out = 'Check-out must be after check-in.'
    if (!(+v.guests >= 1 && +v.guests <= 10)) x.guests = 'Enter between 1 and 10 guests.'
    setErr(x)
    if (Object.keys(x).length) return
    const msg = `Hello Koselig Homes. I would like to check availability from ${v.inn} to ${v.out} for ${v.guests} guest(s). I am interested in ${v.stay || 'either home'}. Please share the available options and rates.${v.msg ? ` Note: ${v.msg}` : ''} Name: ${v.name}. Phone: ${v.phone}.`
    const l = waLink(msg)
    setLink(l)
    window.open(l, '_blank', 'noopener')
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="name" label="Full name" error={err.name}><input id="name" className={input} autoComplete="name" value={v.name} onChange={set('name')} {...a('name')} /></Field>
      <Field id="phone" label="Telephone number" error={err.phone}><input id="phone" type="tel" className={input} autoComplete="tel" value={v.phone} onChange={set('phone')} {...a('phone')} /></Field>
      <Field id="inn" label="Check-in date" error={err.inn}><input id="inn" type="date" min={today} className={input} value={v.inn} onChange={set('inn')} {...a('inn')} /></Field>
      <Field id="out" label="Check-out date" error={err.out}><input id="out" type="date" min={v.inn || today} className={input} value={v.out} onChange={set('out')} {...a('out')} /></Field>
      <Field id="guests" label="Number of guests" error={err.guests}><input id="guests" type="number" min={1} max={10} className={input} value={v.guests} onChange={set('guests')} {...a('guests')} /></Field>
      <Field id="stay" label="Preferred accommodation">
        <select id="stay" className={input} value={v.stay} onChange={set('stay')}>
          <option value="">No preference</option>
          {stays.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        </select>
      </Field>
      <div className="sm:col-span-2"><Field id="msg" label="Additional message (optional)"><textarea id="msg" rows={4} className={input} value={v.msg} onChange={set('msg')} /></Field></div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto"><MessageCircle size={18} />Send enquiry on WhatsApp</button>
        <p className="mt-4 text-sm text-charcoal/80" aria-live="polite">
          {link ? <>WhatsApp should have opened with your message. If not, <a className="underline" href={link} target="_blank" rel="noopener noreferrer">open it here</a>. This is an enquiry only: your stay is not confirmed until Koselig Homes replies.</> : 'Your enquiry opens in WhatsApp. Rates and availability are confirmed by Koselig Homes.'}
        </p>
      </div>
    </form>
  )
}
