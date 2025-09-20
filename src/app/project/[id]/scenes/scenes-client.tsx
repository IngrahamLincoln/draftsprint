'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Edit3, Trash2, GripVertical, Play } from 'lucide-react';
import Link from 'next/link';

interface Scene {
  id: string;
  index: number;
  title: string;
  pov: string;
  objective: string;
  conflict: string;
  outcome: string;
  status: 'planned' | 'drafting' | 'done';
  wordCount: number;
}

const MOCK_SCENES: Scene[] = [
  {
    id: '1',
    index: 1,
    title: 'The Call to Adventure',
    pov: 'Sarah',
    objective: 'Receive the mysterious letter',
    conflict: 'Fear of leaving comfort zone',
    outcome: 'Decides to investigate',
    status: 'done',
    wordCount: 1200,
  },
  {
    id: '2',
    index: 2,
    title: 'Journey Begins',
    pov: 'Sarah',
    objective: 'Travel to the old mansion',
    conflict: 'Car breaks down in storm',
    outcome: 'Finds shelter, meets stranger',
    status: 'drafting',
    wordCount: 800,
  },
  {
    id: '3',
    index: 3,
    title: 'First Clue',
    pov: 'Sarah',
    objective: 'Search the library',
    conflict: 'Hidden passages and traps',
    outcome: 'Discovers family secret',
    status: 'planned',
    wordCount: 0,
  },
];

interface ScenesPageClientProps {
  projectId: string;
}

export function ScenesPageClient({}: ScenesPageClientProps) {
  const [scenes, setScenes] = useState<Scene[]>(MOCK_SCENES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScene, setNewScene] = useState({
    title: '',
    pov: '',
    objective: '',
    conflict: '',
    outcome: '',
  });

  const getStatusColor = (status: Scene['status']) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'drafting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addScene = () => {
    if (!newScene.title.trim()) return;

    const scene: Scene = {
      id: Date.now().toString(),
      index: scenes.length + 1,
      title: newScene.title,
      pov: newScene.pov,
      objective: newScene.objective,
      conflict: newScene.conflict,
      outcome: newScene.outcome,
      status: 'planned',
      wordCount: 0,
    };

    setScenes([...scenes, scene]);
    setNewScene({ title: '', pov: '', objective: '', conflict: '', outcome: '' });
    setShowAddForm(false);
  };

  const deleteScene = (id: string) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const totalWords = scenes.reduce((sum, scene) => sum + scene.wordCount, 0);
  const completedScenes = scenes.filter(scene => scene.status === 'done').length;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-lg">My Novel</h1>
              <p className="text-sm text-muted-foreground">Scene Structure</p>
            </div>
          </div>
          <Link href="/write">
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Start Writing
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Scene Outline</h2>
            <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
              <span>{scenes.length} scenes</span>
              <span>{completedScenes} completed</span>
              <span>{totalWords.toLocaleString()} words</span>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Scene
          </Button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-4">Add New Scene</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newScene.title}
                  onChange={(e) => setNewScene({ ...newScene, title: e.target.value })}
                  placeholder="Scene title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">POV Character</label>
                <Input
                  value={newScene.pov}
                  onChange={(e) => setNewScene({ ...newScene, pov: e.target.value })}
                  placeholder="Point of view character"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Objective</label>
                <Input
                  value={newScene.objective}
                  onChange={(e) => setNewScene({ ...newScene, objective: e.target.value })}
                  placeholder="What does the character want?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Conflict</label>
                <Input
                  value={newScene.conflict}
                  onChange={(e) => setNewScene({ ...newScene, conflict: e.target.value })}
                  placeholder="What stands in their way?"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Outcome</label>
                <Input
                  value={newScene.outcome}
                  onChange={(e) => setNewScene({ ...newScene, outcome: e.target.value })}
                  placeholder="How does the scene end?"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addScene}>Add Scene</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="border rounded-lg bg-card p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <GripVertical className="h-4 w-4" />
                  <span className="text-sm font-mono">{scene.index.toString().padStart(2, '0')}</span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{scene.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(scene.status)}`}>
                      {scene.status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {scene.wordCount} words
                    </span>
                  </div>

                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">POV:</span> {scene.pov}
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Objective:</span> {scene.objective}
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Conflict:</span> {scene.conflict}
                    </div>
                  </div>

                  {scene.outcome && (
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">Outcome:</span> {scene.outcome}
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  <Link href={`/write?scene=${scene.id}`}>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log('Edit scene:', scene.id)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteScene(scene.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {scenes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Edit3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No scenes yet</p>
              <p className="text-sm">Start by adding your first scene to organize your story.</p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Scene
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}