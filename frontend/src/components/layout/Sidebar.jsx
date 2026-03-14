import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, setActiveProject } from '@/features/projects/projectsSlice';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageSquare, 
  CheckSquare, 
  Users, 
  Settings, 
  MoreHorizontal,
  ChevronLeft,
  Plus,
  Lightbulb,
  LogOut
} from 'lucide-react';
import { logout, reset } from '../../features/auth/authSlice';

const navItems = [
  { name: 'Home', path: '/home', icon: Home },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'Tasks', path: '/projects/active', icon: CheckSquare },
  { name: 'Members', path: '/members', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { projects, activeProjectId, sidebarOpen } = useSelector(state => state.projects);
  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-sidebar-background text-sidebar-foreground transition-all duration-300">
      {/* Logo & Toggle */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600 text-white">
            <span className="text-xs">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Task Manager</span>
        </div>
        <button 
          onClick={() => dispatch(toggleSidebar())}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
        >
          <ChevronLeft className="h-4 w-4 text-sidebar-foreground/70" />
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-6">
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = location.pathname.startsWith(item.path) || (item.name === 'Tasks' && location.pathname.startsWith('/projects'));
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isItemActive
                    ? "bg-purple-100/50 text-gray-900 font-semibold"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={isItemActive ? 2.5 : 2} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="my-6 h-px w-full bg-gray-200" />

        {/* Projects list */}
        <div>
          <div className="flex items-center justify-between px-3 text-xs font-bold text-gray-500">
            <span>MY PROJECTS</span>
            <button className="flex h-4 w-4 items-center justify-center hover:text-gray-900">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => dispatch(setActiveProject(project.id))}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activeProjectId === project.id 
                    ? "bg-purple-50/70 text-purple-900 font-semibold"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("h-2 w-2 rounded-full", project.color)} />
                  <span className={activeProjectId === project.id ? "text-gray-900 font-bold" : ""}>{project.name}</span>
                </div>
                {activeProjectId === project.id && (
                  <MoreHorizontal className="h-4 w-4 text-gray-900" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Thoughts Card */}
      <div className="mt-auto px-4 pb-8">
        <div className="relative rounded-[20px] bg-[#f5f5f5] p-4 text-center mx-2 mt-8">
          <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#f5f5f5]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <Lightbulb className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="mt-5">
            <h4 className="font-semibold text-[14px] text-gray-900">Thoughts Time</h4>
            <p className="mt-2 text-[12px] text-gray-500 leading-relaxed px-1">
              We don't have any notice for you, till then you can share your thoughts with your peers.
            </p>
            <button className="mt-4 w-full rounded-lg bg-white py-2 text-[13px] font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-50">
              Write a message
            </button>
          </div>
        </div>
        
        {/* User profile / Logout */}
        {user && (
          <div className="mt-6 flex items-center justify-between mx-2 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3 overflow-hidden">
               <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt="" 
                  className="h-10 w-10 rounded-full bg-purple-100" 
                />
               <div className="flex flex-col overflow-hidden text-left">
                  <span className="truncate text-sm font-semibold text-gray-900">{user.name}</span>
                  <span className="truncate text-xs text-gray-500">{user.email}</span>
               </div>
            </div>
            <button 
              onClick={onLogout}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
