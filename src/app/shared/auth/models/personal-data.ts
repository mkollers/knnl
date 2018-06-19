import { Moment } from 'moment';

export interface PersonalData {
    email: string;
    firstname: string;
    lastname: string;
    dob: Moment;
    interests: string;
    mobile: string;
}