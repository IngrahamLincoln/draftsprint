'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { createProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type OnboardingStep = 'project' | 'goals' | 'structure';

const METHODOLOGY_OPTIONS = [
  {
    id: 'scenes',
    name: 'Scene-Based Structure',
    description: 'Organize your novel into 40-80 scenes of 1-2k words each. Recommended for beginners.',
    recommended: true,
  },
  {
    id: 'snowflake',
    name: 'Snowflake Method Lite',
    description: 'Start with a one-sentence premise and build outward. Great for planners.',
    recommended: false,
  },
  {
    id: 'none',
    name: 'Free Writing',
    description: 'No structure, just write. For experienced pantsers who prefer complete freedom.',
    recommended: false,
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('project');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    targetWords: 70000,
    dailyMinWords: 250,
    reminderStart: '09:00',
    reminderEnd: '21:00',
    methodology: 'scenes',
  });

  const handleNext = async () => {
    if (step === 'project') {
      setStep('goals');
    } else if (step === 'goals') {
      setStep('structure');
    } else {
      // Create project
      setIsSubmitting(true);
      try {
        const result = await createProject(formData);
        if (result.success) {
          router.push(`/project/${result.projectId}/scenes`);
        }
      } catch (error) {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 'goals') setStep('project');
    else if (step === 'structure') setStep('goals');
  };

  const canProceed = () => {
    if (step === 'project') return formData.title.trim().length > 0;
    if (step === 'goals') return formData.dailyMinWords > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="font-bold text-xl">DraftSprint</Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Step {step === 'project' ? 1 : step === 'goals' ? 2 : 3} of 3
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            <div className={`h-2 flex-1 rounded-full ${step === 'project' ? 'bg-primary' : 'bg-primary'}`} />
            <div className={`h-2 flex-1 rounded-full ${step === 'goals' || step === 'structure' ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 flex-1 rounded-full ${step === 'structure' ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </div>

        {step === 'project' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Let's create your first project
              </h1>
              <p className="text-muted-foreground text-lg">
                Tell us about the novel you want to write
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Novel Title
                </label>
                <Input
                  id="title"
                  placeholder="e.g., The Adventure Begins"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-lg"
                />
              </div>

              <div>
                <label htmlFor="targetWords" className="block text-sm font-medium mb-2">
                  Target Word Count
                </label>
                <Input
                  id="targetWords"
                  type="number"
                  placeholder="70000"
                  value={formData.targetWords}
                  onChange={(e) => setFormData({ ...formData, targetWords: parseInt(e.target.value) || 70000 })}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Most first novels are 70,000-90,000 words
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 'goals' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Set your daily writing goal
              </h1>
              <p className="text-muted-foreground text-lg">
                Consistency beats perfection. Small daily progress leads to completion.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="dailyMinWords" className="block text-sm font-medium mb-2">
                  Daily Minimum Words
                </label>
                <Input
                  id="dailyMinWords"
                  type="number"
                  placeholder="250"
                  value={formData.dailyMinWords}
                  onChange={(e) => setFormData({ ...formData, dailyMinWords: parseInt(e.target.value) || 250 })}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  250 words = about 1 page. Achievable even on busy days.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reminderStart" className="block text-sm font-medium mb-2">
                    Reminder Window Start
                  </label>
                  <Input
                    id="reminderStart"
                    type="time"
                    value={formData.reminderStart}
                    onChange={(e) => setFormData({ ...formData, reminderStart: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="reminderEnd" className="block text-sm font-medium mb-2">
                    Reminder Window End
                  </label>
                  <Input
                    id="reminderEnd"
                    type="time"
                    value={formData.reminderEnd}
                    onChange={(e) => setFormData({ ...formData, reminderEnd: e.target.value })}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We&apos;ll send you a gentle reminder if you haven&apos;t started writing during this window.
              </p>
            </div>
          </div>
        )}

        {step === 'structure' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Choose your structure
              </h1>
              <p className="text-muted-foreground text-lg">
                How would you like to organize your novel?
              </p>
            </div>

            <div className="space-y-4">
              {METHODOLOGY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`block rounded-lg border p-4 cursor-pointer transition-colors ${
                    formData.methodology === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-border/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="methodology"
                      value={option.id}
                      checked={formData.methodology === option.id}
                      onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{option.name}</h3>
                        {option.recommended && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-8">
          <div>
            {step !== 'project' && (
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? 'Creating...' : step === 'structure' ? 'Create Project' : 'Next'}
            {step !== 'structure' && !isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </main>
    </div>
  );
}