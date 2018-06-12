import { TestBed } from '@angular/core/testing';
import { AngularFireAction, AngularFireDatabase, AngularFireObject, DatabaseSnapshot } from 'angularfire2/database';
import { of as observableOf } from 'rxjs';
import { Mock } from 'ts-mocks/lib';

import { PersonalData } from '../../auth/models/personal-data';
import { User } from '../models/user';
import { UserService } from './user.service';

describe('UserService', () => {
  // Mocks
  let angularFireDatabaseMock: Mock<AngularFireDatabase>;
  let angularFireObjectMock: Mock<AngularFireObject<User>>;

  // Providers
  let service: UserService;
  let db: AngularFireDatabase;

  beforeEach(() => {
    angularFireObjectMock = new Mock<AngularFireObject<User>>({
      snapshotChanges: () => { },
      update: () => { }
    });
    angularFireDatabaseMock = new Mock<AngularFireDatabase>({ object: () => angularFireObjectMock.Object });

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseMock.Object },
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(UserService);
    db = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const uid = 'cqSUnC0IjgQ22GG1bOHVc7EIJD33';

  it('should get user by uid', async () => {
    const snapshotMock = new Mock<AngularFireAction<DatabaseSnapshot<User>>>({ payload: { key: '', val: () => { } } });
    angularFireObjectMock.setup(o => o.snapshotChanges).is(() => observableOf(snapshotMock.Object));

    await service.getByUid(uid).toPromise();
    expect(db.object).toHaveBeenCalledWith(`users/${uid}`);
  });

  it('should set the personal data', async () => {
    angularFireObjectMock.setup(o => o.update).is(() => Promise.resolve());
    const data: PersonalData = { email: 'Indiana@Jones.de', firstname: 'Indiana', lastname: 'Jones', dob: null, interests: '', mobile: '' };

    await service.setPersonalData(uid, data);

    expect(db.object).toHaveBeenCalledWith(`users/${uid}`);
    expect(angularFireObjectMock.Object.update).toHaveBeenCalledWith(data);
  });

  it('should set the data protection settings', async () => {
    angularFireObjectMock.setup(o => o.update).is(() => Promise.resolve());

    await service.setDataProtection(uid, 'news', true);

    expect(db.object).toHaveBeenCalledWith(`users/${uid}/dataProtection`);
    expect(angularFireObjectMock.Object.update).toHaveBeenCalledWith({ news: true });
  });
});
