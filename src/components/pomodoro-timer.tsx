'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

interface PomodoroTimerProps {
  initialMinutes?: number;
  onSessionComplete?: () => void;
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
}

type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export function PomodoroTimer({
  initialMinutes = 25,
  onSessionComplete,
  onSessionStart,
  onSessionEnd,
}: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [state, setState] = useState<TimerState>('idle');
  const [sessionDuration, setSessionDuration] = useState(initialMinutes * 60);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = useCallback(() => {
    setState('running');
    onSessionStart?.();
  }, [onSessionStart]);

  const pauseTimer = useCallback(() => {
    setState('paused');
  }, []);

  const resetTimer = useCallback(() => {
    setState('idle');
    setTimeLeft(sessionDuration);
    onSessionEnd?.();
  }, [sessionDuration, onSessionEnd]);

  const endSession = useCallback(() => {
    setState('completed');
    onSessionComplete?.();
  }, [onSessionComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setState('completed');
            onSessionComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state, timeLeft, onSessionComplete]);

  const progress = ((sessionDuration - timeLeft) / sessionDuration) * 100;

  return (
    <div className="bg-card border rounded-lg p-6 text-center">
      <div className="relative mb-6">
        <svg className="w-32 h-32 mx-auto transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100, 100"
            className="text-muted"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${progress}, 100`}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="space-y-3">
        {state === 'idle' && (
          <Button onClick={startTimer} size="lg" className="w-full gap-2">
            <Play className="h-4 w-4" />
            Start Session
          </Button>
        )}

        {state === 'running' && (
          <div className="flex gap-2">
            <Button onClick={pauseTimer} variant="outline" size="lg" className="flex-1 gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button onClick={endSession} variant="destructive" size="lg" className="flex-1 gap-2">
              <Square className="h-4 w-4" />
              End
            </Button>
          </div>
        )}

        {state === 'paused' && (
          <div className="flex gap-2">
            <Button onClick={startTimer} size="lg" className="flex-1 gap-2">
              <Play className="h-4 w-4" />
              Resume
            </Button>
            <Button onClick={resetTimer} variant="outline" size="lg" className="flex-1 gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        )}

        {state === 'completed' && (
          <div className="space-y-3">
            <div className="text-lg font-medium text-green-600">Session Complete! 🎉</div>
            <Button onClick={resetTimer} size="lg" className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Start New Session
            </Button>
          </div>
        )}

        <div className="flex justify-center gap-4 pt-2">
          <Button
            variant={sessionDuration === 15 * 60 ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setSessionDuration(15 * 60);
              if (state === 'idle') setTimeLeft(15 * 60);
            }}
          >
            15m
          </Button>
          <Button
            variant={sessionDuration === 25 * 60 ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setSessionDuration(25 * 60);
              if (state === 'idle') setTimeLeft(25 * 60);
            }}
          >
            25m
          </Button>
          <Button
            variant={sessionDuration === 50 * 60 ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setSessionDuration(50 * 60);
              if (state === 'idle') setTimeLeft(50 * 60);
            }}
          >
            50m
          </Button>
        </div>
      </div>
    </div>
  );
}