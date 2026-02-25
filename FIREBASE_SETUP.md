# 🔥 Panduan Setup Firebase — Agency App

## Langkah 1: Buat Firebase Project

1. Buka [https://console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Add project"**
3. Nama project: `agency-pm-system` (bebas)
4. Disable Google Analytics (opsional)
5. Klik **"Create project"**

---

## Langkah 2: Setup Firestore Database

1. Di sidebar kiri → **Build → Firestore Database**
2. Klik **"Create database"**
3. Pilih **"Start in test mode"** (untuk development)
4. Pilih region: `asia-southeast1` (Singapore — paling dekat dari Indonesia)
5. Klik **"Enable"**

---

## Langkah 3: Ambil Config & Paste ke App

1. Di sidebar → **Project Settings** (ikon ⚙️)
2. Tab **General** → scroll ke **"Your apps"**
3. Klik ikon **`</>`** (Web app)
4. Nama app: `agency-app` → klik **"Register app"**
5. Copy seluruh objek `firebaseConfig`
6. Paste ke file **`src/lib/firebase.ts`** menggantikan placeholder

```ts
// Contoh setelah dipaste:
const firebaseConfig = {
  apiKey: "AIzaSyB....",
  authDomain: "agency-pm-system.firebaseapp.com",
  projectId: "agency-pm-system",
  storageBucket: "agency-pm-system.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

---

## Langkah 4: Install Firebase SDK

```bash
npm install firebase
```

---

## Langkah 5: Seed data awal ke Firestore

Jalankan fungsi `seedFirestore()` **sekali saja** untuk memindahkan
data dummy ke Firestore. Cara paling mudah lewat browser console:

```ts
// Tambahkan sementara di App.tsx atau component mana saja:
import { seedFirestore } from './lib/firestore';

// Di dalam useEffect atau button onClick:
await seedFirestore(); // lihat hasilnya di console
```

Setelah selesai, hapus baris import + call tersebut.

---

## Langkah 6: Ganti komponen ke Firebase hooks

Setelah data ada di Firestore, ganti import di komponen satu per satu:

### Dashboard.tsx
```ts
// BEFORE (mock data):
import { currentCampaigns } from './data/mock';

// AFTER (Firebase):
import { useCampaigns } from '../../hooks/useCampaigns';
const { campaigns, loading, error } = useCampaigns();
```

### CampaignDetail.tsx
```ts
// BEFORE:
const campaign = campaignData[campaignId];

// AFTER:
import { useCampaignById } from '../../hooks/useCampaigns';
const { campaign, loading } = useCampaignById(String(campaignId));
```

### KOLManagementTab.tsx
```ts
// BEFORE:
const [kolList, setKolList] = useState(kolDataByCampaign[campaignId]);

// AFTER:
import { useKOLsByCampaign } from '../../hooks/useKOLs';
const { kols, loading, savePerformance } = useKOLsByCampaign(String(campaignId));
```

---

## Struktur Koleksi Firestore

```
/campaigns
  /{campaignId}               ← Campaign document
    /kols/{kolId}             ← KOL subcollection
    /invoices/{invoiceId}     ← Invoice subcollection

/kol_profiles
  /{profileId}                ← KOL global database
```

---

## Firestore Security Rules (production)

Ganti rules di Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Saat ini: allow semua (DEVELOPMENT ONLY!)
    match /{document=**} {
      allow read, write: if true;
    }
    
    // TODO setelah tambah Firebase Auth:
    // allow read, write: if request.auth != null;
  }
}
```

---

## File yang dibuat

| File | Fungsi |
|------|--------|
| `src/lib/firebase.ts` | Firebase app init + config |
| `src/lib/firestore.ts` | Semua CRUD operations |
| `src/hooks/useCampaigns.ts` | Hook: fetch campaigns |
| `src/hooks/useKOLs.ts` | Hook: fetch & update KOL |
| `src/hooks/useInvoices.ts` | Hook: fetch & update invoices |
| `src/types/index.ts` | Semua TypeScript types |
