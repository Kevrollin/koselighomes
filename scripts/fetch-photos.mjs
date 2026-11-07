// Downloads the public Airbnb listing photos for Koselig Homes into assets-original/.
// These photos belong to the host/photographer: get the owner's written OK before launching publicly.
import { mkdirSync, existsSync, writeFileSync } from 'fs'
const P = 'https://a0.muscache.com/im/pictures/'
const A = P + 'miso/Hosting-778558804698196232/original/', B = P + 'miso/Hosting-779005543190072852/original/'
const files = {
  'r1-1': P + '4dbcaf06-ceb6-4dc5-8e8b-b1d7f9f065b7.jpg', 'r1-2': A + '6b88258d-ad8d-451f-9cfb-77068ff9e8a6.jpeg',
  'r1-3': P + 'b5a06cad-eb24-4fa3-840c-bd9798483fbc.jpg', 'r1-4': A + '94a6ab32-af82-479e-a5ce-07dad804db53.jpeg',
  'r1-5': A + '784b01c9-08ee-4fef-9a2b-1901e8bfae25.jpeg',
  'r2-1': P + 'c2024dd8-d66b-44ed-89d9-77007a66728d.jpg', 'r2-2': B + '9176b655-746c-4930-a4f6-0902ce34d9d5.jpeg',
  'r2-3': P + '2435d988-00db-45cb-ba7e-00e4377e5bd7.jpg', 'r2-4': B + '34a18d47-8859-47d2-823c-fe41aa2a3bca.jpeg',
  'r2-5': B + '9145ed7e-16f3-4661-8137-4908692e727d.jpeg',
}
mkdirSync('assets-original', { recursive: true })
for (const [id, url] of Object.entries(files)) {
  const out = `assets-original/${id}.jpg`
  if (existsSync(out)) { console.log('skip', id); continue }
  let res = await fetch(`${url}?im_w=1440`)
  if (!res.ok) res = await fetch(`${url}?im_w=720`)
  if (!res.ok) { console.warn('failed', id, res.status); continue }
  writeFileSync(out, Buffer.from(await res.arrayBuffer()))
  console.log('downloaded', id)
}
