import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function NotesPage({ searchParams }: Props) {
  const params = await searchParams;

  const requestedPage = Number(params.page);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const search = params.search?.trim() ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
