import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: 'idle',
  filterPriority: 'All', // 'All', 'Low', 'High', 'Completed'
  filterDate: 'All', // 'All', 'Today'
});

// Seed data
// Note: We use local time formatting to generate "today" to avoid timezone mismatch.
const getLocalDateString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' format in local time
};

const today = getLocalDateString(0);
const tomorrow = getLocalDateString(1);
const yesterday = getLocalDateString(-1);
const initialTasks = [
  {
    id: 'task-1',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    priority: 'Low',
    status: 'todo',
    comments: 12,
    files: 0,
    assignees: ['/avatars/avatar-1.png', '/avatars/avatar-2.png', '/avatars/avatar-3.png'],
    order: 0,
    dueDate: today,
  },
  {
    id: 'task-2',
    title: 'Research',
    description: 'User research helps you to create an optimal product for users.',
    priority: 'High',
    status: 'todo',
    comments: 10,
    files: 3,
    assignees: ['/avatars/avatar-4.png', '/avatars/avatar-1.png'],
    order: 1,
    dueDate: tomorrow,
  },
  {
    id: 'task-3',
    title: 'Wireframes',
    description: 'Low fidelity wireframes include the most basic content and visuals.',
    priority: 'High',
    status: 'todo',
    comments: 17,
    files: 5,
    assignees: ['/avatars/avatar-2.png', '/avatars/avatar-4.png'],
    order: 2,
    dueDate: today,
  },
  {
    id: 'task-4',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    priority: 'Low',
    status: 'inProgress',
    comments: 12,
    files: 0,
    assignees: ['/avatars/avatar-3.png', '/avatars/avatar-1.png'],
    order: 0,
    dueDate: yesterday,
  },
  {
    id: 'task-5',
    title: 'Brainstorming',
    description: 'Brainstorming brings team members\' diverse experience into play.',
    priority: 'Low',
    status: 'done',
    comments: 12,
    files: 0,
    assignees: ['/avatars/avatar-1.png', '/avatars/avatar-4.png'],
    order: 0,
    dueDate: today,
  },
  {
    id: 'task-6',
    title: 'Design System',
    description: 'It just needs to adapt the UI from what you did before',
    priority: 'Completed',
    status: 'done',
    comments: 12,
    files: 15,
    assignees: ['/avatars/avatar-2.png', '/avatars/avatar-3.png', '/avatars/avatar-4.png'],
    order: 1,
    dueDate: yesterday,
  }
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.setAll(initialState, initialTasks),
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
    deleteTask: tasksAdapter.removeOne,
    moveTask(state, action) {
      const { taskId, sourceStatus, destinationStatus, sourceIndex, destinationIndex } = action.payload;
      const allTasks = Object.values(state.entities);
      
      if (sourceStatus === destinationStatus) {
        const columnTasks = allTasks
          .filter(t => t.status === sourceStatus)
          .sort((a, b) => a.order - b.order);
        
        const [movedTask] = columnTasks.splice(sourceIndex, 1);
        columnTasks.splice(destinationIndex, 0, movedTask);
        
        columnTasks.forEach((t, i) => {
          state.entities[t.id].order = i;
        });
      } else {
        state.entities[taskId].status = destinationStatus;
        
        const sourceTasks = allTasks
          .filter(t => t.status === sourceStatus && t.id !== taskId)
          .sort((a, b) => a.order - b.order);
          
        const destTasks = allTasks
          .filter(t => t.status === destinationStatus && t.id !== taskId)
          .sort((a, b) => a.order - b.order);
          
        destTasks.splice(destinationIndex, 0, state.entities[taskId]);
        
        sourceTasks.forEach((t, i) => {
          state.entities[t.id].order = i;
        });
        destTasks.forEach((t, i) => {
          state.entities[t.id].order = i;
        });
      }
    },
    setFilterPriority(state, action) {
      state.filterPriority = action.payload;
    },
    setFilterDate(state, action) {
      state.filterDate = action.payload;
    }
  }
});

export const { addTask, updateTask, deleteTask, moveTask, setFilterPriority, setFilterDate } = tasksSlice.actions;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
} = tasksAdapter.getSelectors((state) => state.tasks);

export default tasksSlice.reducer;
