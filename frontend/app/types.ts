export type Scent = {
  scentId: string;
  name: string;
  year: number;
  gender: string;
  photoUrl: string;
  house: string;
  collection: string;
  accords: Record<string, number>;
};

export const scents: Scent[] = [
  { scentId: "1", name: "Cedar & Smoke", year: 2022, gender: "unisex", photoUrl: "", house: "Atelier Nocturne", collection: "Signature", accords: { Woody: 90, Smoky: 72, "Warm Spicy": 56, Leathery: 44 } },
  { scentId: "2", name: "Salt Garden", year: 2021, gender: "unisex", photoUrl: "", house: "Maison Brume", collection: "Coast", accords: { Aquatic: 88, Green: 60, Salty: 52, Woody: 30 } },
  { scentId: "3", name: "Late Fig", year: 2023, gender: "women", photoUrl: "", house: "Olio Studio", collection: "Orchard", accords: { Green: 85, Fruity: 70, Creamy: 48, Woody: 25 } },
  { scentId: "4", name: "Velvet Hour", year: 2020, gender: "unisex", photoUrl: "", house: "Atelier Nocturne", collection: "Signature", accords: { Amber: 92, Vanilla: 78, Balsamic: 55, Sweet: 40 } },
  { scentId: "5", name: "Morning Peel", year: 2024, gender: "men", photoUrl: "", house: "Olio Studio", collection: "Orchard", accords: { Citrus: 95, Fresh: 70, Floral: 35, Musky: 20 } },
  { scentId: "6", name: "Rose Ledger", year: 2019, gender: "women", photoUrl: "", house: "Hartwell & Finch", collection: "Archive", accords: { Floral: 90, Rose: 82, Earthy: 45, Powdery: 30 } },
  { scentId: "7", name: "Burnt Sugar", year: 2023, gender: "unisex", photoUrl: "", house: "Hartwell & Finch", collection: "Archive", accords: { Gourmand: 90, Sweet: 80, Coffee: 58, Vanilla: 46 } },
  { scentId: "8", name: "Skin Study", year: 2022, gender: "unisex", photoUrl: "", house: "Olio Studio", collection: "Minimal", accords: { Musky: 92, Powdery: 60, Woody: 38, Floral: 25 } },
  { scentId: "9", name: "Iris Letters", year: 2018, gender: "women", photoUrl: "", house: "Maison Brume", collection: "Coast", accords: { Floral: 85, Powdery: 74, Suede: 50, Earthy: 33 } },
  { scentId: "10", name: "Oud Season", year: 2025, gender: "unisex", photoUrl: "", house: "Atelier Nocturne", collection: "Reserve", accords: { Oud: 94, Woody: 80, Warm: 60, Saffron: 42 } },
  { scentId: "11", name: "Lemon Almanac", year: 2021, gender: "men", photoUrl: "", house: "Hartwell & Finch", collection: "Archive", accords: { Citrus: 90, Herbal: 62, Fresh: 55, Woody: 28 } },
  { scentId: "12", name: "Warm Pages", year: 2024, gender: "unisex", photoUrl: "", house: "Olio Studio", collection: "Minimal", accords: { Tobacco: 80, Amber: 70, Vanilla: 58, Paper: 40 } },
];
