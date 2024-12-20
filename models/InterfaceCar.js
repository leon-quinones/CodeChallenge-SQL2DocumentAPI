import { UUID } from "mongodb";
import { parse as uuidParse } from 'uuid';

export const ICar = {
        'id': uuidParse,
        'brand': String,
        'model_name': String,
        'model_year': String
    }
