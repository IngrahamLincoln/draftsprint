import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-xl">DraftSprint</div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Finish your first draft—
            <span className="text-primary">systematically</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A focused writing app that helps beginner novelists complete their first manuscript through
            habit scaffolding, scene-based structure, and anti-perfectionism mechanics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignInButton>
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Writing Today
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-3">
              <div className="text-2xl font-semibold">Guided Sessions</div>
              <p className="text-muted-foreground">
                Pomodoro-style writing sprints with word count goals and distraction-free editing
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-semibold">Scene Structure</div>
              <p className="text-muted-foreground">
                Organize your novel into manageable scenes with objectives, conflicts, and outcomes
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-semibold">Progress Tracking</div>
              <p className="text-muted-foreground">
                Daily streaks, word count goals, and visual progress to keep you motivated
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 DraftSprint. Helping writers finish their first drafts.
        </div>
      </footer>
    </div>
  );
}
