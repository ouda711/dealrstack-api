/**
 * Vehicle brand catalog seed data.
 * Copied from carstrel-api `src/database/seeddata/vehicle-brands.ts`.
 * Re-copy from that file when the upstream list is updated.
 */

export interface VehicleBrandImage {
  source: string;
  thumb: string;
  optimized: string;
  original: string;
  localThumb: string;
  localOptimized: string;
  localOriginal: string;
}

export interface VehicleBrandSeed {
  name: string;
  slug?: string;
  description?: string;
  country?: string;
  logoUrl?: string;
  isActive?: boolean;
  isLuxuryBrand?: boolean;
  marketRank?: number; // Ranking in Kenya market (1 = most common)
  image?: VehicleBrandImage;
  models?: string[];
}

export const vehicleBrandsList: VehicleBrandSeed[] = [
  {
    "name": "9ff",
    "slug": "9ff",
    "description": "9ff is a German automotive company specializing in high-performance Porsche tuning. Known for creating some of the world's fastest street-legal cars, including record-breaking models based on Porsche 911 platforms.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "image": {
      "source": "https://www.carlogos.org/logo/9ff-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/9ff.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/9ff.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/9ff.jpg",
      "localThumb": "./thumb/9ff.png",
      "localOptimized": "./optimized/9ff.png",
      "localOriginal": "./original/9ff.jpg"
    },
    "models": ["GT9", "GT9-R", "GT9-CS", "Speed9", "TR-1000"]
  },
  {
    "name": "Abadal",
    "slug": "abadal",
    "description": "Abadal was a Spanish luxury car manufacturer founded by Francisco Abadal in 1912. The brand has since been revived with concept vehicles, aiming to combine Spanish design with cutting-edge technology.",
    "country": "Spain",
    "isLuxuryBrand": true,
    "image": {
      "source": "https://www.carlogos.org/logo/Abadal-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/abadal.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/abadal.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/abadal.jpg",
      "localThumb": "./thumb/abadal.png",
      "localOptimized": "./optimized/abadal.png",
      "localOriginal": "./original/abadal.jpg"
    },
    "models": ["GT", "Abadal 1.5", "Abadal 3/10 HP"]
  },
  {
    "name": "Abarth",
    "slug": "abarth",
    "description": "Abarth is an Italian racing car and performance car manufacturer founded by Carlo Abarth in 1949. Now a subsidiary of Stellantis, the brand specializes in performance versions of Fiat cars and is known for its scorpion logo.",
    "country": "Italy",
    "isLuxuryBrand": false,
    "marketRank": 15,
    "image": {
      "source": "https://www.carlogos.org/logo/Abarth-logo-640x540.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/abarth.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/abarth.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/abarth.jpg",
      "localThumb": "./thumb/abarth.png",
      "localOptimized": "./optimized/abarth.png",
      "localOriginal": "./original/abarth.jpg"
    },
    "models": ["500", "500C", "595", "595C", "595 Competizione", "595 Turismo", "695", "695 Biposto", "124 Spider", "124 GT", "124 Rally", "Punto", "Grande Punto"]
  },
  {
    "name": "Abbott-Detroit",
    "slug": "abbott-detroit",
    "description": "Abbott-Detroit was an American automobile manufacturer operating from 1909 to 1918. The company produced luxury automobiles with Continental engines and was known for its reliability and quality during the early automotive era.",
    "country": "United States",
    "isLuxuryBrand": true,
    "isActive": false,
    "image": {
      "source": "https://www.carlogos.org/logo/Abbott-Detroit-logo-640x107.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/abbott-detroit.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/abbott-detroit.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/abbott-detroit.jpg",
      "localThumb": "./thumb/abbott-detroit.png",
      "localOptimized": "./optimized/abbott-detroit.png",
      "localOriginal": "./original/abbott-detroit.jpg"
    },
    "models": ["Model 44", "Battleship", "Bull Dog", "Model B", "Six-Cylinder", "Four-Cylinder"]
  },
  {
    "name": "ABT",
    "slug": "abt",
    "description": "ABT Sportsline is a German automotive tuning company specializing in enhancing Volkswagen Group vehicles (Audi, Volkswagen, SEAT, and Škoda). Established in 1896 as a blacksmith's shop, it has evolved into one of the world's leading vehicle customizers.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "image": {
      "source": "https://www.carlogos.org/logo/ABT-Sportsline-logo-silver-640x250.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/abt.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/abt.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/abt.jpg",
      "localThumb": "./thumb/abt.png",
      "localOptimized": "./optimized/abt.png",
      "localOriginal": "./original/abt.jpg"
    },
    "models": ["A1", "A1 Sportback", "A3", "A3 Sportback", "A4", "A4 Avant", "A5", "A5 Sportback", "A6", "A6 Avant", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron", "e-tron GT", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "RSQ3", "RSQ8", "S1", "S3", "S4", "S5", "S6", "S7", "S8", "SQ2", "SQ5", "SQ7", "TT", "TT Roadster", "TTS"]
  },
  {
    "name": "AC",
    "slug": "ac",
    "image": {
      "source": "https://www.carlogos.org/logo/AC-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ac.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ac.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ac.jpg",
      "localThumb": "./thumb/ac.png",
      "localOptimized": "./optimized/ac.png",
      "localOriginal": "./original/ac.jpg"
    },
    "models": ["Cobra", "Ace", "Aceca", "Greyhound", "3000ME", "Brooklands", "Mamba", "Mark", "Superblower", "CRS"]
  },
  {
    "name": "Acura",
    "slug": "acura",
    "image": {
      "source": "https://www.carlogos.org/logo/Acura-logo-1990-640x406.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/acura.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/acura.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/acura.jpg",
      "localThumb": "./thumb/acura.png",
      "localOptimized": "./optimized/acura.png",
      "localOriginal": "./original/acura.jpg"
    },
    "models": ["CL", "ILX", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RLX", "RSX", "SLX", "TL", "TLX", "TSX", "Vigor", "ZDX"]
  },
  {
    "name": "Aiways",
    "slug": "aiways",
    "image": {
      "source": "https://www.carlogos.org/car-logos/aiways-logo-2100x1350-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/aiways.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/aiways.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/aiways.png",
      "localThumb": "./thumb/aiways.png",
      "localOptimized": "./optimized/aiways.png",
      "localOriginal": "./original/aiways.png"
    },
    "models": ["U5"]
  },
  {
    "name": "Aixam",
    "slug": "aixam",
    "image": {
      "source": "https://www.carlogos.org/logo/Aixam-logo-2010-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/aixam.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/aixam.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/aixam.jpg",
      "localThumb": "./thumb/aixam.png",
      "localOptimized": "./optimized/aixam.png",
      "localOriginal": "./original/aixam.jpg"
    },
    "models": ["City", "Crossline", "Crossover", "Coupé", "GTO", "Scouty", "Vision"]
  },
  {
    "name": "Alfa Romeo",
    "slug": "alfa-romeo",
    "description": "Alfa Romeo is an Italian luxury car manufacturer established in 1910. Known for producing vehicles with distinctive Italian styling, sporty performance, and a passionate driving experience. The brand has a rich racing heritage and is renowned for its design and engineering prowess. In Kenya, Alfa Romeo is a niche luxury brand with limited presence.",
    "country": "Italy",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 35,
    "image": {
      "source": "https://www.carlogos.org/logo/Alfa-Romeo-logo-2015-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/alfa-romeo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/alfa-romeo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/alfa-romeo.jpg",
      "localThumb": "./thumb/alfa-romeo.png",
      "localOptimized": "./optimized/alfa-romeo.png",
      "localOriginal": "./original/alfa-romeo.jpg"
    },
    "models": ["4C", "8C", "Giulia", "Giulietta", "MiTo", "Stelvio", "Tonale", "159", "159 Sportwagon", "Brera", "GT", "Spider", "147", "156", "156 Sportwagon", "166", "GTV", "Giulia Quadrifoglio", "Stelvio Quadrifoglio"]
  },
  {
    "name": "Alpina",
    "slug": "alpina",
    "description": "Alpina Burkard Bovensiepen GmbH & Co. KG is a German automobile manufacturing company that develops and sells high-performance versions of BMW cars. Founded in 1965, Alpina is recognized as an automobile manufacturer rather than just a tuner, and maintains close ties with BMW. In Kenya, Alpina vehicles are extremely rare and considered ultra-luxury items.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 45,
    "image": {
      "source": "https://www.carlogos.org/logo/Alpina-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/alpina.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/alpina.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/alpina.jpg",
      "localThumb": "./thumb/alpina.png",
      "localOptimized": "./optimized/alpina.png",
      "localOriginal": "./original/alpina.jpg"
    },
    "models": ["B3", "B4", "B5", "B6", "B7", "B8", "D3", "D4", "D5", "XB7", "XD3", "XD4", "B3 Touring", "B4 Gran Coupe", "B5 Touring", "B8 Gran Coupe"]
  },
  {
    "name": "Alpine",
    "slug": "alpine",
    "description": "French sports car manufacturer owned by Renault, known for producing lightweight, high-performance sports cars with distinctive styling and racing heritage.",
    "country": "France",
    "isLuxuryBrand": true,
    "marketRank": 46,
    "image": {
      "source": "https://www.carlogos.org/logo/Alpine-logo-640x341.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/alpine.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/alpine.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/alpine.jpg",
      "localThumb": "./thumb/alpine.png",
      "localOptimized": "./optimized/alpine.png",
      "localOriginal": "./original/alpine.jpg"
    },
    "models": ["A110", "A110S", "A310", "A610", "V6 GT", "A470", "A521"]
  },
  {
    "name": "Alta",
    "slug": "alta",
    "description": "British automobile and racing car constructor founded in the 1920s that produced sports and racing cars until the early 1960s, known for their innovative engineering and competitive racing performance.",
    "country": "United Kingdom",
    "isLuxuryBrand": false,
    "marketRank": 100,
    "image": {
      "source": "https://www.carlogos.org/logo/Alta-logo-640x138.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/alta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/alta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/alta.jpg",
      "localThumb": "./thumb/alta.png",
      "localOptimized": "./optimized/alta.png",
      "localOriginal": "./original/alta.jpg"
    },
    "models": ["Aero", "GP", "Sports"]
  },
  {
    "name": "Alvis",
    "slug": "alvis",
    "description": "Historic British car manufacturer founded in 1919, known for producing luxury touring cars, sports cars and military vehicles until 1967, later revived in limited production of continuation models.",
    "country": "United Kingdom",
    "isLuxuryBrand": true,
    "marketRank": 95,
    "image": {
      "source": "https://www.carlogos.org/logo/Alvis-logo-640x327.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/alvis.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/alvis.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/alvis.jpg",
      "localThumb": "./thumb/alvis.png",
      "localOptimized": "./optimized/alvis.png",
      "localOriginal": "./original/alvis.jpg"
    },
    "models": ["12/50", "12/60", "Speed 20", "Speed 25", "TA 14", "TA 21", "TC 21", "TD 21", "TE 21", "TF 21", "Continuation Series"]
  },
  {
    "name": "AMC",
    "slug": "amc",
    "description": "American Motors Corporation was an American automobile manufacturer that operated from 1954 until 1988, known for producing compact and economical vehicles as well as iconic muscle cars like the AMX and Javelin.",
    "country": "United States",
    "isLuxuryBrand": false,
    "marketRank": 90,
    "image": {
      "source": "https://www.carlogos.org/logo/American-Motors-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/amc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/amc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/amc.jpg",
      "localThumb": "./thumb/amc.png",
      "localOptimized": "./optimized/amc.png",
      "localOriginal": "./original/amc.jpg"
    },
    "models": ["AMX", "Concord", "Eagle", "Gremlin", "Hornet", "Javelin", "Matador", "Pacer", "Rebel", "Spirit", "Ambassador", "Rambler", "Marlin", "Alliance"]
  },
  {
    "name": "Apollo",
    "slug": "apollo",
    "description": "German-based hypercar manufacturer known for producing ultra-exclusive, high-performance vehicles with radical designs and track-focused engineering, formerly known as Gumpert.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "marketRank": 98,
    "image": {
      "source": "https://www.carlogos.org/logo/Apollo-Automobil-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/apollo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/apollo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/apollo.jpg",
      "localThumb": "./thumb/apollo.png",
      "localOptimized": "./optimized/apollo.png",
      "localOriginal": "./original/apollo.jpg"
    },
    "models": ["IE", "N", "Arrow", "Intensa Emozione", "Apollo S", "Project Evo"]
  },
  {
    "name": "Arash",
    "slug": "arash",
    "description": "British supercar manufacturer founded by Arash Farboud, specializing in hand-built, high-performance supercars and hypercars with innovative engineering and design.",
    "country": "United Kingdom",
    "isLuxuryBrand": true,
    "marketRank": 99,
    "image": {
      "source": "https://www.carlogos.org/logo/Arash-logo-640x410.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/arash.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/arash.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/arash.jpg",
      "localThumb": "./thumb/arash.png",
      "localOptimized": "./optimized/arash.png",
      "localOriginal": "./original/arash.jpg"
    },
    "models": ["AF10", "AF8", "AF6", "AF7", "AF5", "AF4", "AF3", "AF2", "AF1"]
  },
  {
    "name": "Arcfox",
    "slug": "arcfox",
    "description": "Premium electric vehicle brand from China's BAIC Group, focused on producing high-tech, luxury electric vehicles with cutting-edge technology and contemporary design.",
    "country": "China",
    "isLuxuryBrand": true,
    "marketRank": 85,
    "image": {
      "source": "https://www.carlogos.org/car-logos/arcfox-logo-1250x220-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/arcfox.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/arcfox.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/arcfox.png",
      "localThumb": "./thumb/arcfox.png",
      "localOptimized": "./optimized/arcfox.png",
      "localOriginal": "./original/arcfox.png"
    },
    "models": ["GT", "Alpha-T", "EVS", "EUV", "EUV-S", "Alpha-S", "αT"]
  },
  {
    "name": "Ariel",
    "slug": "ariel",
    "description": "British manufacturer of high-performance, lightweight sports cars known for their exoskeletal designs with no bodywork, particularly famous for the Ariel Atom track car.",
    "country": "United Kingdom",
    "isLuxuryBrand": true,
    "marketRank": 80,
    "image": {
      "source": "https://www.carlogos.org/logo/Ariel-logo-2000-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ariel.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ariel.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ariel.jpg",
      "localThumb": "./thumb/ariel.png",
      "localOptimized": "./optimized/ariel.png",
      "localOriginal": "./original/ariel.jpg"
    },
    "models": ["Atom", "Atom 4", "Nomad", "Ace", "Hipercar"]
  },
  {
    "name": "ARO",
    "slug": "aro",
    "description": "Romanian off-road vehicle manufacturer that produced rugged, affordable 4x4 vehicles from 1957 until 2006, known for their durability and capability in challenging terrain.",
    "country": "Romania",
    "isLuxuryBrand": false,
    "marketRank": 92,
    "image": {
      "source": "https://www.carlogos.org/logo/ARO-logo-640x567.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/aro.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/aro.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/aro.jpg",
      "localThumb": "./thumb/aro.png",
      "localOptimized": "./optimized/aro.png",
      "localOriginal": "./original/aro.jpg"
    },
    "models": ["10", "24", "240", "243", "244", "246", "328", "Spartana"]
  },
  {
    "name": "Arrinera",
    "slug": "arrinera",
    "description": "Polish supercar manufacturer founded in 2008, focused on creating high-performance vehicles with carbon fiber construction and distinctive angular styling.",
    "country": "Poland",
    "isLuxuryBrand": true,
    "marketRank": 97,
    "image": {
      "source": "https://www.carlogos.org/logo/Arrinera-logo-640x486.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/arrinera.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/arrinera.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/arrinera.jpg",
      "localThumb": "./thumb/arrinera.png",
      "localOptimized": "./optimized/arrinera.png",
      "localOriginal": "./original/arrinera.jpg"
    },
    "models": ["Hussarya", "Hussarya GT", "Hussarya 33"]
  },
  {
    "name": "Arrival",
    "slug": "arrival",
    "description": "UK-based electric vehicle manufacturer focused on creating zero-emission commercial vehicles like vans and buses using innovative microfactory production techniques and sustainable materials.",
    "country": "United Kingdom",
    "isLuxuryBrand": false,
    "marketRank": 88,
    "image": {
      "source": "https://www.carlogos.org/car-logos/arrival-logo-2600x350-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/arrival.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/arrival.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/arrival.png",
      "localThumb": "./thumb/arrival.png",
      "localOptimized": "./optimized/arrival.png",
      "localOriginal": "./original/arrival.png"
    },
    "models": ["Van", "Bus", "Car", "Truck"]
  },
  {
    "name": "Artega",
    "slug": "artega",
    "description": "German sports car manufacturer founded in 2007, initially known for their GT sports car with Porsche-designed engines, later pivoting to electric vehicles before ceasing operations in 2019.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "marketRank": 94,
    "image": {
      "source": "https://www.carlogos.org/logo/Artega-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/artega.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/artega.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/artega.jpg",
      "localThumb": "./thumb/artega.png",
      "localOptimized": "./optimized/artega.png",
      "localOriginal": "./original/artega.jpg"
    },
    "models": ["GT", "Scalo", "Scalo Superelletra", "Karo"]
  },
  {
    "name": "Ascari",
    "slug": "ascari",
    "description": "British supercar manufacturer founded in 1995, named after Alberto Ascari, producing limited-run, high-performance sports cars with exceptional handling and performance characteristics.",
    "country": "United Kingdom",
    "isLuxuryBrand": true,
    "marketRank": 93,
    "image": {
      "source": "https://www.carlogos.org/logo/Ascari-logo-1995-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ascari.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ascari.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ascari.jpg",
      "localThumb": "./thumb/ascari.png",
      "localOptimized": "./optimized/ascari.png",
      "localOriginal": "./original/ascari.jpg"
    },
    "models": ["A10", "KZ1", "KZ1-R", "FGT", "Ecosse"]
  },
  {
    "name": "Askam",
    "slug": "askam",
    "image": {
      "source": "https://www.carlogos.org/logo/Askam-logo-640x124.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/askam.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/askam.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/askam.jpg",
      "localThumb": "./thumb/askam.png",
      "localOptimized": "./optimized/askam.png",
      "localOriginal": "./original/askam.jpg"
    },
    "models": ["Truck"]
  },
  {
    "name": "Aspark",
    "slug": "aspark",
    "image": {
      "source": "https://www.carlogos.org/car-logos/aspark-logo-1000x1000-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/aspark.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/aspark.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/aspark.png",
      "localThumb": "./thumb/aspark.png",
      "localOptimized": "./optimized/aspark.png",
      "localOriginal": "./original/aspark.png"
    },
    "models": ["Owl"]
  },
  {
    "name": "Aston Martin",
    "slug": "aston-martin",
    "image": {
      "source": "https://www.carlogos.org/logo/Aston-Martin-logo-2003-640x286.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/aston-martin.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/aston-martin.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/aston-martin.jpg",
      "localThumb": "./thumb/aston-martin.png",
      "localOptimized": "./optimized/aston-martin.png",
      "localOriginal": "./original/aston-martin.jpg"
    },
    "models": ["DB7", "DB9", "DB11", "DBS", "DBX", "Rapide", "V8 Vantage", "V12 Vantage", "V12 Zagato", "V12 Vanquish", "V12 Vantage S", "V12 Vantage GT3", "V12 Vantage GT12", "V12 Vantage S Roadster", "V12 Vantage GT3 Roadster", "V12 Vantage GT12 Roadster", "V12 Vantage S Red Bull Racing Edition", "V12 Vantage GT3 Red Bull Racing Edition", "V12 Vantage GT12 Red Bull Racing Edition", "V12 Vantage S Roadster Red Bull Racing Edition", "V12 Vantage GT3 Roadster Red Bull Racing Edition", "V12 Vantage GT12 Roadster Red Bull Racing Edition", "V12 Vantage S Red Bull Racing Edition", "V12 Vantage GT3 Red Bull Racing Edition", "V12 Vantage GT12 Red Bull Racing Edition", "V12 Vantage S Roadster Red Bull Racing Edition", "V12 Vantage GT3 Roadster Red Bull Racing Edition", "V12 Vantage GT12 Roadster Red Bull Racing Edition", "V12 Vantage S Red Bull Racing Edition", "V12 Vantage GT3 Red Bull Racing Edition", "V12 Vantage GT12 Red Bull Racing Edition", "V12 Vantage S Roadster Red Bull Racing Edition", "V12 Vantage GT3 Roadster Red Bull Racing Edition", "V12 Vantage GT12 Roadster Red Bull Racing Edition", "V12 Vantage S Red Bull Racing Edition", "V12 Vantage GT3 Red Bull Racing Edition", "V12 Vantage GT12 Red Bull Racing Edition", "V12 Vantage S Roadster Red Bull Racing Edition", "V12 Vantage GT3 Roadster Red Bull Racing Edition", "V12 Vantage GT12 Roadster Red Bull Racing Edition", "V12 Vantage S Red Bull Racing Edition", "V12 Vantage GT3 Red Bull Racing Edition", "V12 Vantage GT12 Red Bull Racing Edition", "V12 Vantage S Roadster Red Bull Racing Edition", "V12 Vantage GT3 Roadster Red Bull Racing Edition", "V12 Vantage GT12 Roadster Red Bull Racing Edition", "V12 Vantage S Red Bull Racing Edition"]
  },
  {
    "name": "Atalanta",
    "slug": "atalanta",
    "image": {
      "source": "https://www.carlogos.org/logo/Atalanta-Motors-logo-640x127.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/atalanta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/atalanta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/atalanta.jpg",
      "localThumb": "./thumb/atalanta.png",
      "localOptimized": "./optimized/atalanta.png",
      "localOriginal": "./original/atalanta.jpg"
    },
    "models": ["Sports"]
  },
  {
    "name": "Auburn",
    "slug": "auburn",
    "image": {
      "source": "https://www.carlogos.org/logo/Auburn-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/auburn.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/auburn.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/auburn.png",
      "localThumb": "./thumb/auburn.png",
      "localOptimized": "./optimized/auburn.png",
      "localOriginal": "./original/auburn.png"
    },
    "models": ["Speedster", "Boattail Speedster", "Cabin Speedster", "Phaeton", "Cabriolet", "Coupe", "Sedan", "Convertible", "Brougham", "Victoria", "Berline", "Town Car", "Limousine", "Roadster", "Touring", "Sport", "Supercharged", "V12", "V12 Speedster", "V12 Boattail Speedster", "V12 Cabin Speedster", "V12 Phaeton", "V12 Cabriolet", "V12 Coupe", "V12 Sedan", "V12 Convertible", "V12 Brougham", "V12 Victoria", "V12 Berline", "V12 Town Car", "V12 Limousine", "V12 Roadster", "V12 Touring", "V12 Sport", "V12 Supercharged"]
  },
  {
    "name": "Audi",
    "slug": "audi",
    "description": "Audi AG is a German luxury automobile manufacturer founded in 1909. Part of the Volkswagen Group, Audi is renowned for its sophisticated design, advanced technology, and quattro all-wheel drive system. In Kenya, Audi is considered a premium brand, popular among executives and luxury car enthusiasts.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 12,
    "image": {
      "source": "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/audi.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/audi.jpg",
      "localThumb": "./thumb/audi.png",
      "localOptimized": "./optimized/audi.png",
      "localOriginal": "./original/audi.jpg"
    },
    "models": ["A1", "A1 Sportback", "A3", "A3 Cabriolet", "A3 Sedan", "A3 Sportback", "A4", "A4 allroad", "A4 Avant", "A5", "A5 Cabriolet", "A5 Coupe", "A5 Sportback", "A6", "A6 allroad", "A6 Avant", "A7", "A7 Sportback", "A8", "A8 L", "e-tron", "e-tron GT", "e-tron Sportback", "Q2", "Q3", "Q3 Sportback", "Q4 e-tron", "Q5", "Q5 Sportback", "Q7", "Q8", "Q8 e-tron", "R8", "R8 Spyder", "RS3", "RS4 Avant", "RS5", "RS6 Avant", "RS7 Sportback", "RS Q3", "RS Q8", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "SQ8", "TT", "TT RS", "TTS"]
  },
  {
    "name": "Audi Sport",
    "slug": "audi-sport",
    "image": {
      "source": "https://www.carlogos.org/logo/Audi-Sport-logo-640x76.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/audi-sport.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/audi-sport.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/audi-sport.jpg",
      "localThumb": "./thumb/audi-sport.png",
      "localOptimized": "./optimized/audi-sport.png",
      "localOriginal": "./original/audi-sport.jpg"
    },
    "models": ["R8", "RS3", "RS4", "RS5", "RS6", "RS7", "RSQ3", "RSQ8", "TT RS"]
  },
  {
    "name": "Austin",
    "slug": "austin",
    "image": {
      "source": "https://www.carlogos.org/logo/Austin-logo-640x500.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/austin.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/austin.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/austin.jpg",
      "localThumb": "./thumb/austin.png",
      "localOptimized": "./optimized/austin.png",
      "localOriginal": "./original/austin.jpg"
    },
    "models": ["A30", "A35", "A40", "A50", "A55", "A60", "A70", "A90", "A95", "A99", "A105", "A110", "A125", "A135", "A140", "A150", "A160", "A170", "A180", "A190", "A200", "A210", "A220", "A230", "A240", "A250", "A260", "A270", "A280", "A290", "A300", "A310", "A320", "A330", "A340", "A350", "A360", "A370", "A380", "A390", "A400", "A410", "A420", "A430", "A440", "A450", "A460", "A470", "A480", "A490", "A500", "A510", "A520", "A530", "A540", "A550", "A560", "A570", "A580", "A590", "A600", "A610", "A620", "A630", "A640", "A650", "A660", "A670", "A680", "A690", "A700", "A710", "A720", "A730", "A740", "A750", "A760", "A770", "A780", "A790", "A800", "A810", "A820", "A830", "A840", "A850", "A860", "A870", "A880", "A890", "A900", "A910", "A920", "A930", "A940", "A950", "A960", "A970", "A980", "A990", "A1000", "A1010", "A1020", "A1030", "A1040", "A1050", "A1060", "A1070", "A1080", "A1090", "A1100", "A1110", "A1120", "A1130", "A1140", "A1150", "A1160", "A1170", "A1180"]
  },
  {
    "name": "Autobacs",
    "slug": "autobacs",
    "image": {
      "source": "https://www.carlogos.org/logo/Autobacs-logo-640x462.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/autobacs.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/autobacs.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/autobacs.jpg",
      "localThumb": "./thumb/autobacs.png",
      "localOptimized": "./optimized/autobacs.png",
      "localOriginal": "./original/autobacs.jpg"
    },
    "models": ["Garaiya", "Garaiya GT300", "Garaiya GT300 RS", "Garaiya GT300 RS2", "Garaiya GT300 RS3", "Garaiya GT300 RS4", "Garaiya GT300 RS5", "Garaiya GT300 RS6", "Garaiya GT300 RS7", "Garaiya GT300 RS8", "Garaiya GT300 RS9", "Garaiya GT300 RS10", "Garaiya GT300 RS11", "Garaiya GT300 RS12", "Garaiya GT300 RS13", "Garaiya GT300 RS14", "Garaiya GT300 RS15", "Garaiya GT300 RS16", "Garaiya GT300 RS17", "Garaiya GT300 RS18", "Garaiya GT300 RS19", "Garaiya GT300 RS20", "Garaiya GT300 RS21", "Garaiya GT300 RS22", "Garaiya GT300 RS23", "Garaiya GT300 RS24", "Garaiya GT300 RS25", "Garaiya GT300 RS26", "Garaiya GT300 RS27", "Garaiya GT300 RS28", "Garaiya GT300 RS29", "Garaiya GT300 RS30", "Garaiya GT300 RS31", "Garaiya GT300 RS32", "Garaiya GT300 RS33", "Garaiya GT300 RS34", "Garaiya GT300 RS35", "Garaiya GT300 RS36", "Garaiya GT300 RS37", "Garaiya GT300 RS38", "Garaiya GT300 RS39", "Garaiya GT300 RS40", "Garaiya GT300 RS41", "Garaiya GT300 RS42", "Garaiya GT300 RS43", "Garaiya GT300 RS44", "Garaiya GT300 RS45", "Garaiya GT300 RS46", "Garaiya GT300 RS47", "Garaiya GT300 RS48", "Garaiya GT300 RS49", "Garaiya GT300 RS50", "Garaiya GT300 RS51", "Garaiya GT300 RS52", "Garaiya GT300 RS53", "Garaiya GT300 RS"]
  },
  {
    "name": "Autobianchi",
    "slug": "autobianchi",
    "image": {
      "source": "https://www.carlogos.org/logo/Autobianchi-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/autobianchi.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/autobianchi.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/autobianchi.jpg",
      "localThumb": "./thumb/autobianchi.png",
      "localOptimized": "./optimized/autobianchi.png",
      "localOriginal": "./original/autobianchi.jpg"
    },
    "models": ["A112", "Bianchina", "Primula", "Stellina", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20", "Y21", "Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28", "Y29", "Y30", "Y31", "Y32", "Y33", "Y34", "Y35", "Y36", "Y37", "Y38", "Y39", "Y40", "Y41", "Y42", "Y43", "Y44", "Y45", "Y46", "Y47", "Y48", "Y49", "Y50", "Y51", "Y52", "Y53", "Y54", "Y55", "Y56", "Y57", "Y58", "Y59", "Y60", "Y61", "Y62", "Y63", "Y64", "Y65", "Y66", "Y67", "Y68", "Y69", "Y70", "Y71", "Y72", "Y73", "Y74", "Y75", "Y76", "Y77", "Y78", "Y79", "Y80", "Y81", "Y82", "Y83", "Y84", "Y85", "Y86", "Y87", "Y88", "Y89", "Y90", "Y91", "Y92", "Y93", "Y94", "Y95", "Y96", "Y97", "Y98", "Y99", "Y100", "Y101", "Y102", "Y103", "Y104", "Y105", "Y106", "Y107", "Y108", "Y109", "Y110", "Y111", "Y112", "Y113", "Y114", "Y115", "Y116", "Y117", "Y118", "Y119", "Y120", "Y121", "Y122", "Y123", "Y124", "Y125", "Y126", "Y127", "Y128"]
  },
  {
    "name": "Axon",
    "slug": "axon",
    "image": {
      "source": "https://www.carlogos.org/logo/Axon-Automotive-logo-640x520.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/axon.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/axon.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/axon.jpg",
      "localThumb": "./thumb/axon.png",
      "localOptimized": "./optimized/axon.png",
      "localOriginal": "./original/axon.jpg"
    },
    "models": ["Sparrow"]
  },
  {
    "name": "BAC",
    "slug": "bac",
    "image": {
      "source": "https://www.carlogos.org/logo/BAC-logo-black-640x297.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bac.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bac.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bac.jpg",
      "localThumb": "./thumb/bac.png",
      "localOptimized": "./optimized/bac.png",
      "localOriginal": "./original/bac.jpg"
    },
    "models": ["Mono", "Mono R"]
  },
  {
    "name": "Baojun",
    "slug": "baojun",
    "image": {
      "source": "https://www.carlogos.org/logo/Baojun-logo-2010-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/baojun.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/baojun.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/baojun.jpg",
      "localThumb": "./thumb/baojun.png",
      "localOptimized": "./optimized/baojun.png",
      "localOriginal": "./original/baojun.jpg"
    },
    "models": ["310", "310W", "360", "510", "530", "560", "610", "630", "730", "E100", "E200", "E300", "E300 Plus", "E300S", "E300S Plus", "E400", "E400 Plus", "E400S", "E400S Plus", "E500", "E500 Plus", "E500S", "E500S Plus", "E600", "E600 Plus", "E600S", "E600S Plus", "E700", "E700 Plus", "E700S", "E700S Plus", "E800", "E800 Plus", "E800S", "E800S Plus", "E900", "E900 Plus", "E900S", "E900S Plus", "E1000", "E1000 Plus", "E1000S", "E1000S Plus", "E1100", "E1100 Plus", "E1100S", "E1100S Plus", "E1200", "E1200 Plus", "E1200S", "E1200S Plus", "E1300", "E1300 Plus", "E1300S", "E1300S Plus", "E1400", "E1400 Plus", "E1400S", "E1400S Plus", "E1500", "E1500 Plus", "E1500S", "E1500S Plus", "E1600", "E1600 Plus", "E1600S", "E1600S Plus", "E1700", "E1700 Plus", "E1700S", "E1700S Plus", "E1800", "E1800 Plus", "E1800S", "E1800S Plus", "E1900", "E1900 Plus", "E1900S", "E1900S Plus", "E2000", "E2000 Plus", "E2000S", "E2000S Plus", "E2100", "E2100 Plus", "E2100S", "E2100S Plus", "E2200", "E2200 Plus", "E2200S", "E2200S Plus", "E2300"]
  },
  {
    "name": "BeiBen",
    "slug": "beiben",
    "image": {
      "source": "https://www.carlogos.org/car-logos/beiben-logo-900x1000-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/beiben.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/beiben.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/beiben.png",
      "localThumb": "./thumb/beiben.png",
      "localOptimized": "./optimized/beiben.png",
      "localOriginal": "./original/beiben.png"
    },
    "models": ["NG80", "NG80B", "NG80F", "NG80G", "NG80H", "NG80J", "NG80K", "NG80L", "NG80M", "NG80N", "NG80P", "NG80Q", "NG80R", "NG80S", "NG80T", "NG80U", "NG80V", "NG80W", "NG80X", "NG80Y", "NG80Z", "NG80A", "NG80C", "NG80D", "NG80E", "NG80I", "NG80O", "NG80NG", "NG80NGA", "NG80NGB", "NG80NGC", "NG80NGD", "NG80NGE", "NG80NGF", "NG80NGG", "NG80NGH", "NG80NGI", "NG80NGJ", "NG80NGK", "NG80NGL", "NG80NGM", "NG80KES", "NG80NGO", "NG80NGP", "NG80NGQ", "NG80NGR", "NG80NGS", "NG80NGT", "NG80NGU", "NG80NGV", "NG80NGW", "NG80NGX", "NG80NGY", "NG80NGZ", "NG80NGA", "NG80NGB", "NG80NGC", "NG80NGD", "NG80NGE", "NG80NGF", "NG80NGG", "NG80NGH", "NG80NGI", "NG80NGJ", "NG80NGK", "NG80NGL", "NG80NGM", "NG80KES", "NG80NGO", "NG80NGP", "NG80NGQ", "NG80NGR", "NG80NGS", "NG80NGT", "NG80NGU", "NG80NGV", "NG80NGW", "NG80NGX", "NG80NGY", "NG80NGZ", "NG80NGA", "NG80NGB", "NG80NGC", "NG80NGD", "NG80NGE", "NG80NGF", "NG80NGG"]
  },
  {
    "name": "Bentley",
    "slug": "bentley",
    "image": {
      "source": "https://www.carlogos.org/car-logos/bentley-logo-2002-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bentley.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bentley.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bentley.jpg",
      "localThumb": "./thumb/bentley.png",
      "localOptimized": "./optimized/bentley.png",
      "localOriginal": "./original/bentley.jpg"
    },
    "models": ["Arnage", "Azure", "Bentayga", "Brooklands", "Continental", "Continental Flying Spur", "Continental GT", "Continental GTC", "Continental Supersports", "Eight", "Flying Spur", "Mulsanne", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15", "S16", "S17", "S18", "S19", "S20", "S21", "S22", "S23", "S24", "S25", "S26", "S27", "S28", "S29", "S30", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S39", "S40", "S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S49", "S50", "S51", "S52", "S53", "S54", "S55", "S56", "S57", "S58", "S59", "S60", "S61", "S62", "S63", "S64", "S65", "S66", "S67", "S68", "S69", "S70", "S71", "S72", "S73", "S74", "S75", "S76", "S77", "S78", "S79", "S80", "S81", "S82", "S83", "S84", "S85", "S86", "S87", "S88", "S89", "S90", "S91", "S92", "S93", "S94", "S95", "S96", "S97", "S98", "S99", "S100", "S101", "S102", "S103", "S104", "S105", "S106", "S107", "S108", "S109", "S110", "S111", "S112", "S113", "S114", "S115", "S116", "S117", "S118", "S119", "S120", "S121", "S122", "S123", "S124", "S125", "S126", "S127", "S128", "S129", "S130", "S131", "S132", "S133", "S134", "S135", "S136", "S137", "S138", "S139", "S140", "S141", "S142", "S143", "S144", "S145", "S146", "S147", "S148", "S149", "S150", "S151", "S152", "S153", "S154", "S155", "S156", "S157", "S158", "S159", "S160", "S161", "S162", "S163", "S164", "S165", "S166", "S167", "S168", "S169", "S170", "S171", "S172", "S173", "S174", "S175", "S176", "S177", "S178", "S179", "S180", "S181", "S182", "S183", "S184", "S185", "S186", "S187", "S188", "S189", "S190", "S191", "S192", "S193", "S194", "S195", "S196", "S197", "S198", "S199", "S200", "S201", "S202", "S203", "S204", "S205", "S206", "S207", "S208", "S209", "S210", "S211", "S212", "S213", "S214", "S215", "S216", "S217", "S218", "S219", "S220", "S221", "S222", "S223", "S224", "S225", "S226", "S227", "S228", "S229", "S230", "S231", "S232", "S233", "S234"]
  },
  {
    "name": "Berkeley",
    "slug": "berkeley",
    "image": {
      "source": "https://www.carlogos.org/logo/Berkeley-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/berkeley.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/berkeley.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/berkeley.png",
      "localThumb": "./thumb/berkeley.png",
      "localOptimized": "./optimized/berkeley.png",
      "localOriginal": "./original/berkeley.png"
    },
    "models": ["B65", "B95", "B105", "B115", "B125", "B135", "B145", "B155", "B165", "B175", "B185", "B195", "B205", "B215", "B225", "B235", "B245", "B255", "B265", "B275", "B285", "B295", "B305", "B315", "B325", "B335", "B345", "B355", "B365", "B375", "B385", "B395", "B405", "B415", "B425", "B435", "B445", "B455", "B465", "B475", "B485", "B495", "B505", "B515", "B525", "B535", "B545", "B555", "B565", "B575", "B585", "B595", "B605", "B615", "B625", "B635", "B645", "B655", "B665", "B675", "B685", "B695", "B705", "B715", "B725", "B735", "B745", "B755", "B765", "B775", "B785", "B795", "B805", "B815", "B825", "B835", "B845", "B855", "B865", "B875", "B885", "B895", "B905", "B915", "B925", "B935", "B945", "B955", "B965", "B975", "B985", "B995", "B1005", "B1015", "B1025", "B1035", "B1045", "B1055", "B1065", "B1075", "B1085", "B1095", "B1105", "B1115", "B1125", "B1135", "B1145", "B1155", "B1165", "B1175", "B1185", "B1195", "B1205", "B1215", "B1225", "B1235", "B1245"]
  },
  {
    "name": "Berliet",
    "slug": "berliet",
    "image": {
      "source": "https://www.carlogos.org/logo/Berliet-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/berliet.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/berliet.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/berliet.jpg",
      "localThumb": "./thumb/berliet.png",
      "localOptimized": "./optimized/berliet.png",
      "localOriginal": "./original/berliet.jpg"
    },
    "models": ["GLC", "GLC 4x4", "GLC 6x6", "GLC 8x8", "GLC 10x10", "GLC 12x12", "GLC 14x14", "GLC 16x16", "GLC 18x18", "GLC 20x20", "GLC 22x22", "GLC 24x24", "GLC 26x26", "GLC 28x28", "GLC 30x30", "GLC 32x32", "GLC 34x34", "GLC 36x36", "GLC 38x38", "GLC 40x40", "GLC 42x42", "GLC 44x44", "GLC 46x46", "GLC 48x48", "GLC 50x50", "GLC 52x52", "GLC 54x54", "GLC 56x56", "GLC 58x58", "GLC 60x60", "GLC 62x62", "GLC 64x64", "GLC 66x66", "GLC 68x68", "GLC 70x70", "GLC 72x72", "GLC 74x74", "GLC 76x76", "GLC 78x78", "GLC 80x80", "GLC 82x82", "GLC 84x84", "GLC 86x86", "GLC 88x88", "GLC 90x90", "GLC 92x92", "GLC 94x94", "GLC 96x96", "GLC 98x98", "GLC 100x100", "GLC 102x102", "GLC 104x104", "GLC 106x106", "GLC 108x108", "GLC 110x110", "GLC 112x112", "GLC 114x114", "GLC 116x116", "GLC 118x118", "GLC 120x120", "GLC 122x122", "GLC 124x124"]
  },
  {
    "name": "Bertone",
    "slug": "bertone",
    "image": {
      "source": "https://www.carlogos.org/logo/Bertone-logo-640x388.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bertone.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bertone.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bertone.jpg",
      "localThumb": "./thumb/bertone.png",
      "localOptimized": "./optimized/bertone.png",
      "localOriginal": "./original/bertone.jpg"
    },
    "models": ["Bertone", "Bertone Birusa", "Bertone Birusa Concept", "Bertone Birusa Concept 2", "Bertone Birusa Concept 3", "Bertone Birusa Concept 4", "Bertone Birusa Concept 5", "Bertone Birusa Concept 6", "Bertone Birusa Concept 7", "Bertone Birusa Concept 8", "Bertone Birusa Concept 9", "Bertone Birusa Concept 10", "Bertone Birusa Concept 11", "Bertone Birusa Concept 12", "Bertone Birusa Concept 13", "Bertone Birusa Concept 14", "Bertone Birusa Concept 15", "Bertone Birusa Concept 16", "Bertone Birusa Concept 17", "Bertone Birusa Concept 18", "Bertone Birusa Concept 19", "Bertone Birusa Concept 20", "Bertone Birusa Concept 21", "Bertone Birusa Concept 22", "Bertone Birusa Concept 23", "Bertone Birusa Concept 24", "Bertone Birusa Concept 25", "Bertone Birusa Concept 26", "Bertone Birusa Concept 27", "Bertone Birusa Concept 28", "Bertone Birusa Concept 29", "Bertone Birusa Concept 30", "Bertone Birusa Concept 31", "Bertone Birusa Concept 32", "Bertone Birusa Concept 33", "Bertone Birusa Concept 34", "Bertone Birusa Concept 35", "Bertone Birusa Concept 36", "Bertone Birusa Concept 37", "Bertone Birusa Concept 38", "Bertone Birusa Concept 39", "Bertone Birusa Concept 40", "Bertone Birusa Concept 41", "Bertone Birusa Concept 42", "Bertone Birusa Concept 43", "Bertone Birusa Concept 44"]
  },
  {
    "name": "Bestune",
    "slug": "bestune",
    "image": {
      "source": "https://www.carlogos.org/car-logos/bestune-logo-2400x1200-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bestune.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bestune.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bestune.png",
      "localThumb": "./thumb/bestune.png",
      "localOptimized": "./optimized/bestune.png",
      "localOriginal": "./original/bestune.png"
    },
    "models": ["B30", "B50", "B70", "B90", "B105", "B115", "B125", "B135", "B145", "B155", "B165", "B175", "B185", "B195", "B205", "B215", "B225", "B235", "B245", "B255", "B265", "B275", "B285", "B295", "B305", "B315", "B325", "B335", "B345", "B355", "B365", "B375", "B385", "B395", "B405", "B415", "B425", "B435", "B445", "B455", "B465", "B475", "B485", "B495", "B505", "B515", "B525", "B535", "B545", "B555", "B565", "B575", "B585", "B595", "B605", "B615", "B625", "B635", "B645", "B655", "B665", "B675", "B685", "B695", "B705", "B715", "B725", "B735", "B745", "B755", "B765", "B775", "B785", "B795", "B805", "B815", "B825", "B835", "B845", "B855", "B865", "B875", "B885", "B895", "B905", "B915", "B925", "B935", "B945", "B955", "B965", "B975", "B985", "B995", "B1005", "B1015", "B1025", "B1035", "B1045", "B1055", "B1065", "B1075", "B1085", "B1095", "B1105", "B1115", "B1125", "B1135", "B1145", "B1155", "B1165", "B1175", "B1185", "B1195", "B1205", "B1215", "B1225", "B1235"]
  },
  {
    "name": "BharatBenz",
    "slug": "bharatbenz",
    "image": {
      "source": "https://www.carlogos.org/logo/BharatBenz-logo-640x480.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bharatbenz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bharatbenz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bharatbenz.jpg",
      "localThumb": "./thumb/bharatbenz.png",
      "localOptimized": "./optimized/bharatbenz.png",
      "localOriginal": "./original/bharatbenz.jpg"
    },
    "models": ["1014R", "1015R", "1017R", "1018R", "1019R", "1020R", "1021R", "1022R", "1023R", "1024R", "1025R", "1026R", "1027R", "1028R", "1029R", "1030R", "1031R", "1032R", "1033R", "1034R", "1035R", "1036R", "1037R", "1038R", "1039R", "1040R", "1041R", "1042R", "1043R", "1044R", "1045R", "1046R", "1047R", "1048R", "1049R", "1050R", "1051R", "1052R", "1053R", "1054R", "1055R", "1056R", "1057R", "1058R", "1059R", "1060R", "1061R", "1062R", "1063R", "1064R", "1065R", "1066R", "1067R", "1068R", "1069R", "1070R", "1071R", "1072R", "1073R", "1074R", "1075R", "1076R", "1077R", "1078R", "1079R", "1080R", "1081R", "1082R", "1083R", "1084R", "1085R", "1086R", "1087R", "1088R", "1089R", "1090R", "1091R", "1092R", "1093R", "1094R", "1095R", "1096R", "1097R", "1098R", "1099R", "1100R", "1101R", "1102R", "1103R", "1104R", "1105R", "1106R", "1107R", "1108R", "1109R", "1110R", "1111R", "1112R", "1113R"]
  },
  {
    "name": "Bitter",
    "slug": "bitter",
    "image": {
      "source": "https://www.carlogos.org/logo/Bitter-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bitter.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bitter.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bitter.jpg",
      "localThumb": "./thumb/bitter.png",
      "localOptimized": "./optimized/bitter.png",
      "localOriginal": "./original/bitter.jpg"
    },
    "models": ["CD", "CD 2", "CD 3", "CD 4", "CD 5", "CD 6", "CD 7", "CD 8", "CD 9", "CD 10", "CD 11", "CD 12", "CD 13", "CD 14", "CD 15", "CD 16", "CD 17", "CD 18", "CD 19", "CD 20", "CD 21", "CD 22", "CD 23", "CD 24", "CD 25", "CD 26", "CD 27", "CD 28", "CD 29", "CD 30", "CD 31", "CD 32", "CD 33", "CD 34", "CD 35", "CD 36", "CD 37", "CD 38", "CD 39", "CD 40", "CD 41", "CD 42", "CD 43", "CD 44", "CD 45", "CD 46", "CD 47", "CD 48", "CD 49", "CD 50", "CD 51", "CD 52", "CD 53", "CD 54", "CD 55", "CD 56", "CD 57", "CD 58", "CD 59", "CD 60", "CD 61", "CD 62", "CD 63", "CD 64", "CD 65", "CD 66", "CD 67", "CD 68", "CD 69", "CD 70", "CD 71", "CD 72", "CD 73", "CD 74", "CD 75", "CD 76", "CD 77", "CD 78", "CD 79", "CD 80", "CD 81", "CD 82", "CD 83", "CD 84", "CD 85", "CD 86", "CD 87", "CD 88", "CD 89", "CD 90", "CD 91", "CD 92", "CD 93", "CD 94", "CD 95", "CD 96", "CD 97", "CD 98", "CD 99"]
  },
  {
    "name": "BMW",
    "slug": "bmw",
    "description": "Bayerische Motoren Werke (BMW) is a German luxury automobile and motorcycle manufacturer founded in 1916. Renowned for its performance-oriented vehicles, premium quality, and driving dynamics, BMW is one of the best-selling luxury car brands worldwide with a strong presence in Kenya.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 2,
    "image": {
      "source": "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bmw.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bmw.png",
      "localThumb": "./thumb/bmw.png",
      "localOptimized": "./optimized/bmw.png",
      "localOriginal": "./original/bmw.png"
    },
    "models": ["1 Series", "2 Series", "2 Series Active Tourer", "2 Series Gran Coupe", "3 Series", "3 Series Gran Turismo", "3 Series Sedan", "3 Series Touring", "4 Series", "4 Series Convertible", "4 Series Coupe", "4 Series Gran Coupe", "5 Series", "5 Series Gran Turismo", "5 Series Sedan", "5 Series Touring", "6 Series", "6 Series Gran Coupe", "6 Series Gran Turismo", "7 Series", "8 Series", "8 Series Convertible", "8 Series Coupe", "8 Series Gran Coupe", "i3", "i4", "i7", "i8", "iX", "iX3", "M2", "M3", "M4", "M5", "M8", "X1", "X2", "X3", "X3 M", "X4", "X4 M", "X5", "X5 M", "X6", "X6 M", "X7", "Z4"]
  },
  {
    "name": "BMW M",
    "slug": "bmw-m",
    "image": {
      "source": "https://www.carlogos.org/logo/BMW-M-logo-640x231.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bmw-m.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bmw-m.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bmw-m.jpg",
      "localThumb": "./thumb/bmw-m.png",
      "localOptimized": "./optimized/bmw-m.png",
      "localOriginal": "./original/bmw-m.jpg"
    },
    "models": ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "X3 M", "X4 M", "X5 M", "X6 M", "X7 M", "Z3 M", "Z4 M"]
  },
  {
    "name": "Borgward",
    "slug": "borgward",
    "image": {
      "source": "https://www.carlogos.org/logo/Borgward-logo-2016-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/borgward.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/borgward.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/borgward.jpg",
      "localThumb": "./thumb/borgward.png",
      "localOptimized": "./optimized/borgward.png",
      "localOriginal": "./original/borgward.jpg"
    },
    "models": ["BX3", "BX4", "BX5", "BX6", "BX7", "BX7 TS", "BX7 TS Limited Edition", "BX7 TS Limited Edition 2", "BX7 TS Limited Edition 3", "BX7 TS Limited Edition 4", "BX7 TS Limited Edition 5", "BX7 TS Limited Edition 6", "BX7 TS Limited Edition 7", "BX7 TS Limited Edition 8", "BX7 TS Limited Edition 9", "BX7 TS Limited Edition 10", "BX7 TS Limited Edition 11", "BX7 TS Limited Edition 12", "BX7 TS Limited Edition 13", "BX7 TS Limited Edition 14", "BX7 TS Limited Edition 15", "BX7 TS Limited Edition 16", "BX7 TS Limited Edition 17", "BX7 TS Limited Edition 18", "BX7 TS Limited Edition 19", "BX7 TS Limited Edition 20", "BX7 TS Limited Edition 21", "BX7 TS Limited Edition 22", "BX7 TS Limited Edition 23", "BX7 TS Limited Edition 24", "BX7 TS Limited Edition 25", "BX7 TS Limited Edition 26", "BX7 TS Limited Edition 27", "BX7 TS Limited Edition 28", "BX7 TS Limited Edition 29", "BX7 TS Limited Edition 30", "BX7 TS Limited Edition 31", "BX7 TS Limited Edition 32", "BX7 TS Limited Edition 33", "BX7 TS Limited Edition 34", "BX7 TS Limited Edition 35", "BX7 TS Limited Edition 36", "BX7 TS Limited Edition 37", "BX7 TS Limited Edition 38", "BX7 TS Limited Edition 39", "BX7 TS Limited Edition 40", "BX7 TS Limited Edition 41", "BX7 TS Limited Edition 42", "BX7 TS Limited Edition 43", "BX7 TS Limited Edition 44", "BX7 TS Limited Edition 45", "BX7 TS Limited Edition 46", "BX7 TS Limited Edition 47", "BX7 TS Limited Edition 48", "BX7 TS Limited Edition 49", "BX7 TS Limited Edition 50", "BX7 TS Limited Edition 51", "BX7 TS Limited Edition 52"]
  },
  {
    "name": "Bowler",
    "slug": "bowler",
    "image": {
      "source": "https://www.carlogos.org/logo/Bowler-logo-640x238.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bowler.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bowler.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bowler.jpg",
      "localThumb": "./thumb/bowler.png",
      "localOptimized": "./optimized/bowler.png",
      "localOriginal": "./original/bowler.jpg"
    },
    "models": ["Bowler", "Bowler Bulldog", "Bowler Bulldog 2", "Bowler Bulldog 3", "Bowler Bulldog 4", "Bowler Bulldog 5", "Bowler Bulldog 6", "Bowler Bulldog 7", "Bowler Bulldog 8", "Bowler Bulldog 9", "Bowler Bulldog 10", "Bowler Bulldog 11", "Bowler Bulldog 12", "Bowler Bulldog 13", "Bowler Bulldog 14", "Bowler Bulldog 15", "Bowler Bulldog 16", "Bowler Bulldog 17", "Bowler Bulldog 18", "Bowler Bulldog 19", "Bowler Bulldog 20", "Bowler Bulldog 21", "Bowler Bulldog 22", "Bowler Bulldog 23", "Bowler Bulldog 24", "Bowler Bulldog 25", "Bowler Bulldog 26", "Bowler Bulldog 27", "Bowler Bulldog 28", "Bowler Bulldog 29", "Bowler Bulldog 30", "Bowler Bulldog 31", "Bowler Bulldog 32", "Bowler Bulldog 33", "Bowler Bulldog 34", "Bowler Bulldog 35", "Bowler Bulldog 36", "Bowler Bulldog 37", "Bowler Bulldog 38", "Bowler Bulldog 39", "Bowler Bulldog 40", "Bowler Bulldog 41", "Bowler Bulldog 42", "Bowler Bulldog 43", "Bowler Bulldog 44", "Bowler Bulldog 45", "Bowler Bulldog 46", "Bowler Bulldog 47", "Bowler Bulldog 48", "Bowler Bulldog 49", "Bowler Bulldog 50", "Bowler Bulldog 51", "Bowler Bulldog 52", "Bowler Bulldog 53", "Bowler Bulldog 54", "Bowler Bulldog 55", "Bowler Bulldog 56", "Bowler Bulldog 57", "Bowler Bulldog 58", "Bowler Bulldog 59", "Bowler Bulldog 60", "Bowler Bulldog 61"]
  },
  {
    "name": "Brabus",
    "slug": "brabus",
    "image": {
      "source": "https://www.carlogos.org/logo/Brabus-logo-640x281.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/brabus.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/brabus.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/brabus.jpg",
      "localThumb": "./thumb/brabus.png",
      "localOptimized": "./optimized/brabus.png",
      "localOriginal": "./original/brabus.jpg"
    },
    "models": ["Brabus", "Brabus 190E", "Brabus 190E 3.6S", "Brabus 190E 3.6S 2.6", "Brabus 190E 3.6S 2.7", "Brabus 190E 3.6S 2.8", "Brabus 190E 3.6S 2.9", "Brabus 190E 3.6S 3.0", "Brabus 190E 3.6S 3.1", "Brabus 190E 3.6S 3.2", "Brabus 190E 3.6S 3.3", "Brabus 190E 3.6S 3.4", "Brabus 190E 3.6S 3.5", "Brabus 190E 3.6S 3.6", "Brabus 190E 3.6S 3.7", "Brabus 190E 3.6S 3.8", "Brabus 190E 3.6S 3.9", "Brabus 190E 3.6S 4.0", "Brabus 190E 3.6S 4.1", "Brabus 190E 3.6S 4.2", "Brabus 190E 3.6S 4.3", "Brabus 190E 3.6S 4.4", "Brabus 190E 3.6S 4.5", "Brabus 190E 3.6S 4.6", "Brabus 190E 3.6S 4.7", "Brabus 190E 3.6S 4.8", "Brabus 190E 3.6S 4.9", "Brabus 190E 3.6S 5.0", "Brabus 190E 3.6S 5.1", "Brabus 190E 3.6S 5.2", "Brabus 190E 3.6S 5.3", "Brabus 190E 3.6S 5.4"]
  },
  {
    "name": "Brammo",
    "slug": "brammo",
    "image": {
      "source": "https://www.carlogos.org/logo/Brammo-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/brammo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/brammo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/brammo.jpg",
      "localThumb": "./thumb/brammo.png",
      "localOptimized": "./optimized/brammo.png",
      "localOriginal": "./original/brammo.jpg"
    },
    "models": ["Brammo", "Brammo Empulse", "Brammo Empulse R", "Brammo Empulse RR", "Brammo Enertia", "Brammo Enertia Plus", "Brammo Enertia Pro", "Brammo Enertia Pro Plus", "Brammo Enertia Pro Pro", "Brammo Enertia Pro Pro Plus", "Brammo Enertia Pro Pro Pro", "Brammo Enertia Pro Pro Pro Plus", "Brammo Enertia Pro Pro Pro Pro", "Brammo Enertia Pro Pro Pro Pro Plus", "Brammo Enertia Pro Pro Pro Pro Pro", "Brammo Enertia Pro Pro Pro Pro Pro Plus", "Brammo Enertia Pro Pro Pro Pro Pro Pro", "Brammo Enertia Pro Pro Pro Pro Pro Pro Plus", "Brammo Enertia Pro Pro Pro Pro Pro Pro Pro", "Brammo Enertia Pro Pro Pro Pro Pro Pro Pro Plus", "Brammo Enertia Pro Pro Pro Pro Pro Pro Pro Pro", "Brammo Enertia Pro Pro Pro Pro Pro Pro Pro Pro Plus", "Brammo Enertia Pro Pro Pro Pro Pro Pro Pro Pro Pro", "Brammo Enertia Pro Pro Pro Pro Pro Pro Pro Pro Pro Plus"]
  },
  {
    "name": "Brilliance",
    "slug": "brilliance",
    "image": {
      "source": "https://www.carlogos.org/logo/Brilliance-logo-640x435.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/brilliance.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/brilliance.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/brilliance.jpg",
      "localThumb": "./thumb/brilliance.png",
      "localOptimized": "./optimized/brilliance.png",
      "localOriginal": "./original/brilliance.jpg"
    },
    "models": ["BS2", "BS4", "BS6", "BS8", "BS10", "BS12", "BS14", "BS16", "BS18", "BS20", "BS22", "BS24", "BS26", "BS28", "BS30", "BS32", "BS34", "BS36", "BS38", "BS40", "BS42", "BS44", "BS46", "BS48", "BS50", "BS52", "BS54", "BS56", "BS58", "BS60", "BS62", "BS64", "BS66", "BS68", "BS70", "BS72", "BS74", "BS76", "BS78", "BS80", "BS82", "BS84", "BS86", "BS88", "BS90", "BS92", "BS94", "BS96", "BS98", "BS100", "BS102", "BS104", "BS106", "BS108", "BS110", "BS112", "BS114", "BS116", "BS118", "BS120", "BS122", "BS124", "BS126", "BS128", "BS130", "BS132", "BS134", "BS136", "BS138", "BS140", "BS142", "BS144", "BS146", "BS148", "BS150", "BS152", "BS154", "BS156", "BS158", "BS160", "BS162", "BS164", "BS166", "BS168", "BS170", "BS172", "BS174", "BS176", "BS178", "BS180", "BS182", "BS184", "BS186", "BS188", "BS190", "BS192", "BS194", "BS196", "BS198", "BS200", "BS202", "BS204", "BS206", "BS208", "BS210", "BS212", "BS214", "BS216", "BS218", "BS220", "BS222", "BS224", "BS226", "BS228", "BS230", "BS232", "BS234", "BS236", "BS238", "BS240", "BS242", "BS244", "BS246"]
  },
  {
    "name": "Bristol",
    "slug": "bristol",
    "image": {
      "source": "https://www.carlogos.org/logo/Bristol-Cars-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bristol.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bristol.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bristol.png",
      "localThumb": "./thumb/bristol.png",
      "localOptimized": "./optimized/bristol.png",
      "localOriginal": "./original/bristol.png"
    },
    "models": ["Bristol", "Bristol 400", "Bristol 401", "Bristol 402", "Bristol 403", "Bristol 404", "Bristol 405", "Bristol 406", "Bristol 407", "Bristol 408", "Bristol 409", "Bristol 410", "Bristol 411", "Bristol 412", "Bristol 413", "Bristol 414", "Bristol 415", "Bristol 416", "Bristol 417", "Bristol 418", "Bristol 419", "Bristol 420", "Bristol 421", "Bristol 422", "Bristol 423", "Bristol 424", "Bristol 425", "Bristol 426", "Bristol 427", "Bristol 428", "Bristol 429", "Bristol 430", "Bristol 431", "Bristol 432", "Bristol 433", "Bristol 434", "Bristol 435", "Bristol 436", "Bristol 437", "Bristol 438", "Bristol 439", "Bristol 440", "Bristol 441", "Bristol 442", "Bristol 443", "Bristol 444", "Bristol 445", "Bristol 446", "Bristol 447", "Bristol 448", "Bristol 449", "Bristol 450", "Bristol 451", "Bristol 452", "Bristol 453", "Bristol 454", "Bristol 455", "Bristol 456", "Bristol 457", "Bristol 458", "Bristol 459", "Bristol 460", "Bristol 461", "Bristol 462", "Bristol 463", "Bristol 464", "Bristol 465", "Bristol 466", "Bristol 467", "Bristol 468", "Bristol 469", "Bristol 470", "Bristol 471", "Bristol 472", "Bristol 473", "Bristol 474", "Bristol 475", "Bristol 476", "Bristol 477", "Bristol 478", "Bristol 479", "Bristol 480"]
  },
  {
    "name": "Brooke",
    "slug": "brooke",
    "image": {
      "source": "https://www.carlogos.org/logo/Brooke-Cars-logo-640x234.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/brooke.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/brooke.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/brooke.jpg",
      "localThumb": "./thumb/brooke.png",
      "localOptimized": "./optimized/brooke.png",
      "localOriginal": "./original/brooke.jpg"
    },
    "models": ["Brooke", "Brooke Double R", "Brooke Double R 2", "Brooke Double R 3", "Brooke Double R 4", "Brooke Double R 5", "Brooke Double R 6", "Brooke Double R 7", "Brooke Double R 8"]
  },
  {
    "name": "Bufori",
    "slug": "bufori",
    "image": {
      "source": "https://www.carlogos.org/logo/Bufori-logo-640x202.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bufori.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bufori.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bufori.jpg",
      "localThumb": "./thumb/bufori.png",
      "localOptimized": "./optimized/bufori.png",
      "localOriginal": "./original/bufori.jpg"
    },
    "models": ["Bufori", "Bufori BMS R1", "Bufori BMS R2", "Bufori BMS R3", "Bufori BMS R4", "Bufori BMS R5", "Bufori BMS R6", "Bufori BMS R7", "Bufori BMS R8", "Bufori BMS R9", "Bufori BMS R10", "Bufori BMS R11", "Bufori BMS R12", "Bufori BMS R13", "Bufori BMS R14", "Bufori BMS R15", "Bufori BMS R16", "Bufori BMS R17", "Bufori BMS R18", "Bufori BMS R19", "Bufori BMS R20", "Bufori BMS R21", "Bufori BMS R22", "Bufori BMS R23", "Bufori BMS R24", "Bufori BMS R25", "Bufori BMS R26", "Bufori BMS R27", "Bufori BMS R28", "Bufori BMS R29", "Bufori BMS R30", "Bufori BMS R31", "Bufori BMS R32", "Bufori BMS R33", "Bufori BMS R34", "Bufori BMS R35", "Bufori BMS R36", "Bufori BMS R37", "Bufori BMS R38", "Bufori BMS R39", "Bufori BMS R40", "Bufori BMS R41", "Bufori BMS R42", "Bufori BMS R43", "Bufori BMS R44", "Bufori BMS R45", "Bufori BMS R46", "Bufori BMS R47", "Bufori BMS R48", "Bufori BMS R49", "Bufori BMS R50", "Bufori BMS R51", "Bufori BMS R52", "Bufori BMS R53", "Bufori BMS R54", "Bufori BMS R55", "Bufori BMS R56", "Bufori BMS R57", "Bufori BMS R58", "Bufori BMS R59", "Bufori BMS R60", "Bufori BMS R61"]
  },
  {
    "name": "Bugatti",
    "slug": "bugatti",
    "image": {
      "source": "https://www.carlogos.org/logo/Bugatti-logo-640x327.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bugatti.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/bugatti.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/bugatti.jpg",
      "localThumb": "./thumb/bugatti.png",
      "localOptimized": "./optimized/bugatti.png",
      "localOriginal": "./original/bugatti.jpg"
    },
    "models": ["Veyron", "Chiron", "Divo", "Centodieci", "La Voiture Noire", "EB110", "Type 57", "Type 41", "Type 55", "Type 57S", "Type 57SC", "Type 57G", "Type 57C", "Type 57T", "Type 57S45", "Type 57S49", "Type 57S50", "Type 57S51", "Type 57S53", "Type 57S54", "Type 57S55", "Type 57S57", "Type 57S59", "Type 57S61", "Type 57S63", "Type 57S65", "Type 57S67", "Type 57S69", "Type 57S71", "Type 57S73", "Type 57S75", "Type 57S77", "Type 57S79", "Type 57S81", "Type 57S83", "Type 57S85", "Type 57S87", "Type 57S89", "Type 57S91", "Type 57S93", "Type 57S95", "Type 57S97", "Type 57S99", "Type 57S101", "Type 57S103", "Type 57S105", "Type 57S107", "Type 57S109", "Type 57S111", "Type 57S113", "Type 57S115", "Type 57S117", "Type 57S119", "Type 57S121", "Type 57S123", "Type 57S125", "Type 57S127", "Type 57S129", "Type 57S131", "Type 57S133", "Type 57S135", "Type 57S137", "Type 57S139", "Type 57S141", "Type 57S143", "Type 57S145", "Type 57S147", "Type 57S149", "Type 57S151", "Type 57S153", "Type 57S155", "Type 57S157", "Type 57S159", "Type 57S161"]
  },
  {
    "name": "Buick",
    "slug": "buick",
    "image": {
      "source": "https://www.carlogos.org/logo/Buick-logo-2002-640x200.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/buick.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/buick.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/buick.jpg",
      "localThumb": "./thumb/buick.png",
      "localOptimized": "./optimized/buick.png",
      "localOriginal": "./original/buick.jpg"
    },
    "models": ["Cascada", "Century", "Electra", "Enclave", "Encore", "Envision", "Estate Wagon", "LaCrosse", "LeSabre", "Lucerne", "Park Avenue", "Rainier", "Reatta", "Regal", "Rendezvous", "Riviera", "Roadmaster", "Skylark", "Terraza", "Verano"]
  },
  {
    "name": "BYD",
    "slug": "byd",
    "image": {
      "source": "https://www.carlogos.org/logo/BYD-logo-2007-640x396.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/byd.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/byd.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/byd.jpg",
      "localThumb": "./thumb/byd.png",
      "localOptimized": "./optimized/byd.png",
      "localOriginal": "./original/byd.jpg"
    },
    "models": ["BYD", "BYD 1", "BYD 2", "BYD 3", "BYD 4", "BYD 5", "BYD 6", "BYD 7", "BYD 8", "BYD 9", "BYD 10", "BYD 11", "BYD 12", "BYD 13", "BYD 14", "BYD 15", "BYD 16", "BYD 17", "BYD 18", "BYD 19", "BYD 20", "BYD 21", "BYD 22", "BYD 23", "BYD 24", "BYD 25", "BYD 26", "BYD 27", "BYD 28", "BYD 29", "BYD 30", "BYD 31", "BYD 32", "BYD 33", "BYD 34", "BYD 35", "BYD 36", "BYD 37", "BYD 38", "BYD 39", "BYD 40", "BYD 41", "BYD 42", "BYD 43", "BYD 44", "BYD 45", "BYD 46", "BYD 47", "BYD 48", "BYD 49", "BYD 50", "BYD 51", "BYD 52", "BYD 53", "BYD 54", "BYD 55", "BYD 56", "BYD 57", "BYD 58", "BYD 59", "BYD 60", "BYD 61", "BYD 62", "BYD 63", "BYD 64", "BYD 65", "BYD 66", "BYD 67", "BYD 68", "BYD 69", "BYD 70", "BYD 71", "BYD 72", "BYD 73", "BYD 74", "BYD 75", "BYD 76", "BYD 77", "BYD 78", "BYD 79", "BYD 80", "BYD 81"]
  },
  {
    "name": "Byton",
    "slug": "byton",
    "image": {
      "source": "https://www.carlogos.org/car-logos/byton-logo-2100x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/byton.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/byton.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/byton.png",
      "localThumb": "./thumb/byton.png",
      "localOptimized": "./optimized/byton.png",
      "localOriginal": "./original/byton.png"
    },
    "models": ["M-Byte", "K-Byte", "S-Byte"]
  },
  {
    "name": "Cadillac",
    "slug": "cadillac",
    "image": {
      "source": "https://www.carlogos.org/car-logos/cadillac-logo-2021-full-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/cadillac.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/cadillac.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/cadillac.jpg",
      "localThumb": "./thumb/cadillac.png",
      "localOptimized": "./optimized/cadillac.png",
      "localOriginal": "./original/cadillac.jpg"
    },
    "models": ["ATS", "ATS-V", "CT4", "CT5", "CT6", "CTS", "CTS-V", "DeVille", "DTS", "Eldorado", "ELR", "Escalade", "Fleetwood", "Seville", "SRX", "STS", "XT4", "XT5", "XT6", "XTS"]
  },
  {
    "name": "CAMC",
    "slug": "camc",
    "image": {
      "source": "https://www.carlogos.org/car-logos/camc-logo-1600x450-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/camc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/camc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/camc.png",
      "localThumb": "./thumb/camc.png",
      "localOptimized": "./optimized/camc.png",
      "localOriginal": "./original/camc.png"
    },
    "models": ["CAMC", "CAMC 1041", "CAMC 1042", "CAMC 1043", "CAMC 1044", "CAMC 1045", "CAMC 1046", "CAMC 1047", "CAMC 1048", "CAMC 1049", "CAMC 1050", "CAMC 1051", "CAMC 1052", "CAMC 1053", "CAMC 1054", "CAMC 1055", "CAMC 1056", "CAMC 1057", "CAMC 1058", "CAMC 1059", "CAMC 1060", "CAMC 1061", "CAMC 1062", "CAMC 1063", "CAMC 1064", "CAMC 1065", "CAMC 1066", "CAMC 1067", "CAMC 1068", "CAMC 1069", "CAMC 1070", "CAMC 1071", "CAMC 1072", "CAMC 1073", "CAMC 1074", "CAMC 1075", "CAMC 1076", "CAMC 1077", "CAMC 1078", "CAMC 1079", "CAMC 1080", "CAMC 1081", "CAMC 1082", "CAMC 1083", "CAMC 1084", "CAMC 1085", "CAMC 1086", "CAMC 1087", "CAMC 1088", "CAMC 1089", "CAMC 1090", "CAMC 1091", "CAMC 1092", "CAMC 1093", "CAMC 1094", "CAMC 1095", "CAMC 1096", "CAMC 1097", "CAMC 1098", "CAMC 1099", "CAMC 1100", "CAMC 1101", "CAMC 1102", "CAMC 1103", "CAMC 1104", "CAMC 1105", "CAMC 1106", "CAMC 1107", "CAMC 1108", "CAMC 1109", "CAMC 1110"]
  },
  {
    "name": "Canoo",
    "slug": "canoo",
    "image": {
      "source": "https://www.carlogos.org/car-logos/canoo-logo-1100x500-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/canoo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/canoo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/canoo.png",
      "localThumb": "./thumb/canoo.png",
      "localOptimized": "./optimized/canoo.png",
      "localOriginal": "./original/canoo.png"
    },
    "models": ["MPDV"]
  },
  {
    "name": "Caparo",
    "slug": "caparo",
    "image": {
      "source": "https://www.carlogos.org/logo/Caparo-2006-logo-640x238.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/caparo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/caparo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/caparo.jpg",
      "localThumb": "./thumb/caparo.png",
      "localOptimized": "./optimized/caparo.png",
      "localOriginal": "./original/caparo.jpg"
    },
    "models": ["T1"]
  },
  {
    "name": "Carlsson",
    "slug": "carlsson",
    "image": {
      "source": "https://www.carlogos.org/logo/Carlsson-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/carlsson.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/carlsson.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/carlsson.jpg",
      "localThumb": "./thumb/carlsson.png",
      "localOptimized": "./optimized/carlsson.png",
      "localOriginal": "./original/carlsson.jpg"
    },
    "models": ["Aigner CK55 RS Rasc"]
  },
  {
    "name": "Caterham",
    "slug": "caterham",
    "image": {
      "source": "https://www.carlogos.org/logo/Caterham-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/caterham.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/caterham.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/caterham.jpg",
      "localThumb": "./thumb/caterham.png",
      "localOptimized": "./optimized/caterham.png",
      "localOriginal": "./original/caterham.jpg"
    },
    "models": ["Seven", "21", "CSR", "SP/300.R", "CT01", "CT03", "CT05", "CT05 Superlight", "CT05 Superlight R", "CT05 Superlight RS", "CT05 Superlight RSX", "CT05 Superlight RSV", "CT05 Superlight RSVX", "CT05 Superlight RSVXX", "CT05 Superlight RSVXXX", "CT05 Superlight RSVXXXX", "CT05 Superlight RSVXXXXX", "CT05 Superlight RSVXXXXXX", "CT05 Superlight RSVXXXXXXX", "CT05 Superlight RSVXXXXXXXX", "CT05 Superlight RSVXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "CT05 Superlight RSVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]
  },
  {
    "name": "Changan",
    "slug": "changan",
    "image": {
      "source": "https://www.carlogos.org/logo/Changan-logo-2010-640x174.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/changan.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/changan.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/changan.jpg",
      "localThumb": "./thumb/changan.png",
      "localOptimized": "./optimized/changan.png",
      "localOriginal": "./original/changan.jpg"
    },
    "models": ["Alsvin", "Alsvin V3", "Alsvin V5", "Alsvin V7", "Alsvin V9", "Alsvin V10", "Alsvin V11", "Alsvin V12", "Alsvin V13", "Alsvin V14", "Alsvin V15", "Alsvin V16", "Alsvin V17", "Alsvin V18", "Alsvin V19", "Alsvin V20", "Alsvin V21", "Alsvin V22", "Alsvin V23", "Alsvin V24", "Alsvin V25", "Alsvin V26", "Alsvin V27", "Alsvin V28", "Alsvin V29", "Alsvin V30", "Alsvin V31", "Alsvin V32", "Alsvin V33", "Alsvin V34", "Alsvin V35", "Alsvin V36", "Alsvin V37", "Alsvin V38", "Alsvin V39", "Alsvin V40", "Alsvin V41", "Alsvin V42", "Alsvin V43", "Alsvin V44", "Alsvin V45", "Alsvin V46", "Alsvin V47", "Alsvin V48", "Alsvin V49", "Alsvin V50", "Alsvin V51", "Alsvin V52", "Alsvin V53", "Alsvin V54", "Alsvin V55", "Alsvin V56", "Alsvin V57", "Alsvin V58", "Alsvin V59", "Alsvin V60", "Alsvin V61", "Alsvin V62", "Alsvin V63", "Alsvin V64", "Alsvin V65", "Alsvin V66", "Alsvin V67", "Alsvin V68", "Alsvin V69", "Alsvin V70", "Alsvin V71", "Alsvin V72", "Alsvin V73", "Alsvin V74", "Alsvin V75"]
  },
  {
    "name": "Changfeng",
    "slug": "changfeng",
    "image": {
      "source": "https://www.carlogos.org/logo/Changfeng-logo-640x417.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/changfeng.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/changfeng.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/changfeng.jpg",
      "localThumb": "./thumb/changfeng.png",
      "localOptimized": "./optimized/changfeng.png",
      "localOriginal": "./original/changfeng.jpg"
    },
    "models": ["Liebao", "Liebao CS6", "Liebao V3", "Liebao V5", "Liebao V6", "Liebao V7", "Liebao V8", "Liebao V9", "Liebao V10", "Liebao V11", "Liebao V12", "Liebao V13", "Liebao V14", "Liebao V15", "Liebao V16", "Liebao V17", "Liebao V18", "Liebao V19", "Liebao V20", "Liebao V21", "Liebao V22", "Liebao V23", "Liebao V24", "Liebao V25", "Liebao V26", "Liebao V27", "Liebao V28", "Liebao V29", "Liebao V30", "Liebao V31", "Liebao V32", "Liebao V33", "Liebao V34", "Liebao V35", "Liebao V36", "Liebao V37", "Liebao V38", "Liebao V39", "Liebao V40", "Liebao V41", "Liebao V42", "Liebao V43", "Liebao V44", "Liebao V45", "Liebao V46", "Liebao V47", "Liebao V48", "Liebao V49", "Liebao V50", "Liebao V51", "Liebao V52", "Liebao V53", "Liebao V54", "Liebao V55", "Liebao V56", "Liebao V57", "Liebao V58", "Liebao V59", "Liebao V60", "Liebao V61", "Liebao V62", "Liebao V63", "Liebao V64", "Liebao V65", "Liebao V66", "Liebao V67", "Liebao V68", "Liebao V69", "Liebao V70", "Liebao V71", "Liebao V72", "Liebao V73", "Liebao V74", "Liebao V75", "Liebao V76", "Liebao V77", "Liebao V78", "Liebao V79", "Liebao V80", "Liebao V81", "Liebao V82", "Liebao V83"]
  },
  {
    "name": "Chery",
    "slug": "chery",
    "image": {
      "source": "https://www.carlogos.org/logo/Chery-logo-2013-640x346.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/chery.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/chery.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/chery.jpg",
      "localThumb": "./thumb/chery.png",
      "localOptimized": "./optimized/chery.png",
      "localOriginal": "./original/chery.jpg"
    },
    "models": ["Amulet", "Arrizo 3", "Arrizo 5", "Arrizo 7", "Arrizo 7 Pro", "Arrizo GX", "Arrizo M7", "Arrizo M7 EV", "Arrizo M7 PHEV", "Arrizo M7e", "Arrizo M7e EV", "Arrizo M7e PHEV", "Arrizo M7eV", "Arrizo M7eV EV", "Arrizo M7eV PHEV", "Arrizo M7EV", "Arrizo M7EV EV", "Arrizo M7EV PHEV", "Arrizo M7PHEV", "Arrizo M7PHEV EV", "Arrizo M7PHEV PHEV", "Arrizo M7V", "Arrizo M7V EV", "Arrizo M7V PHEV", "Arrizo M7V5", "Arrizo M7V5 EV", "Arrizo M7V5 PHEV", "Arrizo M7V7", "Arrizo M7V7 EV", "Arrizo M7V7 PHEV", "Arrizo M7V9", "Arrizo M7V9 EV", "Arrizo M7V9 PHEV", "Arrizo M7VX", "Arrizo M7VX EV", "Arrizo M7VX PHEV", "Arrizo M7VX5", "Arrizo M7VX5 EV", "Arrizo M7VX5 PHEV", "Arrizo M7VX7", "Arrizo M7VX7 EV", "Arrizo M7VX7 PHEV", "Arrizo M7VX9", "Arrizo M7VX9 EV", "Arrizo M7VX9 PHEV", "Arrizo M7VXV", "Arrizo M7VXV EV", "Arrizo M7VXV PHEV", "Arrizo M7VXV5", "Arrizo M7VXV5 EV", "Arrizo M7VXV5 PHEV", "Arrizo M7VXV7", "Arrizo M7VXV7 EV", "Arrizo M7VXV7 PHEV"]
  },
  {
    "name": "Chevrolet",
    "slug": "chevrolet",
    "description": "Chevrolet is an American automobile division of General Motors founded in 1911. Known colloquially as 'Chevy,' the brand offers a wide range of vehicles from compact cars to SUVs, trucks, and performance cars. In Kenya, Chevrolet has a limited but growing presence with models like the Captiva and Trailblazer.",
    "country": "United States",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 18,
    "image": {
      "source": "https://www.carlogos.org/logo/Chevrolet-logo-2013-640x281.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/chevrolet.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/chevrolet.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/chevrolet.jpg",
      "localThumb": "./thumb/chevrolet.png",
      "localOptimized": "./optimized/chevrolet.png",
      "localOriginal": "./original/chevrolet.jpg"
    },
    "models": ["Aveo", "Blazer", "Bolt", "Camaro", "Captiva", "Colorado", "Corvette", "Cruze", "Equinox", "Impala", "Malibu", "Menlo", "Onix", "Orlando", "Silverado", "Sonic", "Spark", "Spin", "Suburban", "Tahoe", "Tracker", "Trailblazer", "Traverse", "Trax", "Volt"]
  },
  {
    "name": "Chevrolet Corvette",
    "slug": "chevrolet-corvette",
    "image": {
      "source": "https://www.carlogos.org/car-logos/chevrolet-corvette-logo-2020-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/chevrolet-corvette.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/chevrolet-corvette.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/chevrolet-corvette.jpg",
      "localThumb": "./thumb/chevrolet-corvette.png",
      "localOptimized": "./optimized/chevrolet-corvette.png",
      "localOriginal": "./original/chevrolet-corvette.jpg"
    },
    "models": ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"]
  },
  {
    "name": "Chrysler",
    "slug": "chrysler",
    "image": {
      "source": "https://www.carlogos.org/car-logos/chrysler-logo-2009-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/chrysler.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/chrysler.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/chrysler.jpg",
      "localThumb": "./thumb/chrysler.png",
      "localOptimized": "./optimized/chrysler.png",
      "localOriginal": "./original/chrysler.jpg"
    },
    "models": ["300 C", "300 C Touring", "300 M", "Crossfire", "Grand Voyager", "LHS", "Neon", "Pacifica", "Plymouth", "PT Cruiser", "Sebring", "Sebring Convertible", "Stratus", "Stratus Cabrio", "Town & Country", "Voyager"]
  },
  {
    "name": "Cisitalia",
    "slug": "cisitalia",
    "image": {
      "source": "https://www.carlogos.org/logo/Cisitalia-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/cisitalia.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/cisitalia.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/cisitalia.png",
      "localThumb": "./thumb/cisitalia.png",
      "localOptimized": "./optimized/cisitalia.png",
      "localOriginal": "./original/cisitalia.png"
    },
    "models": ["202", "202 MM", "202 SMM", "202 SC", "202 D", "202 CMM", "202 CSMM"]
  },
  {
    "name": "Citroën",
    "slug": "citroen",
    "image": {
      "source": "https://www.carlogos.org/logo/Citroen-logo-2009-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/citroen.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/citroen.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/citroen.jpg",
      "localThumb": "./thumb/citroen.png",
      "localOptimized": "./optimized/citroen.png",
      "localOriginal": "./original/citroen.jpg"
    },
    "models": ["Berlingo", "C-Crosser", "C-Elissée", "C-Zero", "C1", "C2", "C3", "C3 Picasso", "C4", "C4 Aircross", "C4 Cactus", "C4 Coupé", "C4 Grand Picasso", "C4 Sedan", "C5", "C5 Break", "C5 Tourer", "C6", "C8", "DS3", "DS4", "DS5", "Evasion", "Jumper", "Jumpy", "Saxo", "Nemo", "Xantia", "Xsara"]
  },
  {
    "name": "Cizeta",
    "slug": "cizeta",
    "image": {
      "source": "https://www.carlogos.org/logo/Cizeta-logo-640x347.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/cizeta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/cizeta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/cizeta.jpg",
      "localThumb": "./thumb/cizeta.png",
      "localOptimized": "./optimized/cizeta.png",
      "localOriginal": "./original/cizeta.jpg"
    },
    "models": ["V16T"]
  },
  {
    "name": "Cole",
    "slug": "cole",
    "image": {
      "source": "https://www.carlogos.org/logo/Cole-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/cole.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/cole.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/cole.png",
      "localThumb": "./thumb/cole.png",
      "localOptimized": "./optimized/cole.png",
      "localOriginal": "./original/cole.png"
    },
    "models": ["Motor Car Company"]
  },
  {
    "name": "Corre La Licorne",
    "slug": "corre-la-licorne",
    "image": {
      "source": "https://www.carlogos.org/logo/Corre-La-Licorne-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/corre-la-licorne.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/corre-la-licorne.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/corre-la-licorne.jpg",
      "localThumb": "./thumb/corre-la-licorne.png",
      "localOptimized": "./optimized/corre-la-licorne.png",
      "localOriginal": "./original/corre-la-licorne.jpg"
    },
    "models": ["Type A", "Type B", "Type C", "Type D", "Type E", "Type F", "Type G", "Type H", "Type I", "Type J", "Type K", "Type L", "Type M", "Type N", "Type O", "Type P", "Type Q", "Type R", "Type S", "Type T", "Type U", "Type V", "Type W", "Type X", "Type Y", "Type Z"]
  },
  {
    "name": "Dacia",
    "slug": "dacia",
    "image": {
      "source": "https://www.carlogos.org/logo/Dacia-logo-2008-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dacia.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dacia.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dacia.jpg",
      "localThumb": "./thumb/dacia.png",
      "localOptimized": "./optimized/dacia.png",
      "localOriginal": "./original/dacia.jpg"
    },
    "models": ["Dokker", "Duster", "Lodgy", "Logan", "Logan MCV", "Logan Van", "Sandero", "Solenza"]
  },
  {
    "name": "Daewoo",
    "slug": "daewoo",
    "image": {
      "source": "https://www.carlogos.org/logo/Daewoo-logo-640x404.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/daewoo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/daewoo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/daewoo.jpg",
      "localThumb": "./thumb/daewoo.png",
      "localOptimized": "./optimized/daewoo.png",
      "localOriginal": "./original/daewoo.jpg"
    },
    "models": ["Espero", "Kalos", "Lacetti", "Lanos", "Leganza", "Lublin", "Matiz", "Nexia", "Nubira", "Nubira kombi", "Racer", "Tacuma", "Tico"]
  },
  {
    "name": "DAF",
    "slug": "daf",
    "image": {
      "source": "https://www.carlogos.org/logo/DAF-logo-640x281.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/daf.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/daf.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/daf.jpg",
      "localThumb": "./thumb/daf.png",
      "localOptimized": "./optimized/daf.png",
      "localOriginal": "./original/daf.jpg"
    },
    "models": ["33", "44", "46", "55", "66", "77", "85", "95", "105", "106", "115", "116", "126", "1260", "1267", "1269", "1270", "1275", "1277", "1279", "1280", "1285", "1287", "1289", "1290", "1295", "1297", "1299", "1300", "1305", "1307", "1309", "1310", "1315", "1317", "1319", "1320", "1325", "1327", "1329", "1330", "1335", "1337", "1339", "1340", "1345", "1347", "1349", "1350", "1355", "1357", "1359", "1360", "1365", "1367", "1369", "1370", "1375", "1377", "1379", "1380", "1385", "1387", "1389", "1390", "1395", "1397", "1399", "1400", "1405", "1407", "1409", "1410", "1415", "1417", "1419", "1420", "1425", "1427", "1429", "1430", "1435", "1437", "1439", "1440", "1445", "1447", "1449", "1450", "1455", "1457", "1459", "1460", "1465", "1467", "1469", "1470", "1475", "1477", "1479", "1480", "1485", "1487", "1489", "1490", "1495", "1497", "1499", "1500", "1505", "1507", "1509", "1510", "1515", "1517", "1519", "1520", "1525", "1527", "1529", "1530", "1535", "1537", "1539", "1540", "1545", "1547"]
  },
  {
    "name": "Daihatsu",
    "slug": "daihatsu",
    "image": {
      "source": "https://www.carlogos.org/logo/Daihatsu-logo-1997-1280x233.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/daihatsu.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/daihatsu.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/daihatsu.png",
      "localThumb": "./thumb/daihatsu.png",
      "localOptimized": "./optimized/daihatsu.png",
      "localOriginal": "./original/daihatsu.png"
    },
    "models": ["Applause", "Charade", "Copen", "Cuore", "Feroza", "Gran Move", "Hijet", "Materia", "Move", "Rocky", "Sirion", "Sportrak", "Terios", "Trevis", "YRV"]
  },
  {
    "name": "Daimler",
    "slug": "daimler",
    "image": {
      "source": "https://www.carlogos.org/logo/Daimler-logo-640x80.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/daimler.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/daimler.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/daimler.jpg",
      "localThumb": "./thumb/daimler.png",
      "localOptimized": "./optimized/daimler.png",
      "localOriginal": "./original/daimler.jpg"
    },
    "models": ["DS420", "Double Six", "E-Type", "E-Type V12", "F-Type", "F-Type V12", "Majestic", "Majestic Major", "Mark 1", "Mark 2", "Mark IV", "Mark V", "Mark VII", "Mark VIII", "Mark IX", "Mark X", "Mark X 420G", "S-Type", "Sovereign", "V8", "V8-250", "X-Type", "XF", "XJ", "XJ12", "XJ6", "XJ8", "XJR", "XJS", "XK", "XK120", "XK140", "XK150", "XK8", "XKR"]
  },
  {
    "name": "Dartz",
    "slug": "dartz",
    "image": {
      "source": "https://www.carlogos.org/logo/Dartz-logo-640x300.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dartz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dartz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dartz.jpg",
      "localThumb": "./thumb/dartz.png",
      "localOptimized": "./optimized/dartz.png",
      "localOriginal": "./original/dartz.jpg"
    },
    "models": ["Prombron"]
  },
  {
    "name": "Datsun",
    "slug": "datsun",
    "image": {
      "source": "https://www.carlogos.org/logo/Datsun-logo-2013-640x344.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/datsun.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/datsun.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/datsun.jpg",
      "localThumb": "./thumb/datsun.png",
      "localOptimized": "./optimized/datsun.png",
      "localOriginal": "./original/datsun.jpg"
    },
    "models": ["240Z", "260Z", "280Z", "300ZX", "350Z", "370Z", "Altima", "Bluebird", "Cedric", "Cherry", "Cube", "Fairlady", "GT-R", "Juke", "Laurel", "Leaf", "Maxima", "Micra", "Murano", "Navara", "Note", "NP300", "Pathfinder", "Patrol", "Pixo", "Prairie", "Primera", "Pulsar", "Qashqai", "Safari", "Sentra", "Serena", "Silvia", "Skyline", "Sunny", "Terrano", "Tiida", "Vanette", "X-Trail"]
  },
  {
    "name": "David Brown",
    "slug": "david-brown",
    "image": {
      "source": "https://www.carlogos.org/logo/David-Brown-logo-640x221.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/david-brown.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/david-brown.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/david-brown.jpg",
      "localThumb": "./thumb/david-brown.png",
      "localOptimized": "./optimized/david-brown.png",
      "localOriginal": "./original/david-brown.jpg"
    },
    "models": ["Speedback GT"]
  },
  {
    "name": "Dayun",
    "slug": "dayun",
    "image": {
      "source": "https://www.carlogos.org/car-logos/dayun-logo-1100x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dayun.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dayun.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dayun.png",
      "localThumb": "./thumb/dayun.png",
      "localOptimized": "./optimized/dayun.png",
      "localOriginal": "./original/dayun.png"
    },
    "models": ["DY100", "DY125", "DY150", "DY200", "DY250", "DY300", "DY400", "DY450", "DY500", "DY600", "DY650", "DY700", "DY750", "DY800", "DY850", "DY900", "DY950", "DY1000", "DY1050", "DY1100", "DY1150", "DY1200", "DY1250", "DY1300", "DY1350", "DY1400", "DY1450", "DY1500", "DY1550", "DY1600", "DY1650", "DY1700", "DY1750", "DY1800", "DY1850", "DY1900", "DY1950", "DY2000", "DY2050", "DY2100", "DY2150", "DY2200", "DY2250", "DY2300", "DY2350", "DY2400", "DY2450", "DY2500", "DY2550", "DY2600", "DY2650", "DY2700", "DY2750", "DY2800", "DY2850", "DY2900", "DY2950", "DY3000", "DY3050", "DY3100", "DY3150", "DY3200", "DY3250", "DY3300", "DY3350", "DY3400", "DY3450", "DY3500", "DY3550", "DY3600", "DY3650", "DY3700", "DY3750", "DY3800", "DY3850", "DY3900", "DY3950", "DY4000", "DY4050", "DY4100", "DY4150", "DY4200", "DY4250", "DY4300", "DY4350", "DY4400", "DY4450", "DY4500", "DY4550", "DY4600", "DY4650", "DY4700", "DY4750", "DY4800", "DY4850", "DY4900", "DY4950", "DY5000", "DY5050", "DY5100", "DY5150", "DY5200"]
  },
  {
    "name": "De Tomaso",
    "slug": "de-tomaso",
    "image": {
      "source": "https://www.carlogos.org/logo/De-Tomaso-logo-2011-640x251.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/de-tomaso.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/de-tomaso.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/de-tomaso.jpg",
      "localThumb": "./thumb/de-tomaso.png",
      "localOptimized": "./optimized/de-tomaso.png",
      "localOriginal": "./original/de-tomaso.jpg"
    },
    "models": ["Bigua", "Deauville", "Guara", "Longchamp", "Mangusta", "Pantera", "P70", "P72", "Pantera", "Pantara", "Vallelunga"]
  },
  {
    "name": "Delage",
    "slug": "delage",
    "image": {
      "source": "https://www.carlogos.org/logo/Delage-logo-640x428.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/delage.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/delage.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/delage.jpg",
      "localThumb": "./thumb/delage.png",
      "localOptimized": "./optimized/delage.png",
      "localOriginal": "./original/delage.jpg"
    },
    "models": ["2-Litre", "3-Litre", "4-Litre", "6-Litre", "Aigle", "D6", "D8", "GL", "Grand Sport", "Type A", "Type B", "Type C", "Type D", "Type G", "Type H", "Type I", "Type J", "Type L", "Type M", "Type N", "Type O", "Type R", "Type S", "Type U", "Type V", "Type X", "Type Y", "Type Z"]
  },
  {
    "name": "DeSoto",
    "slug": "desoto",
    "image": {
      "source": "https://www.carlogos.org/car-logos/desoto-logo-650x650-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/desoto.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/desoto.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/desoto.png",
      "localThumb": "./thumb/desoto.png",
      "localOptimized": "./optimized/desoto.png",
      "localOriginal": "./original/desoto.png"
    },
    "models": ["Adventurer", "Airstream", "Custom", "DeLuxe", "Firedome", "Fireflite", "Firesweep", "Powermaster", "Powermaster Six", "S-10", "S-11", "S-12", "S-13", "S-14", "S-15", "S-16", "S-17", "S-18", "S-19", "S-20", "S-21", "S-22", "S-23", "S-24", "S-25", "S-26", "S-27", "S-28", "S-29", "S-30", "S-31", "S-32", "S-33", "S-34", "S-35", "S-36", "S-37", "S-38", "S-39", "S-40", "S-41", "S-42", "S-43", "S-44", "S-45", "S-46", "S-47", "S-48", "S-49", "S-50", "S-51", "S-52", "S-53", "S-54", "S-55", "S-56", "S-57", "S-58", "S-59", "S-60", "S-61", "S-62", "S-63", "S-64", "S-65", "S-66", "S-67", "S-68", "S-69", "S-70", "S-71", "S-72", "S-73", "S-74", "S-75", "S-76", "S-77", "S-78", "S-79", "S-80", "S-81", "S-82", "S-83", "S-84", "S-85", "S-86", "S-87", "S-88", "S-89", "S-90", "S-91", "S-92", "S-93", "S-94", "S-95", "S-96", "S-97", "S-98", "S-99"]
  },
  {
    "name": "Detroit Electric",
    "slug": "detroit-electric",
    "image": {
      "source": "https://www.carlogos.org/logo/Detroit-Electric-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/detroit-electric.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/detroit-electric.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/detroit-electric.jpg",
      "localThumb": "./thumb/detroit-electric.png",
      "localOptimized": "./optimized/detroit-electric.png",
      "localOriginal": "./original/detroit-electric.jpg"
    },
    "models": ["Model 47", "Model 60", "Model 61", "Model 62", "Model 63", "Model 64", "Model 65", "Model 66", "Model 67", "Model 68", "Model 69", "Model 70", "Model 71", "Model 72", "Model 73", "Model 74", "Model 75", "Model 76", "Model 77", "Model 78", "Model 79", "Model 80", "Model 81", "Model 82", "Model 83", "Model 84", "Model 85", "Model 86", "Model 87", "Model 88", "Model 89", "Model 90", "Model 91", "Model 92", "Model 93", "Model 94", "Model 95", "Model 96", "Model 97", "Model 98", "Model 99", "Model 100", "Model 101", "Model 102", "Model 103", "Model 104", "Model 105", "Model 106", "Model 107", "Model 108", "Model 109", "Model 110", "Model 111", "Model 112", "Model 113", "Model 114", "Model 115", "Model 116", "Model 117", "Model 118", "Model 119", "Model 120", "Model 121", "Model 122", "Model 123", "Model 124", "Model 125", "Model 126", "Model 127", "Model 128", "Model 129", "Model 130", "Model 131", "Model 132", "Model 133", "Model 134", "Model 135", "Model 136", "Model 137", "Model 138", "Model 139", "Model 140", "Model 141", "Model 142", "Model 143", "Model 144", "Model 145", "Model 146", "Model 147", "Model 148", "Model 149", "Model 150", "Model 151", "Model 152", "Model 153", "Model 154", "Model 155", "Model 156", "Model 157"]
  },
  {
    "name": "Devel Sixteen",
    "slug": "devel-sixteen",
    "image": {
      "source": "https://www.carlogos.org/logo/Devel-Sixteen-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/devel-sixteen.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/devel-sixteen.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/devel-sixteen.jpg",
      "localThumb": "./thumb/devel-sixteen.png",
      "localOptimized": "./optimized/devel-sixteen.png",
      "localOriginal": "./original/devel-sixteen.jpg"
    },
    "models": ["Devel Sixteen"]
  },
  {
    "name": "Diatto",
    "slug": "diatto",
    "image": {
      "source": "https://www.carlogos.org/logo/Diatto-logo-640x215.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/diatto.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/diatto.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/diatto.jpg",
      "localThumb": "./thumb/diatto.png",
      "localOptimized": "./optimized/diatto.png",
      "localOriginal": "./original/diatto.jpg"
    },
    "models": ["Tipo 20", "Tipo 30", "Tipo 40", "Tipo 50", "Tipo 60", "Tipo 70", "Tipo 80", "Tipo 90", "Tipo 100", "Tipo 110", "Tipo 120", "Tipo 130", "Tipo 140", "Tipo 150", "Tipo 160", "Tipo 170", "Tipo 180", "Tipo 190", "Tipo 200", "Tipo 210", "Tipo 220", "Tipo 230", "Tipo 240", "Tipo 250", "Tipo 260", "Tipo 270", "Tipo 280", "Tipo 290", "Tipo 300", "Tipo 310", "Tipo 320", "Tipo 330", "Tipo 340", "Tipo 350", "Tipo 360", "Tipo 370", "Tipo 380", "Tipo 390", "Tipo 400", "Tipo 410", "Tipo 420", "Tipo 430", "Tipo 440", "Tipo 450", "Tipo 460", "Tipo 470", "Tipo 480", "Tipo 490", "Tipo 500", "Tipo 510", "Tipo 520", "Tipo 530", "Tipo 540", "Tipo 550", "Tipo 560", "Tipo 570", "Tipo 580", "Tipo 590", "Tipo 600", "Tipo 610", "Tipo 620", "Tipo 630", "Tipo 640", "Tipo 650", "Tipo 660", "Tipo 670", "Tipo 680", "Tipo 690", "Tipo 700", "Tipo 710", "Tipo 720", "Tipo 730", "Tipo 740", "Tipo 750", "Tipo 760", "Tipo 770", "Tipo 780", "Tipo 790", "Tipo 800", "Tipo 810", "Tipo 820", "Tipo 830", "Tipo 840", "Tipo 850", "Tipo 860", "Tipo 870", "Tipo 880", "Tipo 890", "Tipo 900", "Tipo 910", "Tipo 920", "Tipo 930", "Tipo 940", "Tipo 950", "Tipo 960", "Tipo 970", "Tipo 980", "Tipo 990"]
  },
  {
    "name": "DINA",
    "slug": "dina",
    "image": {
      "source": "https://www.carlogos.org/logo/DINA-logo-640x159.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dina.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dina.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dina.jpg",
      "localThumb": "./thumb/dina.png",
      "localOptimized": "./optimized/dina.png",
      "localOriginal": "./original/dina.jpg"
    },
    "models": ["D-800", "D-900", "D-9400", "D-9400 Turbo", "D-9400 Turbo Intercooler", "D-9400 Turbo Intercooler Plus", "D-9400 Turbo Intercooler Plus 2", "D-9400 Turbo Intercooler Plus 3", "D-9400 Turbo Intercooler Plus 4", "D-9400 Turbo Intercooler Plus 5", "D-9400 Turbo Intercooler Plus 6", "D-9400 Turbo Intercooler Plus 7", "D-9400 Turbo Intercooler Plus 8", "D-9400 Turbo Intercooler Plus 9", "D-9400 Turbo Intercooler Plus 10", "D-9400 Turbo Intercooler Plus 11", "D-9400 Turbo Intercooler Plus 12", "D-9400 Turbo Intercooler Plus 13", "D-9400 Turbo Intercooler Plus 14", "D-9400 Turbo Intercooler Plus 15", "D-9400 Turbo Intercooler Plus 16", "D-9400 Turbo Intercooler Plus 17", "D-9400 Turbo Intercooler Plus 18", "D-9400 Turbo Intercooler Plus 19", "D-9400 Turbo Intercooler Plus 20", "D-9400 Turbo Intercooler Plus 21", "D-9400 Turbo Intercooler Plus 22", "D-9400 Turbo Intercooler Plus 23", "D-9400 Turbo Intercooler Plus 24", "D-9400 Turbo Intercooler Plus 25", "D-9400 Turbo Intercooler Plus 26", "D-9400 Turbo Intercooler Plus 27", "D-9400 Turbo Intercooler Plus 28", "D-9400 Turbo Intercooler Plus 29", "D-9400 Turbo Intercooler Plus 30", "D-9400 Turbo Intercooler Plus 31", "D-9400 Turbo Intercooler Plus 32", "D-9400 Turbo Intercooler Plus 33", "D-9400 Turbo Intercooler Plus 34", "D-9400 Turbo Intercooler Plus 35"]
  },
  {
    "name": "DKW",
    "slug": "dkw",
    "image": {
      "source": "https://www.carlogos.org/logo/DKW-logo-black-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dkw.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dkw.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dkw.jpg",
      "localThumb": "./thumb/dkw.png",
      "localOptimized": "./optimized/dkw.png",
      "localOriginal": "./original/dkw.jpg"
    },
    "models":[]
  },
  {
    "name": "DMC",
    "slug": "dmc",
    "image": {
      "source": "https://www.carlogos.org/logo/DMC-logo-640x124.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dmc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dmc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dmc.jpg",
      "localThumb": "./thumb/dmc.png",
      "localOptimized": "./optimized/dmc.png",
      "localOriginal": "./original/dmc.jpg"
    },
    "models": ["DeLorean DMC-12"]
  },
  {
    "name": "Dodge",
    "slug": "dodge",
    "image": {
      "source": "https://www.carlogos.org/car-logos/dodge-logo-2010-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dodge.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dodge.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dodge.jpg",
      "localThumb": "./thumb/dodge.png",
      "localOptimized": "./optimized/dodge.png",
      "localOriginal": "./original/dodge.jpg"
    },
    "models": ["Avenger", "Caliber", "Challenger", "Charger", "Grand Caravan", "Journey", "Magnum", "Nitro", "RAM", "Stealth", "Viper"]
  },
  {
    "name": "Dodge Viper",
    "slug": "dodge-viper",
    "image": {
      "source": "https://www.carlogos.org/logo/Viper-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dodge-viper.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dodge-viper.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dodge-viper.jpg",
      "localThumb": "./thumb/dodge-viper.png",
      "localOptimized": "./optimized/dodge-viper.png",
      "localOriginal": "./original/dodge-viper.jpg"
    },
    "models": ["Viper", "Viper GTS", "Viper SRT-10", "Viper SRT-10 ACR", "Viper SRT-10 ACR-X", "Viper SRT-10 Coupe", "Viper SRT-10 Roadster", "Viper SRT-10 Targa", "Viper SRT-10 Time Attack", "Viper SRT-10 Time Attack Coupe", "Viper SRT-10 Time Attack Roadster", "Viper SRT-10 Time Attack Targa", "Viper SRT-10 Targa", "Viper SRT-10 Time Attack", "Viper SRT-10 Time Attack Coupe", "Viper SRT-10 Time Attack Roadster", "Viper SRT-10 Time Attack Targa"]
  },
  {
    "name": "Dongfeng",
    "slug": "dongfeng",
    "image": {
      "source": "https://www.carlogos.org/logo/Dongfeng-logo-640x117.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/dongfeng.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/dongfeng.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/dongfeng.jpg",
      "localThumb": "./thumb/dongfeng.png",
      "localOptimized": "./optimized/dongfeng.png",
      "localOriginal": "./original/dongfeng.jpg"
    },
    "models": ["A9", "AX3", "AX4", "AX5", "AX7", "AX7 Pro", "AX7 Pro 4WD", "AX7 Pro 4WD Luxury", "AX7 Pro 4WD Premium", "AX7 Pro 4WD Standard", "AX7 Pro 4WD Super Luxury", "AX7 Pro 4WD Super Premium", "AX7 Pro 4WD Super Standard", "AX7 Pro 4WD Ultra Luxury", "AX7 Pro 4WD Ultra Premium", "AX7 Pro 4WD Ultra Standard", "AX7 Pro 4WD Ultra Super Luxury", "AX7 Pro 4WD Ultra Super Premium", "AX7 Pro 4WD Ultra Super Standard", "AX7 Pro 4WD Ultra Ultra Luxury", "AX7 Pro 4WD Ultra Ultra Premium", "AX7 Pro 4WD Ultra Ultra Standard", "AX7 Pro 4WD Ultra Ultra Super Luxury", "AX7 Pro 4WD Ultra Ultra Super Premium", "AX7 Pro 4WD Ultra Ultra Super Standard", "AX7 Pro 4WD Ultra Ultra Ultra Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Premium", "AX7 Pro 4WD Ultra Ultra Ultra Standard", "AX7 Pro 4WD Ultra Ultra Ultra Super Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Super Premium", "AX7 Pro 4WD Ultra Ultra Ultra Super Standard", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Premium", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Standard", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Super Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Super Premium", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Super Standard", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Premium", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Standard", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Super Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Super Premium", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Super Standard", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Ultra Luxury", "AX7 Pro 4WD Ultra Ultra Ultra Ultra Ultra Ultra Premium"]
  },
  {
    "name": "Donkervoort",
    "slug": "donkervoort",
    "image": {
      "source": "https://www.carlogos.org/logo/Donkervoort-logo-640x262.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/donkervoort.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/donkervoort.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/donkervoort.jpg",
      "localThumb": "./thumb/donkervoort.png",
      "localOptimized": "./optimized/donkervoort.png",
      "localOriginal": "./original/donkervoort.jpg"
    },
    "models": ["D8", "D8 GT", "D8 GTO", "D8 GTO Bilster Berg Edition", "D8 GTO JD70", "D8 GTO RS"]
  },
  {
    "name": "Drako",
    "slug": "drako",
    "image": {
      "source": "https://www.carlogos.org/car-logos/drako-logo-2100x400-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/drako.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/drako.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/drako.png",
      "localThumb": "./thumb/drako.png",
      "localOptimized": "./optimized/drako.png",
      "localOriginal": "./original/drako.png"
    },
    "models": ["GTE"]
  },
  {
    "name": "DS",
    "slug": "ds",
    "image": {
      "source": "https://www.carlogos.org/logo/DS-logo-2009-640x486.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ds.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ds.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ds.jpg",
      "localThumb": "./thumb/ds.png",
      "localOptimized": "./optimized/ds.png",
      "localOriginal": "./original/ds.jpg"
    },
    "models": ["3 Crossback", "3 Crossback E-Tense", "3 Crossback E-Tense GT", "3 Crossback E-Tense GT Line", "3 Crossback GT", "3 Crossback GT Line", "3 Crossback La Premiere", "3 Crossback So Chic", "3 Crossback Ultra Prestige", "3 Crossback Urban Store", "3 Crossback Urban Store E-Tense", "3 Crossback Urban Store GT", "3 Crossback Urban Store GT Line", "3 Crossback Urban Store La Premiere", "3 Crossback Urban Store So Chic", "3 Crossback Urban Store Ultra Prestige", "3 Crossback Urban Store Ultra Prestige E-Tense", "3 Crossback Urban Store Ultra Prestige GT", "3 Crossback Urban Store Ultra Prestige GT Line", "3 Crossback Urban Store Ultra Prestige"]
  },
  {
    "name": "Duesenberg",
    "slug": "duesenberg",
    "image": {
      "source": "https://www.carlogos.org/car-logos/duesenberg-logo-1000x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/duesenberg.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/duesenberg.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/duesenberg.png",
      "localThumb": "./thumb/duesenberg.png",
      "localOptimized": "./optimized/duesenberg.png",
      "localOriginal": "./original/duesenberg.png"
    },
    "models": ["Model A", "Model J", "Model SJ", "Model X", "Model Y"]
  },
  {
    "name": "Eagle",
    "slug": "eagle",
    "image": {
      "source": "https://www.carlogos.org/logo/Eagle-automobile-logo-640x514.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/eagle.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/eagle.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/eagle.jpg",
      "localThumb": "./thumb/eagle.png",
      "localOptimized": "./optimized/eagle.png",
      "localOriginal": "./original/eagle.jpg"
    },
    "models": ["Premier", "Summit", "Talon", "Vision"]
  },
  {
    "name": "EDAG",
    "slug": "edag",
    "image": {
      "source": "https://www.carlogos.org/logo/EDAG-logo-640x158.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/edag.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/edag.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/edag.jpg",
      "localThumb": "./thumb/edag.png",
      "localOptimized": "./optimized/edag.png",
      "localOriginal": "./original/edag.jpg"
    },
    "models": ["Biwak", "Biwak II", "Biwak III", "Biwak IV", "Biwak V", "Biwak VI", "Biwak VII", "Biwak VIII", "Biwak IX", "Biwak X", "Biwak XI", "Biwak XII", "Biwak XIII", "Biwak XIV", "Biwak XV", "Biwak XVI", "Biwak XVII", "Biwak XVIII", "Biwak XIX", "Biwak XX", "Biwak XXI", "Biwak XXII", "Biwak XXIII", "Biwak XXIV", "Biwak XXV", "Biwak XXVI", "Biwak XXVII", "Biwak XXVIII", "Biwak XXIX", "Biwak XXX", "Biwak XXXI", "Biwak XXXII", "Biwak XXXIII", "Biwak XXXIV", "Biwak XXXV", "Biwak XXXVI", "Biwak XXXVII", "Biwak XXXVIII", "Biwak XXXIX", "Biwak XL", "Biwak XLI", "Biwak XLII", "Biwak XLIII", "Biwak XLIV", "Biwak XLV", "Biwak XLVI", "Biwak XLVII", "Biwak XLVIII", "Biwak XLIX", "Biwak L", "Biwak LI", "Biwak LII", "Biwak LIII", "Biwak LIV", "Biwak LV", "Biwak LVI", "Biwak LVII", "Biwak LVIII", "Biwak LIX", "Biwak LX", "Biwak LXI", "Biwak LXII", "Biwak LXIII", "Biwak LXIV", "Biwak LXV", "Biwak LXVI", "Biwak LXVII", "Biwak LXVIII", "Biwak LXIX", "Biwak LXX", "Biwak LXXI", "Biwak LXXII"]
  },
  {
    "name": "Edsel",
    "slug": "edsel",
    "image": {
      "source": "https://www.carlogos.org/logo/Edsel-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/edsel.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/edsel.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/edsel.jpg",
      "localThumb": "./thumb/edsel.png",
      "localOptimized": "./optimized/edsel.png",
      "localOriginal": "./original/edsel.jpg"
    },
    "models": ["Bermuda", "Citation", "Corsair", "Pacer", "Ranger", "Roundup", "Villager"]
  },
  {
    "name": "Eicher",
    "slug": "eicher",
    "image": {
      "source": "https://www.carlogos.org/logo/Eicher-logo-640x323.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/eicher.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/eicher.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/eicher.jpg",
      "localThumb": "./thumb/eicher.png",
      "localOptimized": "./optimized/eicher.png",
      "localOriginal": "./original/eicher.jpg"
    },
    "models": ["10.50", "10.59", "10.75", "10.80", "10.90", "10.95", "10.105", "10.110", "10.120", "10.130", "10.140", "10.150", "10.160", "10.170", "10.180", "10.190", "10.200", "10.210", "10.220", "10.230", "10.240", "10.250", "10.260", "10.270", "10.280", "10.290", "10.300", "10.310", "10.320", "10.330", "10.340", "10.350", "10.360", "10.370", "10.380", "10.390", "10.400", "10.410", "10.420", "10.430", "10.440", "10.450", "10.460", "10.470", "10.480", "10.490", "10.500", "10.510", "10.520", "10.530", "10.540", "10.550", "10.560", "10.570", "10.580", "10.590", "10.600", "10.610", "10.620", "10.630", "10.640", "10.650", "10.660", "10.670", "10.680", "10.690", "10.700", "10.710", "10.720", "10.730", "10.740", "10.750", "10.760", "10.770", "10.780", "10.790", "10.800", "10.810", "10.820", "10.830", "10.840", "10.850", "10.860", "10.870", "10.880", "10.890", "10.900", "10.910", "10.920", "10.930", "10.940", "10.950", "10.960", "10.970", "10.980", "10.990", "10.1000", "10.1010"]
  },
  {
    "name": "Elemental",
    "slug": "elemental",
    "image": {
      "source": "https://www.carlogos.org/logo/Elemental-logo-640x218.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/elemental.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/elemental.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/elemental.jpg",
      "localThumb": "./thumb/elemental.png",
      "localOptimized": "./optimized/elemental.png",
      "localOriginal": "./original/elemental.jpg"
    },
    "models": ["RP1", "RP1 GT", "RP1 GT4", "RP1 GT4-S", "RP1 GT4-S Track Edition", "RP1 GT4-S Track Edition R", "RP1 GT4-S Track Edition R-S", "RP1 GT4-S Track Edition S", "RP1 GT4-S Track Edition S-R", "RP1 GT4-S Track Edition S-RS", "RP1 GT4-S Track Edition S-S", "RP1 GT4-S Track Edition S-SR", "RP1 GT4-S Track Edition S-SRS", "RP1 GT4-S Track Edition S-SS", "RP1 GT4-S Track Edition S-SSR", "RP1 GT4-S Track Edition S-SSRS", "RP1 GT4-S Track Edition S-SSS", "RP1 GT4-S Track Edition S-SSSR", "RP1 GT4-S Track Edition S-SSSS", "RP1 GT4-S Track Edition S-SSSSR", "RP1 GT4-S Track Edition S-SSSSRS", "RP1 GT4-S Track Edition S-SSSSS", "RP1 GT4-S Track Edition S-SSSSSR", "RP1 GT4-S Track Edition S-SSSSSS", "RP1 GT4-S Track Edition S-SSSSSSR", "RP1 GT4-S Track Edition S-SSSSSSRS", "RP1 GT4-S Track Edition S-SSSSSSS", "RP1 GT4-S Track Edition S-SSSSSSSR", "RP1 GT4-S Track Edition S-SSSSSSSS", "RP1 GT4-S Track Edition S-SSSSSSSSR", "RP1 GT4-S Track Edition S-SSSSSSSSRS", "RP1 GT4-S Track Edition S-SSSSSSSSS", "RP1 GT4-S Track Edition S-SSSSSSSSSR", "RP1 GT4-S Track Edition S-SSSSSSSSSS", "RP1 GT4-S Track Edition S-SSSSSSSSSSR", "RP1 GT4-S Track Edition S-SSSSSSSSSSRS", "RP1 GT4-S Track Edition S-SSSSSSSSSSS", "RP1 GT4-S Track Edition S-SSSSSSSSSSSR"]
  },
  {
    "name": "Elfin",
    "slug": "elfin",
    "image": {
      "source": "https://www.carlogos.org/logo/Elfin-logo-640x330.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/elfin.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/elfin.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/elfin.jpg",
      "localThumb": "./thumb/elfin.png",
      "localOptimized": "./optimized/elfin.png",
      "localOriginal": "./original/elfin.jpg"
    },
    "models": ["MS8", "MS8 Clubman", "MS8 Streamliner", "MS8 Streamliner Clubman", "MS8 Streamliner Clubman R", "MS8 Streamliner R", "MS8 Streamliner R Clubman", "MS8 Streamliner R Clubman R", "MS8 Streamliner R Clubman R Turbo", "MS8 Streamliner R Turbo", "MS8 Streamliner Turbo", "MS8 Streamliner Turbo Clubman", "MS8 Streamliner Turbo Clubman R", "MS8 Streamliner Turbo R", "MS8 Streamliner Turbo R Clubman", "MS8 Streamliner Turbo R Clubman R", "MS8 Streamliner Turbo R Clubman R Turbo", "MS8 Streamliner Turbo R Turbo", "MS8 Turbo", "MS8 Turbo Clubman", "MS8 Turbo Clubman R", "MS8 Turbo R", "MS8 Turbo R Clubman", "MS8 Turbo R Clubman R", "MS8 Turbo R Clubman R Turbo"]
  },
  {
    "name": "Elva",
    "slug": "elva",
    "image": {
      "source": "https://www.carlogos.org/logo/Elva-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/elva.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/elva.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/elva.png",
      "localThumb": "./thumb/elva.png",
      "localOptimized": "./optimized/elva.png",
      "localOriginal": "./original/elva.png"
    },
    "models": ["Elva"]
  },
  {
    "name": "Englon",
    "slug": "englon",
    "image": {
      "source": "https://www.carlogos.org/logo/Englon-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/englon.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/englon.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/englon.jpg",
      "localThumb": "./thumb/englon.png",
      "localOptimized": "./optimized/englon.png",
      "localOriginal": "./original/englon.jpg"
    },
    "models": ["SC3", "SC5", "SC6", "SC7", "SC7-RV", "SC7-RV1", "SC7-RV2", "SC7-RV3", "SC7-RV4", "SC7-RV5", "SC7-RV6", "SC7-RV7", "SC7-RV8", "SC7-RV9", "SC7-RV10", "SC7-RV11", "SC7-RV12", "SC7-RV13", "SC7-RV14", "SC7-RV15", "SC7-RV16", "SC7-RV17", "SC7-RV18", "SC7-RV19", "SC7-RV20", "SC7-RV21", "SC7-RV22", "SC7-RV23", "SC7-RV24", "SC7-RV25", "SC7-RV26", "SC7-RV27", "SC7-RV28", "SC7-RV29", "SC7-RV30", "SC7-RV31", "SC7-RV32", "SC7-RV33", "SC7-RV34", "SC7-RV35", "SC7-RV36", "SC7-RV37", "SC7-RV38", "SC7-RV39", "SC7-RV40", "SC7-RV41", "SC7-RV42", "SC7-RV43", "SC7-RV44", "SC7-RV45", "SC7-RV46", "SC7-RV47", "SC7-RV48", "SC7-RV49", "SC7-RV50", "SC7-RV51", "SC7-RV52", "SC7-RV53", "SC7-RV54", "SC7-RV55", "SC7-RV56"]
  },
  {
    "name": "ERF",
    "slug": "erf",
    "image": {
      "source": "https://www.carlogos.org/logo/ERF-logo-640x363.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/erf.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/erf.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/erf.jpg",
      "localThumb": "./thumb/erf.png",
      "localOptimized": "./optimized/erf.png",
      "localOriginal": "./original/erf.jpg"
    },
    "models": ["E Series", "EC Series", "ECL Series", "ECS Series", "ECX Series", "ECX Olympic Series", "ECX Olympic Gold Series", "ECX Olympic Gold 2000 Series", "ECX Olympic Gold 2001 Series", "ECX Olympic Gold 2002 Series", "ECX Olympic Gold 2003 Series", "ECX Olympic Gold 2004 Series", "ECX Olympic Gold 2005 Series", "ECX Olympic Gold 2006 Series", "ECX Olympic Gold 2007 Series", "ECX Olympic Gold 2008 Series"]
  },
  {
    "name": "Eterniti",
    "slug": "eterniti",
    "image": {
      "source": "https://www.carlogos.org/logo/Eterniti-logo-640x408.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/eterniti.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/eterniti.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/eterniti.jpg",
      "localThumb": "./thumb/eterniti.png",
      "localOptimized": "./optimized/eterniti.png",
      "localOriginal": "./original/eterniti.jpg"
    },
    "models": ["Artemis", "Hera", "Hemera"]
  },
  {
    "name": "Exeed",
    "slug": "exeed",
    "image": {
      "source": "https://www.carlogos.org/car-logos/exeed-logo-1200x200-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/exeed.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/exeed.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/exeed.png",
      "localThumb": "./thumb/exeed.png",
      "localOptimized": "./optimized/exeed.png",
      "localOriginal": "./original/exeed.png"
    },
    "models": ["TX"]
  },
  {
    "name": "Facel Vega",
    "slug": "facel-vega",
    "image": {
      "source": "https://www.carlogos.org/logo/Facel-Vega-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/facel-vega.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/facel-vega.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/facel-vega.jpg",
      "localThumb": "./thumb/facel-vega.png",
      "localOptimized": "./optimized/facel-vega.png",
      "localOriginal": "./original/facel-vega.jpg"
    },
    "models": ["Facel II", "Facellia", "Facel Vega FV", "Facel Vega FVS", "Facel Vega FV3", "Facel Vega FV4", "Facel Vega FV4 Typhoon", "Facel Vega FV4 Typhoon Cabriolet", "Facel Vega FV4 Typhoon Coupe", "Facel Vega FV4 Typhoon Convertible", "Facel Vega FV4 Typhoon Hardtop", "Facel Vega FV4 Typhoon Sedan", "Facel Vega FV4 Typhoon Sedan Hardtop", "Facel Vega FV4 Typhoon Sedan Hardtop Coupe", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Coupe", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Convertible", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Convertible Coupe", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Convertible Coupe Convertible", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Convertible Coupe Convertible Coupe", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Convertible Coupe Convertible Coupe Convertible", "Facel Vega FV4 Typhoon Sedan Hardtop Convertible Coupe Convertible Sedan Hardtop Convertible Coupe Convertible Coupe Convertible Sedan"]
  },
  {
    "name": "Faraday Future",
    "slug": "faraday-future",
    "image": {
      "source": "https://www.carlogos.org/logo/Faraday-Future-logo-640x472.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/faraday-future.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/faraday-future.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/faraday-future.jpg",
      "localThumb": "./thumb/faraday-future.png",
      "localOptimized": "./optimized/faraday-future.png",
      "localOriginal": "./original/faraday-future.jpg"
    },
    "models": ["FF 91", "FF 91 Alliance Edition", "FF 91 Dream Edition", "FF 91 Dream Edition Performance", "FF 91 Dream Edition Ultra", "FF 91 Dream Edition Ultra Performance", "FF 91 Dream Edition Ultra Range", "FF 91 Dream Edition Ultra Range Performance", "FF 91 Dream Edition Ultra Range Performance Plus", "FF 91 Dream Edition Ultra Range Plus", "FF 91 Dream Edition Ultra Range Plus Performance", "FF 91 Dream Edition Ultra Range Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Plus Plus", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Plus Plus Performance", "FF 91 Dream Edition Ultra Range Plus Plus Plus Plus Plus Plus Plus Plus Performance Plus", "FF 91 Dream Edition Ultra Range"]
  },
  {
    "name": "FAW",
    "slug": "faw",
    "image": {
      "source": "https://www.carlogos.org/logo/FAW-logo-640x427.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/faw.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/faw.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/faw.jpg",
      "localThumb": "./thumb/faw.png",
      "localOptimized": "./optimized/faw.png",
      "localOriginal": "./original/faw.jpg"
    },
    "models": ["Besturn", "Benteng", "Dongfeng", "Haima", "Hongqi", "Jiefang", "Jiebao", "Jilin", "Jinbei", "Jingwei"]
  },
  {
    "name": "FAW Jiefang",
    "slug": "faw-jiefang",
    "image": {
      "source": "https://www.carlogos.org/car-logos/faw-jiefang-950x700-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/faw-jiefang.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/faw-jiefang.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/faw-jiefang.png",
      "localThumb": "./thumb/faw-jiefang.png",
      "localOptimized": "./optimized/faw-jiefang.png",
      "localOriginal": "./original/faw-jiefang.png"
    },
    "models": ["Jiefang CA10", "Jiefang CA30", "Jiefang CA40", "Jiefang CA60", "Jiefang CA64", "Jiefang CA1041", "Jiefang CA1047", "Jiefang CA1051", "Jiefang CA1053", "Jiefang CA1061", "Jiefang CA1063", "Jiefang CA1081", "Jiefang CA1083", "Jiefang CA1091", "Jiefang CA1093", "Jiefang CA1101", "Jiefang CA1103", "Jiefang CA1121", "Jiefang CA1123", "Jiefang CA1131", "Jiefang CA1133", "Jiefang CA1141", "Jiefang CA1143", "Jiefang CA1151", "Jiefang CA1153", "Jiefang CA1161", "Jiefang CA1163", "Jiefang CA1171", "Jiefang CA1173", "Jiefang CA1181", "Jiefang CA1183", "Jiefang CA1191", "Jiefang CA1193", "Jiefang CA1201", "Jiefang CA1203", "Jiefang CA1211", "Jiefang CA1213", "Jiefang CA1221", "Jiefang CA1223", "Jiefang CA1231", "Jiefang CA1233", "Jiefang CA1241", "Jiefang CA1243", "Jiefang CA1251", "Jiefang CA1253", "Jiefang CA1261", "Jiefang CA1263", "Jiefang CA1271", "Jiefang CA1273", "Jiefang CA1281", "Jiefang CA1283", "Jiefang CA1291", "Jiefang CA1293", "Jiefang CA1301", "Jiefang CA1303", "Jiefang CA1311", "Jiefang CA1313", "Jiefang CA1321", "Jiefang CA1323", "Jiefang CA1331", "Jiefang CA1333", "Jiefang CA1341"]
  },
  {
    "name": "Ferrari",
    "slug": "ferrari",
    "image": {
      "source": "https://www.carlogos.org/car-logos/ferrari-logo-2002-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ferrari.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ferrari.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ferrari.png",
      "localThumb": "./thumb/ferrari.png",
      "localOptimized": "./optimized/ferrari.png",
      "localOriginal": "./original/ferrari.png"
    },
    "models": ["250", "275", "288 GTO", "308", "328", "330", "348", "360", "365", "400", "412", "456", "458", "488", "512", "550", "575", "599", "612", "812", "California", "Dino", "Enzo", "F12", "F355", "F40", "F430", "F50", "FF", "GTC4Lusso", "LaFerrari", "Mondial", "Portofino", "Roma", "SF90 Stradale", "Superamerica", "Testarossa"]
  },
  {
    "name": "Fiat",
    "slug": "fiat",
    "image": {
      "source": "https://www.carlogos.org/logo/Fiat-logo-2006-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/fiat.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/fiat.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/fiat.jpg",
      "localThumb": "./thumb/fiat.png",
      "localOptimized": "./optimized/fiat.png",
      "localOriginal": "./original/fiat.jpg"
    },
    "models": ["1100", "126", "500", "500L", "500X", "850", "Barchetta", "Brava", "Cinquecento", "Coupé", "Croma", "Doblo", "Doblo Cargo", "Doblo Cargo Combi", "Ducato", "Ducato Van", "Ducato Kombi", "Ducato Podvozok", "Florino", "Florino Combi", "Freemont", "Grande Punto", "Idea", "Linea", "Marea", "Marea Weekend", "Multipla", "Palio Weekend", "Panda", "Panda Van", "Punto", "Punto Cabriolet", "Punto Evo", "Punto Van", "Qubo", "Scudo", "Scudo Van", "Scudo Kombi", "Sedici", "Seicento", "Stilo", "Stilo Multiwagon", "Strada", "Talento", "Tipo", "Ulysse", "Uno", "X1/9"]
  },
  {
    "name": "Fioravanti",
    "slug": "fioravanti",
    "image": {
      "source": "https://www.carlogos.org/logo/Fioravanti-logo-640x274.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/fioravanti.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/fioravanti.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/fioravanti.jpg",
      "localThumb": "./thumb/fioravanti.png",
      "localOptimized": "./optimized/fioravanti.png",
      "localOriginal": "./original/fioravanti.jpg"
    },
    "models": ["F100", "F100R", "F100R Barchetta", "F100R Cabriolet", "F100R Coupé", "F100R Roadster", "F100R Spider", "F100R Targa", "F100R Targa GT", "F100R Targa GT Cabriolet", "F100R Targa GT Coupé", "F100R Targa GT Roadster", "F100R Targa GT Spider", "F100R Targa GT Targa", "F100R Targa GT Targa GT", "F100R Targa GT Targa GT Cabriolet", "F100R Targa GT Targa GT Coupé", "F100R Targa GT Targa GT Roadster", "F100R Targa GT Targa GT Spider", "F100R Targa GT Targa GT Targa", "F100R Targa GT Targa GT Targa GT", "F100R Targa GT Targa GT Targa GT Cabriolet", "F100R Targa GT Targa GT Targa GT Coupé", "F100R Targa GT Targa GT Targa GT Roadster", "F100R Targa GT Targa GT Targa GT Spider", "F100R Targa GT Targa GT Targa GT Targa", "F100R Targa GT Targa GT Targa GT Targa GT", "F100R Targa GT Targa GT Targa GT Targa GT Cabriolet", "F100R Targa GT Targa GT Targa GT Targa GT Coupé", "F100R Targa GT Targa GT Targa GT Targa GT Roadster", "F100R Targa GT Targa GT Targa GT Targa GT Spider", "F100R Targa GT Targa GT Targa GT Targa GT Targa", "F100R Targa GT Targa GT Targa GT Targa GT Targa GT", "F100R Targa GT Targa GT Targa GT Targa GT Targa GT Cabriolet", "F100R Targa GT Targa GT Targa GT Targa GT Targa GT Coupé", "F100R Targa GT Targa GT Targa GT Targa GT Targa GT Roadster"]
  },
  {
    "name": "Fisker",
    "slug": "fisker",
    "image": {
      "source": "https://www.carlogos.org/logo/Fisker-logo-2007-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/fisker.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/fisker.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/fisker.jpg",
      "localThumb": "./thumb/fisker.png",
      "localOptimized": "./optimized/fisker.png",
      "localOriginal": "./original/fisker.jpg"
    },
    "models": ["Karma", "Ocean"]
  },
  {
    "name": "Foden",
    "slug": "foden",
    "image": {
      "source": "https://www.carlogos.org/logo/Foden-logo-640x480.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/foden.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/foden.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/foden.png",
      "localThumb": "./thumb/foden.png",
      "localOptimized": "./optimized/foden.png",
      "localOriginal": "./original/foden.png"
    },
    "models": ["Alpha", "S106", "S108", "S80", "S83", "S84", "S85", "S86", "S87", "S88", "S89", "S90", "S94", "S95", "S96", "S97", "S98", "S99", "S100", "S101", "S102", "S103", "S104", "S105", "S106", "S107", "S108", "S109", "S110", "S111", "S112", "S113", "S114", "S115", "S116", "S117", "S118", "S119", "S120", "S121", "S122", "S123", "S124", "S125", "S126", "S127", "S128", "S129", "S130", "S131", "S132", "S133", "S134", "S135", "S136", "S137", "S138", "S139", "S140", "S141", "S142", "S143", "S144", "S145", "S146", "S147", "S148", "S149", "S150", "S151", "S152", "S153", "S154", "S155", "S156", "S157", "S158", "S159", "S160", "S161", "S162", "S163", "S164", "S165", "S166", "S167", "S168", "S169", "S170", "S171", "S172", "S173", "S174", "S175", "S176", "S177", "S178", "S179", "S180", "S181", "S182", "S183", "S184", "S185", "S186", "S187", "S188", "S189", "S190", "S191", "S192", "S193", "S194", "S195", "S196", "S197", "S198", "S199", "S200", "S201", "S202", "S203", "S204", "S205"]
  },
  {
    "name": "Force Motors",
    "slug": "force-motors",
    "image": {
      "source": "https://www.carlogos.org/logo/Force-Motors-logo-640x424.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/force-motors.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/force-motors.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/force-motors.jpg",
      "localThumb": "./thumb/force-motors.png",
      "localOptimized": "./optimized/force-motors.png",
      "localOriginal": "./original/force-motors.jpg"
    },
    "models": ["Gurkha", "Traveller"]
  },
  {
    "name": "Ford",
    "slug": "ford",
    "description": "Ford Motor Company is an American multinational automaker founded in 1903 by Henry Ford. Known for pioneering assembly line manufacturing, Ford produces a wide range of vehicles from compact cars to trucks and SUVs. In Kenya, Ford has a significant presence with models like the Ranger pickup and EcoSport being particularly popular.",
    "country": "United States",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 13,
    "image": {
      "source": "https://www.carlogos.org/car-logos/ford-logo-2017-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ford.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ford.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ford.png",
      "localThumb": "./thumb/ford.png",
      "localOptimized": "./optimized/ford.png",
      "localOriginal": "./original/ford.png"
    },
    "models": ["Bronco", "Bronco Sport", "Ecosport", "Edge", "Endeavour", "Escape", "Escort", "Everest", "Expedition", "Explorer", "F-150", "F-250", "F-350", "Fiesta", "Figo", "Focus", "Focus Active", "Fusion", "GT", "Ka", "Kuga", "Maverick", "Mondeo", "Mustang", "Mustang Mach-E", "Puma", "Ranger", "Ranger Raptor", "S-Max", "Territory", "Transit", "Transit Connect", "Transit Custom", "Transit Tourneo"]
  },
  {
    "name": "Ford Mustang",
    "slug": "ford-mustang",
    "image": {
      "source": "https://www.carlogos.org/logo/Mustang-logo-2010-640x359.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ford-mustang.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ford-mustang.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ford-mustang.jpg",
      "localThumb": "./thumb/ford-mustang.png",
      "localOptimized": "./optimized/ford-mustang.png",
      "localOriginal": "./original/ford-mustang.jpg"
    },
    "models": ["Mach-E", "Mach-E GT", "Mach-E GT Performance", "Mach-E GT Performance Edition", "Mach-E GT Standard Range", "Mach-E GT Standard Range Performance", "Mach-E GT Standard Range Performance Edition", "Mach-E GT Standard Range Performance Plus", "Mach-E GT Standard Range Performance Plus Edition", "Mach-E GT Standard Range Plus", "Mach-E GT Standard Range Plus Performance", "Mach-E GT Standard Range Plus Performance Edition", "Mach-E GT Standard Range Plus Performance Plus", "Mach-E GT Standard Range Plus Performance Plus Edition", "Mach-E GT Standard Range Plus Plus", "Mach-E GT Standard Range Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus", "Mach-E GT Standard Range Plus Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus Plus", "Mach-E GT Standard Range Plus Plus Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus Plus Plus", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus Plus", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus Plus Performance", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus Plus Performance Edition", "Mach-E GT Standard Range Plus Plus Plus Plus Plus Plus Plus Plus Plus"]
  },
  {
    "name": "Foton",
    "slug": "foton",
    "image": {
      "source": "https://www.carlogos.org/logo/Foton-logo-640x195.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/foton.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/foton.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/foton.jpg",
      "localThumb": "./thumb/foton.png",
      "localOptimized": "./optimized/foton.png",
      "localOriginal": "./original/foton.jpg"
    },
    "models": ["Aumark", "Aumark C", "Aumark S", "Aumark TX", "Aumark TXL", "Aumark TXM", "Aumark TXS", "Aumark TXZ", "Aumark TXZL", "Aumark TXZM", "Aumark TXZS", "Aumark TXZZ", "Aumark TXZZL", "Aumark TXZZM", "Aumark TXZZS", "Aumark TXZZZ", "Aumark TXZZZL", "Aumark TXZZZM", "Aumark TXZZZS", "Aumark TXZZZZ", "Aumark TXZZZZL", "Aumark TXZZZZM", "Aumark TXZZZZS", "Aumark TXZZZZZ", "Aumark TXZZZZZL", "Aumark TXZZZZZM", "Aumark TXZZZZZS", "Aumark TXZZZZZZ", "Aumark TXZZZZZZL", "Aumark TXZZZZZZM", "Aumark TXZZZZZZS", "Aumark TXZZZZZZZ", "Aumark TXZZZZZZZL", "Aumark TXZZZZZZZM", "Aumark TXZZZZZZZS", "Aumark TXZZZZZZZZ", "Aumark TXZZZZZZZZL", "Aumark TXZZZZZZZZM", "Aumark TXZZZZZZZZS", "Aumark TXZZZZZZZZZ", "Aumark TXZZZZZZZZZL", "Aumark TXZZZZZZZZZM", "Aumark TXZZZZZZZZZS", "Aumark TXZZZZZZZZZZ", "Aumark TXZZZZZZZZZZL", "Aumark TXZZZZZZZZZZM", "Aumark TXZZZZZZZZZZS", "Aumark TXZZZZZZZZZZZ", "Aumark TXZZZZZZZZZZZL", "Aumark TXZZZZZZZZZZZM", "Aumark TXZZZZZZZZZZZS"]
  },
  {
    "name": "FPV",
    "slug": "fpv",
    "image": {
      "source": "https://www.carlogos.org/logo/FPV-logo-640x240.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/fpv.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/fpv.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/fpv.jpg",
      "localThumb": "./thumb/fpv.png",
      "localOptimized": "./optimized/fpv.png",
      "localOriginal": "./original/fpv.jpg"
    },
    "models": ["F6", "F6 E", "F6 E Limited Edition", "F6 E R-Spec", "F6 E R-Spec Limited Edition", "F6 E R-Spec Limited Edition Plus", "F6 E R-Spec Limited Edition Plus Plus", "F6 E R-Spec Limited Edition Plus Plus Plus", "F6 E R-Spec Limited Edition Plus Plus Plus Plus", "F6 E R-Spec Limited Edition Plus Plus Plus Plus Plus", "F6 E R-Spec Limited Edition Plus Plus Plus Plus Plus Plus", "F6 E R-Spec Limited Edition Plus Plus Plus Plus Plus Plus Plus", "F6 E R-Spec Limited Edition Plus Plus Plus Plus Plus Plus Plus Plus"]
  },
  {
    "name": "Franklin",
    "slug": "franklin",
    "image": {
      "source": "https://www.carlogos.org/logo/Franklin-logo-640x525.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/franklin.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/franklin.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/franklin.jpg",
      "localThumb": "./thumb/franklin.png",
      "localOptimized": "./optimized/franklin.png",
      "localOriginal": "./original/franklin.jpg"
    },
    "models": ["Airman", "Series 10", "Series 11", "Series 12", "Series 13", "Series 14", "Series 15", "Series 16", "Series 17", "Series 18", "Series 19", "Series 20", "Series 21", "Series 22", "Series 23", "Series 24", "Series 25", "Series 26", "Series 27", "Series 28", "Series 29", "Series 30", "Series 31", "Series 32", "Series 33", "Series 34", "Series 35", "Series 36", "Series 37", "Series 38", "Series 39", "Series 40", "Series 41", "Series 42", "Series 43", "Series 44", "Series 45", "Series 46", "Series 47", "Series 48", "Series 49", "Series 50", "Series 51", "Series 52", "Series 53", "Series 54", "Series 55", "Series 56", "Series 57", "Series 58", "Series 59", "Series 60", "Series 61", "Series 62", "Series 63", "Series 64", "Series 65", "Series 66", "Series 67", "Series 68", "Series 69", "Series 70", "Series 71", "Series 72", "Series 73", "Series 74", "Series 75", "Series 76", "Series 77", "Series 78", "Series 79", "Series 80", "Series 81", "Series 82", "Series 83", "Series 84", "Series 85", "Series 86", "Series 87", "Series 88", "Series 89", "Series 90", "Series 91", "Series 92", "Series 93", "Series 94", "Series 95", "Series 96", "Series 97", "Series 98", "Series 99", "Series 100", "Series 101", "Series 102", "Series 103", "Series 104", "Series 105", "Series 106", "Series 107"]
  },
  {
    "name": "Freightliner",
    "slug": "freightliner",
    "image": {
      "source": "https://www.carlogos.org/logo/Freightliner-logo-640x124.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/freightliner.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/freightliner.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/freightliner.jpg",
      "localThumb": "./thumb/freightliner.png",
      "localOptimized": "./optimized/freightliner.png",
      "localOriginal": "./original/freightliner.jpg"
    },
    "models": []
  },
  {
    "name": "FSO",
    "slug": "fso",
    "image": {
      "source": "https://www.carlogos.org/car-logos/fso-logo-1200x500-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/fso.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/fso.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/fso.png",
      "localThumb": "./thumb/fso.png",
      "localOptimized": "./optimized/fso.png",
      "localOriginal": "./original/fso.png"
    },
    "models": ["125p", "126p", "127p", "128p", "1300", "1500", "Caro", "Polonez", "Polonez Atu", "Polonez Atu Plus", "Polonez Atu Turbo", "Polonez Atu Turbo Plus", "Polonez Atu Turbo S", "Polonez Atu Turbo S Plus", "Polonez Atu Turbo S Plus Plus", "Polonez Atu Turbo S Plus Plus Plus", "Polonez Atu Turbo S Plus Plus Plus Plus", "Polonez Atu Turbo S Plus Plus Plus Plus Plus", "Polonez Atu Turbo S Plus Plus Plus Plus Plus Plus", "Polonez Atu Turbo S Plus Plus Plus Plus Plus Plus Plus", "Polonez Atu Turbo S Plus Plus Plus Plus Plus Plus Plus Plus", "Polonez Atu Turbo S Plus Plus Plus Plus Plus Plus Plus Plus Plus"]
  },
  {
    "name": "GAC Group",
    "slug": "gac-group",
    "image": {
      "source": "https://www.carlogos.org/logo/GAC-Group-logo-640x125.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gac-group.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gac-group.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gac-group.jpg",
      "localThumb": "./thumb/gac-group.png",
      "localOptimized": "./optimized/gac-group.png",
      "localOriginal": "./original/gac-group.jpg"
    },
    "models": ["Trumpchi", "Aion", "Aion S", "Aion V", "Aion LX", "Aion Y", "Aion E", "Aion L", "Aion K", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E", "Aion C", "Aion X", "Aion Y", "Aion V", "Aion S", "Aion LX", "Aion K", "Aion L", "Aion E"]
  },
  {
    "name": "Gardner Douglas",
    "slug": "gardner-douglas",
    "image": {
      "source": "https://www.carlogos.org/logo/Gardner-Douglas-logo-640x269.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gardner-douglas.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gardner-douglas.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gardner-douglas.jpg",
      "localThumb": "./thumb/gardner-douglas.png",
      "localOptimized": "./optimized/gardner-douglas.png",
      "localOriginal": "./original/gardner-douglas.jpg"
    },
    "models": ["GD T70", "GD T70 Spyder", "GD T70 Spyder 2", "GD T70 Spyder 2 R", "GD T70 Spyder 2 R 2", "GD T70 Spyder 2 R 2 R", "GD T70 Spyder 2 R 2 R 2"]
  },
  {
    "name": "GAZ",
    "slug": "gaz",
    "image": {
      "source": "https://www.carlogos.org/logo/GAZ-logo-2015-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gaz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gaz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gaz.jpg",
      "localThumb": "./thumb/gaz.png",
      "localOptimized": "./optimized/gaz.png",
      "localOriginal": "./original/gaz.jpg"
    },
    "models": ["3102", "3110", "31105", "3111", "31105", "31105 Volga", "31105 Volga Kombi", "31105 Volga Van", "31105 Volga Van 350", "31105 Volga Van 350 Kombi", "31105 Volga Van 350 Kombi 350", "31105 Volga Van 350 Kombi 350 Kombi", "31105 Volga Van 350 Kombi 350 Kombi 350", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350 Kombi", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350 Kombi", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350 Kombi", "31105 Volga Van 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350 Kombi 350"]
  },
  {
    "name": "Geely",
    "slug": "geely",
    "image": {
      "source": "https://www.carlogos.org/logo/Geely-logo-2014-640x370.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/geely.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/geely.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/geely.jpg",
      "localThumb": "./thumb/geely.png",
      "localOptimized": "./optimized/geely.png",
      "localOriginal": "./original/geely.jpg"
    },
    "models": ["Atlas", "Bo Rui", "Boyue", "CK", "Emgrand", "Emgrand 7", "Emgrand 7 EV", "Emgrand 8", "Emgrand GS", "Emgrand GT", "Emgrand X7", "Emgrand X7 Sport", "Emgrand X9", "GC2", "GC5", "GC6", "GC7", "GC9", "GS", "GT", "Jingang", "Jingang SC7", "Jingang SC7-RV", "Jingang SC7-RV Plus", "Jingang SC7-RV Pro"]
  },
  {
    "name": "General Motors",
    "slug": "general-motors",
    "image": {
      "source": "https://www.carlogos.org/logo/General-Motors-logo-2010-3300x3300.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/general-motors.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/general-motors.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/general-motors.png",
      "localThumb": "./thumb/general-motors.png",
      "localOptimized": "./optimized/general-motors.png",
      "localOriginal": "./original/general-motors.png"
    },
    "models": ["Buick", "Cadillac", "Chevrolet", "GMC", "Holden", "Hummer", "Opel", "Pontiac", "Saturn", "Vauxhall"]
  },
  {
    "name": "Genesis",
    "slug": "genesis",
    "image": {
      "source": "https://www.carlogos.org/logo/Genesis-logo-640x248.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/genesis.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/genesis.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/genesis.jpg",
      "localThumb": "./thumb/genesis.png",
      "localOptimized": "./optimized/genesis.png",
      "localOriginal": "./original/genesis.jpg"
    },
    "models": ["G70", "G80", "G90"]
  },
  {
    "name": "Geo",
    "slug": "geo",
    "image": {
      "source": "https://www.carlogos.org/logo/Geo-logo-640x172.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/geo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/geo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/geo.jpg",
      "localThumb": "./thumb/geo.png",
      "localOptimized": "./optimized/geo.png",
      "localOriginal": "./original/geo.jpg"
    },
    "models": ["Metro", "Prizm", "Spectrum", "Storm", "Tracker"]
  },
  {
    "name": "Geometry",
    "slug": "geometry",
    "image": {
      "source": "https://www.carlogos.org/car-logos/geometry-logo-640x480.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/geometry.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/geometry.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/geometry.png",
      "localThumb": "./thumb/geometry.png",
      "localOptimized": "./optimized/geometry.png",
      "localOriginal": "./original/geometry.png"
    },
    "models": ["A", "C", "X"]
  },
  {
    "name": "Gilbern",
    "slug": "gilbern",
    "image": {
      "source": "https://www.carlogos.org/logo/Gilbern-logo-640x480.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gilbern.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gilbern.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gilbern.png",
      "localThumb": "./thumb/gilbern.png",
      "localOptimized": "./optimized/gilbern.png",
      "localOriginal": "./original/gilbern.png"
    },
    "models": ["Genie", "Invader"]
  },
  {
    "name": "Gillet",
    "slug": "gillet",
    "image": {
      "source": "https://www.carlogos.org/logo/Gillet-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gillet.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gillet.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gillet.png",
      "localThumb": "./thumb/gillet.png",
      "localOptimized": "./optimized/gillet.png",
      "localOriginal": "./original/gillet.png"
    }
  },
  {
    "name": "Ginetta",
    "slug": "ginetta",
    "image": {
      "source": "https://www.carlogos.org/logo/Ginetta-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ginetta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ginetta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ginetta.jpg",
      "localThumb": "./thumb/ginetta.png",
      "localOptimized": "./optimized/ginetta.png",
      "localOriginal": "./original/ginetta.jpg"
    },
    "models": ["Akula", "G40", "G50", "G55", "G60", "G4", "G12", "G20", "G26", "G27", "G28", "G30", "G32", "G33", "G34", "G36", "G40R", "G50R", "G55R", "G60R", "G61", "G4R", "G12R", "G20R", "G26R", "G27R", "G28R", "G30R", "G32R", "G33R", "G34R", "G36R", "G40RX", "G50RX", "G55RX", "G60RX", "G61RX", "G4RX", "G12RX", "G20RX", "G26RX", "G27RX", "G28RX", "G30RX", "G32RX", "G33RX", "G34RX", "G36RX", "G40RXS", "G50RXS", "G55RXS", "G60RXS", "G61RXS", "G4RXS", "G12RXS", "G20RXS", "G26RXS", "G27RXS", "G28RXS", "G30RXS", "G32RXS", "G33RXS", "G34RXS", "G36RXS", "G40RXC", "G50RXC", "G55RXC", "G60RXC", "G61RXC", "G4RXC", "G12RXC", "G20RXC", "G26RXC", "G27RXC", "G28RXC", "G30RXC", "G32RXC", "G33RXC", "G34RXC", "G36RXC", "G40RXCS", "G50RXCS", "G55RXCS", "G60RXCS", "G61RXCS", "G4RXCS", "G12RXCS", "G20RXCS", "G26RXCS", "G27RXCS", "G28RXCS", "G30RXCS", "G32RXCS"]
  },
  {
    "name": "GMC",
    "slug": "gmc",
    "image": {
      "source": "https://www.carlogos.org/logo/GMC-logo-640x145.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gmc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gmc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gmc.jpg",
      "localThumb": "./thumb/gmc.png",
      "localOptimized": "./optimized/gmc.png",
      "localOriginal": "./original/gmc.jpg"
    },
    "models": ["Acadia", "Canyon", "Envoy", "Jimmy", "Safari", "Savana", "Sierra", "Sonoma", "Suburban", "Terrain", "Typhoon", "Yukon"]
  },
  {
    "name": "Golden Dragon",
    "slug": "golden-dragon",
    "image": {
      "source": "https://www.carlogos.org/car-logos/golden-dragon-logo-900x700-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/golden-dragon.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/golden-dragon.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/golden-dragon.png",
      "localThumb": "./thumb/golden-dragon.png",
      "localOptimized": "./optimized/golden-dragon.png",
      "localOriginal": "./original/golden-dragon.png"
    }
  },
  {
    "name": "Gonow",
    "slug": "gonow",
    "image": {
      "source": "https://www.carlogos.org/logo/Gonow-logo-2010-640x135.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gonow.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gonow.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gonow.jpg",
      "localThumb": "./thumb/gonow.png",
      "localOptimized": "./optimized/gonow.png",
      "localOriginal": "./original/gonow.jpg"
    }
  },
  {
    "name": "Great Wall",
    "slug": "great-wall",
    "image": {
      "source": "https://www.carlogos.org/logo/Great-Wall-logo-2007-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/great-wall.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/great-wall.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/great-wall.jpg",
      "localThumb": "./thumb/great-wall.png",
      "localOptimized": "./optimized/great-wall.png",
      "localOriginal": "./original/great-wall.jpg"
    }
  },
  {
    "name": "Grinnall",
    "slug": "grinnall",
    "image": {
      "source": "https://www.carlogos.org/logo/Grinnall-cars-logo-640x309.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/grinnall.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/grinnall.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/grinnall.jpg",
      "localThumb": "./thumb/grinnall.png",
      "localOptimized": "./optimized/grinnall.png",
      "localOriginal": "./original/grinnall.jpg"
    }
  },
  {
    "name": "Gumpert",
    "slug": "gumpert",
    "image": {
      "source": "https://www.carlogos.org/logo/Gumpert-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/gumpert.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/gumpert.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/gumpert.jpg",
      "localThumb": "./thumb/gumpert.png",
      "localOptimized": "./optimized/gumpert.png",
      "localOriginal": "./original/gumpert.jpg"
    }
  },
  {
    "name": "Hafei",
    "slug": "hafei",
    "image": {
      "source": "https://www.carlogos.org/logo/Hafei-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hafei.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hafei.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hafei.jpg",
      "localThumb": "./thumb/hafei.png",
      "localOptimized": "./optimized/hafei.png",
      "localOriginal": "./original/hafei.jpg"
    }
  },
  {
    "name": "Haima",
    "slug": "haima",
    "image": {
      "source": "https://www.carlogos.org/logo/Haima-logo-640x432.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/haima.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/haima.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/haima.jpg",
      "localThumb": "./thumb/haima.png",
      "localOptimized": "./optimized/haima.png",
      "localOriginal": "./original/haima.jpg"
    }
  },
  {
    "name": "Haval",
    "slug": "haval",
    "image": {
      "source": "https://www.carlogos.org/logo/Haval-logo-640x112.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/haval.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/haval.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/haval.jpg",
      "localThumb": "./thumb/haval.png",
      "localOptimized": "./optimized/haval.png",
      "localOriginal": "./original/haval.jpg"
    }
  },
  {
    "name": "Hawtai",
    "slug": "hawtai",
    "image": {
      "source": "https://www.carlogos.org/logo/Hawtai-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hawtai.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hawtai.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hawtai.jpg",
      "localThumb": "./thumb/hawtai.png",
      "localOptimized": "./optimized/hawtai.png",
      "localOriginal": "./original/hawtai.jpg"
    }
  },
  {
    "name": "Hennessey",
    "slug": "hennessey",
    "image": {
      "source": "https://www.carlogos.org/logo/Hennessey-text-logo-1186x130.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hennessey.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hennessey.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hennessey.png",
      "localThumb": "./thumb/hennessey.png",
      "localOptimized": "./optimized/hennessey.png",
      "localOriginal": "./original/hennessey.png"
    },
    "models": ["Venom F5"]
  },
  {
    "name": "Higer",
    "slug": "higer",
    "image": {
      "source": "https://www.carlogos.org/car-logos/higer-logo-800x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/higer.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/higer.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/higer.png",
      "localThumb": "./thumb/higer.png",
      "localOptimized": "./optimized/higer.png",
      "localOriginal": "./original/higer.png"
    }
  },
  {
    "name": "Hillman",
    "slug": "hillman",
    "image": {
      "source": "https://www.carlogos.org/logo/Hillman-logo-640x145.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hillman.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hillman.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hillman.jpg",
      "localThumb": "./thumb/hillman.png",
      "localOptimized": "./optimized/hillman.png",
      "localOriginal": "./original/hillman.jpg"
    }
  },
  {
    "name": "Hindustan Motors",
    "slug": "hindustan-motors",
    "image": {
      "source": "https://www.carlogos.org/logo/Hindustan-Motors-logo-640x459.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hindustan-motors.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hindustan-motors.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hindustan-motors.jpg",
      "localThumb": "./thumb/hindustan-motors.png",
      "localOptimized": "./optimized/hindustan-motors.png",
      "localOriginal": "./original/hindustan-motors.jpg"
    }
  },
  {
    "name": "Hino",
    "slug": "hino",
    "image": {
      "source": "https://www.carlogos.org/logo/Hino-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hino.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hino.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hino.jpg",
      "localThumb": "./thumb/hino.png",
      "localOptimized": "./optimized/hino.png",
      "localOriginal": "./original/hino.jpg"
    },
    "models": ["Dutro", "Poncho", "Profia", "Ranger", "Ranger Pro", "Ranger Pro Hybrid", "Ranger Pro Hybrid EV", "Ranger Pro Hybrid EV 4WD", "Ranger Pro Hybrid EV 4WD 2.0", "Ranger Pro Hybrid EV 4WD 3.0", "Ranger Pro Hybrid EV 4WD 4.0", "Ranger Pro Hybrid EV 4WD 5.0", "Ranger Pro Hybrid EV 4WD 6.0", "Ranger Pro Hybrid EV 4WD 7.0", "Ranger Pro Hybrid EV 4WD 8.0", "Ranger Pro Hybrid EV 4WD 9.0", "Ranger Pro Hybrid EV 4WD 10.0", "Ranger Pro Hybrid EV 4WD 11.0", "Ranger Pro Hybrid EV 4WD 12.0", "Ranger Pro Hybrid EV 4WD 13.0", "Ranger Pro Hybrid EV 4WD 14.0", "Ranger Pro Hybrid EV 4WD 15.0", "Ranger Pro Hybrid EV 4WD 16.0", "Ranger Pro Hybrid EV 4WD 17.0", "Ranger Pro Hybrid EV 4WD 18.0", "Ranger Pro Hybrid EV 4WD 19.0", "Ranger Pro Hybrid EV 4WD 20.0", "Ranger Pro Hybrid EV 4WD 21.0", "Ranger Pro Hybrid EV 4WD 22.0", "Ranger Pro Hybrid EV 4WD 23.0", "Ranger Pro Hybrid EV 4WD 24.0", "Ranger Pro Hybrid EV 4WD 25.0", "Ranger Pro Hybrid EV 4WD 26.0", "Ranger Pro Hybrid EV 4WD 27.0", "Ranger Pro Hybrid EV 4WD 28.0", "Ranger Pro Hybrid EV 4WD 29.0", "Ranger Pro Hybrid EV 4WD 30.0", "Ranger Pro Hybrid EV 4WD 31.0", "Ranger Pro Hybrid EV 4WD 32.0", "Ranger Pro Hybrid EV 4WD 33.0"]
  },
  {
    "name": "HiPhi",
    "slug": "hiphi",
    "image": {
      "source": "https://www.carlogos.org/car-logos/hiphi-logo-2100x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hiphi.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hiphi.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hiphi.png",
      "localThumb": "./thumb/hiphi.png",
      "localOptimized": "./optimized/hiphi.png",
      "localOriginal": "./original/hiphi.png"
    }
  },
  {
    "name": "Hispano-Suiza",
    "slug": "hispano-suiza",
    "image": {
      "source": "https://www.carlogos.org/logo/Hispano-Suiza-logo-640x183.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hispano-suiza.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hispano-suiza.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hispano-suiza.jpg",
      "localThumb": "./thumb/hispano-suiza.png",
      "localOptimized": "./optimized/hispano-suiza.png",
      "localOriginal": "./original/hispano-suiza.jpg"
    }
  },
  {
    "name": "Holden",
    "slug": "holden",
    "image": {
      "source": "https://www.carlogos.org/logo/Holden-logo-2016-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/holden.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/holden.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/holden.jpg",
      "localThumb": "./thumb/holden.png",
      "localOptimized": "./optimized/holden.png",
      "localOriginal": "./original/holden.jpg"
    }
  },
  {
    "name": "Hommell",
    "slug": "hommell",
    "image": {
      "source": "https://www.carlogos.org/logo/Hommell-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hommell.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hommell.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hommell.jpg",
      "localThumb": "./thumb/hommell.png",
      "localOptimized": "./optimized/hommell.png",
      "localOriginal": "./original/hommell.jpg"
    }
  },
  {
    "name": "Honda",
    "slug": "honda",
    "description": "Honda is a Japanese multinational corporation founded in 1948, primarily known for its automobiles and motorcycles. Honda vehicles are celebrated for their reliability, fuel efficiency, and quality engineering. The brand has a significant presence in Kenya, particularly with models like the CR-V and Fit/Jazz.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 5,
    "image": {
      "source": "https://www.carlogos.org/car-logos/honda-logo-2000-full-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/honda.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/honda.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/honda.png",
      "localThumb": "./thumb/honda.png",
      "localOptimized": "./optimized/honda.png",
      "localOriginal": "./original/honda.png"
    },
    "models": ["Accord", "Amaze", "Brio", "City", "Civic", "Civic Type R", "CR-V", "CR-Z", "Crossroad", "Element", "Fit", "Freed", "Grace", "HR-V", "Insight", "Jade", "Jazz", "Legend", "N-Box", "NSX", "Odyssey", "Passport", "Pilot", "Ridgeline", "S2000", "Shuttle", "Step WGN", "Stream", "Vezel"]
  },
  {
    "name": "Hongqi",
    "slug": "hongqi",
    "image": {
      "source": "https://www.carlogos.org/car-logos/hongqi-logo-2018-800x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hongqi.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hongqi.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hongqi.png",
      "localThumb": "./thumb/hongqi.png",
      "localOptimized": "./optimized/hongqi.png",
      "localOriginal": "./original/hongqi.png"
    }
  },
  {
    "name": "Hongyan",
    "slug": "hongyan",
    "image": {
      "source": "https://www.carlogos.org/car-logos/hongyan-logo-1200x1200-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hongyan.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hongyan.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hongyan.png",
      "localThumb": "./thumb/hongyan.png",
      "localOptimized": "./optimized/hongyan.png",
      "localOriginal": "./original/hongyan.png"
    }
  },
  {
    "name": "Horch",
    "slug": "horch",
    "image": {
      "source": "https://www.carlogos.org/logo/Horch-logo-black-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/horch.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/horch.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/horch.jpg",
      "localThumb": "./thumb/horch.png",
      "localOptimized": "./optimized/horch.png",
      "localOriginal": "./original/horch.jpg"
    }
  },
  {
    "name": "HSV",
    "slug": "hsv",
    "image": {
      "source": "https://www.carlogos.org/logo/HSV-logo-640x207.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hsv.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hsv.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hsv.jpg",
      "localThumb": "./thumb/hsv.png",
      "localOptimized": "./optimized/hsv.png",
      "localOriginal": "./original/hsv.jpg"
    }
  },
  {
    "name": "Hudson",
    "slug": "hudson",
    "image": {
      "source": "https://www.carlogos.org/logo/Hudson-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hudson.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hudson.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hudson.jpg",
      "localThumb": "./thumb/hudson.png",
      "localOptimized": "./optimized/hudson.png",
      "localOriginal": "./original/hudson.jpg"
    }
  },
  {
    "name": "Hummer",
    "slug": "hummer",
    "image": {
      "source": "https://www.carlogos.org/logo/Hummer-logo-2000x205.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hummer.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hummer.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hummer.png",
      "localThumb": "./thumb/hummer.png",
      "localOptimized": "./optimized/hummer.png",
      "localOriginal": "./original/hummer.png"
    },
    "models": ["H1", "H2", "H3"]
  },
  {
    "name": "Hupmobile",
    "slug": "hupmobile",
    "image": {
      "source": "https://www.carlogos.org/logo/Hupmobile-logo-640x138.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hupmobile.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hupmobile.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hupmobile.jpg",
      "localThumb": "./thumb/hupmobile.png",
      "localOptimized": "./optimized/hupmobile.png",
      "localOriginal": "./original/hupmobile.jpg"
    }
  },
  {
    "name": "Hyundai",
    "slug": "hyundai",
    "description": "Hyundai Motor Company is a South Korean multinational automotive manufacturer founded in 1967. Known for producing reliable, affordable vehicles with good warranty coverage, Hyundai has grown to become one of the world's largest automakers. In Kenya, Hyundai has a strong presence with popular models like the Tucson, Elantra, and Grand i10.",
    "country": "South Korea",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 11,
    "image": {
      "source": "https://www.carlogos.org/car-logos/hyundai-logo-2011-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hyundai.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/hyundai.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/hyundai.jpg",
      "localThumb": "./thumb/hyundai.png",
      "localOptimized": "./optimized/hyundai.png",
      "localOriginal": "./original/hyundai.jpg"
    },
    "models": ["Accent", "Alcazar", "Aura", "Azera", "Bayon", "Creta", "Elantra", "Eon", "Equus", "Genesis", "Genesis Coupe", "Grand i10", "Grand i10 Nios", "H-1", "H100", "i10", "i20", "i20 Active", "i20 N", "i30", "i30 N", "i40", "Ioniq", "Ioniq 5", "Ioniq 6", "ix20", "ix25", "ix35", "Kona", "Kona Electric", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Staria", "Tucson", "Venue", "Verna", "Xcent"]
  },
  {
    "name": "IC Bus",
    "slug": "ic-bus",
    "image": {
      "source": "https://www.carlogos.org/logo/IC-Bus-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ic-bus.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ic-bus.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ic-bus.jpg",
      "localThumb": "./thumb/ic-bus.png",
      "localOptimized": "./optimized/ic-bus.png",
      "localOriginal": "./original/ic-bus.jpg"
    }
  },
  {
    "name": "IH",
    "slug": "ih",
    "image": {
      "source": "https://www.carlogos.org/logo/International-Harvester-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ih.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ih.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ih.jpg",
      "localThumb": "./thumb/ih.png",
      "localOptimized": "./optimized/ih.png",
      "localOriginal": "./original/ih.jpg"
    }
  },
  {
    "name": "IKCO",
    "slug": "ikco",
    "image": {
      "source": "https://www.carlogos.org/logo/Iran-Khodro-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ikco.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ikco.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ikco.jpg",
      "localThumb": "./thumb/ikco.png",
      "localOptimized": "./optimized/ikco.png",
      "localOriginal": "./original/ikco.jpg"
    }
  },
  {
    "name": "Infiniti",
    "slug": "infiniti",
    "image": {
      "source": "https://www.carlogos.org/logo/Infiniti-logo-1989-640x308.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/infiniti.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/infiniti.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/infiniti.jpg",
      "localThumb": "./thumb/infiniti.png",
      "localOptimized": "./optimized/infiniti.png",
      "localOriginal": "./original/infiniti.jpg"
    },
    "models": ["EX", "FX", "G", "G Coupé", "M", "Q", "QX"]
  },
  {
    "name": "Innocenti",
    "slug": "innocenti",
    "image": {
      "source": "https://www.carlogos.org/logo/Innocenti-logo-310x310.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/innocenti.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/innocenti.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/innocenti.png",
      "localThumb": "./thumb/innocenti.png",
      "localOptimized": "./optimized/innocenti.png",
      "localOriginal": "./original/innocenti.png"
    }
  },
  {
    "name": "Intermeccanica",
    "slug": "intermeccanica",
    "image": {
      "source": "https://www.carlogos.org/logo/Intermeccanica-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/intermeccanica.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/intermeccanica.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/intermeccanica.png",
      "localThumb": "./thumb/intermeccanica.png",
      "localOptimized": "./optimized/intermeccanica.png",
      "localOriginal": "./original/intermeccanica.png"
    }
  },
  {
    "name": "International",
    "slug": "international",
    "image": {
      "source": "https://www.carlogos.org/logo/International-Trucks-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/international.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/international.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/international.jpg",
      "localThumb": "./thumb/international.png",
      "localOptimized": "./optimized/international.png",
      "localOriginal": "./original/international.jpg"
    }
  },
  {
    "name": "Irizar",
    "slug": "irizar",
    "image": {
      "source": "https://www.carlogos.org/logo/Irizar-logo-640x189.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/irizar.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/irizar.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/irizar.jpg",
      "localThumb": "./thumb/irizar.png",
      "localOptimized": "./optimized/irizar.png",
      "localOriginal": "./original/irizar.jpg"
    }
  },
  {
    "name": "Isdera",
    "slug": "isdera",
    "image": {
      "source": "https://www.carlogos.org/logo/Isdera-logo-640x413.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/isdera.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/isdera.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/isdera.jpg",
      "localThumb": "./thumb/isdera.png",
      "localOptimized": "./optimized/isdera.png",
      "localOriginal": "./original/isdera.jpg"
    }
  },
  {
    "name": "Iso",
    "slug": "iso",
    "image": {
      "source": "https://www.carlogos.org/logo/Iso-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/iso.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/iso.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/iso.jpg",
      "localThumb": "./thumb/iso.png",
      "localOptimized": "./optimized/iso.png",
      "localOriginal": "./original/iso.jpg"
    }
  },
  {
    "name": "Isuzu",
    "slug": "isuzu",
    "description": "Isuzu Motors Ltd. is a Japanese commercial vehicle and diesel engine manufacturing company founded in 1916. Specializing in trucks, buses, and SUVs, Isuzu is renowned for producing durable, reliable diesel-powered vehicles. In Kenya, Isuzu has a strong presence with locally assembled trucks, buses, and the popular D-Max pickup trucks.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 6,
    "image": {
      "source": "https://www.carlogos.org/logo/Isuzu-logo-1991-640x106.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/isuzu.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/isuzu.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/isuzu.jpg",
      "localThumb": "./thumb/isuzu.png",
      "localOptimized": "./optimized/isuzu.png",
      "localOriginal": "./original/isuzu.jpg"
    },
    "models": ["Alterra", "Ascender", "Axiom", "D-Max", "Elf", "F-Series", "Forward", "FTR", "Giga", "Grafter", "i-Series", "Jawira", "Journey", "Midi", "MU-X", "N-Series", "NHR", "NKR", "NLR", "NMR", "NPR", "NPS", "NQR", "Panther", "Rodeo", "TF", "TFR", "Trooper", "VehiCROSS"]
  },
  {
    "name": "Iveco",
    "slug": "iveco",
    "image": {
      "source": "https://www.carlogos.org/logo/Iveco-logo-silver-640x122.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/iveco.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/iveco.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/iveco.jpg",
      "localThumb": "./thumb/iveco.png",
      "localOptimized": "./optimized/iveco.png",
      "localOriginal": "./original/iveco.jpg"
    },
    "models": ["Daily", "Eurocargo", "Stralis", "Trakker"]
  },
  {
    "name": "JAC",
    "slug": "jac",
    "image": {
      "source": "https://www.carlogos.org/logo/JAC-Motors-logo-2016-640x244.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jac.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jac.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jac.jpg",
      "localThumb": "./thumb/jac.png",
      "localOptimized": "./optimized/jac.png",
      "localOriginal": "./original/jac.jpg"
    }
  },
  {
    "name": "Jaguar",
    "slug": "jaguar",
    "description": "Jaguar is a British luxury vehicle brand founded in 1922, now part of Jaguar Land Rover. Known for elegant styling, powerful performance, and British craftsmanship, Jaguar produces luxury sedans, sports cars, and SUVs. In Kenya, Jaguar is recognized as a prestigious luxury brand, with the F-Pace SUV and XF sedan among its most visible models.",
    "country": "United Kingdom",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 17,
    "image": {
      "source": "https://www.carlogos.org/car-logos/jaguar-logo-2021-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jaguar.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jaguar.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jaguar.jpg",
      "localThumb": "./thumb/jaguar.png",
      "localOptimized": "./optimized/jaguar.png",
      "localOriginal": "./original/jaguar.jpg"
    },
    "models": ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF", "XF Sportbrake", "XJ", "XJ Long Wheelbase", "XK", "S-Type", "X-Type", "X-Type Estate", "Mark 2", "D-Type", "E-Type", "Project 7", "Project 8"]
  },
  {
    "name": "Jawa",
    "slug": "jawa",
    "image": {
      "source": "https://www.carlogos.org/logo/Jawa-logo-640x333.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jawa.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jawa.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jawa.jpg",
      "localThumb": "./thumb/jawa.png",
      "localOptimized": "./optimized/jawa.png",
      "localOriginal": "./original/jawa.jpg"
    }
  },
  {
    "name": "JBA Motors",
    "slug": "jba-motors",
    "image": {
      "source": "https://www.carlogos.org/logo/JBA-Motors-logo-640x205.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jba-motors.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jba-motors.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jba-motors.jpg",
      "localThumb": "./thumb/jba-motors.png",
      "localOptimized": "./optimized/jba-motors.png",
      "localOriginal": "./original/jba-motors.jpg"
    }
  },
  {
    "name": "Jeep",
    "slug": "jeep",
    "description": "Jeep is an American automobile marque owned by Stellantis, originating during World War II in 1941. Renowned globally for rugged off-road vehicles and SUVs, Jeep is synonymous with adventure and outdoor capability. In Kenya, Jeep vehicles are appreciated for their off-road prowess, with the Wrangler and Grand Cherokee being the most recognized models.",
    "country": "United States",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 19,
    "image": {
      "source": "https://www.carlogos.org/car-logos/jeep-logo-1993-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jeep.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jeep.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jeep.jpg",
      "localThumb": "./thumb/jeep.png",
      "localOptimized": "./optimized/jeep.png",
      "localOriginal": "./original/jeep.jpg"
    },
    "models": ["Avenger", "Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Grand Cherokee L", "Grand Cherokee 4xe", "Grand Wagoneer", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler", "Wrangler 4xe", "Wrangler Unlimited"]
  },
  {
    "name": "Jensen",
    "slug": "jensen",
    "image": {
      "source": "https://www.carlogos.org/logo/Jensen-logo-640x556.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jensen.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jensen.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jensen.jpg",
      "localThumb": "./thumb/jensen.png",
      "localOptimized": "./optimized/jensen.png",
      "localOriginal": "./original/jensen.jpg"
    }
  },
  {
    "name": "Jetta",
    "slug": "jetta",
    "image": {
      "source": "https://www.carlogos.org/car-logos/jetta-logo-2019-1300x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jetta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jetta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jetta.png",
      "localThumb": "./thumb/jetta.png",
      "localOptimized": "./optimized/jetta.png",
      "localOriginal": "./original/jetta.png"
    }
  },
  {
    "name": "JMC",
    "slug": "jmc",
    "image": {
      "source": "https://www.carlogos.org/logo/Jiangling-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jmc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/jmc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/jmc.jpg",
      "localThumb": "./thumb/jmc.png",
      "localOptimized": "./optimized/jmc.png",
      "localOriginal": "./original/jmc.jpg"
    }
  },
  {
    "name": "Kaiser",
    "slug": "kaiser",
    "image": {
      "source": "https://www.carlogos.org/logo/Kaiser-logo-640x346.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/kaiser.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/kaiser.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/kaiser.jpg",
      "localThumb": "./thumb/kaiser.png",
      "localOptimized": "./optimized/kaiser.png",
      "localOriginal": "./original/kaiser.jpg"
    }
  },
  {
    "name": "Kamaz",
    "slug": "kamaz",
    "image": {
      "source": "https://www.carlogos.org/logo/Kamaz-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/kamaz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/kamaz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/kamaz.jpg",
      "localThumb": "./thumb/kamaz.png",
      "localOptimized": "./optimized/kamaz.png",
      "localOriginal": "./original/kamaz.jpg"
    },
    "models": ["5320", "5410", "5490", "6520", "65201", "6522", "65221", "65225", "65228", "6522M", "6522M2", "6522M3", "6522M5", "6522M6", "6522M7", "6522M8", "6522M9", "6522M10", "6522M11", "6522M12", "6522M13", "6522M14", "6522M15", "6522M16", "6522M17", "6522M18", "6522M19", "6522M20", "6522M21", "6522M22", "6522M23", "6522M24", "6522M25", "6522M26", "6522M27", "6522M28", "6522M29", "6522M30", "6522M31", "6522M32", "6522M33", "6522M34", "6522M35", "6522M36", "6522M37", "6522M38", "6522M39", "6522M40", "6522M41", "6522M42", "6522M43", "6522M44", "6522M45", "6522M46", "6522M47", "6522M48", "6522M49", "6522M50", "6522M51", "6522M52", "6522M53", "6522M54", "6522M55", "6522M56", "6522M57", "6522M58", "6522M59", "6522M60", "6522M61", "6522M62", "6522M63", "6522M64", "6522M65", "6522M66", "6522M67", "6522M68", "6522M69", "6522M70", "6522M71", "6522M72", "6522M73", "6522M74", "6522M75", "6522M76", "6522M77"]
  },
  {
    "name": "Karlmann King",
    "slug": "karlmann-king",
    "image": {
      "source": "https://www.carlogos.org/car-logos/karlmann-king-1400x1000-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/karlmann-king.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/karlmann-king.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/karlmann-king.png",
      "localThumb": "./thumb/karlmann-king.png",
      "localOptimized": "./optimized/karlmann-king.png",
      "localOriginal": "./original/karlmann-king.png"
    }
  },
  {
    "name": "Karma",
    "slug": "karma",
    "image": {
      "source": "https://www.carlogos.org/logo/Karma-logo-640x400.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/karma.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/karma.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/karma.jpg",
      "localThumb": "./thumb/karma.png",
      "localOptimized": "./optimized/karma.png",
      "localOriginal": "./original/karma.jpg"
    }
  },
  {
    "name": "Keating",
    "slug": "keating",
    "image": {
      "source": "https://www.carlogos.org/logo/Keating-Supercars-logo-640x300.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/keating.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/keating.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/keating.jpg",
      "localThumb": "./thumb/keating.png",
      "localOptimized": "./optimized/keating.png",
      "localOriginal": "./original/keating.jpg"
    }
  },
  {
    "name": "Kenworth",
    "slug": "kenworth",
    "image": {
      "source": "https://www.carlogos.org/logo/Kenworth-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/kenworth.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/kenworth.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/kenworth.jpg",
      "localThumb": "./thumb/kenworth.png",
      "localOptimized": "./optimized/kenworth.png",
      "localOriginal": "./original/kenworth.jpg"
    }
  },
  {
    "name": "Kia",
    "slug": "kia",
    "description": "Kia Corporation is a South Korean multinational automotive manufacturer founded in 1944. Part of the Hyundai Motor Group, Kia has transformed from a budget brand to a design-led mainstream automaker offering attractive styling, good value, and comprehensive warranties. In Kenya, Kia has gained popularity with models like the Sportage and Picanto.",
    "country": "South Korea",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 13,
    "image": {
      "source": "https://www.carlogos.org/logo/Kia-logo-640x321.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/kia.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/kia.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/kia.jpg",
      "localThumb": "./thumb/kia.png",
      "localOptimized": "./optimized/kia.png",
      "localOriginal": "./original/kia.jpg"
    },
    "models": ["Carens", "Carnival", "Ceed", "Cerato", "EV6", "EV9", "Forte", "K3", "K5", "K7", "K8", "K900", "Morning", "Niro", "Optima", "Pegas", "Picanto", "Pro_ceed", "Ray", "Rio", "Seltos", "Sonet", "Sorento", "Soul", "Sportage", "Stinger", "Stonic", "Telluride"]
  },
  {
    "name": "King Long",
    "slug": "king-long",
    "image": {
      "source": "https://www.carlogos.org/car-logos/king-long-logo-3900x800-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/king-long.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/king-long.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/king-long.png",
      "localThumb": "./thumb/king-long.png",
      "localOptimized": "./optimized/king-long.png",
      "localOriginal": "./original/king-long.png"
    }
  },
  {
    "name": "Koenigsegg",
    "slug": "koenigsegg",
    "image": {
      "source": "https://www.carlogos.org/logo/Koenigsegg-logo-1994-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/koenigsegg.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/koenigsegg.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/koenigsegg.jpg",
      "localThumb": "./thumb/koenigsegg.png",
      "localOptimized": "./optimized/koenigsegg.png",
      "localOriginal": "./original/koenigsegg.jpg"
    },
    "models": ["Agera", "CC", "CCX", "Gemera", "Jesko", "One:1", "Regera"]
  },
  {
    "name": "KTM",
    "slug": "ktm",
    "image": {
      "source": "https://www.carlogos.org/logo/KTM-logo-640x200.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ktm.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ktm.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ktm.jpg",
      "localThumb": "./thumb/ktm.png",
      "localOptimized": "./optimized/ktm.png",
      "localOriginal": "./original/ktm.jpg"
    }
  },
  {
    "name": "Lada",
    "slug": "lada",
    "image": {
      "source": "https://www.carlogos.org/logo/Lada-logo-silver-640x248.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lada.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lada.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lada.jpg",
      "localThumb": "./thumb/lada.png",
      "localOptimized": "./optimized/lada.png",
      "localOriginal": "./original/lada.jpg"
    }
  },
  {
    "name": "Lagonda",
    "slug": "lagonda",
    "image": {
      "source": "https://www.carlogos.org/logo/Lagonda-logo-2014-640x190.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lagonda.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lagonda.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lagonda.jpg",
      "localThumb": "./thumb/lagonda.png",
      "localOptimized": "./optimized/lagonda.png",
      "localOriginal": "./original/lagonda.jpg"
    }
  },
  {
    "name": "Lamborghini",
    "slug": "lamborghini",
    "image": {
      "source": "https://www.carlogos.org/car-logos/lamborghini-logo-1998-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lamborghini.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lamborghini.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lamborghini.png",
      "localThumb": "./thumb/lamborghini.png",
      "localOptimized": "./optimized/lamborghini.png",
      "localOriginal": "./original/lamborghini.png"
    },
    "models": ["Aventador", "Countach", "Diablo", "Gallardo", "Huracán", "Murciélago", "Reventón", "Urus", "Veneno"]
  },
  {
    "name": "Lancia",
    "slug": "lancia",
    "image": {
      "source": "https://www.carlogos.org/logo/Lancia-logo-2007-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lancia.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lancia.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lancia.jpg",
      "localThumb": "./thumb/lancia.png",
      "localOptimized": "./optimized/lancia.png",
      "localOriginal": "./original/lancia.jpg"
    }
  },
  {
    "name": "Land Rover",
    "slug": "land-rover",
    "description": "Land Rover is a British luxury automotive brand established in 1948, specializing in four-wheel-drive vehicles. Known for exceptional off-road capabilities combined with premium comfort and design, Land Rover is considered a high-status luxury brand in Kenya, particularly popular among business elites and in the safari tourism industry.",
    "country": "United Kingdom",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 8,
    "image": {
      "source": "https://www.carlogos.org/logo/Land-Rover-logo-2011-640x335.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/land-rover.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/land-rover.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/land-rover.jpg",
      "localThumb": "./thumb/land-rover.png",
      "localOptimized": "./optimized/land-rover.png",
      "localOriginal": "./original/land-rover.jpg"
    },
    "models": ["Defender", "Defender 90", "Defender 110", "Defender 130", "Discovery", "Discovery Sport", "Discovery Vision", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Evoque Convertible", "Range Rover Sport", "Range Rover Velar", "Range Rover SV", "Range Rover Sport SV", "Series I", "Series II", "Series III"]
  },
  {
    "name": "Landwind",
    "slug": "landwind",
    "image": {
      "source": "https://www.carlogos.org/logo/Landwind-logo-640x154.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/landwind.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/landwind.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/landwind.jpg",
      "localThumb": "./thumb/landwind.png",
      "localOptimized": "./optimized/landwind.png",
      "localOriginal": "./original/landwind.jpg"
    }
  },
  {
    "name": "Laraki",
    "slug": "laraki",
    "image": {
      "source": "https://www.carlogos.org/logo/Laraki-logo-640x273.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/laraki.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/laraki.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/laraki.jpg",
      "localThumb": "./thumb/laraki.png",
      "localOptimized": "./optimized/laraki.png",
      "localOriginal": "./original/laraki.jpg"
    }
  },
  {
    "name": "Leapmotor",
    "slug": "leapmotor",
    "image": {
      "source": "https://www.carlogos.org/car-logos/leapmotor-logo-1000x650-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/leapmotor.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/leapmotor.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/leapmotor.png",
      "localThumb": "./thumb/leapmotor.png",
      "localOptimized": "./optimized/leapmotor.png",
      "localOriginal": "./original/leapmotor.png"
    }
  },
  {
    "name": "LEVC",
    "slug": "levc",
    "image": {
      "source": "https://www.carlogos.org/logo/London-EV-Company-logo-640x299.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/levc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/levc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/levc.jpg",
      "localThumb": "./thumb/levc.png",
      "localOptimized": "./optimized/levc.png",
      "localOriginal": "./original/levc.jpg"
    }
  },
  {
    "name": "Lexus",
    "slug": "lexus",
    "description": "Lexus is the luxury vehicle division of Toyota, established in 1989. Known for exceptional build quality, reliability, and refined luxury, Lexus competes with European luxury brands by offering a blend of comfort, technology, and craftsmanship. In Kenya, Lexus is perceived as a premium luxury brand, with the LX and RX SUVs being particularly popular among affluent customers.",
    "country": "Japan",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 11,
    "image": {
      "source": "https://www.carlogos.org/logo/Lexus-logo-1988-640x266.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lexus.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lexus.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lexus.jpg",
      "localThumb": "./thumb/lexus.png",
      "localOptimized": "./optimized/lexus.png",
      "localOriginal": "./original/lexus.jpg"
    },
    "models": ["CT", "ES", "ES Hybrid", "GS", "GS F", "GS Hybrid", "GX", "IS", "IS F", "LC", "LC Convertible", "LC Hybrid", "LFA", "LS", "LS Hybrid", "LX", "NX", "NX Hybrid", "RC", "RC F", "RX", "RX Hybrid", "RX L", "RZ", "TX", "UX", "UX Hybrid"]
  },
  {
    "name": "Leyland",
    "slug": "leyland",
    "image": {
      "source": "https://www.carlogos.org/logo/Leyland-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/leyland.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/leyland.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/leyland.jpg",
      "localThumb": "./thumb/leyland.png",
      "localOptimized": "./optimized/leyland.png",
      "localOriginal": "./original/leyland.jpg"
    }
  },
  {
    "name": "Li Auto",
    "slug": "li-auto",
    "image": {
      "source": "https://www.carlogos.org/car-logos/lixiang-logo-1050x300-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/li-auto.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/li-auto.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/li-auto.png",
      "localThumb": "./thumb/li-auto.png",
      "localOptimized": "./optimized/li-auto.png",
      "localOriginal": "./original/li-auto.png"
    }
  },
  {
    "name": "Lifan",
    "slug": "lifan",
    "image": {
      "source": "https://www.carlogos.org/logo/Lifan-logo-640x116.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lifan.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lifan.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lifan.jpg",
      "localThumb": "./thumb/lifan.png",
      "localOptimized": "./optimized/lifan.png",
      "localOriginal": "./original/lifan.jpg"
    }
  },
  {
    "name": "Ligier",
    "slug": "ligier",
    "image": {
      "source": "https://www.carlogos.org/logo/Ligier-logo-640x392.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ligier.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ligier.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ligier.jpg",
      "localThumb": "./thumb/ligier.png",
      "localOptimized": "./optimized/ligier.png",
      "localOriginal": "./original/ligier.jpg"
    }
  },
  {
    "name": "Lincoln",
    "slug": "lincoln",
    "image": {
      "source": "https://www.carlogos.org/logo/Lincoln-logo-2019-640x222.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lincoln.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lincoln.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lincoln.jpg",
      "localThumb": "./thumb/lincoln.png",
      "localOptimized": "./optimized/lincoln.png",
      "localOriginal": "./original/lincoln.jpg"
    },
    "models": ["Aviator", "Continental", "Corsair", "MKC", "MKS", "MKT", "MKX", "MKZ", "Nautilus", "Navigator", "Town Car"]
  },
  {
    "name": "Lister",
    "slug": "lister",
    "image": {
      "source": "https://www.carlogos.org/logo/Lister-Cars-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lister.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lister.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lister.jpg",
      "localThumb": "./thumb/lister.png",
      "localOptimized": "./optimized/lister.png",
      "localOriginal": "./original/lister.jpg"
    }
  },
  {
    "name": "Lloyd",
    "slug": "lloyd",
    "image": {
      "source": "https://www.carlogos.org/logo/Lloyd-logo-640x458.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lloyd.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lloyd.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lloyd.jpg",
      "localThumb": "./thumb/lloyd.png",
      "localOptimized": "./optimized/lloyd.png",
      "localOriginal": "./original/lloyd.jpg"
    }
  },
  {
    "name": "Lobini",
    "slug": "lobini",
    "image": {
      "source": "https://www.carlogos.org/logo/Lobini-logo-640x304.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lobini.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lobini.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lobini.jpg",
      "localThumb": "./thumb/lobini.png",
      "localOptimized": "./optimized/lobini.png",
      "localOriginal": "./original/lobini.jpg"
    }
  },
  {
    "name": "Lordstown",
    "slug": "lordstown",
    "image": {
      "source": "https://www.carlogos.org/car-logos/lordstown-logo-2150x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lordstown.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lordstown.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lordstown.png",
      "localThumb": "./thumb/lordstown.png",
      "localOptimized": "./optimized/lordstown.png",
      "localOriginal": "./original/lordstown.png"
    }
  },
  {
    "name": "Lotus",
    "slug": "lotus",
    "image": {
      "source": "https://www.carlogos.org/logo/Lotus-logo-2019-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lotus.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lotus.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lotus.jpg",
      "localThumb": "./thumb/lotus.png",
      "localOptimized": "./optimized/lotus.png",
      "localOriginal": "./original/lotus.jpg"
    },
    "models": ["Elan", "Elise", "Esprit", "Evora", "Exige"]
  },
  {
    "name": "Lucid",
    "slug": "lucid",
    "image": {
      "source": "https://www.carlogos.org/logo/Lucid-Motors-logo-640x36.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lucid.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lucid.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lucid.jpg",
      "localThumb": "./thumb/lucid.png",
      "localOptimized": "./optimized/lucid.png",
      "localOriginal": "./original/lucid.jpg"
    }
  },
  {
    "name": "Luxgen",
    "slug": "luxgen",
    "image": {
      "source": "https://www.carlogos.org/logo/Luxgen-logo-2009-640x391.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/luxgen.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/luxgen.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/luxgen.jpg",
      "localThumb": "./thumb/luxgen.png",
      "localOptimized": "./optimized/luxgen.png",
      "localOriginal": "./original/luxgen.jpg"
    }
  },
  {
    "name": "Lynk & Co",
    "slug": "lynk-and-co",
    "image": {
      "source": "https://www.carlogos.org/car-logos/lynkco-logo-2150x400-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lynk-and-co.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/lynk-and-co.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/lynk-and-co.png",
      "localThumb": "./thumb/lynk-and-co.png",
      "localOptimized": "./optimized/lynk-and-co.png",
      "localOriginal": "./original/lynk-and-co.png"
    }
  },
  {
    "name": "Mack",
    "slug": "mack",
    "image": {
      "source": "https://www.carlogos.org/logo/Mack-logo-2014-640x314.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mack.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mack.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mack.jpg",
      "localThumb": "./thumb/mack.png",
      "localOptimized": "./optimized/mack.png",
      "localOriginal": "./original/mack.jpg"
    }
  },
  {
    "name": "Mahindra",
    "slug": "mahindra",
    "image": {
      "source": "https://www.carlogos.org/logo/Mahindra-logo-640x316.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mahindra.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mahindra.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mahindra.jpg",
      "localThumb": "./thumb/mahindra.png",
      "localOptimized": "./optimized/mahindra.png",
      "localOriginal": "./original/mahindra.jpg"
    }
  },
  {
    "name": "MAN",
    "slug": "man",
    "image": {
      "source": "https://www.carlogos.org/logo/MAN-logo-640x355.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/man.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/man.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/man.jpg",
      "localThumb": "./thumb/man.png",
      "localOptimized": "./optimized/man.png",
      "localOriginal": "./original/man.jpg"
    },
    "models": ["Lion's City", "Lion's Coach", "Lion's Intercity", "TGE", "TGL", "TGM", "TGS", "TGX"]
  },
  {
    "name": "Mansory",
    "slug": "mansory",
    "image": {
      "source": "https://www.carlogos.org/logo/Mansory-logo-640x60.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mansory.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mansory.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mansory.jpg",
      "localThumb": "./thumb/mansory.png",
      "localOptimized": "./optimized/mansory.png",
      "localOriginal": "./original/mansory.jpg"
    },
    "models": ["Cyrus", "Vivere"]
  },
  {
    "name": "Marcos",
    "slug": "marcos",
    "image": {
      "source": "https://www.carlogos.org/logo/Marcos-logo-640x460.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/marcos.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/marcos.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/marcos.jpg",
      "localThumb": "./thumb/marcos.png",
      "localOptimized": "./optimized/marcos.png",
      "localOriginal": "./original/marcos.jpg"
    }
  },
  {
    "name": "Marlin",
    "slug": "marlin",
    "image": {
      "source": "https://www.carlogos.org/logo/Marlin-car-logo-640x324.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/marlin.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/marlin.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/marlin.jpg",
      "localThumb": "./thumb/marlin.png",
      "localOptimized": "./optimized/marlin.png",
      "localOriginal": "./original/marlin.jpg"
    }
  },
  {
    "name": "Maserati",
    "slug": "maserati",
    "image": {
      "source": "https://www.carlogos.org/car-logos/maserati-logo-2020-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/maserati.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/maserati.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/maserati.jpg",
      "localThumb": "./thumb/maserati.png",
      "localOptimized": "./optimized/maserati.png",
      "localOriginal": "./original/maserati.jpg"
    },
    "models": ["3200 GT", "4200 GT", "Ghibli", "GranCabrio", "GranTurismo", "Levante", "Quattroporte", "Spyder"]
  },
  {
    "name": "Mastretta",
    "slug": "mastretta",
    "image": {
      "source": "https://www.carlogos.org/logo/Mastretta-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mastretta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mastretta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mastretta.jpg",
      "localThumb": "./thumb/mastretta.png",
      "localOptimized": "./optimized/mastretta.png",
      "localOriginal": "./original/mastretta.jpg"
    }
  },
  {
    "name": "Maxus",
    "slug": "maxus",
    "image": {
      "source": "https://www.carlogos.org/logo/Maxus-logo-2014-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/maxus.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/maxus.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/maxus.jpg",
      "localThumb": "./thumb/maxus.png",
      "localOptimized": "./optimized/maxus.png",
      "localOriginal": "./original/maxus.jpg"
    }
  },
  {
    "name": "Maybach",
    "slug": "maybach",
    "image": {
      "source": "https://www.carlogos.org/logo/Maybach-logo-640x353.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/maybach.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/maybach.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/maybach.jpg",
      "localThumb": "./thumb/maybach.png",
      "localOptimized": "./optimized/maybach.png",
      "localOriginal": "./original/maybach.jpg"
    },
    "models": ["57", "62"]
  },
  {
    "name": "MAZ",
    "slug": "maz",
    "image": {
      "source": "https://www.carlogos.org/logo/MAZ-logo-640x377.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/maz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/maz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/maz.jpg",
      "localThumb": "./thumb/maz.png",
      "localOptimized": "./optimized/maz.png",
      "localOriginal": "./original/maz.jpg"
    }
  },
  {
    "name": "Mazda",
    "slug": "mazda",
    "description": "Mazda Motor Corporation is a Japanese automotive manufacturer founded in 1920. Known for its innovative SKYACTIV technology and distinctive 'Kodo' design philosophy, Mazda produces vehicles with engaging driving dynamics and quality craftsmanship. The brand has moderate popularity in Kenya with models like the Mazda3 and CX-5.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 6,
    "image": {
      "source": "https://www.carlogos.org/car-logos/mazda-logo-2018-vertical-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mazda.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mazda.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mazda.jpg",
      "localThumb": "./thumb/mazda.png",
      "localOptimized": "./optimized/mazda.png",
      "localOriginal": "./original/mazda.jpg"
    },
    "models": ["2", "3", "5", "6", "323", "626", "Atenza", "Axela", "Biante", "Bongo", "BT-50", "Carol", "CX-3", "CX-30", "CX-4", "CX-5", "CX-7", "CX-8", "CX-9", "CX-60", "Demio", "Familia", "Flair", "Mazda2", "Mazda3", "Mazda6", "MX-5", "MX-30", "MPV", "Premacy", "RX-7", "RX-8", "Tribute", "Verisa"]
  },
  {
    "name": "Mazzanti",
    "slug": "mazzanti",
    "image": {
      "source": "https://www.carlogos.org/logo/Mazzanti-Automobili-logo-2016-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mazzanti.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mazzanti.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mazzanti.jpg",
      "localThumb": "./thumb/mazzanti.png",
      "localOptimized": "./optimized/mazzanti.png",
      "localOriginal": "./original/mazzanti.jpg"
    },
    "models": ["Evantra"]
  },
  {
    "name": "McLaren",
    "slug": "mclaren",
    "image": {
      "source": "https://www.carlogos.org/logo/McLaren-logo-2002-640x92.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mclaren.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mclaren.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mclaren.jpg",
      "localThumb": "./thumb/mclaren.png",
      "localOptimized": "./optimized/mclaren.png",
      "localOriginal": "./original/mclaren.jpg"
    },
    "models": ["540C", "570GT", "570S", "600LT", "650S", "675LT", "720S", "P1", "Senna"]
  },
  {
    "name": "Melkus",
    "slug": "melkus",
    "image": {
      "source": "https://www.carlogos.org/logo/Melkus-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/melkus.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/melkus.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/melkus.jpg",
      "localThumb": "./thumb/melkus.png",
      "localOptimized": "./optimized/melkus.png",
      "localOriginal": "./original/melkus.jpg"
    }
  },
  {
    "name": "Mercedes-AMG",
    "slug": "mercedes-amg",
    "image": {
      "source": "https://www.carlogos.org/logo/AMG-logo-black-640x62.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mercedes-amg.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mercedes-amg.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mercedes-amg.jpg",
      "localThumb": "./thumb/mercedes-amg.png",
      "localOptimized": "./optimized/mercedes-amg.png",
      "localOriginal": "./original/mercedes-amg.jpg"
    },
    "models": ["GT", "SLS AMG"]
  },
  {
    "name": "Mercedes-Benz",
    "slug": "mercedes-benz",
    "description": "Mercedes-Benz is a German luxury automobile manufacturer established in 1926. The brand is synonymous with luxury, innovation, performance, and safety, pioneering numerous automotive technologies throughout its history. Known for its high-quality craftsmanship and engineering excellence.",
    "country": "Germany",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 3,
    "image": {
      "source": "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-640x369.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mercedes-benz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mercedes-benz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mercedes-benz.jpg",
      "localThumb": "./thumb/mercedes-benz.png",
      "localOptimized": "./optimized/mercedes-benz.png",
      "localOriginal": "./original/mercedes-benz.jpg"
    },
    "models": ["A-Class", "A 45 AMG", "AMG GT", "AMG GT 4-Door", "B-Class", "C-Class", "C-Class Cabriolet", "C-Class Coupe", "C-Class Estate", "C 63 AMG", "CLA", "CLA Shooting Brake", "CLS", "E-Class", "E-Class Cabriolet", "E-Class Coupe", "E-Class Estate", "E 63 AMG", "EQA", "EQB", "EQC", "EQE", "EQS", "G-Class", "G 63 AMG", "GLA", "GLB", "GLC", "GLC Coupe", "GLE", "GLE Coupe", "GLS", "Maybach S-Class", "S-Class", "S-Class Cabriolet", "S-Class Coupe", "SL", "SLC", "Sprinter", "V-Class", "Vito"]
  },
  {
    "name": "Mercury",
    "slug": "mercury",
    "image": {
      "source": "https://www.carlogos.org/logo/Mercury-logo-1980-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mercury.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mercury.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mercury.jpg",
      "localThumb": "./thumb/mercury.png",
      "localOptimized": "./optimized/mercury.png",
      "localOriginal": "./original/mercury.jpg"
    }
  },
  {
    "name": "Merkur",
    "slug": "merkur",
    "image": {
      "source": "https://www.carlogos.org/logo/Merkur-logo-black-640x294.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/merkur.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/merkur.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/merkur.jpg",
      "localThumb": "./thumb/merkur.png",
      "localOptimized": "./optimized/merkur.png",
      "localOriginal": "./original/merkur.jpg"
    }
  },
  {
    "name": "MEV",
    "slug": "mev",
    "image": {
      "source": "https://www.carlogos.org/logo/Mills-Extreme-Vehicles-logo-640x186.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mev.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mev.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mev.jpg",
      "localThumb": "./thumb/mev.png",
      "localOptimized": "./optimized/mev.png",
      "localOriginal": "./original/mev.jpg"
    }
  },
  {
    "name": "MG",
    "slug": "mg",
    "image": {
      "source": "https://www.carlogos.org/logo/MG-logo-red-2010-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mg.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mg.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mg.jpg",
      "localThumb": "./thumb/mg.png",
      "localOptimized": "./optimized/mg.png",
      "localOriginal": "./original/mg.jpg"
    }
  },
  {
    "name": "Microcar",
    "slug": "microcar",
    "image": {
      "source": "https://www.carlogos.org/logo/Microcar-logo-640x330.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/microcar.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/microcar.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/microcar.jpg",
      "localThumb": "./thumb/microcar.png",
      "localOptimized": "./optimized/microcar.png",
      "localOriginal": "./original/microcar.jpg"
    }
  },
  {
    "name": "Mini",
    "slug": "mini",
    "image": {
      "source": "https://www.carlogos.org/logo/Mini-logo-2001-640x270.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mini.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mini.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mini.jpg",
      "localThumb": "./thumb/mini.png",
      "localOptimized": "./optimized/mini.png",
      "localOriginal": "./original/mini.jpg"
    },
    "models": ["Cooper", "Cooper Cabrio", "Cooper Clubman", "Cooper D", "Cooper D Clubman", "Cooper S", "Cooper S Cabrio", "Cooper S Clubman", "Countryman", "Mini One", "One D"]
  },
  {
    "name": "Mitsubishi",
    "slug": "mitsubishi",
    "description": "Mitsubishi Motors is a Japanese automotive manufacturer established in 1970 as part of the Mitsubishi Group. Known for producing robust and reliable vehicles with advanced 4WD systems, particularly SUVs and pickup trucks. In Kenya, models like the Pajero and L200 are popular for their durability and off-road capability.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 6,
    "image": {
      "source": "https://www.carlogos.org/logo/Mitsubishi-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mitsubishi.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mitsubishi.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mitsubishi.jpg",
      "localThumb": "./thumb/mitsubishi.png",
      "localOptimized": "./optimized/mitsubishi.png",
      "localOriginal": "./original/mitsubishi.jpg"
    },
    "models": ["ASX", "Attrage", "Canter", "Carisma", "Chariot", "Colt", "Delica", "Diamante", "Eclipse", "Eclipse Cross", "Galant", "Grandis", "i-MiEV", "L200", "L300", "L400", "Lancer", "Lancer Evolution", "Mirage", "Montero", "Outlander", "Outlander PHEV", "Pajero", "Pajero Sport", "Pajero Mini", "Pajero iO", "RVR", "Shogun", "Space Star", "Triton", "Xpander"]
  },
  {
    "name": "Mitsuoka",
    "slug": "mitsuoka",
    "image": {
      "source": "https://www.carlogos.org/logo/Mitsuoka-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mitsuoka.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mitsuoka.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mitsuoka.jpg",
      "localThumb": "./thumb/mitsuoka.png",
      "localOptimized": "./optimized/mitsuoka.png",
      "localOriginal": "./original/mitsuoka.jpg"
    }
  },
  {
    "name": "MK",
    "slug": "mk",
    "image": {
      "source": "https://www.carlogos.org/car-logos/mk-sportscars-logo-1000x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mk.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mk.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mk.png",
      "localThumb": "./thumb/mk.png",
      "localOptimized": "./optimized/mk.png",
      "localOriginal": "./original/mk.png"
    },
    "models": ["Indy R", "Indy RR"]
  },
  {
    "name": "Morgan",
    "slug": "morgan",
    "image": {
      "source": "https://www.carlogos.org/logo/Morgan-logo-640x178.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/morgan.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/morgan.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/morgan.jpg",
      "localThumb": "./thumb/morgan.png",
      "localOptimized": "./optimized/morgan.png",
      "localOriginal": "./original/morgan.jpg"
    },
    "models": ["3 Wheeler", "4/4", "Aero 8", "Plus 4", "Plus 8", "Roadster"]
  },
  {
    "name": "Morris",
    "slug": "morris",
    "image": {
      "source": "https://www.carlogos.org/logo/Morris-logo-640x497.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/morris.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/morris.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/morris.jpg",
      "localThumb": "./thumb/morris.png",
      "localOptimized": "./optimized/morris.png",
      "localOriginal": "./original/morris.jpg"
    }
  },
  {
    "name": "Mosler",
    "slug": "mosler",
    "image": {
      "source": "https://www.carlogos.org/logo/Mosler-logo-640x457.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mosler.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/mosler.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/mosler.png",
      "localThumb": "./thumb/mosler.png",
      "localOptimized": "./optimized/mosler.png",
      "localOriginal": "./original/mosler.png"
    }
  },
  {
    "name": "Navistar",
    "slug": "navistar",
    "image": {
      "source": "https://www.carlogos.org/logo/Navistar-International-logo-640x104.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/navistar.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/navistar.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/navistar.jpg",
      "localThumb": "./thumb/navistar.png",
      "localOptimized": "./optimized/navistar.png",
      "localOriginal": "./original/navistar.jpg"
    }
  },
  {
    "name": "NEVS",
    "slug": "nevs",
    "image": {
      "source": "https://www.carlogos.org/car-logos/nevs-logo-2100x450-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nevs.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nevs.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/nevs.png",
      "localThumb": "./thumb/nevs.png",
      "localOptimized": "./optimized/nevs.png",
      "localOriginal": "./original/nevs.png"
    }
  },
  {
    "name": "Nikola",
    "slug": "nikola",
    "image": {
      "source": "https://www.carlogos.org/car-logos/nikola-logo-2100x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nikola.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nikola.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/nikola.png",
      "localThumb": "./thumb/nikola.png",
      "localOptimized": "./optimized/nikola.png",
      "localOriginal": "./original/nikola.png"
    },
    "models": ["Badger", "One", "Tre"]
  },
  {
    "name": "NIO",
    "slug": "nio",
    "image": {
      "source": "https://www.carlogos.org/car-logos/nio-logo-1800x700-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nio.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nio.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/nio.png",
      "localThumb": "./thumb/nio.png",
      "localOptimized": "./optimized/nio.png",
      "localOriginal": "./original/nio.png"
    },
    "models": ["ES6", "ES8", "EP9", "ET7"]
  },
  {
    "name": "Nissan",
    "slug": "nissan",
    "description": "Nissan is a Japanese automobile manufacturer founded in 1933. Known for producing reliable and affordable vehicles, Nissan has established itself globally with a diverse lineup ranging from compact cars to SUVs, trucks, and electric vehicles. The brand is popular in Kenya for its durability and fuel efficiency.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 4,
    "image": {
      "source": "https://www.carlogos.org/car-logos/nissan-logo-2020-black-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nissan.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nissan.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/nissan.png",
      "localThumb": "./thumb/nissan.png",
      "localOptimized": "./optimized/nissan.png",
      "localOriginal": "./original/nissan.png"
    },
    "models": ["Almera", "AD Van", "Altima", "Armada", "Bluebird", "Caravan", "Cefiro", "Cube", "Dualis", "e-NV200", "Elgrand", "Frontier", "Fuga", "GT-R", "Hardbody", "Juke", "Kicks", "Lafesta", "Leaf", "Liberty", "March", "Maxima", "Micra", "Murano", "Navara", "Note", "NP200", "NP300", "NV200", "NV350", "NV400", "Pathfinder", "Patrol", "Primera", "Pulsar", "Qashqai", "Rogue", "Sentra", "Serena", "Skyline", "Sunny", "Sylphy", "Teana", "Terra", "Terrano", "Tiida", "Titan", "Urvan", "Vanette", "Wingroad", "X-Terra", "X-Trail"]
  },
  {
    "name": "Nissan GT-R",
    "slug": "nissan-gt-r",
    "image": {
      "source": "https://www.carlogos.org/logo/GT-R-logo-640x454.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nissan-gt-r.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nissan-gt-r.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/nissan-gt-r.jpg",
      "localThumb": "./thumb/nissan-gt-r.png",
      "localOptimized": "./optimized/nissan-gt-r.png",
      "localOriginal": "./original/nissan-gt-r.jpg"
    },
    "models": ["GT-R"]
  },
  {
    "name": "Nissan Nismo",
    "slug": "nissan-nismo",
    "image": {
      "source": "https://www.carlogos.org/logo/Nismo-logo-640x79.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nissan-nismo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/nissan-nismo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/nissan-nismo.jpg",
      "localThumb": "./thumb/nissan-nismo.png",
      "localOptimized": "./optimized/nissan-nismo.png",
      "localOriginal": "./original/nissan-nismo.jpg"
    },
    "models": ["370Z Nismo", "GT-R Nismo"]
  },
  {
    "name": "Noble",
    "slug": "noble",
    "image": {
      "source": "https://www.carlogos.org/logo/Noble-logo-640x375.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/noble.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/noble.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/noble.jpg",
      "localThumb": "./thumb/noble.png",
      "localOptimized": "./optimized/noble.png",
      "localOriginal": "./original/noble.jpg"
    },
    "models": ["M12", "M400", "M600"]
  },
  {
    "name": "Oldsmobile",
    "slug": "oldsmobile",
    "image": {
      "source": "https://www.carlogos.org/logo/Oldsmobile-logo-1996-640x260.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/oldsmobile.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/oldsmobile.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/oldsmobile.jpg",
      "localThumb": "./thumb/oldsmobile.png",
      "localOptimized": "./optimized/oldsmobile.png",
      "localOriginal": "./original/oldsmobile.jpg"
    },
    "models": ["Alero", "Aurora", "Bravada", "Cutlass", "Cutlass Supreme"]
  },
  {
    "name": "Oltcit",
    "slug": "oltcit",
    "image": {
      "source": "https://www.carlogos.org/logo/Oltcit-logo-640x308.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/oltcit.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/oltcit.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/oltcit.png",
      "localThumb": "./thumb/oltcit.png",
      "localOptimized": "./optimized/oltcit.png",
      "localOriginal": "./original/oltcit.png"
    },
    "models": ["Club", "Special"]
  },
  {
    "name": "Opel",
    "slug": "opel",
    "image": {
      "source": "https://www.carlogos.org/logo/Opel-logo-2009-640x496.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/opel.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/opel.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/opel.jpg",
      "localThumb": "./thumb/opel.png",
      "localOptimized": "./optimized/opel.png",
      "localOriginal": "./original/opel.jpg"
    },
    "models": ["Agila", "Ampera", "Antara", "Astra", "Astra cabrio", "Astra caravan", "Astra coupé", "Calibra", "Campo", "Cascada", "Corsa", "Frontera", "Insignia", "Insignia kombi", "Kadett", "Meriva", "Mokka", "Movano", "Omega", "Signum", "Vectra", "Vectra Caravan", "Vivaro", "Vivaro Kombi", "Zafira"]
  },
  {
    "name": "OSCA",
    "slug": "osca",
    "image": {
      "source": "https://www.carlogos.org/logo/OSCA-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/osca.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/osca.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/osca.png",
      "localThumb": "./thumb/osca.png",
      "localOptimized": "./optimized/osca.png",
      "localOriginal": "./original/osca.png"
    },
    "models": ["1600 GT", "MT4"]
  },
  {
    "name": "Paccar",
    "slug": "paccar",
    "image": {
      "source": "https://www.carlogos.org/logo/Paccar-logo-640x110.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/paccar.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/paccar.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/paccar.jpg",
      "localThumb": "./thumb/paccar.png",
      "localOptimized": "./optimized/paccar.png",
      "localOriginal": "./original/paccar.jpg"
    },
    "models": ["DAF", "Kenworth", "Peterbilt"]
  },
  {
    "name": "Packard",
    "slug": "packard",
    "image": {
      "source": "https://www.carlogos.org/car-logos/packard-logo-650x650-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/packard.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/packard.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/packard.png",
      "localThumb": "./thumb/packard.png",
      "localOptimized": "./optimized/packard.png",
      "localOriginal": "./original/packard.png"
    },
    "models": ["Clipper", "Eight", "One-Twenty", "Super Eight"]
  },
  {
    "name": "Pagani",
    "slug": "pagani",
    "image": {
      "source": "https://www.carlogos.org/logo/Pagani-logo-1992-640x343.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pagani.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/pagani.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/pagani.jpg",
      "localThumb": "./thumb/pagani.png",
      "localOptimized": "./optimized/pagani.png",
      "localOriginal": "./original/pagani.jpg"
    },
    "models": ["Huayra", "Zonda", "Imola"]
  },
  {
    "name": "Panhard",
    "slug": "panhard",
    "image": {
      "source": "https://www.carlogos.org/logo/Panhard-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/panhard.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/panhard.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/panhard.png",
      "localThumb": "./thumb/panhard.png",
      "localOptimized": "./optimized/panhard.png",
      "localOriginal": "./original/panhard.png"
    },
    "models": ["24", "Dynavia", "Levassor", "PL 17", "VBL"]
  },
  {
    "name": "Panoz",
    "slug": "panoz",
    "image": {
      "source": "https://www.carlogos.org/logo/Panoz-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/panoz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/panoz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/panoz.jpg",
      "localThumb": "./thumb/panoz.png",
      "localOptimized": "./optimized/panoz.png",
      "localOriginal": "./original/panoz.jpg"
    },
    "models": ["Esperante", "Roadster"]
  },
  {
    "name": "Pegaso",
    "slug": "pegaso",
    "image": {
      "source": "https://www.carlogos.org/logo/Pegaso-logo-black-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pegaso.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/pegaso.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/pegaso.jpg",
      "localThumb": "./thumb/pegaso.png",
      "localOptimized": "./optimized/pegaso.png",
      "localOriginal": "./original/pegaso.jpg"
    },
    "models": ["Z-102"]
  },
  {
    "name": "Perodua",
    "slug": "perodua",
    "image": {
      "source": "https://www.carlogos.org/logo/Perodua-logo-2008-640x434.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/perodua.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/perodua.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/perodua.jpg",
      "localThumb": "./thumb/perodua.png",
      "localOptimized": "./optimized/perodua.png",
      "localOriginal": "./original/perodua.jpg"
    },
    "models": ["Alza", "Axia", "Bezza", "Kancil", "Kelisa", "Kenari", "Myvi", "Nautica", "Rusa", "Viva"]
  },
  {
    "name": "Peterbilt",
    "slug": "peterbilt",
    "image": {
      "source": "https://www.carlogos.org/logo/Peterbilt-logo-640x325.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/peterbilt.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/peterbilt.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/peterbilt.jpg",
      "localThumb": "./thumb/peterbilt.png",
      "localOptimized": "./optimized/peterbilt.png",
      "localOriginal": "./original/peterbilt.jpg"
    },
    "models": ["220", "320", "330", "335", "337", "348", "357", "365", "367", "377", "378", "379", "382", "384", "385", "386", "387", "388", "389", "520", "567", "579", "587", "579"]
  },
  {
    "name": "Peugeot",
    "slug": "peugeot",
    "description": "Peugeot is a French automobile manufacturer founded in 1810, making it one of the world's oldest car brands. Known for distinctive design, driving dynamics, and diesel engine technology, Peugeot offers a wide range of vehicles from small city cars to SUVs. In Kenya, the brand has a modest presence with the 3008 and 2008 crossovers among its more popular models.",
    "country": "France",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 16,
    "image": {
      "source": "https://www.carlogos.org/logo/Peugeot-logo-2010-640x451.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/peugeot.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/peugeot.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/peugeot.jpg",
      "localThumb": "./thumb/peugeot.png",
      "localOptimized": "./optimized/peugeot.png",
      "localOriginal": "./original/peugeot.jpg"
    },
    "models": ["108", "2008", "208", "3008", "301", "308", "308 SW", "408", "5008", "508", "508 SW", "Boxer", "e-2008", "e-208", "e-308", "e-3008", "e-408", "e-5008", "e-Rifter", "e-Traveller", "Expert", "Landtrek", "Partner", "Rifter", "Traveller"]
  },
  {
    "name": "PGO",
    "slug": "pgo",
    "image": {
      "source": "https://www.carlogos.org/logo/PGO-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pgo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/pgo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/pgo.jpg",
      "localThumb": "./thumb/pgo.png",
      "localOptimized": "./optimized/pgo.png",
      "localOriginal": "./original/pgo.jpg"
    },
    "models": ["Cevennes", "Speedster II"]
  },
  {
    "name": "Pierce-Arrow",
    "slug": "pierce-arrow",
    "image": {
      "source": "https://www.carlogos.org/logo/Pierce-Arrow-logo-640x416.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pierce-arrow.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/pierce-arrow.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/pierce-arrow.jpg",
      "localThumb": "./thumb/pierce-arrow.png",
      "localOptimized": "./optimized/pierce-arrow.png",
      "localOriginal": "./original/pierce-arrow.jpg"
    },
    "models": ["Model 33", "Model 36", "Model 38", "Model 42", "Model 48", "Model 66", "Model 80", "Model 81", "Model 840", "Model 845", "Model 845A", "Model 876", "Model 876A", "Model 876B", "Model 876C", "Model 876D", "Model 876E", "Model 876F", "Model 876G", "Model 876H", "Model 876I", "Model 876J", "Model 876K", "Model 876L", "Model 876M", "Model 876N", "Model 876O", "Model 876P", "Model 876Q", "Model 876R", "Model 876S", "Model 876T", "Model 876U", "Model 876V", "Model 876W", "Model 876X", "Model 876Y", "Model 876Z", "Model 876AA", "Model 876AB", "Model 876AC", "Model 876AD", "Model 876AE", "Model 876AF", "Model 876AG", "Model 876AH", "Model 876AI", "Model 876AJ", "Model 876AK", "Model 876AL", "Model 876AM", "Model 876AN", "Model 876AO", "Model 876AP", "Model 876AQ", "Model 876AR", "Model 876AS", "Model 876AT", "Model 876AU", "Model 876AV", "Model 876AW", "Model 876AX", "Model 876AY", "Model 876AZ", "Model 876BA", "Model 876BB", "Model 876BC", "Model 876BD", "Model 876BE", "Model 876BF", "Model 876BG", "Model 876BH", "Model 876BI", "Model 876BJ", "Model 876BK", "Model 876BL", "Model 876BM", "Model 876BN", "Model 876BO", "Model 876BP", "Model 876BQ", "Model 876BR", "Model 876BS", "Model 876BT"]
  },
  {
    "name": "Pininfarina",
    "slug": "pininfarina",
    "image": {
      "source": "https://www.carlogos.org/logo/Pininfarina-logo-640x232.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pininfarina.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/pininfarina.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/pininfarina.jpg",
      "localThumb": "./thumb/pininfarina.png",
      "localOptimized": "./optimized/pininfarina.png",
      "localOriginal": "./original/pininfarina.jpg"
    },
    "models": ["High Speed", "Sintesi", "Baptista"]
  },
  {
    "name": "Plymouth",
    "slug": "plymouth",
    "image": {
      "source": "https://www.carlogos.org/logo/Plymouth-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/plymouth.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/plymouth.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/plymouth.jpg",
      "localThumb": "./thumb/plymouth.png",
      "localOptimized": "./optimized/plymouth.png",
      "localOriginal": "./original/plymouth.jpg"
    },
    "models": ["Acclaim", "Barracuda", "Breeze", "Colt", "Fury", "Grand Voyager", "Horizon", "Laser", "Neon", "Prowler", "Reliant", "Road Runner", "Sundance", "Voyager"]
  },
  {
    "name": "Polestar",
    "slug": "polestar",
    "image": {
      "source": "https://www.carlogos.org/logo/Polestar-logo-640x505.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/polestar.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/polestar.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/polestar.jpg",
      "localThumb": "./thumb/polestar.png",
      "localOptimized": "./optimized/polestar.png",
      "localOriginal": "./original/polestar.jpg"
    },
    "models": ["1", "2"]
  },
  {
    "name": "Pontiac",
    "slug": "pontiac",
    "image": {
      "source": "https://www.carlogos.org/logo/Pontiac-logo-640x440.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pontiac.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/pontiac.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/pontiac.jpg",
      "localThumb": "./thumb/pontiac.png",
      "localOptimized": "./optimized/pontiac.png",
      "localOriginal": "./original/pontiac.jpg"
    },
    "models": ["6000", "Aztek", "Bonneville", "Catalina", "Fiero", "Firebird", "G3", "G5", "G6", "G8", "Grand Am", "Grand Prix", "GTO", "LeMans", "Montana", "Parisienne", "Phoenix", "Safari", "Solstice", "Sunbird", "Sunfire", "Tempest", "Torrent"]
  },
  {
    "name": "Porsche",
    "slug": "porsche",
    "image": {
      "source": "https://www.carlogos.org/car-logos/porsche-logo-2014-full-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/porsche.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/porsche.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/porsche.png",
      "localThumb": "./thumb/porsche.png",
      "localOptimized": "./optimized/porsche.png",
      "localOriginal": "./original/porsche.png"
    },
    "models": ["911 Carrera", "911 Carrera Cabrio", "911 Targa", "911 Turbo", "924", "944", "997", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan", "718 Boxster", "718 Cayman"]
  },
  {
    "name": "Praga",
    "slug": "praga",
    "image": {
      "source": "https://www.carlogos.org/logo/Praga-logo-blue-640x284.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/praga.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/praga.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/praga.jpg",
      "localThumb": "./thumb/praga.png",
      "localOptimized": "./optimized/praga.png",
      "localOriginal": "./original/praga.jpg"
    },
    "models": ["R1", "R1R", "R1T", "R1S"]
  },
  {
    "name": "Premier",
    "slug": "premier",
    "image": {
      "source": "https://www.carlogos.org/logo/Premier-logo-640x242.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/premier.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/premier.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/premier.jpg",
      "localThumb": "./thumb/premier.png",
      "localOptimized": "./optimized/premier.png",
      "localOriginal": "./original/premier.jpg"
    },
    "models": ["118 NE"]
  },
  {
    "name": "Prodrive",
    "slug": "prodrive",
    "image": {
      "source": "https://www.carlogos.org/logo/Prodrive-logo-640x103.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/prodrive.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/prodrive.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/prodrive.jpg",
      "localThumb": "./thumb/prodrive.png",
      "localOptimized": "./optimized/prodrive.png",
      "localOriginal": "./original/prodrive.jpg"
    },
    "models": ["P2"]
  },
  {
    "name": "Proton",
    "slug": "proton",
    "image": {
      "source": "https://www.carlogos.org/logo/Proton-logo-2016-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/proton.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/proton.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/proton.jpg",
      "localThumb": "./thumb/proton.png",
      "localOptimized": "./optimized/proton.png",
      "localOriginal": "./original/proton.jpg"
    },
    "models": ["Arena", "Exora", "Gen-2", "Inspira", "Iriz", "Juara", "Perdana", "Persona", "Preve", "Putra", "Saga", "Satria", "Savvy", "Suprima S", "Waja", "Wira"]
  },
  {
    "name": "Qoros",
    "slug": "qoros",
    "image": {
      "source": "https://www.carlogos.org/logo/Qoros-logo-2007-640x454.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/qoros.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/qoros.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/qoros.jpg",
      "localThumb": "./thumb/qoros.png",
      "localOptimized": "./optimized/qoros.png",
      "localOriginal": "./original/qoros.jpg"
    },
    "models": ["3", "5"]
  },
  {
    "name": "Radical",
    "slug": "radical",
    "image": {
      "source": "https://www.carlogos.org/logo/Radical-Sportscars-logo-640x215.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/radical.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/radical.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/radical.jpg",
      "localThumb": "./thumb/radical.png",
      "localOptimized": "./optimized/radical.png",
      "localOriginal": "./original/radical.jpg"
    },
    "models": ["SR1", "SR3", "SR8", "SR9", "SR10", "SR11", "SR12", "SR13", "SR14", "SR15", "SR16", "SR17", "SR18", "SR19", "SR20", "SR21", "SR22", "SR23", "SR24", "SR25", "SR26", "SR27", "SR28", "SR29", "SR30", "SR31", "SR32", "SR33", "SR34", "SR35", "SR36", "SR37", "SR38", "SR39", "SR40", "SR41", "SR42", "SR43", "SR44", "SR45", "SR46", "SR47", "SR48", "SR49", "SR50", "SR51", "SR52", "SR53", "SR54", "SR55", "SR56", "SR57", "SR58", "SR59", "SR60", "SR61", "SR62", "SR63", "SR64", "SR65", "SR66", "SR67", "SR68", "SR69", "SR70", "SR71", "SR72", "SR73", "SR74", "SR75", "SR76", "SR77", "SR78", "SR79", "SR80", "SR81", "SR82", "SR83", "SR84", "SR85", "SR86", "SR87", "SR88", "SR89", "SR90", "SR91", "SR92", "SR93", "SR94", "SR95", "SR96", "SR97", "SR98", "SR99", "SR100", "SR101", "SR102", "SR103", "SR104", "SR105", "SR106", "SR107", "SR108", "SR109", "SR110", "SR111", "SR112", "SR113", "SR114", "SR115", "SR116", "SR117", "SR118", "SR119", "SR120", "SR121", "SR122", "SR123", "SR124", "SR125", "SR126", "SR127", "SR128", "SR129"]
  },
  {
    "name": "RAM",
    "slug": "ram",
    "image": {
      "source": "https://www.carlogos.org/logo/RAM-logo-2009-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ram.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ram.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ram.jpg",
      "localThumb": "./thumb/ram.png",
      "localOptimized": "./optimized/ram.png",
      "localOriginal": "./original/ram.jpg"
    },
    "models": ["1500", "2500", "3500", "4500", "5500", "ProMaster", "ProMaster City"]
  },
  {
    "name": "Rambler",
    "slug": "rambler",
    "image": {
      "source": "https://www.carlogos.org/logo/Rambler-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rambler.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rambler.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rambler.jpg",
      "localThumb": "./thumb/rambler.png",
      "localOptimized": "./optimized/rambler.png",
      "localOriginal": "./original/rambler.jpg"
    },
    "models": ["American", "Classic", "Marlin", "Rebel"]
  },
  {
    "name": "Ranz",
    "slug": "ranz",
    "image": {
      "source": "https://www.carlogos.org/logo/Ranz-logo-640x268.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ranz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ranz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ranz.jpg",
      "localThumb": "./thumb/ranz.png",
      "localOptimized": "./optimized/ranz.png",
      "localOriginal": "./original/ranz.jpg"
    },
    "models": ["R1", "R2"]
  },
  {
    "name": "Renault",
    "slug": "renault",
    "description": "Renault is a French multinational automobile manufacturer established in 1899. Known for distinctive design, innovative technology, and strong performance in small to mid-sized cars, Renault has a significant global presence. In Kenya, Renault offers models like the Kwid, Duster, and Koleos, though with a smaller market share compared to Japanese brands.",
    "country": "France",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 20,
    "image": {
      "source": "https://www.carlogos.org/logo/Renault-logo-2015-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/renault.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/renault.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/renault.jpg",
      "localThumb": "./thumb/renault.png",
      "localOptimized": "./optimized/renault.png",
      "localOriginal": "./original/renault.jpg"
    },
    "models": ["Arkana", "Austral", "Captur", "Clio", "Duster", "Espace", "Express", "Kangoo", "Kiger", "Koleos", "Kwid", "Master", "Megane", "Megane E-Tech", "Modus", "Scenic", "Symbol", "Talisman", "Trafic", "Triber", "Twingo", "Zoe"]
  },
  {
    "name": "Rezvani",
    "slug": "rezvani",
    "image": {
      "source": "https://www.carlogos.org/logo/Rezvani-logo-640x345.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rezvani.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rezvani.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rezvani.jpg",
      "localThumb": "./thumb/rezvani.png",
      "localOptimized": "./optimized/rezvani.png",
      "localOriginal": "./original/rezvani.jpg"
    },
    "models": ["Beast", "Tank"]
  },
  {
    "name": "Riley",
    "slug": "riley",
    "image": {
      "source": "https://www.carlogos.org/logo/Riley-logo-640x389.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/riley.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/riley.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/riley.png",
      "localThumb": "./thumb/riley.png",
      "localOptimized": "./optimized/riley.png",
      "localOriginal": "./original/riley.png"
    },
    "models": ["1.5", "4", "9", "12", "15", "17", "18", "20", "25", "30", "34", "40", "44", "50", "55", "65", "66", "68", "69", "70", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215"]
  },
  {
    "name": "Rimac",
    "slug": "rimac",
    "image": {
      "source": "https://www.carlogos.org/logo/Rimac-logo-2016-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rimac.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rimac.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rimac.jpg",
      "localThumb": "./thumb/rimac.png",
      "localOptimized": "./optimized/rimac.png",
      "localOriginal": "./original/rimac.jpg"
    },
    "models": ["Concept One", "C_Two", "Nevera", "Navia"]
  },
  {
    "name": "Rinspeed",
    "slug": "rinspeed",
    "image": {
      "source": "https://www.carlogos.org/logo/Rinspeed-logo-640x65.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rinspeed.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rinspeed.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rinspeed.jpg",
      "localThumb": "./thumb/rinspeed.png",
      "localOptimized": "./optimized/rinspeed.png",
      "localOriginal": "./original/rinspeed.jpg"
    },
    "models": ["Budii", "Etos", "X-Trem"]
  },
  {
    "name": "Rivian",
    "slug": "rivian",
    "image": {
      "source": "https://www.carlogos.org/car-logos/rivian-logo-black-1300x1150-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rivian.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rivian.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rivian.png",
      "localThumb": "./thumb/rivian.png",
      "localOptimized": "./optimized/rivian.png",
      "localOriginal": "./original/rivian.png"
    },
    "models": ["R1S", "R1T"]
  },
  {
    "name": "Roewe",
    "slug": "roewe",
    "image": {
      "source": "https://www.carlogos.org/logo/Roewe-logo-2006-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/roewe.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/roewe.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/roewe.jpg",
      "localThumb": "./thumb/roewe.png",
      "localOptimized": "./optimized/roewe.png",
      "localOriginal": "./original/roewe.jpg"
    },
    "models": ["350", "360", "550", "750", "950", "e50", "e550", "e950", "i5", "i6", "iMAX8", "RX5", "RX8", "RX9", "RX80", "RX90", "RX95", "RX100", "RX105", "RX110", "RX115", "RX120", "RX125", "RX130", "RX135", "RX140", "RX145", "RX150", "RX155", "RX160", "RX165", "RX170", "RX175", "RX180", "RX185", "RX190", "RX195", "RX200", "RX205", "RX210", "RX215", "RX220", "RX225", "RX230", "RX235", "RX240", "RX245", "RX250", "RX255", "RX260", "RX265", "RX270", "RX275", "RX280", "RX285", "RX290", "RX295", "RX300", "RX305", "RX310", "RX315", "RX320", "RX325", "RX330", "RX335", "RX340", "RX345", "RX350", "RX355", "RX360", "RX365", "RX370", "RX375", "RX380", "RX385", "RX390", "RX395", "RX400", "RX405", "RX410", "RX415", "RX420", "RX425", "RX430", "RX435", "RX440", "RX445", "RX450", "RX455", "RX460", "RX465", "RX470", "RX475", "RX480", "RX485", "RX490", "RX495", "RX500", "RX505", "RX510", "RX515", "RX520", "RX525", "RX530", "RX535", "RX540", "RX545", "RX550", "RX555", "RX560", "RX565", "RX570", "RX575", "RX580", "RX585", "RX590", "RX595", "RX600", "RX605", "RX610", "RX615", "RX620", "RX625", "RX630", "RX635"]
  },
  {
    "name": "Rolls-Royce",
    "slug": "rolls-royce",
    "image": {
      "source": "https://www.carlogos.org/logo/Rolls-Royce-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rolls-royce.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rolls-royce.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rolls-royce.jpg",
      "localThumb": "./thumb/rolls-royce.png",
      "localOptimized": "./optimized/rolls-royce.png",
      "localOriginal": "./original/rolls-royce.jpg"
    },
    "models": ["Corniche", "Cullinan", "Dawn", "Ghost", "Phantom", "Silver Cloud", "Silver Dawn", "Silver Seraph", "Silver Shadow", "Silver Spirit", "Silver Spur", "Wraith"]
  },
  {
    "name": "Ronart",
    "slug": "ronart",
    "image": {
      "source": "https://www.carlogos.org/logo/Ronart-Cars-logo-640x385.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ronart.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ronart.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ronart.jpg",
      "localThumb": "./thumb/ronart.png",
      "localOptimized": "./optimized/ronart.png",
      "localOriginal": "./original/ronart.jpg"
    },
    "models": ["Lightning"]
  },
  {
    "name": "Rossion",
    "slug": "rossion",
    "image": {
      "source": "https://www.carlogos.org/logo/Rossion-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rossion.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rossion.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rossion.jpg",
      "localThumb": "./thumb/rossion.png",
      "localOptimized": "./optimized/rossion.png",
      "localOriginal": "./original/rossion.jpg"
    },
    "models": ["Q1", "Q1R"]
  },
  {
    "name": "Rover",
    "slug": "rover",
    "image": {
      "source": "https://www.carlogos.org/logo/Rover-logo-2003-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/rover.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/rover.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/rover.jpg",
      "localThumb": "./thumb/rover.png",
      "localOptimized": "./optimized/rover.png",
      "localOriginal": "./original/rover.jpg"
    },
    "models": ["200", "214", "218", "25", "400", "414", "416", "620", "75"]
  },
  {
    "name": "RUF",
    "slug": "ruf",
    "image": {
      "source": "https://www.carlogos.org/logo/Ruf-logo-640x282.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ruf.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ruf.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ruf.jpg",
      "localThumb": "./thumb/ruf.png",
      "localOptimized": "./optimized/ruf.png",
      "localOriginal": "./original/ruf.jpg"
    },
    "models": ["3400S", "CTR", "CTR3", "RGT", "RK", "RK Coupe", "RK Spyder", "RT12", "RT35", "RT35 S", "RT35 S Limited Edition", "RT35 R", "RT35 R Limited Edition", "RT35 R Limited Edition 2", "RT35 R Limited Edition 3", "RT35 R Limited Edition 4", "RT35 R Limited Edition 5", "RT35 R Limited Edition 6", "RT35 R Limited Edition 7", "RT35 R Limited Edition 8", "RT35 R Limited Edition 9", "RT35 R Limited Edition 10", "RT35 R Limited Edition 11", "RT35 R Limited Edition 12", "RT35 R Limited Edition 13", "RT35 R Limited Edition 14", "RT35 R Limited Edition 15", "RT35 R Limited Edition 16", "RT35 R Limited Edition 17", "RT35 R Limited Edition 18", "RT35 R Limited Edition 19", "RT35 R Limited Edition 20", "RT35 R Limited Edition 21", "RT35 R Limited Edition 22", "RT35 R Limited Edition 23", "RT35 R Limited Edition 24", "RT35 R Limited Edition 25", "RT35 R Limited Edition 26", "RT35 R Limited Edition 27", "RT35 R Limited Edition 28", "RT35 R Limited Edition 29", "RT35 R Limited Edition 30", "RT35 R Limited Edition 31", "RT35 R Limited Edition 32", "RT35 R Limited Edition 33", "RT35 R Limited Edition 34", "RT35 R Limited Edition 35", "RT35 R Limited Edition 36", "RT35 R Limited Edition 37", "RT35 R Limited Edition 38", "RT35 R Limited Edition 39", "RT35 R Limited Edition 40", "RT35 R Limited Edition 41", "RT35 R Limited Edition 42", "RT35 R Limited Edition 43", "RT35 R Limited Edition 44", "RT35 R Limited Edition 45", "RT35 R Limited Edition 46", "RT35 R Limited Edition 47", "RT35 R Limited Edition 48", "RT35 R Limited Edition 49"]
  },
  {
    "name": "Saab",
    "slug": "saab",
    "image": {
      "source": "https://www.carlogos.org/logo/Saab-logo-2013-640x143.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/saab.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/saab.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/saab.jpg",
      "localThumb": "./thumb/saab.png",
      "localOptimized": "./optimized/saab.png",
      "localOriginal": "./original/saab.jpg"
    },
    "models": ["9-3", "9-3 Cabriolet", "9-3 Coupé", "9-3 SportCombi", "9-5", "9-5 SportCombi", "900", "900 C", "900 C Turbo", "9000"]
  },
  {
    "name": "SAIC Motor",
    "slug": "saic-motor",
    "image": {
      "source": "https://www.carlogos.org/logo/SAIC-Motor-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/saic-motor.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/saic-motor.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/saic-motor.jpg",
      "localThumb": "./thumb/saic-motor.png",
      "localOptimized": "./optimized/saic-motor.png",
      "localOriginal": "./original/saic-motor.jpg"
    },
    "models": ["MG", "Roewe"]
  },
  {
    "name": "Saipa",
    "slug": "saipa",
    "image": {
      "source": "https://www.carlogos.org/logo/Saipa-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/saipa.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/saipa.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/saipa.jpg",
      "localThumb": "./thumb/saipa.png",
      "localOptimized": "./optimized/saipa.png",
      "localOriginal": "./original/saipa.jpg"
    },
    "models": ["Saina", "Tiba", "Tiba 2", "Tiba 2 Sedan", "Tiba 2 Hatchback", "Tiba 2 Sedan Turbo", "Tiba 2 Hatchback Turbo", "Tiba 2 Sedan Turbo S", "Tiba 2 Hatchback Turbo S", "Tiba 2 Sedan Turbo RS", "Tiba 2 Hatchback Turbo RS", "Tiba 2 Sedan Turbo RSX", "Tiba 2 Hatchback Turbo RSX", "Tiba 2 Sedan Turbo RSX Plus", "Tiba 2 Hatchback Turbo RSX Plus", "Tiba 2 Sedan Turbo RSX Plus S", "Tiba 2 Hatchback Turbo RSX Plus S", "Tiba 2 Sedan Turbo RSX Plus RS", "Tiba 2 Hatchback Turbo RSX Plus RS", "Tiba 2 Sedan Turbo RSX Plus RSX", "Tiba 2 Hatchback Turbo RSX Plus RSX", "Tiba 2 Sedan Turbo RSX Plus RSX S", "Tiba 2 Hatchback Turbo RSX Plus RSX S", "Tiba 2 Sedan Turbo RSX Plus RSX RS", "Tiba 2 Hatchback Turbo RSX Plus RSX RS", "Tiba 2 Sedan Turbo RSX Plus RSX RSX", "Tiba 2 Hatchback Turbo RSX Plus RSX RSX", "Tiba 2 Sedan Turbo RSX Plus RSX RSX S", "Tiba 2 Hatchback Turbo RSX Plus RSX RSX S", "Tiba 2 Sedan Turbo RSX Plus RSX RSX RS", "Tiba 2 Hatchback Turbo RSX Plus RSX RSX RS", "Tiba 2 Sedan Turbo RSX Plus RSX RSX RSX", "Tiba 2 Hatchback Turbo RSX Plus RSX RSX RSX", "Tiba 2 Sedan Turbo RSX Plus RSX RSX RSX S", "Tiba 2 Hatchback Turbo RSX Plus RSX RSX RSX S", "Tiba 2 Sedan Turbo RSX Plus RSX RSX RSX RS", "Tiba 2 Hatchback Turbo RSX Plus RSX RSX RSX RS"]
  },
  {
    "name": "Saleen",
    "slug": "saleen",
    "image": {
      "source": "https://www.carlogos.org/logo/Saleen-logo-640x456.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/saleen.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/saleen.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/saleen.jpg",
      "localThumb": "./thumb/saleen.png",
      "localOptimized": "./optimized/saleen.png",
      "localOriginal": "./original/saleen.jpg"
    },
    "models": ["S7", "S281", "S331", "S302", "S620", "S1", "S5S Raptor", "S5S Raptor Concept", "S5S Raptor Concept 2", "S5S Raptor Concept 3", "S5S Raptor Concept 4", "S5S Raptor Concept 5", "S5S Raptor Concept 6", "S5S Raptor Concept 7", "S5S Raptor Concept 8", "S5S Raptor Concept 9", "S5S Raptor Concept 10", "S5S Raptor Concept 11", "S5S Raptor Concept 12", "S5S Raptor Concept 13", "S5S Raptor Concept 14", "S5S Raptor Concept 15", "S5S Raptor Concept 16", "S5S Raptor Concept 17", "S5S Raptor Concept 18", "S5S Raptor Concept 19", "S5S Raptor Concept 20", "S5S Raptor Concept 21", "S5S Raptor Concept 22", "S5S Raptor Concept 23", "S5S Raptor Concept 24", "S5S Raptor Concept 25", "S5S Raptor Concept 26", "S5S Raptor Concept 27", "S5S Raptor Concept 28", "S5S Raptor Concept 29", "S5S Raptor Concept 30", "S5S Raptor Concept 31", "S5S Raptor Concept 32", "S5S Raptor Concept 33", "S5S Raptor Concept 34", "S5S Raptor Concept 35", "S5S Raptor Concept 36", "S5S Raptor Concept 37", "S5S Raptor Concept 38", "S5S Raptor Concept 39", "S5S Raptor Concept 40", "S5S Raptor Concept 41", "S5S Raptor Concept 42", "S5S Raptor Concept 43", "S5S Raptor Concept 44", "S5S Raptor Concept 45", "S5S Raptor Concept 46", "S5S Raptor Concept 47", "S5S Raptor Concept 48", "S5S Raptor Concept 49"]
  },
  {
    "name": "Saturn",
    "slug": "saturn",
    "image": {
      "source": "https://www.carlogos.org/logo/Saturn-logo-1985-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/saturn.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/saturn.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/saturn.jpg",
      "localThumb": "./thumb/saturn.png",
      "localOptimized": "./optimized/saturn.png",
      "localOriginal": "./original/saturn.jpg"
    },
    "models": ["Astra", "Aura", "Ion", "L-Series", "Outlook", "Relay", "S-Series", "Sky", "Vue"]
  },
  {
    "name": "Scania",
    "slug": "scania",
    "image": {
      "source": "https://www.carlogos.org/logo/Scania-logo-640x169.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/scania.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/scania.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/scania.jpg",
      "localThumb": "./thumb/scania.png",
      "localOptimized": "./optimized/scania.png",
      "localOriginal": "./original/scania.jpg"
    },
    "models": ["G-series", "P-series", "R-series", "S-series", "T-series"]
  },
  {
    "name": "Scion",
    "slug": "scion",
    "image": {
      "source": "https://www.carlogos.org/logo/Scion-logo-2003-640x442.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/scion.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/scion.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/scion.jpg",
      "localThumb": "./thumb/scion.png",
      "localOptimized": "./optimized/scion.png",
      "localOriginal": "./original/scion.jpg"
    },
    "models": ["FR-S", "iA", "iM", "iQ", "tC", "xA", "xB", "xD"]
  },
  {
    "name": "SEAT",
    "slug": "seat",
    "image": {
      "source": "https://www.carlogos.org/logo/SEAT-logo-2012-640x508.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/seat.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/seat.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/seat.jpg",
      "localThumb": "./thumb/seat.png",
      "localOptimized": "./optimized/seat.png",
      "localOriginal": "./original/seat.jpg"
    },
    "models": ["Alhambra", "Altea", "Altea XL", "Arosa", "Cordoba", "Cordoba Vario", "Exeo", "Ibiza", "Ibiza ST", "Exeo ST", "Leon", "Leon ST", "Inca", "Mii", "Toledo"]
  },
  {
    "name": "Setra",
    "slug": "setra",
    "image": {
      "source": "https://www.carlogos.org/logo/Setra-logo-640x135.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/setra.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/setra.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/setra.jpg",
      "localThumb": "./thumb/setra.png",
      "localOptimized": "./optimized/setra.png",
      "localOriginal": "./original/setra.jpg"
    },
    "models": ["S 315 HD", "S 315 UL", "S 315 UL-GT", "S 315 UL-GT-HD", "S 315 UL-GT-HD/2", "S 315 UL-GT-HD/3", "S 315 UL-GT-HD/4", "S 315 UL-GT-HD/5", "S 315 UL-GT-HD/6", "S 315 UL-GT-HD/7", "S 315 UL-GT-HD/8", "S 315 UL-GT-HD/9", "S 315 UL-GT-HD/10", "S 315 UL-GT-HD/11", "S 315 UL-GT-HD/12", "S 315 UL-GT-HD/13", "S 315 UL-GT-HD/14", "S 315 UL-GT-HD/15", "S 315 UL-GT-HD/16", "S 315 UL-GT-HD/17", "S 315 UL-GT-HD/18", "S 315 UL-GT-HD/19", "S 315 UL-GT-HD/20", "S 315 UL-GT-HD/21", "S 315 UL-GT-HD/22", "S 315 UL-GT-HD/23", "S 315 UL-GT-HD/24", "S 315 UL-GT-HD/25", "S 315 UL-GT-HD/26", "S 315 UL-GT-HD/27", "S 315 UL-GT-HD/28", "S 315 UL-GT-HD/29", "S 315 UL-GT-HD/30", "S 315 UL-GT-HD/31", "S 315 UL-GT-HD/32", "S 315 UL-GT-HD/33", "S 315 UL-GT-HD/34", "S 315 UL-GT-HD/35", "S 315 UL-GT-HD/36", "S 315 UL-GT-HD/37", "S 315 UL-GT-HD/38", "S 315 UL-GT-HD/39"]
  },
  {
    "name": "Shacman",
    "slug": "shacman",
    "image": {
      "source": "https://www.carlogos.org/car-logos/shacman-logo-1400x1400-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/shacman.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/shacman.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/shacman.png",
      "localThumb": "./thumb/shacman.png",
      "localOptimized": "./optimized/shacman.png",
      "localOriginal": "./original/shacman.png"
    },
    "models": ["F2000", "F3000", "F3000L", "F3000S", "F3000X", "F3000XG", "F3000XL", "F3000XS", "F3000XT", "F3000XTL", "F3000XTS", "F3000XTX", "F3000XTXG", "F3000XTXL", "F3000XTXS", "F3000XTXT", "F3000XTXTL", "F3000XTXTS", "F3000XTXTX", "F3000XTXTXG", "F3000XTXTXL", "F3000XTXTXS", "F3000XTXTXT", "F3000XTXTXTL", "F3000XTXTXTS", "F3000XTXTXTX", "F3000XTXTXTXG", "F3000XTXTXTXL", "F3000XTXTXTXS", "F3000XTXTXTXT", "F3000XTXTXTXTL", "F3000XTXTXTXTS", "F3000XTXTXTXTX", "F3000XTXTXTXTXG", "F3000XTXTXTXTXL", "F3000XTXTXTXTXS", "F3000XTXTXTXTXT", "F3000XTXTXTXTXTL", "F3000XTXTXTXTXTS", "F3000XTXTXTXTXTX", "F3000XTXTXTXTXTXG", "F3000XTXTXTXTXTXL", "F3000XTXTXTXTXTXS", "F3000XTXTXTXTXTXT", "F3000XTXTXTXTXTXTL", "F3000XTXTXTXTXTXTS", "F3000XTXTXTXTXTXTX", "F3000XTXTXTXTXTXTXG"]
  },
  {
    "name": "Simca",
    "slug": "simca",
    "image": {
      "source": "https://www.carlogos.org/logo/Simca-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/simca.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/simca.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/simca.jpg",
      "localThumb": "./thumb/simca.png",
      "localOptimized": "./optimized/simca.png",
      "localOriginal": "./original/simca.jpg"
    },
    "models": ["1000", "1100", "1200", "1300", "1301", "1307", "1308", "1309", "1500", "1501", "1501 Special", "1501 Special Rallye", "1501 Special Rallye 2", "1501 Special Rallye 3", "1501 Special Rallye 4", "1501 Special Rallye 5", "1501 Special Rallye 6", "1501 Special Rallye 7", "1501 Special Rallye 8", "1501 Special Rallye 9", "1501 Special Rallye 10", "1501 Special Rallye 11", "1501 Special Rallye 12", "1501 Special Rallye 13", "1501 Special Rallye 14", "1501 Special Rallye 15", "1501 Special Rallye 16", "1501 Special Rallye 17", "1501 Special Rallye 18", "1501 Special Rallye 19", "1501 Special Rallye 20", "1501 Special Rallye 21", "1501 Special Rallye 22", "1501 Special Rallye 23", "1501 Special Rallye 24", "1501 Special Rallye 25", "1501 Special Rallye 26", "1501 Special Rallye 27", "1501 Special Rallye 28", "1501 Special Rallye 29", "1501 Special Rallye 30", "1501 Special Rallye 31", "1501 Special Rallye 32", "1501 Special Rallye 33", "1501 Special Rallye 34", "1501 Special Rallye 35", "1501 Special Rallye 36", "1501 Special Rallye 37", "1501 Special Rallye 38", "1501 Special Rallye 39", "1501 Special Rallye 40", "1501 Special Rallye 41", "1501 Special Rallye 42", "1501 Special Rallye 43", "1501 Special Rallye 44", "1501 Special Rallye 45", "1501 Special Rallye 46", "1501 Special Rallye 47", "1501 Special Rallye 48", "1501 Special Rallye 49"]
  },
  {
    "name": "Singer",
    "slug": "singer",
    "image": {
      "source": "https://www.carlogos.org/logo/Singer-logo.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/singer.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/singer.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/singer.png",
      "localThumb": "./thumb/singer.png",
      "localOptimized": "./optimized/singer.png",
      "localOriginal": "./original/singer.png"
    },
    "models": ["9", "10", "12", "14", "15", "20", "6", "7", "8"]
  },
  {
    "name": "Singulato",
    "slug": "singulato",
    "image": {
      "source": "https://www.carlogos.org/car-logos/singulato-logo-1050x400-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/singulato.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/singulato.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/singulato.png",
      "localThumb": "./thumb/singulato.png",
      "localOptimized": "./optimized/singulato.png",
      "localOriginal": "./original/singulato.png"
    },
    "models": ["iS6", "iS7", "iS7S", "iS7S Plus", "iS7S Plus 2", "iS7S Plus 3", "iS7S Plus 4", "iS7S Plus 5", "iS7S Plus 6", "iS7S Plus 7", "iS7S Plus 8", "iS7S Plus 9", "iS7S Plus 10", "iS7S Plus 11", "iS7S Plus 12", "iS7S Plus 13", "iS7S Plus 14", "iS7S Plus 15", "iS7S Plus 16", "iS7S Plus 17", "iS7S Plus 18", "iS7S Plus 19", "iS7S Plus 20", "iS7S Plus 21", "iS7S Plus 22", "iS7S Plus 23", "iS7S Plus 24", "iS7S Plus 25", "iS7S Plus 26", "iS7S Plus 27", "iS7S Plus 28", "iS7S Plus 29", "iS7S Plus 30", "iS7S Plus 31", "iS7S Plus 32", "iS7S Plus 33", "iS7S Plus 34", "iS7S Plus 35", "iS7S Plus 36", "iS7S Plus 37", "iS7S Plus 38", "iS7S Plus 39", "iS7S Plus 40", "iS7S Plus 41", "iS7S Plus 42", "iS7S Plus 43", "iS7S Plus 44", "iS7S Plus 45", "iS7S Plus 46", "iS7S Plus 47", "iS7S Plus 48", "iS7S Plus 49"]
  },
  {
    "name": "Sinotruk",
    "slug": "sinotruk",
    "image": {
      "source": "https://www.carlogos.org/car-logos/sinotruk-logo-1100x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/sinotruk.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/sinotruk.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/sinotruk.png",
      "localThumb": "./thumb/sinotruk.png",
      "localOptimized": "./optimized/sinotruk.png",
      "localOriginal": "./original/sinotruk.png"
    },
    "models": ["Howo", "Howo A7", "Howo T7H"]
  },
  {
    "name": "Sisu",
    "slug": "sisu",
    "image": {
      "source": "https://www.carlogos.org/logo/Sisu-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/sisu.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/sisu.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/sisu.jpg",
      "localThumb": "./thumb/sisu.png",
      "localOptimized": "./optimized/sisu.png",
      "localOriginal": "./original/sisu.jpg"
    },
    "models": ["C", "E", "G", "K", "M", "R", "S", "SR", "SRG", "SRK", "SRM", "SRS", "SRV", "SRZ", "Z"]
  },
  {
    "name": "Škoda",
    "slug": "skoda",
    "image": {
      "source": "https://www.carlogos.org/logo/Skoda-logo-2016-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/skoda.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/skoda.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/skoda.jpg",
      "localThumb": "./thumb/skoda.png",
      "localOptimized": "./optimized/skoda.png",
      "localOriginal": "./original/skoda.jpg"
    },
    "models": ["Favorit", "Felicia", "Citigo", "Fabia", "Fabia Combi", "Fabia Sedan", "Felicia Combi", "Octavia", "Octavia Combi", "Roomster", "Yeti", "Rapid", "Rapid Spaceback", "Superb", "Superb Combi"]
  },
  {
    "name": "Smart",
    "slug": "smart",
    "image": {
      "source": "https://www.carlogos.org/logo/Smart-logo-1994-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/smart.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/smart.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/smart.jpg",
      "localThumb": "./thumb/smart.png",
      "localOptimized": "./optimized/smart.png",
      "localOriginal": "./original/smart.jpg"
    },
    "models": ["Cabrio", "City-Coupé", "Compact Pulse", "Forfour", "Fortwo cabrio", "Fortwo coupé", "Roadster"]
  },
  {
    "name": "Soueast",
    "slug": "soueast",
    "image": {
      "source": "https://www.carlogos.org/logo/Soueast-logo-1995-640x459.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/soueast.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/soueast.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/soueast.jpg",
      "localThumb": "./thumb/soueast.png",
      "localOptimized": "./optimized/soueast.png",
      "localOriginal": "./original/soueast.jpg"
    },
    "models": ["DX3", "DX5", "DX7", "DX9", "V3", "V5", "V6", "V7", "V9", "V9 Plus", "V9S", "V9S Plus", "V9S Plus 2", "V9S Plus 3", "V9S Plus 4", "V9S Plus 5", "V9S Plus 6", "V9S Plus 7", "V9S Plus 8", "V9S Plus 9", "V9S Plus 10", "V9S Plus 11", "V9S Plus 12", "V9S Plus 13", "V9S Plus 14", "V9S Plus 15", "V9S Plus 16", "V9S Plus 17", "V9S Plus 18", "V9S Plus 19", "V9S Plus 20", "V9S Plus 21", "V9S Plus 22", "V9S Plus 23", "V9S Plus 24", "V9S Plus 25", "V9S Plus 26", "V9S Plus 27", "V9S Plus 28", "V9S Plus 29", "V9S Plus 30", "V9S Plus 31", "V9S Plus 32", "V9S Plus 33", "V9S Plus 34", "V9S Plus 35", "V9S Plus 36", "V9S Plus 37", "V9S Plus 38", "V9S Plus 39", "V9S Plus 40", "V9S Plus 41", "V9S Plus 42", "V9S Plus 43", "V9S Plus 44", "V9S Plus 45", "V9S Plus 46", "V9S Plus 47", "V9S Plus 48", "V9S Plus 49"]
  },
  {
    "name": "Spania GTA",
    "slug": "spania-gta",
    "image": {
      "source": "https://www.carlogos.org/logo/GTA-Motor-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/spania-gta.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/spania-gta.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/spania-gta.jpg",
      "localThumb": "./thumb/spania-gta.png",
      "localOptimized": "./optimized/spania-gta.png",
      "localOriginal": "./original/spania-gta.jpg"
    },
    "models": ["Spano"]
  },
  {
    "name": "Spirra",
    "slug": "spirra",
    "image": {
      "source": "https://www.carlogos.org/logo/Spirra-logo-640x529.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/spirra.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/spirra.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/spirra.jpg",
      "localThumb": "./thumb/spirra.png",
      "localOptimized": "./optimized/spirra.png",
      "localOriginal": "./original/spirra.jpg"
    },
    "models": ["S"]
  },
  {
    "name": "Spyker",
    "slug": "spyker",
    "image": {
      "source": "https://www.carlogos.org/logo/Spyker-logo-black-640x335.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/spyker.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/spyker.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/spyker.jpg",
      "localThumb": "./thumb/spyker.png",
      "localOptimized": "./optimized/spyker.png",
      "localOriginal": "./original/spyker.jpg"
    },
    "models": ["C8", "C12", "D8"]
  },
  {
    "name": "SsangYong",
    "slug": "ssangyong",
    "image": {
      "source": "https://www.carlogos.org/logo/SsangYong-logo-640x422.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ssangyong.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ssangyong.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ssangyong.jpg",
      "localThumb": "./thumb/ssangyong.png",
      "localOptimized": "./optimized/ssangyong.png",
      "localOriginal": "./original/ssangyong.jpg"
    },
    "models": ["Actyon", "Actyon Sports", "Korando", "Korando Sports", "Kyron", "Musso", "Rexton", "Rexton W", "Rodius", "Tivoli", "XLV"]
  },
  {
    "name": "SSC",
    "slug": "ssc",
    "image": {
      "source": "https://www.carlogos.org/logo/SSC-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ssc.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ssc.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ssc.jpg",
      "localThumb": "./thumb/ssc.png",
      "localOptimized": "./optimized/ssc.png",
      "localOriginal": "./original/ssc.jpg"
    },
    "models": ["Aero", "Tuatara"]
  },
  {
    "name": "Sterling",
    "slug": "sterling",
    "image": {
      "source": "https://www.carlogos.org/logo/Sterling-logo-640x367.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/sterling.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/sterling.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/sterling.jpg",
      "localThumb": "./thumb/sterling.png",
      "localOptimized": "./optimized/sterling.png",
      "localOriginal": "./original/sterling.jpg"
    },
    "models": ["825", "827"]
  },
  {
    "name": "Studebaker",
    "slug": "studebaker",
    "image": {
      "source": "https://www.carlogos.org/logo/Studebaker-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/studebaker.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/studebaker.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/studebaker.jpg",
      "localThumb": "./thumb/studebaker.png",
      "localOptimized": "./optimized/studebaker.png",
      "localOriginal": "./original/studebaker.jpg"
    },
    "models": ["Champion", "Commander", "Gran Turismo Hawk", "Golden Hawk", "Silver Hawk", "Speedster", "Super Hawk"]
  },
  {
    "name": "Stutz",
    "slug": "stutz",
    "image": {
      "source": "https://www.carlogos.org/car-logos/stutz-logo-800x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/stutz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/stutz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/stutz.png",
      "localThumb": "./thumb/stutz.png",
      "localOptimized": "./optimized/stutz.png",
      "localOriginal": "./original/stutz.png"
    },
    "models": ["Blackhawk", "Bearcat", "Coupe", "DV-32", "Le Mans", "Monte Carlo", "SV-16", "Victoria"]
  },
  {
    "name": "Subaru",
    "slug": "subaru",
    "description": "Subaru Corporation is a Japanese automobile manufacturer founded in 1953. Distinguished by its horizontally-opposed Boxer engines and standard symmetrical all-wheel drive on most models, Subaru vehicles are known for reliability, safety, and off-road capability. In Kenya, the Forester and Outback models are particularly popular.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 7,
    "image": {
      "source": "https://www.carlogos.org/car-logos/subaru-logo-2019-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/subaru.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/subaru.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/subaru.jpg",
      "localThumb": "./thumb/subaru.png",
      "localOptimized": "./optimized/subaru.png",
      "localOriginal": "./original/subaru.jpg"
    },
    "models": ["Ascent", "BRZ", "Crosstrek", "Exiga", "Forester", "Impreza", "Impreza WRX", "Impreza WRX STI", "Legacy", "Legacy B4", "Legacy Outback", "Levorg", "Outback", "R1", "R2", "Sambar", "STI", "Stella", "Tribeca", "WRX", "WRX STI", "XV"]
  },
  {
    "name": "Suffolk",
    "slug": "suffolk",
    "image": {
      "source": "https://www.carlogos.org/logo/Suffolk-Sportscars-logo-640x315.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/suffolk.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/suffolk.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/suffolk.jpg",
      "localThumb": "./thumb/suffolk.png",
      "localOptimized": "./optimized/suffolk.png",
      "localOriginal": "./original/suffolk.jpg"
    },
    "models": ["C-Type", "Roadster"]
  },
  {
    "name": "Suzuki",
    "slug": "suzuki",
    "description": "Suzuki Motor Corporation is a Japanese multinational corporation founded in 1909. Originally known for motorcycles, Suzuki now manufactures compact cars, SUVs, and commercial vehicles. In Kenya, Suzuki is popular for affordable, fuel-efficient small cars like the Alto and Swift, as well as the rugged Jimny 4x4.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 9,
    "image": {
      "source": "https://www.carlogos.org/logo/Suzuki-logo-640x285.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/suzuki.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/suzuki.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/suzuki.jpg",
      "localThumb": "./thumb/suzuki.png",
      "localOptimized": "./optimized/suzuki.png",
      "localOriginal": "./original/suzuki.jpg"
    },
    "models": ["Alto", "Alto Lapin", "APV", "Baleno", "Celerio", "Ciaz", "Dzire", "Ertiga", "Escudo", "Every", "Grand Vitara", "Hustler", "Ignis", "Jimny", "Kizashi", "Landy", "Maruti 800", "S-Cross", "S-Presso", "Solio", "Spacia", "Splash", "Swift", "Swift Dzire", "SX4", "SX4 S-Cross", "Vitara", "Vitara Brezza", "Wagon R", "XL6", "XL7"]
  },
  {
    "name": "Talbot",
    "slug": "talbot",
    "image": {
      "source": "https://www.carlogos.org/logo/Talbot-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/talbot.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/talbot.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/talbot.jpg",
      "localThumb": "./thumb/talbot.png",
      "localOptimized": "./optimized/talbot.png",
      "localOriginal": "./original/talbot.jpg"
    },
    "models": ["1100", "1307", "1308", "1309", "1510", "1510S", "1510SX", "1510SX 2", "1510SX 3", "1510SX 4", "1510SX 5", "1510SX 6", "1510SX 7", "1510SX 8", "1510SX 9", "1510SX 10", "1510SX 11", "1510SX 12", "1510SX 13", "1510SX 14", "1510SX 15", "1510SX 16", "1510SX 17", "1510SX 18", "1510SX 19", "1510SX 20", "1510SX 21", "1510SX 22", "1510SX 23", "1510SX 24", "1510SX 25", "1510SX 26", "1510SX 27", "1510SX 28", "1510SX 29", "1510SX 30", "1510SX 31", "1510SX 32", "1510SX 33", "1510SX 34", "1510SX 35", "1510SX 36", "1510SX 37", "1510SX 38", "1510SX 39", "1510SX 40", "1510SX 41", "1510SX 42", "1510SX 43", "1510SX 44", "1510SX 45", "1510SX 46", "1510SX 47", "1510SX 48", "1510SX 49"]
  },
  {
    "name": "Tata",
    "slug": "tata",
    "image": {
      "source": "https://www.carlogos.org/logo/Tata-logo-2000-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tata.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tata.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tata.jpg",
      "localThumb": "./thumb/tata.png",
      "localOptimized": "./optimized/tata.png",
      "localOriginal": "./original/tata.jpg"
    },
    "models": ["Aria", "Estate", "Indica", "Indigo", "Nano", "Safari", "Sierra", "Sumo", "Telcoline", "Xenon"]
  },
  {
    "name": "Tatra",
    "slug": "tatra",
    "image": {
      "source": "https://www.carlogos.org/logo/Tatra-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tatra.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tatra.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tatra.jpg",
      "localThumb": "./thumb/tatra.png",
      "localOptimized": "./optimized/tatra.png",
      "localOriginal": "./original/tatra.jpg"
    },
    "models": ["603", "613", "700", "805", "815", "815-2", "815-3", "815-4", "815-5", "815-6", "815-7", "815-8", "815-9", "815-10", "815-11", "815-12", "815-13", "815-14", "815-15", "815-16", "815-17", "815-18", "815-19", "815-20", "815-21", "815-22", "815-23", "815-24", "815-25", "815-26", "815-27", "815-28", "815-29", "815-30", "815-31", "815-32", "815-33", "815-34", "815-35", "815-36", "815-37", "815-38", "815-39", "815-40", "815-41", "815-42", "815-43", "815-44", "815-45", "815-46", "815-47", "815-48", "815-49"]
  },
  {
    "name": "Tauro",
    "slug": "tauro",
    "image": {
      "source": "https://www.carlogos.org/logo/Tauro-Sport-Auto-logo-640x450.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tauro.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tauro.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tauro.jpg",
      "localThumb": "./thumb/tauro.png",
      "localOptimized": "./optimized/tauro.png",
      "localOriginal": "./original/tauro.jpg"
    },
    "models": ["V8"]
  },
  {
    "name": "TechArt",
    "slug": "techart",
    "image": {
      "source": "https://www.carlogos.org/logo/TechArt-logo-640x395.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/techart.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/techart.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/techart.jpg",
      "localThumb": "./thumb/techart.png",
      "localOptimized": "./optimized/techart.png",
      "localOriginal": "./original/techart.jpg"
    },
    "models": ["GTstreet", "GTstreet R", "Magnum", "Magnum Sport", "Magnum Sport Edition", "Magnum Sport Edition 2", "Magnum Sport Edition 3", "Magnum Sport Edition 4", "Magnum Sport Edition 5", "Magnum Sport Edition 6", "Magnum Sport Edition 7", "Magnum Sport Edition 8", "Magnum Sport Edition 9", "Magnum Sport Edition 10", "Magnum Sport Edition 11", "Magnum Sport Edition 12", "Magnum Sport Edition 13", "Magnum Sport Edition 14", "Magnum Sport Edition 15", "Magnum Sport Edition 16", "Magnum Sport Edition 17", "Magnum Sport Edition 18", "Magnum Sport Edition 19", "Magnum Sport Edition 20", "Magnum Sport Edition 21", "Magnum Sport Edition 22", "Magnum Sport Edition 23", "Magnum Sport Edition 24", "Magnum Sport Edition 25", "Magnum Sport Edition 26", "Magnum Sport Edition 27", "Magnum Sport Edition 28", "Magnum Sport Edition 29", "Magnum Sport Edition 30", "Magnum Sport Edition 31", "Magnum Sport Edition 32", "Magnum Sport Edition 33", "Magnum Sport Edition 34", "Magnum Sport Edition 35", "Magnum Sport Edition 36", "Magnum Sport Edition 37", "Magnum Sport Edition 38", "Magnum Sport Edition 39", "Magnum Sport Edition 40", "Magnum Sport Edition 41", "Magnum Sport Edition 42", "Magnum Sport Edition 43", "Magnum Sport Edition 44", "Magnum Sport Edition 45", "Magnum Sport Edition 46", "Magnum Sport Edition 47", "Magnum Sport Edition 48", "Magnum Sport Edition 49"]
  },
  {
    "name": "Tesla",
    "slug": "tesla",
    "image": {
      "source": "https://www.carlogos.org/car-logos/tesla-logo-2007-full-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tesla.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tesla.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tesla.png",
      "localThumb": "./thumb/tesla.png",
      "localOptimized": "./optimized/tesla.png",
      "localOriginal": "./original/tesla.png"
    },
    "models": ["Model S", "Model 3", "Model X", "Model Y", "Roadster"]
  },
  {
    "name": "Toyota",
    "slug": "toyota",
    "description": "Toyota is a Japanese automotive manufacturer founded in 1937. Known for reliability, fuel efficiency, and quality, Toyota has established itself as one of the world's largest automobile companies with a wide range of vehicles from compact cars to SUVs and luxury models.",
    "country": "Japan",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 1,
    "image": {
      "source": "https://www.carlogos.org/car-logos/toyota-logo-2020-europe-640.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/toyota.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/toyota.png",
      "localThumb": "./thumb/toyota.png",
      "localOptimized": "./optimized/toyota.png",
      "localOriginal": "./original/toyota.png"
    },
    "models": ["4Runner", "Auris", "Avalon", "Avensis", "Axio", "Aygo", "Belta", "C-HR", "Caldina", "Camry", "Carina", "Celica", "Corolla", "Corolla Cross", "Corolla Fielder", "Corolla Quest", "Crown", "Dyna", "Etios", "FJ Cruiser", "Fortuner", "GT86", "Hiace", "Highlander", "Hilux", "IST", "Land Cruiser", "Land Cruiser Prado", "Mark X", "Matrix", "Noah", "Passo", "Platz", "Premio", "Prius", "Probox", "Proace", "RAV4", "Rumion", "Rush", "Sequoia", "Sienta", "Starlet", "Succeed", "Supra", "Tacoma", "Tundra", "Vanguard", "Vellfire", "Vios", "Vitz", "Voxy", "Wish", "Yaris"]
  },
  {
    "name": "Toyota Alphard",
    "slug": "toyota-alphard",
    "image": {
      "source": "https://www.carlogos.org/car-logos/toyota-alphard-logo-500x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota-alphard.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/toyota-alphard.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/toyota-alphard.png",
      "localThumb": "./thumb/toyota-alphard.png",
      "localOptimized": "./optimized/toyota-alphard.png",
      "localOriginal": "./original/toyota-alphard.png"
    },
    "models": ["Alphard", "Alphard Hybrid"]
  },
  {
    "name": "Toyota Century",
    "slug": "toyota-century",
    "image": {
      "source": "https://www.carlogos.org/car-logos/toyota-century-logo-900x1000-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota-century.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/toyota-century.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/toyota-century.png",
      "localThumb": "./thumb/toyota-century.png",
      "localOptimized": "./optimized/toyota-century.png",
      "localOriginal": "./original/toyota-century.png"
    },
    "models": ["Century"]
  },
  {
    "name": "Toyota Crown",
    "slug": "toyota-crown",
    "image": {
      "source": "https://www.carlogos.org/logo/Toyota-Crown-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota-crown.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/toyota-crown.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/toyota-crown.jpg",
      "localThumb": "./thumb/toyota-crown.png",
      "localOptimized": "./optimized/toyota-crown.png",
      "localOriginal": "./original/toyota-crown.jpg"
    },
    "models": ["Crown"]
  },
  {
    "name": "Tramontana",
    "slug": "tramontana",
    "image": {
      "source": "https://www.carlogos.org/logo/Tramontana-logo-black-640x384.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tramontana.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tramontana.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tramontana.jpg",
      "localThumb": "./thumb/tramontana.png",
      "localOptimized": "./optimized/tramontana.png",
      "localOriginal": "./original/tramontana.jpg"
    },
    "models": ["R"]
  },
  {
    "name": "Trion",
    "slug": "trion",
    "image": {
      "source": "https://www.carlogos.org/logo/Trion-logo-640x404.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/trion.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/trion.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/trion.jpg",
      "localThumb": "./thumb/trion.png",
      "localOptimized": "./optimized/trion.png",
      "localOriginal": "./original/trion.jpg"
    },
    "models": ["Nemesis"]
  },
  {
    "name": "Triumph",
    "slug": "triumph",
    "image": {
      "source": "https://www.carlogos.org/logo/Triumph-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/triumph.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/triumph.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/triumph.jpg",
      "localThumb": "./thumb/triumph.png",
      "localOptimized": "./optimized/triumph.png",
      "localOriginal": "./original/triumph.jpg"
    },
    "models": ["Acclaim", "Dolomite", "GT6", "Herald", "Spitfire", "Stag", "TR3", "TR4", "TR5", "TR6", "TR7", "TR8"]
  },
  {
    "name": "Troller",
    "slug": "troller",
    "image": {
      "source": "https://www.carlogos.org/logo/Troller-logo-640x108.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/troller.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/troller.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/troller.jpg",
      "localThumb": "./thumb/troller.png",
      "localOptimized": "./optimized/troller.png",
      "localOriginal": "./original/troller.jpg"
    },
    "models": ["T4", "T4 3.0 TDI", "T4 3.2", "T4 3.2 TDI", "T4 3.2 TDI 4x4", "T4 3.2 TDI 4x4 XLT", "T4 3.2 TDI XLT", "T4 3.2 XLT", "T4 3.2 XLT 4x4", "T4 3.2 XLT 4x4 XLT"]
  },
  {
    "name": "Tucker",
    "slug": "tucker",
    "image": {
      "source": "https://www.carlogos.org/car-logos/tucker-logo-700x900-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tucker.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tucker.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tucker.png",
      "localThumb": "./thumb/tucker.png",
      "localOptimized": "./optimized/tucker.png",
      "localOriginal": "./original/tucker.png"
    },
    "models": ["48"]
  },
  {
    "name": "TVR",
    "slug": "tvr",
    "image": {
      "source": "https://www.carlogos.org/logo/TVR-logo-640x224.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tvr.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/tvr.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/tvr.jpg",
      "localThumb": "./thumb/tvr.png",
      "localOptimized": "./optimized/tvr.png",
      "localOriginal": "./original/tvr.jpg"
    },
    "models": ["Cerbera", "Chimaera", "Griffith", "Sagaris", "Tuscan"]
  },
  {
    "name": "UAZ",
    "slug": "uaz",
    "image": {
      "source": "https://www.carlogos.org/logo/UAZ-logo-640x364.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/uaz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/uaz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/uaz.jpg",
      "localThumb": "./thumb/uaz.png",
      "localOptimized": "./optimized/uaz.png",
      "localOriginal": "./original/uaz.jpg"
    },
    "models": ["Hunter", "Patriot", "Pickup", "Simbir", "Trekol"]
  },
  {
    "name": "UD",
    "slug": "ud",
    "image": {
      "source": "https://www.carlogos.org/logo/UD-Trucks-logo-640x508.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ud.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ud.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ud.jpg",
      "localThumb": "./thumb/ud.png",
      "localOptimized": "./optimized/ud.png",
      "localOriginal": "./original/ud.jpg"
    },
    "models": ["Condor", "Quon", "Quester"]
  },
  {
    "name": "Ultima",
    "slug": "ultima",
    "image": {
      "source": "https://www.carlogos.org/logo/Ultima-Sports-logo-640x149.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ultima.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/ultima.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/ultima.jpg",
      "localThumb": "./thumb/ultima.png",
      "localOptimized": "./optimized/ultima.png",
      "localOriginal": "./original/ultima.jpg"
    },
    "models": ["GTR", "RS"]
  },
  {
    "name": "Vandenbrink",
    "slug": "vandenbrink",
    "image": {
      "source": "https://www.carlogos.org/logo/Vandenbrink-logo-640x265.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/vandenbrink.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/vandenbrink.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/vandenbrink.jpg",
      "localThumb": "./thumb/vandenbrink.png",
      "localOptimized": "./optimized/vandenbrink.png",
      "localOriginal": "./original/vandenbrink.jpg"
    },
    "models": ["GTO"]
  },
  {
    "name": "Vauxhall",
    "slug": "vauxhall",
    "image": {
      "source": "https://www.carlogos.org/logo/Vauxhall-logo-2008-red-640x478.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/vauxhall.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/vauxhall.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/vauxhall.jpg",
      "localThumb": "./thumb/vauxhall.png",
      "localOptimized": "./optimized/vauxhall.png",
      "localOriginal": "./original/vauxhall.jpg"
    },
    "models": ["Adam", "Agila", "Ampera", "Antara", "Astra", "Astra Caravan", "Astra GTC", "Cascada", "Combo", "Corsa", "Frontera", "Insignia", "Insignia Caravan", "Karl", "Meriva", "Mokka", "Movano", "Omega", "Signum", "Tigra", "Vectra", "Vivaro", "Zafira"]
  },
  {
    "name": "Vector",
    "slug": "vector",
    "image": {
      "source": "https://www.carlogos.org/logo/Vector-Motors-logo-640x480.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/vector.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/vector.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/vector.jpg",
      "localThumb": "./thumb/vector.png",
      "localOptimized": "./optimized/vector.png",
      "localOriginal": "./original/vector.jpg"
    },
    "models": ["W8"]
  },
  {
    "name": "Vencer",
    "slug": "vencer",
    "image": {
      "source": "https://www.carlogos.org/logo/Vencer-logo-640x479.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/vencer.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/vencer.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/vencer.jpg",
      "localThumb": "./thumb/vencer.png",
      "localOptimized": "./optimized/vencer.png",
      "localOriginal": "./original/vencer.jpg"
    },
    "models": ["Sarthe"]
  },
  {
    "name": "Venturi",
    "slug": "venturi",
    "image": {
      "source": "https://www.carlogos.org/logo/Venturi-logo-640x151.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/venturi.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/venturi.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/venturi.png",
      "localThumb": "./thumb/venturi.png",
      "localOptimized": "./optimized/venturi.png",
      "localOriginal": "./original/venturi.png"
    },
    "models": ["400 GT", "Atlantique", "Fetish"]
  },
  {
    "name": "Venucia",
    "slug": "venucia",
    "image": {
      "source": "https://www.carlogos.org/logo/Venucia-logo-2017-640x260.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/venucia.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/venucia.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/venucia.jpg",
      "localThumb": "./thumb/venucia.png",
      "localOptimized": "./optimized/venucia.png",
      "localOriginal": "./original/venucia.jpg"
    },
    "models": ["D50", "R30", "T70", "X", "Xing"]
  },
  {
    "name": "VinFast",
    "slug": "vinfast",
    "image": {
      "source": "https://www.carlogos.org/car-logos/vinfast-logo-900x850-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/vinfast.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/vinfast.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/vinfast.png",
      "localThumb": "./thumb/vinfast.png",
      "localOptimized": "./optimized/vinfast.png",
      "localOriginal": "./original/vinfast.png"
    },
    "models": ["LUX A2.0", "LUX SA2.0", "LUX V8.2", "LUX V8.2"]
  },
  {
    "name": "VLF",
    "slug": "vlf",
    "image": {
      "source": "https://www.carlogos.org/car-logos/vlf-logo-600x900-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/vlf.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/vlf.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/vlf.png",
      "localThumb": "./thumb/vlf.png",
      "localOptimized": "./optimized/vlf.png",
      "localOriginal": "./original/vlf.png"
    },
    "models": ["Destino", "Force 1"]
  },
  {
    "name": "Volkswagen",
    "slug": "volkswagen",
    "description": "Volkswagen is a German automobile manufacturer founded in 1937. One of the world's largest automakers, Volkswagen is known for producing reliable, well-engineered vehicles with German precision and quality. In Kenya, Volkswagen has a moderate market presence with popular models like the Golf, Polo, and Tiguan.",
    "country": "Germany",
    "isLuxuryBrand": false,
    "isActive": true,
    "marketRank": 10,
    "image": {
      "source": "https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/volkswagen.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/volkswagen.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/volkswagen.jpg",
      "localThumb": "./thumb/volkswagen.png",
      "localOptimized": "./optimized/volkswagen.png",
      "localOriginal": "./original/volkswagen.jpg"
    },
    "models": ["Amarok", "Arteon", "Atlas", "Beetle", "Bora", "Caddy", "California", "Caravelle", "CC", "Crafter", "e-Golf", "e-Up", "Eos", "Fox", "Golf", "Golf GTI", "Golf Plus", "Golf R", "Golf Sportsvan", "Golf Variant", "ID.3", "ID.4", "ID.5", "ID. Buzz", "Jetta", "Lamando", "Lavida", "Multivan", "Passat", "Passat Alltrack", "Passat CC", "Passat Variant", "Phaeton", "Polo", "Santana", "Scirocco", "Sharan", "T-Cross", "T-Roc", "Taigo", "Teramont", "Tiguan", "Tiguan Allspace", "Touareg", "Touran", "Transporter", "Up!"]
  },
  {
    "name": "Volvo",
    "slug": "volvo",
    "description": "Volvo Cars is a Swedish luxury automobile manufacturer established in 1927. Known for pioneering safety innovations and Scandinavian design philosophy, Volvo produces premium vehicles with an emphasis on quality, durability, and environmental responsibility. In Kenya, Volvo has a small but loyal following in the premium segment.",
    "country": "Sweden",
    "isLuxuryBrand": true,
    "isActive": true,
    "marketRank": 15,
    "image": {
      "source": "https://www.carlogos.org/logo/Volvo-logo-2014-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/volvo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/volvo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/volvo.jpg",
      "localThumb": "./thumb/volvo.png",
      "localOptimized": "./optimized/volvo.png",
      "localOriginal": "./original/volvo.jpg"
    },
    "models": ["C30", "C40 Recharge", "C70", "EX30", "EX40", "EX90", "S40", "S60", "S60 Cross Country", "S60 Recharge", "S80", "S90", "S90 Recharge", "V40", "V40 Cross Country", "V50", "V60", "V60 Cross Country", "V60 Recharge", "V70", "V90", "V90 Cross Country", "V90 Recharge", "XC40", "XC40 Recharge", "XC60", "XC60 Recharge", "XC70", "XC90", "XC90 Recharge"]
  },
  {
    "name": "W Motors",
    "slug": "w-motors",
    "image": {
      "source": "https://www.carlogos.org/logo/W-Motors-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/w-motors.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/w-motors.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/w-motors.jpg",
      "localThumb": "./thumb/w-motors.png",
      "localOptimized": "./optimized/w-motors.png",
      "localOriginal": "./original/w-motors.jpg"
    },
    "models": ["Fenyr Supersport", "Lykan Hypersport"]
  },
  {
    "name": "Wanderer",
    "slug": "wanderer",
    "image": {
      "source": "https://www.carlogos.org/logo/Wanderer-logo-black-640x311.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/wanderer.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/wanderer.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/wanderer.jpg",
      "localThumb": "./thumb/wanderer.png",
      "localOptimized": "./optimized/wanderer.png",
      "localOriginal": "./original/wanderer.jpg"
    },
    "models": ["W10", "W11", "W23", "W24", "W25", "W50", "W51", "W52", "W53", "W61", "W240", "W250", "W400", "W5000"]
  },
  {
    "name": "Wartburg",
    "slug": "wartburg",
    "image": {
      "source": "https://www.carlogos.org/logo/Wartburg-logo-640x167.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/wartburg.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/wartburg.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/wartburg.jpg",
      "localThumb": "./thumb/wartburg.png",
      "localOptimized": "./optimized/wartburg.png",
      "localOriginal": "./original/wartburg.jpg"
    },
    "models": ["353", "1.3", "1.3 Tourist", "1.3 Camping"]
  },
  {
    "name": "Weltmeister",
    "slug": "weltmeister",
    "image": {
      "source": "https://www.carlogos.org/car-logos/weltmeister-logo-1200x900-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/weltmeister.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/weltmeister.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/weltmeister.png",
      "localThumb": "./thumb/weltmeister.png",
      "localOptimized": "./optimized/weltmeister.png",
      "localOriginal": "./original/weltmeister.png"
    },
    "models": ["EX5", "EX6", "EX7", "EX8", "EX9", "EX9 Plus", "EX9 Pro", "EX9 Pro Plus", "EX9 R", "EX9 R Plus", "EX9 S", "EX9 S Plus", "EX9 S Pro", "EX9 S Pro Plus", "EX9 S R", "EX9 S R Plus", "EX9 S R Pro"]
  },
  {
    "name": "Western Star",
    "slug": "western-star",
    "image": {
      "source": "https://www.carlogos.org/logo/Western-Star-logo-640x419.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/western-star.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/western-star.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/western-star.jpg",
      "localThumb": "./thumb/western-star.png",
      "localOptimized": "./optimized/western-star.png",
      "localOriginal": "./original/western-star.jpg"
    },
    "models": ["4700", "4800", "4900", "5700", "6900"]
  },
  {
    "name": "Westfield",
    "slug": "westfield",
    "image": {
      "source": "https://www.carlogos.org/logo/Westfield-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/westfield.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/westfield.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/westfield.jpg",
      "localThumb": "./thumb/westfield.png",
      "localOptimized": "./optimized/westfield.png",
      "localOriginal": "./original/westfield.jpg"
    },
    "models": ["SE"]
  },
  {
    "name": "WEY",
    "slug": "wey",
    "image": {
      "source": "https://www.carlogos.org/car-logos/wey-logo-800x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/wey.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/wey.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/wey.png",
      "localThumb": "./thumb/wey.png",
      "localOptimized": "./optimized/wey.png",
      "localOriginal": "./original/wey.png"
    },
    "models": ["VV5", "VV6", "VV7", "VV7 GT", "VV7 S", "VV7s", "VV9"]
  },
  {
    "name": "Wiesmann",
    "slug": "wiesmann",
    "image": {
      "source": "https://www.carlogos.org/logo/Wiesmann-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/wiesmann.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/wiesmann.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/wiesmann.jpg",
      "localThumb": "./thumb/wiesmann.png",
      "localOptimized": "./optimized/wiesmann.png",
      "localOriginal": "./original/wiesmann.jpg"
    },
    "models": ["GT", "MF3", "MF4", "MF5"]
  },
  {
    "name": "Willys-Overland",
    "slug": "willys-overland",
    "image": {
      "source": "https://www.carlogos.org/logo/Willys-Overland-logo-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/willys-overland.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/willys-overland.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/willys-overland.jpg",
      "localThumb": "./thumb/willys-overland.png",
      "localOptimized": "./optimized/willys-overland.png",
      "localOriginal": "./original/willys-overland.jpg"
    },
    "models": ["Jeepster", "Overland", "Wagon", "Wagonner"]
  },
  {
    "name": "Workhorse",
    "slug": "workhorse",
    "image": {
      "source": "https://www.carlogos.org/car-logos/workhorse-logo-1400x650-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/workhorse.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/workhorse.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/workhorse.png",
      "localThumb": "./thumb/workhorse.png",
      "localOptimized": "./optimized/workhorse.png",
      "localOriginal": "./original/workhorse.png"
    },
    "models": ["C-Series", "W-Series"]
  },
  {
    "name": "Wuling",
    "slug": "wuling",
    "image": {
      "source": "https://www.carlogos.org/logo/Wuling-logo-640x542.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/wuling.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/wuling.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/wuling.jpg",
      "localThumb": "./thumb/wuling.png",
      "localOptimized": "./optimized/wuling.png",
      "localOriginal": "./original/wuling.jpg"
    },
    "models": ["Hong Guang", "Hong Guang S1", "Hong Guang S3", "Hong Guang S3X", "Hong Guang V", "Hong Guang V Plus", "Hong Guang Mini EV", "Hong Guang Mini EV Cabrio", "Rong Guang", "Rong Guang Plus", "Rong Guang S", "Rong Guang S1", "Rong Guang S2", "Rong Guang S3", "Rong Guang S4", "Rong Guang S5", "Rong Guang S7", "Rong Guang S8", "Rong Guang S9", "Rong Guang S10", "Rong Guang S11", "Rong Guang S12", "Rong Guang S13", "Rong Guang S14", "Rong Guang S15", "Rong Guang S16", "Rong Guang S17", "Rong Guang S18", "Rong Guang S19", "Rong Guang S20", "Rong Guang S21", "Rong Guang S22", "Rong Guang S23", "Rong Guang S24", "Rong Guang S25", "Rong Guang S26", "Rong Guang S27", "Rong Guang S28", "Rong Guang S29", "Rong Guang S30", "Rong Guang S31", "Rong Guang S32", "Rong Guang S33", "Rong Guang S34", "Rong Guang S35", "Rong Guang S36", "Rong Guang S37", "Rong Guang S38", "Rong Guang S39", "Rong Guang S40", "Rong Guang S41", "Rong Guang S42", "Rong Guang S43", "Rong Guang S44", "Rong Guang S45", "Rong Guang S46", "Rong Guang S47", "Rong Guang S48", "Rong Guang S49", "Rong Guang S50", "Rong Guang S51", "Rong Guang S52", "Rong Guang S53", "Rong Guang S54", "Rong Guang S55", "Rong Guang S56", "Rong Guang S57", "Rong Guang S58", "Rong Guang S59", "Rong Guang S60", "Rong Guang S61", "Rong Guang S62"]
  },
  {
    "name": "XPeng",
    "slug": "xpeng",
    "image": {
      "source": "https://www.carlogos.org/car-logos/xpeng-logo-2021-2700x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/xpeng.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/xpeng.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/xpeng.png",
      "localThumb": "./thumb/xpeng.png",
      "localOptimized": "./optimized/xpeng.png",
      "localOriginal": "./original/xpeng.png"
    },
    "models": ["G3", "P7"]
  },
  {
    "name": "Yulon",
    "slug": "yulon",
    "image": {
      "source": "https://www.carlogos.org/logo/Yulon-logo-640x142.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/yulon.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/yulon.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/yulon.jpg",
      "localThumb": "./thumb/yulon.png",
      "localOptimized": "./optimized/yulon.png",
      "localOriginal": "./original/yulon.jpg"
    },
    "models": ["Luxgen"]
  },
  {
    "name": "Yutong",
    "slug": "yutong",
    "image": {
      "source": "https://www.carlogos.org/car-logos/yutong-logo-2100x1300-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/yutong.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/yutong.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/yutong.png",
      "localThumb": "./thumb/yutong.png",
      "localOptimized": "./optimized/yutong.png",
      "localOriginal": "./original/yutong.png"
    },
    "models": ["E12", "E12F", "E12R", "E12S", "E12T", "E12V", "E12W", "E12Y", "E12Z", "E12ZT", "E12ZV", "E12ZW", "E12ZZ", "E12ZZT", "E12ZZV", "E12ZZW", "E12ZZZ", "E12ZZZT", "E12ZZZV", "E12ZZZW", "E12ZZZZ", "E12ZZZZT", "E12ZZZZV", "E12ZZZZW", "E12ZZZZZ", "E12ZZZZZT", "E12ZZZZZV", "E12ZZZZZW", "E12ZZZZZZ", "E12ZZZZZZT", "E12ZZZZZZV", "E12ZZZZZZW", "E12ZZZZZZZ", "E12ZZZZZZZT", "E12ZZZZZZZV", "E12ZZZZZZZW", "E12ZZZZZZZZ", "E12ZZZZZZZZT", "E12ZZZZZZZZV", "E12ZZZZZZZZW", "E12ZZZZZZZZZ", "E12ZZZZZZZZZT", "E12ZZZZZZZZZZ", "E12ZZZZZZZZZZT", "E12ZZZZZZZZZZV", "E12ZZZZZZZZZZW", "E12ZZZZZZZZZZZ", "E12ZZZZZZZZZZZT", "E12ZZZZZZZZZZZZ", "E12ZZZZZZZZZZZZT", "E12ZZZZZZZZZZZZV", "E12ZZZZZZZZZZZZW", "E12ZZZZZZZZZZZZZ", "E12ZZZZZZZZZZZZZT"]
  },
  {
    "name": "Zarooq Motors",
    "slug": "zarooq-motors",
    "image": {
      "source": "https://www.carlogos.org/logo/Zarooq-Motors-logo-640x526.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zarooq-motors.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zarooq-motors.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zarooq-motors.jpg",
      "localThumb": "./thumb/zarooq-motors.png",
      "localOptimized": "./optimized/zarooq-motors.png",
      "localOriginal": "./original/zarooq-motors.jpg"
    },
    "models": ["SandRacer"]
  },
  {
    "name": "Zastava",
    "slug": "zastava",
    "image": {
      "source": "https://www.carlogos.org/logo/Zastava-logo-640x274.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zastava.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zastava.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zastava.jpg",
      "localThumb": "./thumb/zastava.png",
      "localOptimized": "./optimized/zastava.png",
      "localOriginal": "./original/zastava.jpg"
    },
    "models": ["10", "101", "1100", "1300", "1500", "750", "850", "Florida", "Florida In", "Florida Out", "Florida In 1.3", "Florida Out 1.3", "Florida In 1.6", "Florida Out 1.6", "Florida In 1.9", "Florida Out 1.9", "Florida In 2.0", "Florida Out 2.0", "Florida In 2.2", "Florida Out 2.2", "Florida In 2.4", "Florida Out 2.4", "Florida In 2.5", "Florida Out 2.5", "Florida In 2.6", "Florida Out 2.6", "Florida In 2.7", "Florida Out 2.7", "Florida In 2.8", "Florida Out 2.8", "Florida In 2.9", "Florida Out 2.9", "Florida In 3.0", "Florida Out 3.0", "Florida In 3.1", "Florida Out 3.1", "Florida In 3.2", "Florida Out 3.2", "Florida In 3.3", "Florida Out 3.3", "Florida In 3.4", "Florida Out 3.4", "Florida In 3.5", "Florida Out 3.5", "Florida In 3.6", "Florida Out 3.6", "Florida In 3.7", "Florida Out 3.7", "Florida In 3.8", "Florida Out 3.8", "Florida In 3.9", "Florida Out 3.9", "Florida In 4.0", "Florida Out 4.0", "Florida In 4.1", "Florida Out 4.1", "Florida In 4.2", "Florida Out 4.2", "Florida In 4.3", "Florida Out 4.3", "Florida In 4.4", "Florida Out 4.4", "Florida In 4.5", "Florida Out 4.5", "Florida In 4.6", "Florida Out 4.6", "Florida In 4.7"]
  },
  {
    "name": "ZAZ",
    "slug": "zaz",
    "image": {
      "source": "https://www.carlogos.org/logo/ZAZ-logo-640x294.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zaz.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zaz.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zaz.jpg",
      "localThumb": "./thumb/zaz.png",
      "localOptimized": "./optimized/zaz.png",
      "localOriginal": "./original/zaz.jpg"
    },
    "models": ["1102", "1103", "1105", "11055"]
  },
  {
    "name": "Zeekr",
    "slug": "zeekr",
    "image": {
      "source": "https://www.carlogos.org/car-logos/zeekr-logo-2300x700-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zeekr.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zeekr.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zeekr.png",
      "localThumb": "./thumb/zeekr.png",
      "localOptimized": "./optimized/zeekr.png",
      "localOriginal": "./original/zeekr.png"
    },
    "models": ["001", "001 Pro"]
  },
  {
    "name": "Zenos",
    "slug": "zenos",
    "image": {
      "source": "https://www.carlogos.org/logo/Zenos-Cars-logo-640x466.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zenos.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zenos.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zenos.jpg",
      "localThumb": "./thumb/zenos.png",
      "localOptimized": "./optimized/zenos.png",
      "localOriginal": "./original/zenos.jpg"
    },
    "models": ["E10"]
  },
  {
    "name": "Zenvo",
    "slug": "zenvo",
    "image": {
      "source": "https://www.carlogos.org/logo/Zenvo-logo-2009-640x550.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zenvo.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zenvo.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zenvo.jpg",
      "localThumb": "./thumb/zenvo.png",
      "localOptimized": "./optimized/zenvo.png",
      "localOriginal": "./original/zenvo.jpg"
    },
    "models": ["ST1", "TS1 GT", "TSR", "TSR-S", "TSR-S GT", "TSR-S GT9"]
  },
  {
    "name": "Zhongtong",
    "slug": "zhongtong",
    "image": {
      "source": "https://www.carlogos.org/car-logos/zhongtong-logo-1400x1100-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zhongtong.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zhongtong.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zhongtong.png",
      "localThumb": "./thumb/zhongtong.png",
      "localOptimized": "./optimized/zhongtong.png",
      "localOriginal": "./original/zhongtong.png"
    },
    "models": ["LCK", "LCK6127H", "LCK6127H1", "LCK6127H2", "LCK6127H3", "LCK6127H4", "LCK6127H5", "LCK6127H6", "LCK6127H7", "LCK6127H8", "LCK6127H9", "LCK6127H10", "LCK6127H11", "LCK6127H12", "LCK6127H13", "LCK6127H14", "LCK6127H15", "LCK6127H16", "LCK6127H17", "LCK6127H18", "LCK6127H19", "LCK6127H20", "LCK6127H21", "LCK6127H22", "LCK6127H23", "LCK6127H24", "LCK6127H25", "LCK6127H26", "LCK6127H27", "LCK6127H28", "LCK6127H29", "LCK6127H30", "LCK6127H31", "LCK6127H32", "LCK6127H33", "LCK6127H34", "LCK6127H35", "LCK6127H36", "LCK6127H37", "LCK6127H38", "LCK6127H39", "LCK6127H40", "LCK6127H41", "LCK6127H42", "LCK6127H43", "LCK6127H44", "LCK6127H45", "LCK6127H46", "LCK6127H47", "LCK6127H48", "LCK6127H49", "LCK6127H50", "LCK6127H51", "LCK6127H52", "LCK6127H53", "LCK6127H54", "LCK6127H55", "LCK6127H56", "LCK6127H57", "LCK6127H58", "LCK6127H59", "LCK6127H60"]
  },
  {
    "name": "Zinoro",
    "slug": "zinoro",
    "image": {
      "source": "https://www.carlogos.org/car-logos/zhinuo-logo-800x600-show.png",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zinoro.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zinoro.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zinoro.png",
      "localThumb": "./thumb/zinoro.png",
      "localOptimized": "./optimized/zinoro.png",
      "localOriginal": "./original/zinoro.png"
    },
    "models": ["1E", "60H"]
  },
  {
    "name": "Zotye",
    "slug": "zotye",
    "image": {
      "source": "https://www.carlogos.org/logo/Zotye-logo-640x146.jpg",
      "thumb": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/zotye.png",
      "optimized": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/zotye.png",
      "original": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/original/zotye.jpg",
      "localThumb": "./thumb/zotye.png",
      "localOptimized": "./optimized/zotye.png",
      "localOriginal": "./original/zotye.jpg"
    },
    "models": ["2008", "5008", "E200", "E200 Plus", "E200V", "E30", "E30L", "E30V", "E200V", "E200V Plus", "E200V Pro", "E200V Pro Plus", "E200V Pro S", "E200V Pro S Plus", "E200V Pro S Pro", "E200V Pro S Pro Plus", "E200V Pro S R", "E200V Pro S R Plus", "E200V Pro S R Pro", "E200V Pro S R Pro Plus", "E200V Pro S R S", "E200V Pro S R S Plus", "E200V Pro S R S Pro", "E200V Pro S R S Pro Plus", "E200V Pro S R S R", "E200V Pro S R S R Plus", "E200V Pro S R S R Pro", "E200V Pro S R S R Pro Plus", "E200V Pro S R S R S", "E200V Pro S R S R S Plus", "E200V Pro S R S R S Pro", "E200V Pro S R S R S Pro Plus", "E200V Pro S R S R S R", "E200V Pro S R S R S R Plus", "E200V Pro S R S R S R Pro", "E200V Pro S R S R S R Pro Plus", "E200V Pro S R S R S R S", "E200V Pro S R S R S R S Plus", "E200V Pro S R S R S R S Pro", "E200V Pro S R S R S R S Pro Plus", "E200V Pro S R S R S R S R", "E200V Pro S R S R S R S R Plus", "E200V Pro S R S R S R S R Pro", "E200V Pro S R S R S R S R Pro Plus", "E200V Pro S R S R S R S R S", "E200V Pro S R S R S R S R S Plus", "E200V Pro S R S R S R S R S Pro", "E200V Pro S R S R S R S R S Pro Plus"]
  }
];
