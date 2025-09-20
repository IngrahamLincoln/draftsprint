import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function calculateETA(currentWords: number, targetWords: number, avgWordsPerDay: number): number {
  if (avgWordsPerDay <= 0) return Infinity;
  return Math.ceil((targetWords - currentWords) / avgWordsPerDay);
}

export function getStreakDays(dailyGoals: Array<{ date: string; goalMet: boolean }>): number {
  if (!dailyGoals.length) return 0;

  const sorted = dailyGoals.sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;

  for (const goal of sorted) {
    if (goal.goalMet) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}