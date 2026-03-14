import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, Trash2 } from 'lucide-react';
import { updateTask, deleteTask } from '@/features/tasks/tasksSlice';
import toast from 'react-hot-toast';

export default function EditTaskModal({ isOpen, onClose, task }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate || '',
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    dispatch(updateTask({ id: task.id, changes: formData }));
    toast.success('Task updated successfully!');
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      toast.success('Task deleted successfully!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Task</h2>
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
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              rows={3}
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
                <option value="Completed">Completed</option>
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

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>

            <div className="flex space-x-3">
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
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
