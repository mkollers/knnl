import { PermissionsPageModule } from './permissions-page.module';

describe('PermissionsPageModule', () => {
  let permissionsPageModule: PermissionsPageModule;

  beforeEach(() => {
    permissionsPageModule = new PermissionsPageModule();
  });

  it('should create an instance', () => {
    expect(permissionsPageModule).toBeTruthy();
  });
});
