import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, BookOpen, Target, Flame } from 'lucide-react';
import { getUserProjects } from '@/lib/actions';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const projects = await getUserProjects();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">DraftSprint</Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Ready to continue your writing journey?</p>
          </div>
          <Link href="/onboarding">
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Daily Goal</h3>
            </div>
            <div className="text-2xl font-bold">0 / 250</div>
            <p className="text-sm text-muted-foreground">words today</p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="font-medium">Streak</h3>
            </div>
            <div className="text-2xl font-bold">0 days</div>
            <p className="text-sm text-muted-foreground">keep it going!</p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Total Words</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">across all projects</p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">Projects</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">active projects</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
            </div>
            <div className="p-6 pt-0">
              {projects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No projects yet</p>
                  <p className="text-sm mb-4">Create your first project to start your writing journey</p>
                  <Link href="/onboarding">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-lg">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.targetWords?.toLocaleString() || 'No goal set'} word goal • {project.methodology}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {new Date(project.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/project/${project.id}/scenes`}>
                            <Button variant="outline" size="sm">
                              Scenes
                            </Button>
                          </Link>
                          <Link href="/write">
                            <Button size="sm">
                              Write
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold mb-4">Writing Calendar</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                <div className="font-medium text-muted-foreground p-2">S</div>
                <div className="font-medium text-muted-foreground p-2">M</div>
                <div className="font-medium text-muted-foreground p-2">T</div>
                <div className="font-medium text-muted-foreground p-2">W</div>
                <div className="font-medium text-muted-foreground p-2">T</div>
                <div className="font-medium text-muted-foreground p-2">F</div>
                <div className="font-medium text-muted-foreground p-2">S</div>
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded border border-border/50 bg-muted/20 p-1 text-xs flex items-center justify-center"
                  >
                    {i % 7 === 0 ? Math.floor(i/7) + 1 : ''}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Start writing to see your progress here
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/onboarding">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2">
                  <Plus className="h-6 w-6" />
                  <span>Start New Project</span>
                  <span className="text-xs text-muted-foreground">Begin your novel</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2" disabled>
                <Target className="h-6 w-6" />
                <span>Quick Write</span>
                <span className="text-xs text-muted-foreground">15-min session</span>
              </Button>
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2" disabled>
                <BookOpen className="h-6 w-6" />
                <span>View Progress</span>
                <span className="text-xs text-muted-foreground">Stats & insights</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}