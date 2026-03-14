import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, MessageSquare, Paperclip } from 'lucide-react';
import EditTaskModal from '../modals/EditTaskModal';
import { cn } from '@/lib/utils';

const priorityColors = {
  'Low': 'bg-orange-100 text-orange-600',
  'Medium': 'bg-yellow-100 text-yellow-600',
  'High': 'bg-red-100 text-red-600',
  'Completed': 'bg-green-100 text-green-600',
};

export default function TaskCard({ task, index }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const pColor = priorityColors[task.priority] || 'bg-gray-100 text-gray-600';

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
              "mb-4 flex flex-col rounded-2xl bg-white p-5 shadow-sm transition-all relative",
              snapshot.isDragging ? "rotate-2 scale-105 shadow-xl ring-2 ring-purple-500/20" : "hover:shadow-md"
            )}
          >
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
              <span className={cn("rounded px-2 py-1 text-[12px] font-medium", pColor)}>
                {task.priority}
              </span>
              <button 
                onClick={() => setIsEditModalOpen(true)} 
                className="text-gray-900 hover:text-purple-600 z-10"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            
            {/* Content */}
            <h3 className="mb-1.5 text-[18px] font-semibold text-gray-900">{task.title}</h3>
            {(task.description || task.coverImage) && (
              <div className="mb-6 space-y-3">
                {task.description && (
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    {task.description}
                  </p>
                )}
                {task.coverImage && (
                  <img 
                    src={task.coverImage} 
                    alt="Task Cover" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between">
              {/* Avatars */}
              <div className="flex -space-x-2">
                {task.assignees?.map((avatar, i) => (
                  <img 
                    key={i}
                    src={avatar} 
                    alt="Assignee" 
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-100"
                    onError={(e) => {
                      e.target.src = `https://i.pravatar.cc/150?img=${i + 20}`;
                    }}
                  />
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-3 text-xs font-medium text-gray-500">
                <div className="flex items-center space-x-1.5 hover:text-gray-900 transition-colors cursor-pointer">
                  <MessageSquare className="h-4 w-4" />
                  <span>{task.comments} comments</span>
                </div>
                <div className="flex items-center space-x-1.5 hover:text-gray-900 transition-colors cursor-pointer">
                  <Paperclip className="h-4 w-4" />
                  <span>{task.files} files</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <EditTaskModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
}
