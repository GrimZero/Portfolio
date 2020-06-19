import { ProgressbarData } from './progressbarData';
import { ContactInfo } from './contact-info';

export interface AboutData {
    name?: string;
    title?: string;
    hero?: string;
    birthDate?: string;
    pictureURL?: string;
    about?: string[];
    competences?: ProgressbarData[];
    hobbies?: string[];
    contact?: ContactInfo[];
    chibiURL?: string;
    age?: number;
}
