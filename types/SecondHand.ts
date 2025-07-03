import type { Schedule, OpeningHours } from './City';

interface SecondHand {
    id: string;
    city_id: string;
    name: string;
    address: string;
    image: string;
    notes: string;
    last_delivery: string;
    schedule: Schedule;
    lng: number;
    lat: number;
    opening_hours: OpeningHours;
  }
  
  export type { SecondHand };