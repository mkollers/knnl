import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './shared/auth/services/auth.service';
import { User } from './shared/data-access/models/user';
import { UserService } from './shared/data-access/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user$: Observable<User>;

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    authService: AuthService,
    userService: UserService
  ) {
    this.user$ = authService.authState$.pipe(
      map(state => state.email),
      switchMap(email => userService.getByEmail(email))
    );

    this.registerIcons();
  }

  /** Registers all required svg-icons for the whole application */
  private registerIcons() {
    // material icons
    this.registerIcon('material', 'outline-close');
    this.registerIcon('material', 'outline-done_all');
    this.registerIcon('material', 'outline-edit');
    this.registerIcon('material', 'outline-whatshot');
  }

  /** Registers one icon for a namespace. Requires the svg to be under "assets/icons/${namespace}/${name}.svg" */
  private registerIcon(namespace: string, name: string) {
    const url = `assets/icons/${namespace}/${name}.svg`;
    this._iconRegistry.addSvgIconInNamespace(namespace, name, this._sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
