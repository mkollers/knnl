import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase';

import { PersonalData } from '../models/personal-data';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let angularFireAuth: AngularFireAuth;
  let db: AngularFirestore;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: AngularFireAuth, useValue: {
            auth: {
              currentUser: { email: 'Indiana@Jones.de' },
              createUserWithEmailAndPassword: () => { },
              signInWithEmailAndPassword: () => { }
            }
          }
        },
        {
          provide: AngularFirestore, useValue: {
            collection: () => { }
          }
        }
      ]
    });
  });

  beforeEach(() => {
    angularFireAuth = TestBed.get(AngularFireAuth);
    db = TestBed.get(AngularFirestore);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an account and an empty user dataset', async () => {
    spyOn(angularFireAuth.auth, 'createUserWithEmailAndPassword').and.returnValue(Promise.resolve());
    const doc = { set: () => { } };
    const collection = { doc: () => doc };
    spyOn(db, 'collection').and.returnValue(collection);
    spyOn(collection, 'doc').and.returnValue(doc);
    spyOn(doc, 'set').and.returnValue(Promise.resolve());

    await service.register('Indiana@Jones.de', 'SlapMe');

    expect(db.collection).toHaveBeenCalledWith('users');
    expect(collection.doc).toHaveBeenCalledWith('Indiana@Jones.de');
    expect(doc.set).toHaveBeenCalledWith({}, { merge: true });
    expect(angularFireAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('Indiana@Jones.de', 'SlapMe');
  });

  it('should set the personal data', async () => {
    const doc = { set: () => { } };
    const collection = { doc: () => doc };
    spyOn(db, 'collection').and.returnValue(collection);
    spyOn(collection, 'doc').and.returnValue(doc);
    spyOn(doc, 'set').and.returnValue(Promise.resolve());
    const data: PersonalData = { firstname: 'Indiana', lastname: 'Jones', dob: null, interests: '', mobile: '' };

    await service.setPersonalData(data);

    expect(db.collection).toHaveBeenCalledWith('users');
    expect(collection.doc).toHaveBeenCalledWith('Indiana@Jones.de');
    expect(doc.set).toHaveBeenCalledWith(data, { merge: true });
  });

  it('should set the data protection settings', async () => {
    const doc = { set: () => { } };
    const collection = { doc: () => doc };
    spyOn(db, 'collection').and.returnValue(collection);
    spyOn(collection, 'doc').and.returnValue(doc);
    spyOn(doc, 'set').and.returnValue(Promise.resolve());

    await service.setDataProtection('news', true);

    expect(db.collection).toHaveBeenCalledWith('users');
    expect(collection.doc).toHaveBeenCalledWith('Indiana@Jones.de');
    expect(doc.set).toHaveBeenCalledWith({ dataProtection: { news: true } }, { merge: true });
  });

  it('should login with email and password', async () => {
    spyOn(angularFireAuth.auth, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve());

    await service.login('Indiana@Jones.de', 'SlapMe');

    expect(angularFireAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith('Indiana@Jones.de', 'SlapMe');
  });
});
