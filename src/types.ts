export type ActivePortal = 'home' | 'donor-receiver' | 'admin';

export type AdminSubTab =
  | 'live-hub'
  | 'cvrptw'
  | 'census'
  | 'impact';

export type DonorReceiverSubTab =
  | 'donate'
  | 'receive'
  | 'request-aid'
  | 'rewards';

export interface FoodCategory {
  id: string;
  name: string; // The type (e.g. "Legume / Gravy", "Dairy / Rich Gravy")
  description: string;
  icon: string;
  defaultTemp: number;
  baseSafeMinutes: number;
}

export interface FoodDonationIntake {
  foodCategory: string;
  foodName: string; // The typed name entered by donor
  portions: number;
  weightKg: number;
  cookingTime: string;
  dietary: 'veg' | 'jain' | 'halal';
  locationAddress: string;
  coordinates: { lat: number; lng: number };
  locationMethod: 'gps' | 'map';
  donorName: string;
  donorFssai: string;
}

export interface CensusNode {
  id: string;
  code: string;
  name: string;
  category: 'Shelter' | 'Railway Camp' | 'Brick Kiln' | 'Slum Cluster' | 'Hospital Ward' | 'Orphanage';
  location: string;
  headcount: number;
  children: number;
  elderly: number;
  urgency: string;
  coordinator: string;
  coordinates: string;
  lat: number;
  lng: number;
  locationMethod?: 'gps' | 'map';
  timestamp?: string;
}

export interface ScoutSMS {
  id: string;
  sender: string;
  phone: string;
  timeAgo: string;
  rawText: string;
  parsedSummary: string;
  verified: boolean;
}

export interface RescueItem {
  id: string;
  type: 'urgent' | 'transit' | 'packaged';
  title: string;
  source: string;
  destination: string;
  details: string;
  driver: string;
  vehicle: string;
  etaMins: number;
  remainingTime: string;
  tempStatus: string;
  tempVerified: string;
  statusBadge: string;
  statusColor: string;
  tagInfo: string;
  completed?: boolean;
}

export interface InboundConsignment {
  id: string;
  dispatchId: string;
  foodName: string;
  foodType: string;
  portions: number;
  donorName: string;
  driverName: string;
  driverPhone: string;
  etaMinutes: number;
  status: 'En Route' | 'Arrived' | 'Verified Handover';
  tempReading: string;
  haccpSafe: boolean;
  tamperSealCode: string;
}
