import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationComponent } from '../components/notification/notification.component';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let config: MatSnackBarConfig;
  let service: NotificationService;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ],
      providers: [NotificationService]
    });

    service = TestBed.get(NotificationService);
    snackbar = TestBed.get(MatSnackBar);
    config = {
      panelClass: '',
      data: { title: 'Test', content: 'Schnitzel' }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('info notification', () => {
    it('should display a info message', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'info';
      config.duration = 10000;

      service.info(config.data.title, config.data.content);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });

    it('should display a info message with custom duration', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'info';
      config.duration = 5000;

      service.info(config.data.title, config.data.content, config.duration);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });
  });

  describe('warning notification', () => {
    it('should display a warning message', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'warning';
      config.duration = 10000;

      service.warning(config.data.title, config.data.content);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });

    it('should display a warning message with custom duration', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'warning';
      config.duration = 5000;

      service.warning(config.data.title, config.data.content, config.duration);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });
  });

  describe('error notification', () => {
    it('should display a error message', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'error';
      config.duration = 20000;

      service.error(config.data.title, config.data.content);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });

    it('should display a error message with custom duration', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'error';
      config.duration = 5000;

      service.error(config.data.title, config.data.content, config.duration);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });
  });

  describe('success notification', () => {
    it('should display a success message', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'success';
      config.duration = 10000;

      service.success(config.data.title, config.data.content);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });
    it('should display a success message with custom duration', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'success';
      config.duration = 5000;

      service.success(config.data.title, config.data.content, config.duration);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });
  });

  describe('fatal notification', () => {
    let err: any;

    beforeEach(() => {
      err = { errorDescription: config.data.content, errorCode: config.data.title };
    });

    it('should display a fatal message', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'error';
      config.duration = 20000;
      config.data = {
        title: 'Unerwarteter Fehler',
        content: JSON.stringify(err)
      };

      service.fatal(err);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });

    it('should display a fatal message with custom duration', () => {
      spyOn(snackbar, 'openFromComponent');
      config.panelClass = 'error';
      config.duration = 5000;
      config.data = {
        title: 'Unerwarteter Fehler',
        content: JSON.stringify(err)
      };

      service.fatal(err, config.duration);

      expect(snackbar.openFromComponent).toHaveBeenCalledWith(NotificationComponent, config);
    });
  });

  it('should clear snacks', () => {
    spyOn(snackbar, 'dismiss');

    service.clear();

    expect(snackbar.dismiss).toHaveBeenCalledTimes(1);
  });
});
