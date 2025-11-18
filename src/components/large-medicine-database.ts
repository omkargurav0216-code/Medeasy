// Reduced medicine database with 170 medicines for MedEasy app
import { Medicine } from './app-data-service';

const medicineImages = {
  pills: 'https://images.unsplash.com/photo-1668453569370-789848f41ebe?w=400',
  capsules: 'https://images.unsplash.com/photo-1761361414308-b1b683d1f33a?w=400',
  bottle: 'https://images.unsplash.com/photo-1631669969504-f35518bf96ba?w=400',
  syrup: 'https://images.unsplash.com/photo-1700104494922-6edd35d95e27?w=400',
  supplements: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?w=400',
};

export interface MedicineWithImage extends Medicine {
  imageUrl: string;
  rating: number;
  reviews: number;
}

const generateMedicines = (): MedicineWithImage[] => {
  const medicines: MedicineWithImage[] = [];
  let id = 1;

  // Pain Relief Medicines (30+ items)
  const painRelief = [
    { name: 'Paracetamol', dosages: ['500mg', '650mg', '1000mg'], price: [30, 40, 50], desc: 'Pain relief and fever reducer', mfr: ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s'] },
    { name: 'Ibuprofen', dosages: ['200mg', '400mg', '600mg'], price: [45, 60, 75], desc: 'Anti-inflammatory pain reliever', mfr: ['Abbott', 'Lupin', 'Zydus'] },
    { name: 'Diclofenac', dosages: ['50mg', '100mg'], price: [55, 70], desc: 'NSAID for pain and inflammation', mfr: ['Novartis', 'Sun Pharma'] },
    { name: 'Aceclofenac', dosages: ['100mg', '200mg'], price: [65, 80], desc: 'Pain and inflammation relief', mfr: ['Ipca', 'Alkem'] },
    { name: 'Naproxen', dosages: ['250mg', '500mg'], price: [70, 90], desc: 'Long-acting pain reliever', mfr: ['Glenmark', 'Torrent'] },
    { name: 'Tramadol', dosages: ['50mg', '100mg'], price: [120, 150], desc: 'Moderate to severe pain relief', mfr: ['Sun Pharma', 'Alembic'] },
    { name: 'Aspirin', dosages: ['75mg', '150mg', '325mg'], price: [40, 50, 60], desc: 'Blood thinner and pain relief', mfr: ['Bayer', 'Cipla', 'Cadila'] },
    { name: 'Etoricoxib', dosages: ['60mg', '90mg', '120mg'], price: [85, 100, 120], desc: 'COX-2 inhibitor for pain', mfr: ['MSD', 'Glenmark', 'Alkem'] },
    { name: 'Ketorolac', dosages: ['10mg'], price: [110], desc: 'Short-term pain management', mfr: ['Intas'] },
    { name: 'Piroxicam', dosages: ['10mg', '20mg'], price: [75, 95], desc: 'NSAID for arthritis pain', mfr: ['Pfizer', 'Sun Pharma'] },
  ];

  painRelief.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: 'strip',
        category: 'Pain Relief',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.1,
        imageUrl: medicineImages.pills,
        rating: 3.5 + Math.random() * 1.5,
        reviews: Math.floor(Math.random() * 500) + 50
      });
    });
  });

  // Antibiotics (28 items)
  const antibiotics = [
    { name: 'Amoxicillin', dosages: ['250mg', '500mg', '875mg'], price: [100, 120, 150], desc: 'Broad-spectrum antibiotic', mfr: ['Cipla', 'Lupin', 'Sun Pharma'] },
    { name: 'Azithromycin', dosages: ['250mg', '500mg'], price: [140, 180], desc: 'Macrolide antibiotic', mfr: ['Pfizer', 'Cipla'] },
    { name: 'Ciprofloxacin', dosages: ['250mg', '500mg', '750mg'], price: [90, 110, 140], desc: 'Fluoroquinolone antibiotic', mfr: ['Ranbaxy', 'Dr. Reddy\'s', 'Zydus'] },
    { name: 'Doxycycline', dosages: ['100mg'], price: [130], desc: 'Tetracycline antibiotic', mfr: ['Abbott'] },
    { name: 'Cephalexin', dosages: ['250mg', '500mg'], price: [115, 145], desc: 'Cephalosporin antibiotic', mfr: ['Sun Pharma', 'Alkem'] },
    { name: 'Metronidazole', dosages: ['200mg', '400mg'], price: [75, 95], desc: 'Antibiotic and antiprotozoal', mfr: ['Abbott', 'Ipca'] },
    { name: 'Levofloxacin', dosages: ['250mg', '500mg', '750mg'], price: [130, 160, 200], desc: 'Fluoroquinolone antibiotic', mfr: ['Glenmark', 'Cipla', 'Sun Pharma'] },
    { name: 'Clarithromycin', dosages: ['250mg', '500mg'], price: [170, 220], desc: 'Macrolide antibiotic', mfr: ['Abbott', 'Cipla'] },
    { name: 'Cefixime', dosages: ['100mg', '200mg', '400mg'], price: [145, 185, 220], desc: 'Third-generation cephalosporin', mfr: ['Alkem', 'Sun Pharma', 'Cipla'] },
    { name: 'Ofloxacin', dosages: ['200mg', '400mg'], price: [95, 125], desc: 'Fluoroquinolone antibiotic', mfr: ['Cipla', 'Ranbaxy'] },
  ];

  antibiotics.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: 'strip',
        category: 'Antibiotic',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.15,
        imageUrl: medicineImages.capsules,
        rating: 4 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 400) + 100
      });
    });
  });

  // Cardiovascular Medicines (33 items)
  const cardiovascular = [
    { name: 'Atorvastatin', dosages: ['10mg', '20mg', '40mg', '80mg'], price: [110, 130, 160, 200], desc: 'Cholesterol medication', mfr: ['Pfizer', 'Ranbaxy', 'Dr. Reddy\'s', 'Cipla'] },
    { name: 'Metoprolol', dosages: ['25mg', '50mg', '100mg'], price: [85, 105, 135], desc: 'Beta-blocker for hypertension', mfr: ['Cipla', 'Sun Pharma', 'Alkem'] },
    { name: 'Amlodipine', dosages: ['2.5mg', '5mg', '10mg'], price: [65, 80, 100], desc: 'Calcium channel blocker', mfr: ['Pfizer', 'Cipla', 'Lupin'] },
    { name: 'Ramipril', dosages: ['2.5mg', '5mg', '10mg'], price: [95, 115, 145], desc: 'ACE inhibitor for blood pressure', mfr: ['Aventis', 'Sun Pharma', 'Cipla'] },
    { name: 'Losartan', dosages: ['25mg', '50mg', '100mg'], price: [105, 125, 160], desc: 'Angiotensin receptor blocker', mfr: ['MSD', 'Cipla', 'Alkem'] },
    { name: 'Clopidogrel', dosages: ['75mg'], price: [185], desc: 'Antiplatelet medication', mfr: ['Plavix'] },
    { name: 'Rosuvastatin', dosages: ['5mg', '10mg', '20mg'], price: [125, 155, 190], desc: 'Statin for cholesterol', mfr: ['AstraZeneca', 'Sun Pharma', 'Cipla'] },
    { name: 'Diltiazem', dosages: ['30mg', '60mg', '90mg'], price: [90, 110, 135], desc: 'Calcium channel blocker', mfr: ['Abbott', 'Cipla', 'Alkem'] },
    { name: 'Enalapril', dosages: ['2.5mg', '5mg', '10mg'], price: [75, 95, 120], desc: 'ACE inhibitor', mfr: ['MSD', 'Cipla', 'Lupin'] },
    { name: 'Carvedilol', dosages: ['6.25mg', '12.5mg', '25mg'], price: [115, 140, 175], desc: 'Beta-blocker', mfr: ['Roche', 'Sun Pharma', 'Cipla'] },
  ];

  cardiovascular.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: 'strip',
        category: 'Cardiovascular',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.12,
        imageUrl: medicineImages.pills,
        rating: 4.2 + Math.random() * 0.8,
        reviews: Math.floor(Math.random() * 450) + 150
      });
    });
  });

  // Diabetes Medicines (22 items)
  const diabetes = [
    { name: 'Metformin', dosages: ['500mg', '850mg', '1000mg'], price: [90, 110, 130], desc: 'First-line diabetes medication', mfr: ['USV', 'Sun Pharma', 'Cipla'] },
    { name: 'Glimepiride', dosages: ['1mg', '2mg', '4mg'], price: [85, 105, 130], desc: 'Sulfonylurea for type 2 diabetes', mfr: ['Aventis', 'Cipla', 'Sun Pharma'] },
    { name: 'Sitagliptin', dosages: ['50mg', '100mg'], price: [240, 290], desc: 'DPP-4 inhibitor', mfr: ['MSD', 'Sun Pharma'] },
    { name: 'Vildagliptin', dosages: ['50mg'], price: [220], desc: 'DPP-4 inhibitor for diabetes', mfr: ['Novartis'] },
    { name: 'Gliclazide', dosages: ['40mg', '80mg'], price: [95, 120], desc: 'Sulfonylurea medication', mfr: ['Serdia', 'Cipla'] },
    { name: 'Pioglitazone', dosages: ['15mg', '30mg', '45mg'], price: [135, 165, 195], desc: 'Thiazolidinedione for diabetes', mfr: ['Takeda', 'Sun Pharma', 'Cipla'] },
    { name: 'Glipizide', dosages: ['5mg', '10mg'], price: [75, 95], desc: 'Sulfonylurea for blood sugar', mfr: ['Pfizer', 'Cipla'] },
  ];

  diabetes.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: 'strip',
        category: 'Diabetes',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.08,
        imageUrl: medicineImages.pills,
        rating: 4.1 + Math.random() * 0.9,
        reviews: Math.floor(Math.random() * 400) + 150
      });
    });
  });

  // Allergy & Respiratory (20 items)
  const allergy = [
    { name: 'Cetirizine', dosages: ['5mg', '10mg'], price: [35, 45], desc: 'Antihistamine for allergies', mfr: ['Zydus', 'Cipla'] },
    { name: 'Levocetirizine', dosages: ['5mg'], price: [55], desc: 'Advanced antihistamine', mfr: ['UCB'] },
    { name: 'Fexofenadine', dosages: ['120mg', '180mg'], price: [65, 85], desc: 'Non-drowsy antihistamine', mfr: ['Aventis', 'Cipla'] },
    { name: 'Montelukast', dosages: ['5mg', '10mg'], price: [135, 165], desc: 'Leukotriene inhibitor for asthma', mfr: ['MSD', 'Cipla'] },
    { name: 'Salbutamol', dosages: ['2mg', '4mg'], price: [45, 65], desc: 'Bronchodilator for asthma', mfr: ['GSK', 'Cipla'] },
    { name: 'Budesonide', dosages: ['100mcg', '200mcg'], price: [185, 245], desc: 'Inhaled corticosteroid', mfr: ['AstraZeneca', 'Cipla'] },
    { name: 'Desloratadine', dosages: ['5mg'], price: [75], desc: 'Long-acting antihistamine', mfr: ['MSD'] },
    { name: 'Prednisolone', dosages: ['5mg', '10mg'], price: [55, 75], desc: 'Corticosteroid for inflammation', mfr: ['Wyeth', 'Cipla'] },
  ];

  allergy.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: 'strip',
        category: 'Allergy & Respiratory',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.1,
        imageUrl: medicineImages.capsules,
        rating: 4 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 350) + 100
      });
    });
  });

  // Digestive & Gastro (20 items)
  const digestive = [
    { name: 'Omeprazole', dosages: ['20mg', '40mg'], price: [90, 120], desc: 'Proton pump inhibitor', mfr: ['AstraZeneca', 'Torrent'] },
    { name: 'Pantoprazole', dosages: ['20mg', '40mg'], price: [95, 125], desc: 'PPI for acid reflux', mfr: ['Wyeth', 'Sun Pharma'] },
    { name: 'Rabeprazole', dosages: ['20mg'], price: [105], desc: 'Proton pump inhibitor', mfr: ['Eisai'] },
    { name: 'Esomeprazole', dosages: ['20mg', '40mg'], price: [110, 145], desc: 'Advanced PPI', mfr: ['AstraZeneca', 'Cipla'] },
    { name: 'Ranitidine', dosages: ['150mg'], price: [55], desc: 'H2 blocker for acidity', mfr: ['GSK'] },
    { name: 'Domperidone', dosages: ['10mg'], price: [65], desc: 'Anti-nausea medication', mfr: ['Johnson & Johnson'] },
    { name: 'Ondansetron', dosages: ['4mg', '8mg'], price: [85, 110], desc: 'Antiemetic', mfr: ['GSK', 'Cipla'] },
    { name: 'Loperamide', dosages: ['2mg'], price: [45], desc: 'Anti-diarrheal medication', mfr: ['Johnson & Johnson'] },
    { name: 'Mebeverine', dosages: ['135mg'], price: [95], desc: 'Antispasmodic for IBS', mfr: ['Abbott'] },
  ];

  digestive.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: 'strip',
        category: 'Digestive',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.1,
        imageUrl: medicineImages.capsules,
        rating: 4 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 400) + 100
      });
    });
  });

  // Vitamins & Supplements (28 items)
  const supplements = [
    { name: 'Vitamin D3', dosages: ['1000 IU', '2000 IU', '60000 IU'], price: [15, 20, 25], desc: 'Bone health supplement', mfr: ['Abbott', 'Cipla', 'Sun Pharma'] },
    { name: 'Vitamin C', dosages: ['500mg', '1000mg'], price: [35, 50], desc: 'Immune booster', mfr: ['Redoxon', 'Himalaya'] },
    { name: 'Calcium', dosages: ['500mg', '1000mg'], price: [55, 85], desc: 'Bone strength supplement', mfr: ['Shelcal', 'Cipla'] },
    { name: 'Iron', dosages: ['100mg', '200mg'], price: [65, 85], desc: 'Treats iron deficiency', mfr: ['Abbott', 'Cipla'] },
    { name: 'Multivitamin', dosages: ['Tablet', 'Capsule'], price: [95, 110], desc: 'Complete nutrition', mfr: ['Centrum', 'HealthVit'] },
    { name: 'Omega-3', dosages: ['500mg', '1000mg'], price: [145, 185], desc: 'Heart health supplement', mfr: ['Carlson', 'Nordic'] },
    { name: 'Zinc', dosages: ['25mg', '50mg'], price: [35, 45], desc: 'Immunity booster', mfr: ['Solvay', 'Cipla'] },
    { name: 'Folic Acid', dosages: ['1mg', '5mg'], price: [20, 25], desc: 'Prenatal vitamin', mfr: ['Abbott', 'Cipla'] },
    { name: 'Vitamin B12', dosages: ['500mcg', '1000mcg'], price: [40, 55], desc: 'Energy and nerve health', mfr: ['Abbott', 'Sun Pharma'] },
    { name: 'Biotin', dosages: ['5mg', '10mg'], price: [75, 95], desc: 'Hair and skin health', mfr: ['HealthKart', 'Cipla'] },
  ];

  supplements.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: dosage.includes('IU') ? 'capsule' : 'tablet',
        category: 'Supplements',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.05,
        imageUrl: medicineImages.supplements,
        rating: 4.3 + Math.random() * 0.7,
        reviews: Math.floor(Math.random() * 600) + 200
      });
    });
  });

  // Cough & Cold (15 items)
  const coughCold = [
    { name: 'Cough Syrup', dosages: ['100ml'], price: [85], desc: 'Relief from cough', mfr: ['Dabur', 'Baidyanath'] },
    { name: 'Lozenges', dosages: ['Pack of 10'], price: [45], desc: 'Throat relief', mfr: ['Strepsils', 'Vicks'] },
    { name: 'Pseudoephedrine', dosages: ['30mg', '60mg'], price: [55, 75], desc: 'Decongestant', mfr: ['Pfizer', 'GSK'] },
    { name: 'Dextromethorphan', dosages: ['10mg', '20mg'], price: [65, 85], desc: 'Cough suppressant', mfr: ['Reckitt', 'Cipla'] },
    { name: 'Guaifenesin', dosages: ['100mg'], price: [70], desc: 'Expectorant', mfr: ['Adams', 'Pfizer'] },
    { name: 'Chlorpheniramine', dosages: ['4mg'], price: [35], desc: 'Antihistamine for cold', mfr: ['MSD', 'Cipla'] },
  ];

  coughCold.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: dosage.includes('ml') || dosage.includes('Pack') ? 'bottle' : 'strip',
        category: 'Cough & Cold',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.1,
        imageUrl: dosage.includes('ml') ? medicineImages.syrup : medicineImages.pills,
        rating: 3.8 + Math.random() * 1.2,
        reviews: Math.floor(Math.random() * 400) + 100
      });
    });
  });

  // Antacids (10 items)
  const antacids = [
    { name: 'Antacid Gel', dosages: ['200ml'], price: [75], desc: 'Fast relief from acidity', mfr: ['GSK', 'Cipla'] },
    { name: 'Antacid Tablet', dosages: ['Chewable'], price: [40], desc: 'Quick acidity relief', mfr: ['Digene', 'Gelusil'] },
    { name: 'Sodium Bicarbonate', dosages: ['500mg'], price: [25], desc: 'Neutralizes stomach acid', mfr: ['Abbott', 'Cipla'] },
    { name: 'Magnesium Hydroxide', dosages: ['400mg'], price: [35], desc: 'Antacid and laxative', mfr: ['Milk of Magnesia'] },
  ];

  antacids.forEach(med => {
    med.dosages.forEach((dosage, idx) => {
      medicines.push({
        id: String(id++),
        name: `${med.name} ${dosage}`,
        description: med.desc,
        price: med.price[idx] || med.price[0],
        unit: dosage.includes('ml') ? 'bottle' : 'strip',
        category: 'Antacids',
        manufacturer: med.mfr[idx % med.mfr.length],
        inStock: Math.random() > 0.05,
        imageUrl: dosage.includes('ml') ? medicineImages.syrup : medicineImages.pills,
        rating: 4 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 600) + 200
      });
    });
  });

  return medicines;
};

export const LARGE_MEDICINE_DATABASE = generateMedicines();
