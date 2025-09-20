'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Calendar, Target, Flame, Award } from 'lucide-react';
import Link from 'next/link';

const MOCK_PROGRESS_DATA = {
  currentStreak: 7,
  longestStreak: 12,
  totalWords: 15420,
  averageWordsPerDay: 387,
  sessionsCompleted: 28,
  daysWritten: 23,
  goalWords: 70000,
  estimatedCompletion: 'March 15, 2024',
  daysToCompletion: 142,
};

const MOCK_WEEKLY_DATA = [
  { day: 'Mon', words: 420, goal: 250, met: true },
  { day: 'Tue', words: 380, goal: 250, met: true },
  { day: 'Wed', words: 150, goal: 250, met: false },
  { day: 'Thu', words: 520, goal: 250, met: true },
  { day: 'Fri', words: 290, goal: 250, met: true },
  { day: 'Sat', words: 680, goal: 250, met: true },
  { day: 'Sun', words: 340, goal: 250, met: true },
];

const MOCK_ACHIEVEMENTS = [
  { id: 1, title: 'First 7 Day Streak', description: 'Wrote for 7 days in a row', earned: true, date: '2024-01-15' },
  { id: 2, title: '1,000 Words', description: 'Reached 1,000 total words', earned: true, date: '2024-01-10' },
  { id: 3, title: '10,000 Words', description: 'Reached 10,000 total words', earned: true, date: '2024-01-25' },
  { id: 4, title: 'No-Edit Sprint', description: 'Completed a session without backspacing', earned: true, date: '2024-01-20' },
  { id: 5, title: '25,000 Words', description: 'Reached 25,000 total words', earned: false, date: null },
  { id: 6, title: 'First 14 Day Streak', description: 'Wrote for 14 days in a row', earned: false, date: null },
];

export default function ProgressPage() {
  const progressPercentage = (MOCK_PROGRESS_DATA.totalWords / MOCK_PROGRESS_DATA.goalWords) * 100;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-lg">Progress Tracking</h1>
              <p className="text-sm text-muted-foreground">Your writing journey</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Overall Progress</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {MOCK_PROGRESS_DATA.totalWords.toLocaleString()} / {MOCK_PROGRESS_DATA.goalWords.toLocaleString()} words
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{MOCK_PROGRESS_DATA.averageWordsPerDay}</div>
                    <div className="text-xs text-muted-foreground">avg words/day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{MOCK_PROGRESS_DATA.sessionsCompleted}</div>
                    <div className="text-xs text-muted-foreground">sessions completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{MOCK_PROGRESS_DATA.daysWritten}</div>
                    <div className="text-xs text-muted-foreground">days written</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{MOCK_PROGRESS_DATA.daysToCompletion}</div>
                    <div className="text-xs text-muted-foreground">days to finish</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold">This Week</h2>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {MOCK_WEEKLY_DATA.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs font-medium text-muted-foreground mb-2">{day.day}</div>
                    <div
                      className={`h-16 rounded border-2 flex items-end justify-center pb-1 relative ${
                        day.met ? 'border-green-500 bg-green-50' : 'border-red-300 bg-red-50'
                      }`}
                    >
                      <div
                        className={`w-full rounded-sm ${day.met ? 'bg-green-500' : 'bg-red-400'}`}
                        style={{ height: `${Math.min((day.words / 700) * 100, 100)}%` }}
                      />
                      <div className="absolute bottom-0 text-xs font-medium text-white">
                        {day.words}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Goal: {day.goal}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span>Goal met</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-400" />
                  <span>Goal missed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Streak Stats</h2>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    {MOCK_PROGRESS_DATA.currentStreak}
                  </div>
                  <div className="text-sm text-muted-foreground">days current streak</div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-muted-foreground">
                    {MOCK_PROGRESS_DATA.longestStreak}
                  </div>
                  <div className="text-xs text-muted-foreground">longest streak</div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground text-center">
                    Keep writing to maintain your streak!
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Achievements</h2>
              </div>

              <div className="space-y-3">
                {MOCK_ACHIEVEMENTS.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-2 rounded ${
                      achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className={`text-xs ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </div>
                      {achievement.earned && achievement.date && (
                        <div className="text-xs text-yellow-600 mt-1">
                          Earned {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Predictions</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Estimated completion:</span>
                  <div className="text-blue-600">{MOCK_PROGRESS_DATA.estimatedCompletion}</div>
                </div>
                <div>
                  <span className="font-medium">At current pace:</span>
                  <div className="text-muted-foreground">
                    {MOCK_PROGRESS_DATA.daysToCompletion} days remaining
                  </div>
                </div>
                <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                  Based on your average of {MOCK_PROGRESS_DATA.averageWordsPerDay} words per day
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}