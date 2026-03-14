import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
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
