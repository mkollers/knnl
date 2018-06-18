import { UserDetailPageModule } from './user-detail-page.module';

describe('UserDetailPageModule', () => {
  let userDetailPageModule: UserDetailPageModule;

  beforeEach(() => {
    userDetailPageModule = new UserDetailPageModule();
  });

  it('should create an instance', () => {
    expect(userDetailPageModule).toBeTruthy();
  });
});
