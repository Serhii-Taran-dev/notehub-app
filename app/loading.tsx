import SystemState from '@/components/SystemState/SystemState';

export default function RootLoading() {
  return (
    <SystemState
      variant="loading"
      eyebrow="NoteHub"
      title="Loading your workspace"
      description="Please wait while we prepare everything for you."
    />
  );
}
