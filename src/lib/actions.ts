'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users, profiles, projects, scenes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface CreateProjectData {
  title: string;
  targetWords: number;
  dailyMinWords: number;
  reminderStart: string;
  reminderEnd: string;
  methodology: string;
}

export async function createProject(data: CreateProjectData) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Check if user exists in our database, if not create them
    let dbUser = await db.select().from(users).where(eq(users.email, user.emailAddresses[0].emailAddress)).limit(1);

    if (dbUser.length === 0) {
      // Create user
      const [newUser] = await db.insert(users).values({
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || user.firstName || 'User',
      }).returning();

      dbUser = [newUser];
    }

    const userId = dbUser[0].id;

    // Check if user profile exists, if not create it
    let profile = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);

    if (profile.length === 0) {
      await db.insert(profiles).values({
        userId,
        dailyMinWords: data.dailyMinWords,
        reminderWindowStart: data.reminderStart,
        reminderWindowEnd: data.reminderEnd,
      });
    } else {
      // Update existing profile
      await db.update(profiles)
        .set({
          dailyMinWords: data.dailyMinWords,
          reminderWindowStart: data.reminderStart,
          reminderWindowEnd: data.reminderEnd,
        })
        .where(eq(profiles.userId, userId));
    }

    // Create the project
    const [newProject] = await db.insert(projects).values({
      userId,
      title: data.title,
      targetWords: data.targetWords,
      methodology: data.methodology,
    }).returning();

    // If using scenes methodology, create initial scenes
    if (data.methodology === 'scenes') {
      const initialScenes = [
        {
          projectId: newProject.id,
          index: 1,
          title: 'Opening Scene',
          pov: 'Main Character',
          objective: 'Introduce protagonist and world',
          conflict: 'Inciting incident occurs',
          outcome: 'Character\'s world is disrupted',
          status: 'planned' as const,
        },
        {
          projectId: newProject.id,
          index: 2,
          title: 'Call to Action',
          pov: 'Main Character',
          objective: 'Present the main quest/goal',
          conflict: 'Character resists or hesitates',
          outcome: 'Character decides to act',
          status: 'planned' as const,
        },
        {
          projectId: newProject.id,
          index: 3,
          title: 'First Steps',
          pov: 'Main Character',
          objective: 'Begin the journey',
          conflict: 'Initial obstacles appear',
          outcome: 'Character learns something new',
          status: 'planned' as const,
        },
      ];

      await db.insert(scenes).values(initialScenes);
    }

    // If using snowflake methodology, create character placeholders
    if (data.methodology === 'snowflake') {
      // We could add initial character creation here
      // For now, we'll keep it simple
    }

    return { success: true, projectId: newProject.id };
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

export async function getUserProjects() {
  const user = await currentUser();

  if (!user) {
    return [];
  }

  try {
    const dbUser = await db.select().from(users).where(eq(users.email, user.emailAddresses[0].emailAddress)).limit(1);

    if (dbUser.length === 0) {
      return [];
    }

    const userProjects = await db.select().from(projects).where(eq(projects.userId, dbUser[0].id));
    return userProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}