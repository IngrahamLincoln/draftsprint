import { ScenesPageClient } from './scenes-client';

export default async function ScenesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ScenesPageClient projectId={id} />;
}