import { RoleDetailPageModule } from './role-detail-page.module';

describe('RoleDetailPageModule', () => {
  let roleDetailPageModule: RoleDetailPageModule;

  beforeEach(() => {
    roleDetailPageModule = new RoleDetailPageModule();
  });

  it('should create an instance', () => {
    expect(roleDetailPageModule).toBeTruthy();
  });
});
