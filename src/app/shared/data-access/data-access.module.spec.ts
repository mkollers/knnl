import { DataAccessModule } from './data-access.module';

describe('DataAccessModule', () => {
  let dataAccessModule: DataAccessModule;

  beforeEach(() => {
    dataAccessModule = new DataAccessModule();
  });

  it('should create an instance', () => {
    expect(dataAccessModule).toBeTruthy();
  });
});
