import { UserListPageModule } from './user-list-page.module';

describe('UserListPageModule', () => {
  let userListPageModule: UserListPageModule;

  beforeEach(() => {
    userListPageModule = new UserListPageModule();
  });

  it('should create an instance', () => {
    expect(userListPageModule).toBeTruthy();
  });
});
