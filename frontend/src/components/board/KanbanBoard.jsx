import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, selectAllTasks } from '@/features/tasks/';
import KanbanColumn from './KanbanColumn';

const columns = [
  { id: 'todo', title: 'To Do', colorMarker: 'bg-indigo-500' },
  { id: 'inProgress', title: 'On Progress', colorMarker: 'bg-orange-400' },
  { id: 'done', title: 'Done', colorMarker: 'bg-green-400' },
];

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const filterPriority = useSelector((state) => state.tasks.filterPriority);
  const filterDate = useSelector((state) => state.tasks.filterDate);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        taskId: draggableId,
        sourceStatus: source.droppableId,
        destinationStatus: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <div className="flex h-full w-full gap-6 overflow-x-auto pb-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((col) => {
          let columnTasks = tasks
            .filter((t) => t.status === col.id)
            .sort((a, b) => a.order - b.order);

          if (filterPriority !== 'All') {
            columnTasks = columnTasks.filter(t => t.priority === filterPriority);
          }
          
          if (filterDate === 'Today') {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayStr = `${year}-${month}-${day}`;
            columnTasks = columnTasks.filter(t => t.dueDate === todayStr);
          }

          return (
            <KanbanColumn
              key={col.id}
              columnId={col.id}
              title={col.title}
              colorMarker={col.colorMarker}
              tasks={columnTasks}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}
