// services/api.js — Mock API layer (swap URLs for real backend)

const delay = (ms = 600) => new Promise(res => setTimeout(res, ms));

export const vehicleService = {
  async verify({ type, plate, chassis }) {
    await delay(800);
    if (!type || !plate || !chassis) throw new Error('Champs manquants');
    // Mock: any valid input succeeds
    return {
      id: 'VEH-' + Math.random().toString(36).slice(2,8).toUpperCase(),
      plate,
      chassis,
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2019,
      lastVisit: '2023-04-12',
      nextDue: '2025-04-12',
      category: 'VP',
    };
  }
};

export const centreService = {
  async getCentres(villeId) {
    await delay(400);
    const data = {
      tunis: [
        { id: 'c1', name: 'Centre Montplaisir', address: 'Rue Montplaisir, 1073 Tunis' },
        { id: 'c2', name: 'Centre Lac Tunis', address: 'Centre Urbain Nord, Tunis' },
        { id: 'c3', name: 'Centre Ariana', address: 'Ariana, Grand Tunis' },
      ],
      sfax: [
        { id: 'c4', name: 'Centre Sfax Nord', address: 'Rue Okba Ibn Nafaa, Sfax' },
        { id: 'c5', name: 'Centre Sfax Sud', address: 'Route de Gabès, Sfax' },
      ],
      monastir: [
        { id: 'c6', name: 'Centre Manzel Hayet', address: 'Manzel Hayet, Monastir' },
      ],
      sousse: [
        { id: 'c7', name: 'Centre Sousse Ville', address: 'Avenue Habib Bourguiba, Sousse' },
        { id: 'c8', name: 'Centre Hammam Sousse', address: 'Hammam Sousse, Sousse' },
      ],
      kairouan: [
        { id: 'c9', name: 'Centre Kairouan', address: 'Route de Tunis, Kairouan' },
      ],
    };
    return data[villeId] || [];
  },

  async getSlots(centreId, date) {
    await delay(700);
    const base = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00'];
    const fullIndexes = [2, 5, 9]; // simulate some full slots
    return base.map((time, i) => ({
      id: `slot-${i}`,
      time,
      available: !fullIndexes.includes(i),
      spots: fullIndexes.includes(i) ? 0 : Math.floor(Math.random() * 4) + 1,
    }));
  }
};

export const reservationService = {
  async create(data) {
    await delay(1200);
    return {
      id: 'RDV-' + Date.now().toString(36).toUpperCase(),
      ...data,
      amount: 85,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
  }
};

export const paymentService = {
  async pay({ reservationId, method, cardData }) {
    await delay(1500);
    return {
      transactionId: 'TXN-' + Math.random().toString(36).slice(2,10).toUpperCase(),
      reservationId,
      status: 'success',
      amount: 85,
      paidAt: new Date().toISOString(),
    };
  }
};

export const quittanceService = {
  async find({ type, plate, chassis }) {
    await delay(900);
    return {
      id: 'QIT-' + Math.random().toString(36).slice(2,8).toUpperCase(),
      plate,
      date: '2025-03-15',
      centre: 'Centre Montplaisir',
      amount: 85,
      status: 'paid',
    };
  }
};

export const villes = [
  { id: 'tunis', label: 'Tunis' },
  { id: 'sfax', label: 'Sfax' },
  { id: 'monastir', label: 'Monastir' },
  { id: 'sousse', label: 'Sousse' },
  { id: 'kairouan', label: 'Kairouan' },
];
