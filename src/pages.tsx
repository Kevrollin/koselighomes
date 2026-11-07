import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import { biz, experiences, nearby, stays, waLink, type Stay } from './data'
import { EnquiryForm, Gallery, Photo, useMeta } from './ui'

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const general = 'Hello Koselig Homes. I would like to check availability and rates for a stay in Nanyuki.'
const Wa = ({ text = general, label = 'Chat on WhatsApp', cls = 'btn-primary' }: { text?: string; label?: string; cls?: string }) =>
  <a className={`btn ${cls}`} href={waLink(text)} {...ext}><MessageCircle size={18} />{label}</a>
const Top = ({ title, lead }: { title: string; lead?: string }) => (
  <header className="wrap pb-12 pt-36 md:pt-44"><h1 className="h1 max-w-[16ch]">{title}</h1>{lead && <p className="lead mt-6 text-charcoal/80">{lead}</p>}</header>
)

function StayCard({ s, cls = '' }: { s: Stay; cls?: string }) {
  return (
    <article className={cls}>
      <Link to={`/stays/${s.slug}`} className="block aspect-[4/5] overflow-hidden rounded-[6px]" aria-label={`View ${s.name}`}>
        <Photo id={s.photos[0]} className="transition-transform duration-700 hover:scale-[1.03]" />
      </Link>
      <h3 className="mt-5 font-display text-3xl font-semibold">{s.name}</h3>
      <p className="mt-2 max-w-md text-charcoal/80">{s.blurb}</p>
      <p className="mt-3 text-sm font-semibold">Sleeps {s.guests} · {s.config}</p>
      <p className="mt-1 text-sm text-charcoal/75">{s.amenities.slice(0, 4).join(' · ')}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="btn btn-line" to={`/stays/${s.slug}`}>View Stay</Link>
        <Wa text={`Hello Koselig Homes. I would like to check availability for ${s.name}. Please share the available dates and rates.`} label="Enquire" />
      </div>
    </article>
  )
}

function Closing() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <div className="absolute inset-0"><Photo id="dusk" sizes="100vw" /></div>
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="wrap relative py-28 md:py-40">
        <h2 className="h2 max-w-[16ch]">Your Nanyuki stay starts here.</h2>
        <p className="lead mt-5 text-ivory/90">Planning a getaway, a work trip or a little time away? Let’s help you find the right stay.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact#enquire" className="btn btn-light">Check Availability</Link>
          <Wa cls="border border-ivory/70 text-ivory hover:bg-ivory hover:text-forest" />
        </div>
      </div>
    </section>
  )
}

export function Home() {
  useMeta('Koselig Homes | Riverside accommodation in Nanyuki, Kenya', 'Riverside guesthouses in Nanyuki, Laikipia. Private one-bedroom stays with a garden, Wi-Fi, a kitchen and a workspace. Enquire on WhatsApp.')
  const d = (s: number) => ({ animationDelay: `${s}s` })
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest text-ivory">
        <div className="anim-settle absolute inset-0 overflow-hidden"><div className="hero-pan"><Photo id="hero" eager fade sizes="100vw" /></div></div>
        <div className="hero-scrim absolute inset-0" />
        <div className="hero-top absolute inset-x-0 top-0 h-32" />
        <div className="wrap relative pb-12 pt-32 md:pb-20">
          <p className="hero-text anim-rise mb-5" style={d(0.2)}>{biz.place}</p>
          <h1 className="h1 hero-text anim-rise max-w-[14ch]" style={d(0.35)}>A calm place to stay in Nanyuki.</h1>
          <p className="lead hero-text anim-rise mt-6 text-ivory/90" style={d(0.5)}>Discover comfort, privacy and a welcoming atmosphere at Koselig Homes.</p>
          <div className="anim-rise mt-8 flex flex-wrap gap-3" style={d(0.65)}>
            <Link to="/stays" className="btn btn-light">Explore Our Stays</Link>
            <Link to="/contact#enquire" className="btn border border-ivory/70 text-ivory hover:bg-ivory hover:text-forest">Check Availability</Link>
          </div>
        </div>
      </section>

      <section className="wrap grid items-center gap-10 py-24 md:grid-cols-12 md:gap-16 md:py-36">
        <div className="md:col-span-5">
          <h2 className="h2">More than just a place to stay.</h2>
          <p className="lead mt-6 text-charcoal/80">At Koselig Homes, we believe a good stay is about feeling comfortable, settled and welcome. Find a little space to unwind while enjoying everything Nanyuki has to offer.</p>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-[6px] md:col-span-7"><Photo id="intro" /></div>
      </section>

      <section className="wrap pb-24 md:pb-36">
        <h2 className="h2 mb-12">Our stays</h2>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">{stays.map((s, i) => <StayCard key={s.slug} s={s} cls={i ? 'md:mt-24' : ''} />)}</div>
      </section>

      <section className="bg-forest text-ivory">
        <div className="wrap grid items-center gap-12 py-24 md:grid-cols-2 md:gap-20 md:py-32">
          <div className="order-2 aspect-[4/5] overflow-hidden rounded-[6px] md:order-1"><Photo id="firepit" /></div>
          <div className="order-1 md:order-2">
            <h2 className="h2">The Koselig experience</h2>
            <ul className="mt-8 divide-y divide-ivory/20 border-y border-ivory/20">
              {experiences.map((e) => <li key={e.id} className="py-5"><p className="font-display text-2xl font-semibold">{e.title}</p><p className="mt-1 text-ivory/80">{e.text}</p></li>)}
            </ul>
            <Link to="/experience" className="btn btn-light mt-8">See the experience</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-36">
        <h2 className="h2 mb-10">Around the property</h2>
        <Gallery editorial ids={['r2-5', 'r1-3', 'r2-2', 'r1-5', 'r2-4', 'r1-4', 'r2-3']} />
      </section>

      <section className="wrap pb-24 md:pb-36">
        <div className="max-w-xl"><h2 className="h2">Explore Nanyuki</h2><p className="lead mt-5 text-charcoal/80">A convenient base for the mountain, the conservancies and the town itself.</p></div>
        <ul className="mt-10 border-b border-charcoal/15">
          {nearby.map((n) => (
            <li key={n.title} className="grid gap-1 border-t border-charcoal/15 py-5 md:grid-cols-12 md:gap-8">
              <h3 className="font-display text-2xl font-semibold md:col-span-5">{n.title}</h3>
              <p className="text-charcoal/80 md:col-span-7">{n.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap pb-24 md:pb-36">
        <h2 className="h2">What guests say</h2>
        <p className="lead mt-4 text-charcoal/80">Ratings come from each Airbnb listing and are shown separately, not averaged.</p>
        <ul className="mt-8 border-b border-charcoal/15">
          {stays.map((s) => (
            <li key={s.slug} className="flex flex-wrap items-baseline justify-between gap-2 border-t border-charcoal/15 py-5">
              <span className="font-display text-2xl font-semibold">{s.name}</span>
              <a className="inline-flex items-center gap-1 underline underline-offset-4" href={s.airbnb} {...ext}>Rated {s.rating} on Airbnb <ArrowUpRight size={16} /></a>
            </li>
          ))}
        </ul>
      </section>
      <Closing />
    </>
  )
}

export function Stays() {
  useMeta('Our Stays | Koselig Homes, Nanyuki', 'Two private one-bedroom riverside guesthouses in Nanyuki, each sleeping two. See photos, amenities and enquire on WhatsApp.')
  return (
    <>
      <Top title="Our stays" lead="Two private one-bedroom homes beside the river. Each sleeps two guests." />
      <div className="wrap space-y-24 pb-24 md:space-y-32 md:pb-32">
        {stays.map((s, i) => (
          <article key={s.slug} className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
            <Link to={`/stays/${s.slug}`} className={`aspect-[4/3] overflow-hidden rounded-[6px] md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`} aria-label={`View ${s.name}`}><Photo id={s.photos[0]} /></Link>
            <div className="md:col-span-5">
              <h2 className="h2">{s.name}</h2>
              <p className="mt-4 text-charcoal/80">{s.blurb}</p>
              <p className="mt-4 text-sm font-semibold">Sleeps {s.guests} · {s.config}</p>
              <p className="mt-1 text-sm text-charcoal/75">{s.amenities.join(' · ')}</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link to={`/stays/${s.slug}`} className="btn btn-line">View Stay</Link><Wa text={`Hello Koselig Homes. I would like to check availability for ${s.name}. Please share the available dates and rates.`} label="Enquire" /></div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export function StayDetail() {
  const s = stays.find((x) => x.slug === useParams().slug)
  useMeta(s ? `${s.name} | Koselig Homes, Nanyuki` : 'Stay not found | Koselig Homes', s ? `${s.blurb} Sleeps ${s.guests}. Enquire on WhatsApp.` : 'This stay could not be found.')
  if (!s) return <Top title="Stay not found" lead="Choose one of our stays instead." />
  const other = stays.find((x) => x.slug !== s.slug)
  return (
    <>
      <header className="wrap pb-10 pt-32 md:pt-40"><h1 className="h1 max-w-[18ch]">{s.name}</h1><p className="lead mt-5 text-charcoal/80">{s.blurb}</p></header>
      <div className="wrap"><div className="aspect-[16/9] overflow-hidden rounded-[6px]"><Photo id={s.photos[0]} eager sizes="100vw" /></div></div>
      <section className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <p className="font-semibold">Sleeps {s.guests} · {s.config}</p>
          <p className="mt-2 flex items-center gap-2 text-charcoal/80"><MapPin size={18} />{biz.address}</p>
          <p className="mt-6 text-charcoal/80">Rates change with the season. Send your dates and we will reply with current availability and rates.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Wa text={`Hello Koselig Homes. I would like to check availability for ${s.name}. Please share the available dates and rates.`} label="Enquire on WhatsApp" />
            <a className="btn btn-line" href={s.airbnb} {...ext}>Book on Airbnb <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="font-display text-3xl font-semibold">What’s here</h2>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">{s.amenities.map((a) => <li key={a} className="border-b border-charcoal/15 py-3">{a}</li>)}</ul>
          <p className="mt-4 text-sm text-charcoal/75">Both homes share the riverside grounds and an on-site restaurant.</p>
        </div>
      </section>
      <section className="wrap pb-24"><Gallery ids={s.photos.slice(1)} /></section>
      {other && <section className="wrap pb-24"><Link to={`/stays/${other.slug}`} className="font-display text-3xl underline underline-offset-8 hover:text-forest">Also see {other.name}</Link></section>}
    </>
  )
}

export function Experience() {
  useMeta('Experience | Koselig Homes, Nanyuki', 'Riverside grounds, evenings by the fire pit, an on-site restaurant and room to work. See what a stay at Koselig Homes feels like.')
  return (
    <>
      <Top title="What a stay feels like" lead="Slow mornings, quiet grounds and Nanyuki close by." />
      <div className="wrap space-y-20 pb-24 md:space-y-28 md:pb-32">
        {experiences.map((e, i) => (
          <section key={e.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
            <div className={`aspect-[4/3] overflow-hidden rounded-[6px] md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}><Photo id={e.id} /></div>
            <div className="md:col-span-5"><h2 className="h2">{e.title}</h2><p className="lead mt-4 text-charcoal/80">{e.text}</p></div>
          </section>
        ))}
      </div>
      <Closing />
    </>
  )
}

export function About() {
  useMeta('About | Koselig Homes, Nanyuki', 'Koselig Homes offers private riverside stays in Nanyuki, built around comfort, quiet and a warm welcome.')
  return (
    <>
      <Top title="Hospitality built around comfort." />
      <section className="wrap grid gap-10 pb-24 md:grid-cols-12 md:gap-16 md:pb-32">
        <div className="space-y-5 text-lg leading-relaxed text-charcoal/85 md:col-span-6">
          <p>Koselig is a word for cosy, unhurried togetherness. It is the feeling a good stay should leave you with.</p>
          <p>Koselig Homes offers two private one-bedroom homes beside the river in Nanyuki, set among trees and a garden, with the town’s shops and restaurants close by.</p>
          <p>Come to rest, to work for a few days or to use Nanyuki as a base for the mountain and the conservancies.</p>
          <Link to="/stays" className="btn btn-primary">Explore Our Stays</Link>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-[6px] md:col-span-6"><Photo id="grounds" /></div>
      </section>
    </>
  )
}

export function Contact() {
  useMeta('Contact & Reservations | Koselig Homes, Nanyuki', 'Call, WhatsApp or send an enquiry to Koselig Homes in Nanyuki. Share your dates and we will reply with availability and rates.')
  return (
    <>
      <Top title="Plan your stay" lead="Send your dates and we will reply with availability and rates." />
      <div className="wrap grid gap-14 pb-24 md:grid-cols-12 md:pb-32">
        <div className="space-y-4 md:col-span-4">
          <p className="flex items-center gap-3"><Phone size={18} /><a className="underline underline-offset-4" href={`tel:${biz.tel}`}>{biz.phone}</a></p>
          <p className="flex items-center gap-3"><MessageCircle size={18} /><a className="underline underline-offset-4" href={waLink(general)} {...ext}>Chat on WhatsApp</a></p>
          {biz.email && <p><a className="underline underline-offset-4" href={`mailto:${biz.email}`}>{biz.email}</a></p>}
          <p className="flex items-center gap-3"><MapPin size={18} />{biz.address}</p>
          <a className="btn btn-line" href={biz.maps} {...ext}>Get directions <ArrowUpRight size={16} /></a>
        </div>
        <div id="enquire" className="scroll-mt-28 md:col-span-8"><EnquiryForm /></div>
      </div>
    </>
  )
}

export const NotFound = () => <Top title="Page not found" lead="That page does not exist. Try the menu above." />
