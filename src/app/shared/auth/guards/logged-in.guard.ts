import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    const user = await this._angularFireAuth.authState.pipe(first()).toPromise();

    if (user) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}
