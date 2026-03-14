import { useSelector } from 'react-redux';
import { Search, Calendar, MessageSquare, Bell, ChevronDown, Filter, CalendarDays, Share2, PanelLeftDashed, LayoutGrid, Edit2, Link2, Plus } from 'lucide-react';

export default function Header() {
  const { projects, activeProjectId } = useSelector(state => state.projects);
  const activeProj = projects.find(p => p.id === activeProjectId);

  return (
    <header className="flex flex-col bg-white">
      {/* Top row */}
      <div className="flex h-[88px] items-center justify-between border-b border-gray-200 px-8">
        {/* Left side: Search */}
        <div className="flex w-[400px] items-center space-x-2 rounded-md bg-[#F5F5F5] px-4 py-2.5 text-gray-500 focus-within:ring-1 focus-within:ring-purple-500">
          <Search className="h-4 w-4" />
          <input 
            type="text"
            placeholder="Search for anything..."
            className="w-full bg-transparent px-1 outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Right side: Icons + Profile */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-5 text-gray-500">
            <Calendar className="h-[22px] w-[22px] cursor-pointer hover:text-gray-900 transition-colors" />
            <MessageSquare className="h-[22px] w-[22px] cursor-pointer hover:text-gray-900 transition-colors" />
            <div className="relative cursor-pointer hover:text-gray-900 transition-colors">
              <Bell className="h-[22px] w-[22px]" />
              <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[15px] font-medium text-gray-900">Palak Jain</p>
              <p className="text-[13px] text-gray-500">Rajasthan, India</p>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <img 
                src="https://i.pravatar.cc/150?u=palak" 
                alt="Profile" 
                className="h-[38px] w-[38px] rounded-full object-cover"
              />
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Title & Toolbar Row */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-[46px] font-semibold tracking-tight text-gray-900">{activeProj?.name || "Mobile App"}</h1>
            <div className="flex space-x-2 pt-2">
              <button className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#5030E5]/10 text-[#5030E5] hover:bg-[#5030E5]/20 transition-colors">
                <Edit2 className="h-3 w-3" />
              </button>
              <button className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#5030E5]/10 text-[#5030E5] hover:bg-[#5030E5]/20 transition-colors">
                <Link2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center text-[#5030E5] font-medium text-sm hover:text-[#5030E5]/80 transition-colors">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-[#5030E5]/20 mr-2">
                <Plus className="h-3 w-3" />
              </div>
              Invite
            </button>
            <div className="flex -space-x-2 overflow-hidden">
              <img className="inline-block h-[34px] w-[34px] rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=11" alt=""/>
              <img className="inline-block h-[34px] w-[34px] rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=12" alt=""/>
              <img className="inline-block h-[34px] w-[34px] rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=13" alt=""/>
              <img className="inline-block h-[34px] w-[34px] rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=14" alt=""/>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F4D7DA] ring-2 ring-white text-[13px] font-medium text-[#D25B68]">
                +2
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="flex h-10 items-center space-x-2 rounded-md border border-gray-300 px-3 text-gray-500 hover:bg-gray-50 transition-colors">
              <Filter className="h-[15px] w-[15px]" strokeWidth={2.5} />
              <span className="font-medium text-[15px] ml-1">Filter</span>
              <ChevronDown className="h-[15px] w-[15px] ml-1" />
            </button>
            <button className="flex h-10 items-center space-x-2 rounded-md border border-gray-300 px-3 text-gray-500 hover:bg-gray-50 transition-colors">
              <CalendarDays className="h-[15px] w-[15px]" strokeWidth={2.5} />
              <span className="font-medium text-[15px] ml-1">Today</span>
              <ChevronDown className="h-[15px] w-[15px] ml-1" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex h-10 items-center space-x-2 rounded-md border border-gray-300 px-3 text-gray-500 hover:bg-gray-50 transition-colors">
              <Share2 className="h-[15px] w-[15px]" />
              <span className="font-medium text-[15px] pr-1">Share</span>
            </button>
            <div className="h-7 w-px bg-gray-300" />
            <div className="flex space-x-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[#5030E5] text-white shadow-sm">
                <PanelLeftDashed className="h-5 w-5 rotate-90" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
