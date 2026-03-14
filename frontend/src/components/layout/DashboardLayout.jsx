import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import Header from './Header';
import { selectAllTasks } from '@/features/tasks/tasksSlice';

export default function DashboardLayout() {
  const tasks = useSelector(selectAllTasks);
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!tasks || hasNotified.current) return;
    
    const overdueTasksCount = tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate.getTime() < today.getTime() && task.status !== 'done';
    }).length;

    if (overdueTasksCount > 0) {
      toast.error(`Reminder: You have ${overdueTasksCount} overdue task${overdueTasksCount === 1 ? '' : 's'}!`, {
        duration: 5000,
        position: 'top-center',
      });
      hasNotified.current = true;
    }
  }, [tasks]);

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden bg-white text-gray-900 font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-white border-t border-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
