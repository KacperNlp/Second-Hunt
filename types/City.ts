interface Schedule {
  monday: {
    promo: number;
    delivery: boolean;
  } | null;
  tuesday: {
    promo: number;
    delivery: boolean;
  } | null;
  wednesday: {  
    promo: number;
    delivery: boolean;
  } | null;
  thursday: {
    promo: number;
    delivery: boolean;
  } | null;
  friday: {
    promo: number;
    delivery: boolean;
  } | null; 
  saturday: {
    promo: number;
    delivery: boolean;
  } | null;
  sunday: {
    promo: number;
    delivery: boolean;
  } | null;
}

interface OpeningHours {
  monday: {
    open: string;
    close: string;
  } | null;
  tuesday: {
    open: string;
    close: string;
  } | null;
  wednesday: {  
    open: string;
    close: string;
  } | null;
  thursday: {
    open: string;
    close: string;
  } | null;
  friday: {
    open: string;
    close: string;
  } | null; 
  saturday: {
    open: string;
    close: string;
  } | null;
  sunday: {
    open: string;
    close: string;
  } | null;
}

interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface SecondHand {
  id: string;
  name: string;
  address: string;
  image: string;
  notes: string;
  last_delivery: string;
  schedule: Schedule[];
  lng: number;
  lat: number;
  opening_hours: OpeningHours;
}

export type { City, SecondHand, OpeningHours };
