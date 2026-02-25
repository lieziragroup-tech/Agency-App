// ============================================================
// src/lib/firebase.ts
// Firebase client setup
//
// CARA SETUP:
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru → nama bebas (misal: "agency-pm-system")
// 3. Aktifkan Firestore Database (mode "production" atau "test")
// 4. Pergi ke Project Settings → General → "Your apps"
// 5. Klik ikon </> (Web app) → Register app → copy firebaseConfig
// 6. Paste config di bawah menggantikan placeholder
// 7. Jalankan: npm install firebase
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';

// TODO: Ganti dengan config dari Firebase Console kamu
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY",
  authDomain:        "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId:         "PASTE_YOUR_PROJECT_ID",
  storageBucket:     "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId:             "PASTE_YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ============================================================
// STRUKTUR KOLEKSI FIRESTORE:
//
// /campaigns          → Collection
//   /{campaignId}     → Document (Campaign)
//
// /campaigns/{id}/kols        → Subcollection (KOL per kampanye)
// /campaigns/{id}/invoices    → Subcollection (Invoice per kampanye)
//
// /kol_profiles       → Collection (database KOL global)
// ============================================================
