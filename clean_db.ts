import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function inspectDB() {
  const projectsSnapshot = await getDocs(collection(db, 'projects'));
  
  projectsSnapshot.docs.forEach(projectDoc => {
    console.log(`\n--- ID: ${projectDoc.id} ---`);
    console.log(projectDoc.data());
  });
  process.exit(0);
}

inspectDB().catch(console.error);
