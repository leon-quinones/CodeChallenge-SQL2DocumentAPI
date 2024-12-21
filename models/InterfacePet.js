import { UUID } from "mongodb";
import { parse as uuidParse } from 'uuid';
export const IPet = {
        'id': uuidParse,
        'race': String,
        'name': String,
        'gender': String
} 

