// Dubai's leading property developers — accessed through one local broker.
// Background images cycle across the available Dubai photography.
const IMAGES = [
  "/images/sky-marina.jpg",
  "/images/sky-jbr.jpg",
  "/images/sky-downtown.jpg",
  "/images/sky-towers.jpg",
  "/images/sky-jbr2.jpg",
  "/images/sky-marina-towers.jpg",
  "/images/sky-bluewaters.jpg",
  "/images/sky-a.jpg",
  "/images/sky-b.jpg",
  "/images/sky-c.jpg",
  "/images/sky-d.jpg",
  "/images/sky-e.jpg",
  "/images/sky-f.jpg",
  "/images/sky-palm.jpg",
  "/images/sky-burjalarab.jpg",
];

const raw = [
  {
    name: "Emaar Properties",
    tagline: "The master builder behind Downtown Dubai and Dubai Hills Estate.",
    from: "AED 1.1M",
    projects: 5,
  },
  {
    name: "DAMAC Properties",
    tagline: "Signature branded homes and resort-style living.",
    from: "AED 1.25M",
    projects: 5,
  },
  {
    name: "Sobha Realty",
    tagline: "An unmatched focus on detail and lasting waterfront communities.",
    from: "AED 975K",
    projects: 5,
  },
  {
    name: "Nakheel",
    tagline:
      "The master developer behind Palm Jumeirah and Dubai's iconic waterfronts.",
    from: "AED 4M",
    projects: 4,
  },
  {
    name: "Meraas",
    tagline: "The name behind City Walk, Bluewaters and La Mer.",
    from: "AED 1.75M",
    projects: 5,
  },
  {
    name: "Ellington Properties",
    tagline: "Dubai's design-led developer of art-inspired luxury homes.",
    from: "AED 1.1M",
    projects: 5,
  },
  {
    name: "Binghatti",
    tagline: "Fast-moving, standout modern architecture across the city.",
    from: "AED 775K",
    projects: 5,
  },
  {
    name: "Danube Properties",
    tagline: "Affordable luxury with flexible, buyer-friendly payment plans.",
    from: "AED 650K",
    projects: 5,
  },
  {
    name: "Azizi Developments",
    tagline:
      "One of Dubai's largest private developers of waterfront and lagoon communities.",
    from: "AED 560K",
    projects: 5,
  },
  {
    name: "Samana Developers",
    tagline: "Resort-style homes with private pools, redefining Dubai living.",
    from: "AED 740K",
    projects: 5,
  },
  {
    name: "Aldar Properties",
    tagline:
      "Abu Dhabi's leading developer of island, beachfront and wellness communities.",
    from: "AED 805K",
    projects: 5,
  },
  {
    name: "Dubai Properties",
    tagline:
      "Master-community developer behind JBR, Business Bay and Dubailand.",
    from: "AED 1.4M",
    projects: 5,
  },
  {
    name: "Omniyat",
    tagline:
      "Dubai's pre-eminent ultra-luxury developer of branded residences.",
    from: "AED 17.5M",
    projects: 5,
  },
  {
    name: "Deyaar Development",
    tagline:
      "A pioneering developer of branded waterfront and city homes since 2002.",
    projects: 5,
  },
  {
    name: "Select Group",
    tagline: "Award-winning developer of landmark branded residences.",
    projects: 5,
  },
  {
    name: "MAG",
    tagline: "The developer behind the Keturah luxury lifestyle brand.",
    projects: 5,
  },
  {
    name: "Nshama",
    tagline: "Master-planned town communities built for connected family living.",
    projects: 4,
  },
];

export const developers = raw.map((d, i) => ({
  ...d,
  image: IMAGES[i % IMAGES.length],
}));
