import { Role } from '../../../data-access/models/role';

export interface KnnlRoleSelectionEvent {
    role: Role;
    selected: boolean;
}