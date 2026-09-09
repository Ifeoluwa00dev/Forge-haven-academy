import { ProgramInfo, EventItem } from "./types";

// Temporary local data. Will be replaced by Supabase queries once the
// events/programs tables are wired up (Day 4+ of the build).

export const PROGRAMS: ProgramInfo[] = [
  {
    id: "discovery-lab",
    name: "Discovery Lab",
    audience: "Preteens & teens",
    tagline: "Know Yourself, Grow Yourself",
    description:
      "An interactive, activity-based session — not a lecture. Preteens explore their personality style, sharpen their people skills, and walk away with tools they can use at school, with friends, and in everyday life.",
    focusAreas: [
      "No lectures — guided exercises, group discussions, hands-on activities",
      "Discover your personality style and what makes you tick",
      "Sharpen your people skills for friendships and everyday interactions",
      "Walk away with real tools you can use at school and in daily life",
    ],
    status: "open",
    nextDate: "Oct 9–10, 2026",
  },
  {
    id: "graceful-parenting",
    name: "Graceful Parenting",
    audience: "Parents",
    tagline: "Practical skills for parents",
    description: "Details for this program are coming soon.",
    focusAreas: [],
    status: "coming-soon",
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "discovery-lab-oct-2026",
    title: "Discovery Lab: Know Yourself, Grow Yourself",
    audience: "Preteens & teens",
    description:
      "Forge Haven Academy's maiden edition of Discovery Lab — a hands-on session helping preteens discover their personality style and build real-world people skills.",
    dates: "Oct 9–10, 2026",
    time: "11:00am – 12:00noon",
    location: "Onsite",
    facilitatorName: "Bisi Olaleye",
    facilitatorRole: "Educator & Coach",
    price: 40,
    currency: "USD",
    slotsNote: "Slots are limited",
    isActive: true,
  },
];
