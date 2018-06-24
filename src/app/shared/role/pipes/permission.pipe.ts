import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'administration_view':
        return 'Administration sehen';
      case 'roles_view':
        return 'Rollen sehen';
      case 'roles_create':
        return 'Rolle erstellen';
      case 'roles_edit':
        return 'Rolle bearbeiten';
      case 'roles_delete':
        return 'Rolle löschen';
      case 'users_view':
        return 'Benutzer sehen';
      case 'users_set_roles':
        return 'Benutzerrollen setzen';
      case 'news_view':
        return 'News lesen';
      default:
        return value;
    }
  }

}
