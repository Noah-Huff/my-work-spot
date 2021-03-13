//import { ConstructorSansProvider } from "@angular/core";
//import { Services } from "@angular/core/src/view";

export class OpenTimes {
    sun: {open: Number, close: Number};
    mon: {open: Number, close: Number};
    tue: {open: Number, close: Number};
    wed: {open: Number, close: Number};
    thu: {open: Number, close: Number};
    fri: {open: Number, close: Number};
    sat: {open: Number, close: Number};
}

export class Coords {
    type: string;
    coordinates: number[];
}

export class Location {
    _id: string;
    name: string;
    address: string;
    coords: Coords;
    openTimes: OpenTimes;
    notes: string;
}