export interface ProgramInfo {
  id: string;
  name: string;
  audience: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  status: "open" | "coming-soon";
  nextDate?: string;
}

export interface EventItem {
  id: string;
  title: string;
  audience: string;
  description: string;
  dates: string;
  time: string;
  location: string;
  facilitatorName: string;
  facilitatorRole: string;
  price: number; // 0 = free
  currency: string;
  slotsNote: string;
  isActive: boolean;
}
