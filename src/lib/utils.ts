import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(s: string) {
  return s.trim().replace(/\r\n/g, '\n');
}

export const CONTEST_START = new Date('2025-12-19T14:00:00+05:30'); // IST

export function getBasePoints(problemId: string): number {
  const index = problemId.charCodeAt(0) - 'A'.charCodeAt(0);
  return 250 + index * 100;
}