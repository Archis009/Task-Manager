import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X, Plus, Trash2 } from 'lucide-react';
import { addTask } from '@/features/tasks/tasksSlice';
import toast from 'react-hot-toast';

export default function AddTaskModal({ isOpen, onClose, defaultStatus = 'todo' }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: defaultStatus,
    dueDate: '',
  });
  const [subtasks, setSubtasks] = useState([]);

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: `st-${Date.now()}`, title: '', completed: false }]);
  };

  const handleSubtaskChange = (id, value) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, title: value } : st));
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    const validSubtasks = subtasks.filter(st => st.title.trim() !== '');

    const newTask = {
      id: `task-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      subtasks: validSubtasks,
      comments: 0,
      files: 0,
      assignees: ['https://i.pravatar.cc/150?img=11'],
      order: Date.now(), // Sort to bottom by default
    };

    dispatch(addTask(newTask));
    toast.success('Task created successfully!');
    setFormData({ title: '', description: '', priority: 'Low', status: defaultStatus, dueDate: '' });
    setSubtasks([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="e.g., Design homepage"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              rows={3}
              placeholder="Add details about this task..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">On Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Subtasks</label>
              <button
                type="button"
                onClick={handleAddSubtask}
                className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Subtask
              </button>
            </div>
            
            {subtasks.length > 0 && (
              <div className="space-y-2 mb-2">
                {subtasks.map((st) => (
                  <div key={st.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => handleSubtaskChange(st.id, e.target.value)}
                      placeholder="e.g., Create wireframes"
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(st.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
