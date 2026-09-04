import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import { fetchNotes } from '@/lib/api/serverApi';

import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

function getTag(slug: string[]) {
  return slug[0] === 'all' ? undefined : slug[0];
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug[0];
  const tag = getTag(slug);

  const title = tag ? `${tag} notes` : 'All notes';
  const description = tag
    ? `Browse and manage your notes tagged "${tag}" in NoteHub.`
    : 'Browse, search, and manage all your notes in NoteHub.';

  return {
    title,
    description,
    openGraph: {
      title: `${title} | NoteHub`,
      description,
      url: `https://notehub-app-plum.vercel.app/notes/filter/${encodeURIComponent(filter)}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${title} in NoteHub`,
        },
      ],
    },
  };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const { slug } = await params;
  const queryParams = await searchParams;

  const tag = getTag(slug);

  const requestedPage = Number(queryParams.page);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const search = queryParams.search?.trim() ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
