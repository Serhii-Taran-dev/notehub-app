import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { cache } from 'react';

import { fetchNoteById } from '@/lib/api/serverApi';

import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getNote = cache(fetchNoteById);

function createDescription(content: string) {
  const normalizedContent = content.trim().replace(/\s+/g, ' ');

  if (!normalizedContent) {
    return 'View this note and its details in NoteHub.';
  }

  if (normalizedContent.length <= 160) {
    return normalizedContent;
  }

  return `${normalizedContent.slice(0, 157)}...`;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getNote(id);

  const description = createDescription(note.content);

  return {
    title: note.title,
    description,
    openGraph: {
      title: `${note.title} | NoteHub`,
      description,
      url: `https://notehub-app-plum.vercel.app/notes/${encodeURIComponent(id)}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub note: ${note.title}`,
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
