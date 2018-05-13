import { RegisterPageModule } from './register-page.module';

describe('RegisterPageModule', () => {
  let registerPageModule: RegisterPageModule;

  beforeEach(() => {
    registerPageModule = new RegisterPageModule();
  });

  it('should create an instance', () => {
    expect(registerPageModule).toBeTruthy();
  });
});
