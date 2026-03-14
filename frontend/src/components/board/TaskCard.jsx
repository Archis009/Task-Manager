import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, MessageSquare, Paperclip, Calendar, ListTodo } from 'lucide-react';
import EditTaskModal from '../modals/EditTaskModal';
import { cn } from '@/lib/utils';

const priorityColors = {
  'Low': 'bg-orange-100 text-orange-600',
  'Medium': 'bg-yellow-100 text-yellow-600',
  'High': 'bg-red-100 text-red-600',
  'Completed': 'bg-green-100 text-green-600',
};

const tagColors = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
  'bg-cyan-100 text-cyan-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
];

const getTagColor = (tagName) => {
  if (!tagName) return tagColors[0];
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % tagColors.length;
  return tagColors[index];
};

const getDueDateInfo = (dueDateStr) => {
  if (!dueDateStr) return null;
  
  // Use T00:00:00 to parse correctly in local time instead of UTC offset shifting
  const dueDate = new Date(dueDateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let color = 'text-gray-500 bg-gray-50 border-gray-200';
  let dateText = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (diffDays < 0) {
    color = 'text-red-600 bg-red-50 border-red-200';
    dateText = 'Overdue';
  } else if (diffDays === 0) {
    color = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    dateText = 'Due Today';
  }

  return { color, dateText };
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
            <div className="mb-2 flex items-start justify-between">
              <div className="flex flex-wrap gap-1.5 pr-4">
                <span className={cn("rounded px-2 py-1 text-[12px] font-medium", pColor)}>
                  {task.priority}
                </span>
                {task.tags?.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={cn("rounded px-2 py-1 text-[12px] font-medium whitespace-nowrap", getTagColor(tag))}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => setIsEditModalOpen(true)} 
                className="text-gray-900 hover:text-purple-600 z-10 shrink-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            
            {/* Content */}
            <h3 className="mb-1.5 text-[18px] font-semibold text-gray-900">{task.title}</h3>
            {(task.description || task.coverImage || task.dueDate) && (
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
                {task.dueDate && (
                  <div>
                    {(() => {
                      const { color, dateText } = getDueDateInfo(task.dueDate);
                      return (
                        <div className={cn("inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium border", color)}>
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{dateText}</span>
                        </div>
                      );
                    })()}
                  </div>
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
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="flex items-center space-x-1.5 hover:text-gray-900 transition-colors cursor-pointer" title="Subtasks">
                    <ListTodo className="h-4 w-4" />
                    <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
                  </div>
                )}
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
