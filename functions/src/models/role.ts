import { Dictionary } from 'lodash';

export interface Role {
    description: string;
    name: string;
    permissions: Dictionary<boolean>;
}