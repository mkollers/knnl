import { TestBed } from '@angular/core/testing';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
  DocumentSnapshot,
} from 'angularfire2/firestore';
import { of as observableOf } from 'rxjs';
import { Mock } from 'ts-mocks/lib';

import { UserService } from './user.service';

describe('UserService', () => {
  // Mocks
  let angularFirestoreMock: Mock<AngularFirestore>;
  let angularFirestoreCollectionMock: Mock<AngularFirestoreCollection>;
  let angularFirestoreDocumentMock: Mock<AngularFirestoreDocument>;

  // Dependencies
  let service: UserService;
  let db: AngularFirestore;

  beforeEach(() => {
    angularFirestoreDocumentMock = new Mock<AngularFirestoreDocument>({ snapshotChanges: () => { } });
    angularFirestoreCollectionMock = new Mock<AngularFirestoreCollection>({ doc: () => angularFirestoreDocumentMock.Object });
    angularFirestoreMock = new Mock<AngularFirestore>({ collection: () => angularFirestoreCollectionMock.Object });

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFirestore, useValue: angularFirestoreMock.Object },
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(UserService);
    db = TestBed.get(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by email', async () => {
    const snapshotMock = new Mock<Action<DocumentSnapshot<DocumentData>>>({ payload: { data: () => { } } });
    angularFirestoreDocumentMock.setup(o => o.snapshotChanges).is(() => observableOf(snapshotMock.Object));

    const user = await service.getByEmail('James@Bond.de').toPromise();
    expect(db.collection).toHaveBeenCalledWith('users');
  });
});
