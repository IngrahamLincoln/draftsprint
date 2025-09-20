'use client';

import { useState } from 'react';
import { PomodoroTimer } from '@/components/pomodoro-timer';
import { WritingEditor } from '@/components/writing-editor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function WritePage() {
  const [sessionActive, setSessionActive] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const handleSessionStart = () => {
    setSessionActive(true);
    setSessionStartTime(new Date());
  };

  const handleSessionEnd = () => {
    setSessionActive(false);
    setSessionStartTime(null);
  };

  const handleContentChange = (newContent: string, newWordCount: number) => {
    setContent(newContent);
    setWordCount(newWordCount);
  };

  const handleSave = () => {
    console.log('Saving content:', { content, wordCount });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              My Novel - Scene 1
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTimer(!showTimer)}
              className="gap-2"
            >
              {showTimer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showTimer ? 'Hide' : 'Show'} Timer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <WritingEditor
            initialContent={content}
            onContentChange={handleContentChange}
            sessionActive={sessionActive}
            goalWords={250}
            writeForwardMode={true}
          />
        </div>

        {showTimer && (
          <div className="w-80 border-l border-border bg-background/50 p-6 flex flex-col">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Writing Session</h2>
              <p className="text-sm text-muted-foreground">
                {sessionActive
                  ? 'Session in progress. Stay focused!'
                  : 'Start a timer to begin your focused writing session.'
                }
              </p>
            </div>

            <PomodoroTimer
              initialMinutes={25}
              onSessionStart={handleSessionStart}
              onSessionEnd={handleSessionEnd}
              onSessionComplete={handleSessionEnd}
            />

            {sessionActive && sessionStartTime && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Session Stats</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Started:</span>
                    <span>{sessionStartTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Words written:</span>
                    <span>{wordCount}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-medium text-primary mb-2">💡 Writing Tip</h3>
              <p className="text-sm text-muted-foreground">
                Don&apos;t worry about perfection in your first draft. Focus on getting the story down.
                You can always revise later!
              </p>
            </div>

            <div className="mt-auto pt-6">
              <div className="text-xs text-muted-foreground text-center">
                Remember: Progress over perfection.
                <br />
                Every word counts toward your goal.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}