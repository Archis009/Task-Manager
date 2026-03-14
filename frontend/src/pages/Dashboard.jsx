import KanbanBoard from '@/components/board/KanbanBoard';

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <KanbanBoard />
    </div>
  );
}
