import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeProjectId: 'proj-1',
  projects: [
    { id: 'proj-1', name: 'Mobile App', color: 'bg-green-500' },
    { id: 'proj-2', name: 'Website Redesign', color: 'bg-orange-500' },
    { id: 'proj-3', name: 'Design System', color: 'bg-purple-300' },
    { id: 'proj-4', name: 'Wireframes', color: 'bg-blue-400' },
  ],
  sidebarOpen: true,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProject(state, action) {
      state.activeProjectId = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    }
  }
});

export const { setActiveProject, toggleSidebar } = projectsSlice.actions;
export default projectsSlice.reducer;
