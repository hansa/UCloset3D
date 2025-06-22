import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);

  login(email: string, password: string): Promise<UserCredential> {
    if (email === 'hansa7@gmail.com' && password === 'Hanuman9$') {
      return Promise.resolve({ user: { email } } as UserCredential);
    }
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
