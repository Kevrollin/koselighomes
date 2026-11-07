// Single source of truth for business facts, stays and photos. Edit here, not in components.
export const biz = {
  name: 'Koselig Homes',
  phone: '+254 706 558788',
  tel: '+254706558788',
  wa: '254706558788', // confirm this is the booking number with the owner
  place: 'Nanyuki · Laikipia, Kenya',
  address: 'Nanyuki, Laikipia County, Kenya',
  email: '', // add when supplied; hidden while empty
  booking: 'https://www.booking.com/hotel/ke/koselig-homes-nanyuki.html',
  maps: 'https://www.google.com/maps/search/?api=1&query=Koselig+Homes+Nanyuki',
}

export const waLink = (text: string) => `https://wa.me/${biz.wa}?text=${encodeURIComponent(text)}`

export const nav: [string, string][] = [
  ['Home', '/'], ['Our Stays', '/stays'], ['Experience', '/experience'], ['About', '/about'], ['Contact', '/contact'],
]

// Real files: public/images/<file>.webp. Run `npm run photos` to fetch + optimise them (scripts/fetch-photos.mjs).
export const photos: Record<string, { alt: string }> = {
  'r1-1': { alt: 'Koselig Home 01 – Riverside, photo 1' }, 'r1-2': { alt: 'Koselig Home 01 – Riverside, photo 2' },
  'r1-3': { alt: 'Koselig Home 01 – Riverside, photo 3' }, 'r1-4': { alt: 'Koselig Home 01 – Riverside, photo 4' },
  'r1-5': { alt: 'Koselig Home 01 – Riverside, photo 5' },
  'r2-1': { alt: 'Koselig Homes 02 – Riverside, photo 1' }, 'r2-2': { alt: 'Koselig Homes 02 – Riverside, photo 2' },
  'r2-3': { alt: 'Koselig Homes 02 – Riverside, photo 3' }, 'r2-4': { alt: 'Koselig Homes 02 – Riverside, photo 4' },
  'r2-5': { alt: 'Koselig Homes 02 – Riverside, photo 5' },
}

// Which file fills each page slot. Review the photos, then swap files here (and refine the alt text above).
export const slots: Record<string, string> = {
  hero: 'r1-1', intro: 'r2-1', grounds: 'r1-5', firepit: 'r2-3', dining: 'r2-4', workspace: 'r1-4', dusk: 'r2-2',
}
export const fileOf = (id: string) => slots[id] ?? id
export const altOf = (id: string) => (slots[id] ? 'Koselig Homes, Nanyuki' : photos[id]?.alt ?? 'Koselig Homes, Nanyuki')

export type Stay = {
  slug: string; name: string; blurb: string; guests: number; config: string
  amenities: string[]; photos: string[]; airbnb: string; rating: string
}

// Capacity and amenities come from each unit's Airbnb listing (checked Nov 2026). Confirm with the owner.
export const stays: Stay[] = [
  {
    slug: 'riverside-01', name: 'Koselig Home 01 – Riverside',
    blurb: 'A one-bedroom guesthouse beside the river, with trees and a garden outside your door.',
    guests: 2, config: '1 bedroom · 1 bed · 1 bath',
    amenities: ['Garden view', 'River view', 'Kitchen', 'Wi-Fi', 'Dedicated workspace'],
    photos: ['r1-2', 'r1-3', 'r1-4', 'r1-5', 'r1-1'],
    airbnb: 'https://www.airbnb.com/rooms/778558804698196232', rating: '4.7 from 10 reviews',
  },
  {
    slug: 'riverside-02', name: 'Koselig Homes 02 – Riverside',
    blurb: 'A one-bedroom guesthouse in a fenced riverside garden, a short walk from Nanyuki’s shops and restaurants.',
    guests: 2, config: '1 bedroom · 1 bed · 1 bath',
    amenities: ['Kitchen', 'Wi-Fi', 'Dedicated workspace', 'Free parking', '43-inch TV with Netflix', 'Fire pit and BBQ grill'],
    photos: ['r2-2', 'r2-3', 'r2-4', 'r2-5', 'r2-1'],
    airbnb: 'https://www.airbnb.com/rooms/779005543190072852', rating: '4.75 from 12 reviews',
  },
]

export const experiences = [
  { id: 'grounds', title: 'Riverside grounds', text: 'Trees, a river and a garden, right in town.' },
  { id: 'firepit', title: 'Evenings by the fire pit', text: 'Outdoor seating under the trees once the day cools.' },
  { id: 'dining', title: 'A restaurant on the premises', text: 'Food and drinks without leaving the compound.' },
  { id: 'workspace', title: 'Room to work', text: 'Wi-Fi and a dedicated workspace in each home.' },
]

export const nearby = [
  { title: 'Mount Kenya', text: 'The mountain that shapes Nanyuki’s skyline.' },
  { title: 'Ol Pejeta Conservancy', text: 'A wildlife conservancy for game drives.' },
  { title: 'The Equator marker', text: 'Stand across two hemispheres near town.' },
]
