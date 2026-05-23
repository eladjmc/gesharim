import { Municipality } from '../models/municipality.model'
import { Manhad } from '../models/manhad.model'

const MUNICIPALITIES = [
  'בית גן פקיעין', 'מיער', 'ירכא ג\'וליס', 'עוספיא', 'חורפיש',
  'עכו', 'כרמיאל', 'חצור', 'טבריה', 'רמת הגולן',
  'בית שאן', 'עמק המעיינות', 'חיפה', 'טירת כרמל',
  'מעלות', 'מעלה יוסף', 'קריית אתא',
  'גלבוע', 'גוש הגליל', 'נהריה',
  'אשקלון',
  'שדרות', 'שדות נגב', 'אשכול', 'אילת',
  'רמלה', 'תל אביב', 'אור יהודה', 'בת ים',
  'דימונה', 'באר שבע', 'ערד', 'הר חברון',
  'מעלה אדומים', 'בית שמש', 'גוש עציון', 'ירושלים',
]

interface ManhadSeed {
  name: string
  email: string
  phone: string
  municipalityNames: string[]
}

const MANHADIM: ManhadSeed[] = [
  { name: 'תאמר', email: 'tamar@gesharim.org', phone: '050-1111111',
    municipalityNames: ['בית גן פקיעין', 'מיער', 'ירכא ג\'וליס', 'עוספיא', 'חורפיש'] },
  { name: 'סחר', email: 'sachar@gesharim.org', phone: '050-2222222',
    municipalityNames: ['עכו', 'כרמיאל', 'חצור', 'טבריה', 'רמת הגולן'] },
  { name: 'אלמוג', email: 'almog@gesharim.org', phone: '050-3333333',
    municipalityNames: ['בית שאן', 'עמק המעיינות', 'חיפה', 'טירת כרמל'] },
  { name: 'איריס', email: 'iris@gesharim.org', phone: '050-4444444',
    municipalityNames: ['מעלות', 'מעלה יוסף', 'קריית אתא'] },
  { name: 'שי חתן', email: 'shai@gesharim.org', phone: '050-5555555',
    municipalityNames: ['גלבוע', 'גוש הגליל', 'נהריה'] },
  { name: 'דורין', email: 'dorin@gesharim.org', phone: '050-6666666',
    municipalityNames: ['אשקלון'] },
  { name: 'שיחק', email: 'shichak@gesharim.org', phone: '050-7777777',
    municipalityNames: ['שדרות', 'שדות נגב', 'אשכול', 'אילת'] },
  { name: 'אופיר זויתן', email: 'ofir@gesharim.org', phone: '050-8888888',
    municipalityNames: ['רמלה', 'תל אביב', 'אור יהודה', 'בת ים'] },
  { name: 'אילה', email: 'ayla@gesharim.org', phone: '050-9999999',
    municipalityNames: ['דימונה', 'באר שבע', 'ערד', 'הר חברון'] },
  { name: 'שיראל', email: 'shiral@gesharim.org', phone: '050-1010101',
    municipalityNames: ['מעלה אדומים', 'בית שמש', 'גוש עציון', 'ירושלים'] },
]

export async function seedMunicipalitiesAndManhadim(): Promise<void> {
  const muniCount = await Municipality.countDocuments()
  if (muniCount > 0) return

  const muniDocs = await Municipality.insertMany(
    MUNICIPALITIES.map((name) => ({ name })),
  )
  const muniMap = new Map(muniDocs.map((m) => [m.name, m._id]))

  for (const m of MANHADIM) {
    const municipalityIds = m.municipalityNames
      .map((name) => muniMap.get(name))
      .filter(Boolean)
    await Manhad.create({
      name: m.name,
      email: m.email,
      phone: m.phone,
      municipalities: municipalityIds,
    })
  }
  console.log('✅ Municipalities & Manhadim seeded')
}
