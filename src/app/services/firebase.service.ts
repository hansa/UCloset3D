import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private storage = getStorage(this.app);
  private db = getFirestore(this.app);

  async uploadFile(file: File): Promise<string> {
    const fileRef = ref(this.storage, `uploads/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  async saveOutfit(data: any): Promise<void> {
    await addDoc(collection(this.db, 'outfits'), data);
  }

  async getOutfits(): Promise<any[]> {
    const snapshot = await getDocs(collection(this.db, 'outfits'));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}
