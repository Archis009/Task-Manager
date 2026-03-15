import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import AddTaskModal from '../modals/AddTaskModal';
import { cn } from '@/lib/utils';

export default function KanbanColumn({ columnId, title, colorMarker, tasks }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex h-max w-full min-w-[320px] max-w-[360px] flex-col rounded-[20px] bg-[#F5F5F5] px-5 py-5">
      {/* Column Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn("h-2 w-2 rounded-full", colorMarker)} />
          <h2 className="text-[16px] font-semibold text-gray-900">{title}</h2>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[12px] font-medium text-gray-500">
            {tasks.length}
          </div>
        </div>
        {columnId === 'todo' && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex h-[22px] w-[22px] items-center justify-center rounded bg-[#5030E5]/20 text-[#5030E5] hover:bg-[#5030E5] hover:text-white transition-colors"
          >
            <Plus className="h-[14px] w-[14px]" strokeWidth={3} />
          </button>
        )}
      </div>

      <div className="h-[3px] w-full rounded-full bg-blue-500/10 mb-6" />

      {/* Droppable Area */}
      <Droppable droppableId={columnId} type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 min-h-[150px] transition-colors rounded-xl",
              snapshot.isDraggingOver ? "bg-purple-50/50" : ""
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <AddTaskModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        defaultStatus={columnId} 
      />
    </div>
  );
}
