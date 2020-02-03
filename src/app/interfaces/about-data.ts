import { ProgressbarData } from './progressbarData';
import { ContactInfo } from './contact-info';

export interface AboutData {
    name?: string;
    birthDate?: string;
    pictureURL?: string;
    synopsis?: string[];
    competences?: ProgressbarData[];
    contact?: ContactInfo[];
    chibiURL?: string;
    age?: number;
}
