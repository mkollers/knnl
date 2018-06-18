import { RoleListPageModule } from './role-list-page.module';

describe('PermissionsPageModule', () => {
  let roleListPageModule: RoleListPageModule;

  beforeEach(() => {
    roleListPageModule = new RoleListPageModule();
  });

  it('should create an instance', () => {
    expect(roleListPageModule).toBeTruthy();
  });
});
