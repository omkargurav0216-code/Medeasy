// Real medicines database with 30 popular Indian medicines
import { Medicine } from './app-data-service';

export interface RealMedicine extends Medicine {
  imageUrl: string;
  rating: number;
  reviews: number;
  prescriptionRequired: boolean;
}

export const REAL_MEDICINES: RealMedicine[] = [
  // 1. Dolo 650 - Most popular paracetamol in India
  {
    id: 'real-1',
    name: 'Dolo 650mg',
    description: 'Paracetamol for fever and pain relief. Trusted by millions of Indians.',
    price: 30,
    unit: 'strip (15 tablets)',
    category: 'Pain Relief',
    manufacturer: 'Micro Labs',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 12543,
    prescriptionRequired: false,
  },
  
  // 2. Crocin Advance
  {
    id: 'real-2',
    name: 'Crocin Advance 500mg',
    description: 'Fast relief from fever and headache with Optizorb technology.',
    price: 35,
    unit: 'strip (15 tablets)',
    category: 'Pain Relief',
    manufacturer: 'GSK',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 9876,
    prescriptionRequired: false,
  },

  // 3. Azithromycin (Azee)
  {
    id: 'real-3',
    name: 'Azee 500mg',
    description: 'Azithromycin antibiotic for bacterial infections.',
    price: 180,
    unit: 'strip (3 tablets)',
    category: 'Antibiotic',
    manufacturer: 'Cipla',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 5432,
    prescriptionRequired: true,
  },

  // 4. Cetirizine (Okacet)
  {
    id: 'real-4',
    name: 'Okacet 10mg',
    description: 'Cetirizine for allergy relief - sneezing, runny nose, itching.',
    price: 45,
    unit: 'strip (10 tablets)',
    category: 'Allergy & Respiratory',
    manufacturer: 'Cipla',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6c6c93a060?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 7654,
    prescriptionRequired: false,
  },

  // 5. Cheston Cold
  {
    id: 'real-5',
    name: 'Cheston Cold Tablet',
    description: 'Complete cold relief - for congestion, runny nose, and headache.',
    price: 55,
    unit: 'strip (10 tablets)',
    category: 'Cough & Cold',
    manufacturer: 'Cipla',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 4321,
    prescriptionRequired: false,
  },

  // 6. Metformin (Glycomet)
  {
    id: 'real-6',
    name: 'Glycomet 500mg',
    description: 'Metformin for type 2 diabetes management.',
    price: 90,
    unit: 'strip (20 tablets)',
    category: 'Diabetes',
    manufacturer: 'USV',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 8765,
    prescriptionRequired: true,
  },

  // 7. Pantoprazole (Pan 40)
  {
    id: 'real-7',
    name: 'Pan 40mg',
    description: 'Pantoprazole for acidity, GERD, and stomach ulcers.',
    price: 110,
    unit: 'strip (15 tablets)',
    category: 'Digestive',
    manufacturer: 'Alkem',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 6789,
    prescriptionRequired: true,
  },

  // 8. Vitamin D3 (Uprise D3)
  {
    id: 'real-8',
    name: 'Uprise D3 60K',
    description: 'Cholecalciferol 60,000 IU for Vitamin D deficiency.',
    price: 25,
    unit: 'capsule',
    category: 'Supplements',
    manufacturer: 'Alkem',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6c6c93a060?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 11234,
    prescriptionRequired: false,
  },

  // 9. Amlodipine (Stamlo)
  {
    id: 'real-9',
    name: 'Stamlo 5mg',
    description: 'Amlodipine for high blood pressure and heart conditions.',
    price: 80,
    unit: 'strip (15 tablets)',
    category: 'Cardiovascular',
    manufacturer: 'Dr. Reddy\'s',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 5678,
    prescriptionRequired: true,
  },

  // 10. Atorvastatin (Atorva)
  {
    id: 'real-10',
    name: 'Atorva 10mg',
    description: 'Atorvastatin for high cholesterol management.',
    price: 130,
    unit: 'strip (15 tablets)',
    category: 'Cardiovascular',
    manufacturer: 'Zydus',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 4567,
    prescriptionRequired: true,
  },

  // 11. Montelukast (Montair)
  {
    id: 'real-11',
    name: 'Montair 10mg',
    description: 'Montelukast for asthma and allergic rhinitis.',
    price: 145,
    unit: 'strip (10 tablets)',
    category: 'Allergy & Respiratory',
    manufacturer: 'Cipla',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 3456,
    prescriptionRequired: true,
  },

  // 12. Levocetir
  {
    id: 'real-12',
    name: 'Levocetir 5mg',
    description: 'Levocetirizine for seasonal allergies and skin rashes.',
    price: 65,
    unit: 'strip (10 tablets)',
    category: 'Allergy & Respiratory',
    manufacturer: 'Sun Pharma',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 2345,
    prescriptionRequired: false,
  },

  // 13. Omez (Omeprazole)
  {
    id: 'real-13',
    name: 'Omez 20mg',
    description: 'Omeprazole for acidity and acid reflux.',
    price: 90,
    unit: 'strip (15 capsules)',
    category: 'Digestive',
    manufacturer: 'Dr. Reddy\'s',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 7890,
    prescriptionRequired: true,
  },

  // 14. Shelcal 500
  {
    id: 'real-14',
    name: 'Shelcal 500',
    description: 'Calcium and Vitamin D3 supplement for bone health.',
    price: 90,
    unit: 'strip (15 tablets)',
    category: 'Supplements',
    manufacturer: 'Elder Pharma',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 6543,
    prescriptionRequired: false,
  },

  // 15. Ecosprin 75
  {
    id: 'real-15',
    name: 'Ecosprin 75mg',
    description: 'Aspirin for heart attack and stroke prevention.',
    price: 40,
    unit: 'strip (14 tablets)',
    category: 'Cardiovascular',
    manufacturer: 'USV',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 9876,
    prescriptionRequired: true,
  },

  // 16. Becosules
  {
    id: 'real-16',
    name: 'Becosules Capsules',
    description: 'Multivitamin with vitamin B complex for energy and immunity.',
    price: 120,
    unit: 'strip (20 capsules)',
    category: 'Supplements',
    manufacturer: 'Pfizer',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6c6c93a060?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 8765,
    prescriptionRequired: false,
  },

  // 17. Augmentin 625
  {
    id: 'real-17',
    name: 'Augmentin 625mg',
    description: 'Amoxicillin + Clavulanic acid for bacterial infections.',
    price: 150,
    unit: 'strip (10 tablets)',
    category: 'Antibiotic',
    manufacturer: 'GSK',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 5432,
    prescriptionRequired: true,
  },

  // 18. Voveran (Diclofenac)
  {
    id: 'real-18',
    name: 'Voveran 50mg',
    description: 'Diclofenac for pain and inflammation relief.',
    price: 70,
    unit: 'strip (10 tablets)',
    category: 'Pain Relief',
    manufacturer: 'Novartis',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 4321,
    prescriptionRequired: true,
  },

  // 19. Combiflam
  {
    id: 'real-19',
    name: 'Combiflam Tablet',
    description: 'Ibuprofen + Paracetamol for effective pain relief.',
    price: 45,
    unit: 'strip (15 tablets)',
    category: 'Pain Relief',
    manufacturer: 'Sanofi',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 10234,
    prescriptionRequired: false,
  },

  // 20. Calpol 500
  {
    id: 'real-20',
    name: 'Calpol 500mg',
    description: 'Paracetamol for children and adults - fever and pain.',
    price: 32,
    unit: 'strip (15 tablets)',
    category: 'Pain Relief',
    manufacturer: 'GSK',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 13456,
    prescriptionRequired: false,
  },

  // 21. Cyclopam
  {
    id: 'real-21',
    name: 'Cyclopam Tablet',
    description: 'Dicyclomine + Paracetamol for abdominal pain and cramps.',
    price: 55,
    unit: 'strip (10 tablets)',
    category: 'Digestive',
    manufacturer: 'Indoco',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 3210,
    prescriptionRequired: false,
  },

  // 22. Sinarest
  {
    id: 'real-22',
    name: 'Sinarest Tablet',
    description: 'Complete cold and flu relief - congestion and headache.',
    price: 48,
    unit: 'strip (10 tablets)',
    category: 'Cough & Cold',
    manufacturer: 'Centaur',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 5678,
    prescriptionRequired: false,
  },

  // 23. D-Cold Total
  {
    id: 'real-23',
    name: 'D-Cold Total',
    description: 'Multi-symptom cold relief - fever, congestion, body ache.',
    price: 52,
    unit: 'strip (10 tablets)',
    category: 'Cough & Cold',
    manufacturer: 'Paras Pharma',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6c6c93a060?w=400&h=400&fit=crop',
    rating: 4.2,
    reviews: 4567,
    prescriptionRequired: false,
  },

  // 24. Disprin
  {
    id: 'real-24',
    name: 'Disprin Regular',
    description: 'Aspirin for fast pain relief - headache, toothache, fever.',
    price: 38,
    unit: 'strip (12 tablets)',
    category: 'Pain Relief',
    manufacturer: 'Reckitt Benckiser',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 8901,
    prescriptionRequired: false,
  },

  // 25. Norflox TZ
  {
    id: 'real-25',
    name: 'Norflox TZ',
    description: 'Norfloxacin + Tinidazole for diarrhea and dysentery.',
    price: 95,
    unit: 'strip (10 tablets)',
    category: 'Antibiotic',
    manufacturer: 'Cipla',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 3456,
    prescriptionRequired: true,
  },

  // 26. Neurobion Forte
  {
    id: 'real-26',
    name: 'Neurobion Forte',
    description: 'Vitamin B complex for nerve health and energy.',
    price: 85,
    unit: 'strip (15 tablets)',
    category: 'Supplements',
    manufacturer: 'Procter & Gamble',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 7654,
    prescriptionRequired: false,
  },

  // 27. Digene Gel
  {
    id: 'real-27',
    name: 'Digene Gel',
    description: 'Antacid gel for instant relief from acidity and gas.',
    price: 75,
    unit: 'bottle (200ml)',
    category: 'Antacids',
    manufacturer: 'Abbott',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 9876,
    prescriptionRequired: false,
  },

  // 28. ENO Fruit Salt
  {
    id: 'real-28',
    name: 'ENO Regular',
    description: 'Fast relief from acidity, gas, and indigestion.',
    price: 85,
    unit: 'bottle (100g)',
    category: 'Antacids',
    manufacturer: 'GSK',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 15678,
    prescriptionRequired: false,
  },

  // 29. Livogen Z
  {
    id: 'real-29',
    name: 'Livogen Z Capsules',
    description: 'Iron, folic acid, and zinc for anemia and weakness.',
    price: 95,
    unit: 'strip (15 capsules)',
    category: 'Supplements',
    manufacturer: 'Merck',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 5432,
    prescriptionRequired: false,
  },

  // 30. Zincovit
  {
    id: 'real-30',
    name: 'Zincovit Tablets',
    description: 'Multivitamin with zinc for immunity and overall health.',
    price: 110,
    unit: 'strip (15 tablets)',
    category: 'Supplements',
    manufacturer: 'Apex Laboratories',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6c6c93a060?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 8765,
    prescriptionRequired: false,
  },
];
