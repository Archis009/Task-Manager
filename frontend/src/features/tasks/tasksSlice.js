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
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // 'YYYY-MM-DD' format in local time
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
    tags: ['UX', 'Planning'],
    activityLog: [{ id: 'log-task-1', message: 'Task created', timestamp: new Date().toISOString() }],
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
    tags: ['Data', 'MVP'],
    activityLog: [{ id: 'log-task-2', message: 'Task created', timestamp: new Date().toISOString() }],
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
    tags: ['Design', 'Core'],
    activityLog: [{ id: 'log-task-3', message: 'Task created', timestamp: new Date().toISOString() }],
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
    tags: ['API'],
    activityLog: [{ id: 'log-task-4', message: 'Task created', timestamp: new Date().toISOString() }],
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
    tags: ['Phase 1'],
    activityLog: [{ id: 'log-task-5', message: 'Task created', timestamp: new Date().toISOString() }],
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
    tags: ['UI', 'Phase 1'],
    activityLog: [{ id: 'log-task-6', message: 'Task created', timestamp: new Date().toISOString() }],
  }
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.setAll(initialState, initialTasks),
  reducers: {
    addTask: (state, action) => {
      const task = {
        ...action.payload,
        activityLog: [{ id: `log-${Date.now()}`, message: 'Task created', timestamp: new Date().toISOString() }]
      };
      tasksAdapter.addOne(state, task);
    },
    updateTask: (state, action) => {
      const { id, changes } = action.payload;
      const existingTask = state.entities[id];
      
      if (existingTask) {
        const newLogs = [];
        
        // Check for specific field changes to generate human-readable logs
        if (changes.status && changes.status !== existingTask.status) {
          newLogs.push({ id: `log-${Date.now()}-status`, message: `Moved task to ${changes.status}`, timestamp: new Date().toISOString() });
        }
        if (changes.priority && changes.priority !== existingTask.priority) {
          newLogs.push({ id: `log-${Date.now()}-priority`, message: `Changed priority from ${existingTask.priority} to ${changes.priority}`, timestamp: new Date().toISOString() });
        }
        if (changes.title && changes.title !== existingTask.title) {
          newLogs.push({ id: `log-${Date.now()}-title`, message: `Renamed task to "${changes.title}"`, timestamp: new Date().toISOString() });
        }
        if (changes.dueDate !== undefined && changes.dueDate !== existingTask.dueDate) {
          if (changes.dueDate) {
            newLogs.push({ id: `log-${Date.now()}-date`, message: `Set due date to ${changes.dueDate}`, timestamp: new Date().toISOString() });
          } else {
            newLogs.push({ id: `log-${Date.now()}-date`, message: `Removed due date`, timestamp: new Date().toISOString() });
          }
        }
        if (changes.subtasks && JSON.stringify(changes.subtasks) !== JSON.stringify(existingTask.subtasks || [])) {
          newLogs.push({ id: `log-${Date.now()}-sub`, message: `Updated subtasks checklist`, timestamp: new Date().toISOString() });
        }
        if (changes.tags && JSON.stringify(changes.tags) !== JSON.stringify(existingTask.tags || [])) {
          newLogs.push({ id: `log-${Date.now()}-tags`, message: `Updated custom tags`, timestamp: new Date().toISOString() });
        }

        const taskChanges = {
          ...changes,
          activityLog: [...(existingTask.activityLog || []), ...newLogs]
        };

        tasksAdapter.updateOne(state, { id, changes: taskChanges });
      }
    },
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
        
        // Add activity log for cross-column drag
        const task = state.entities[taskId];
        task.activityLog = [
          ...(task.activityLog || []),
          { id: `log-${Date.now()}`, message: `Moved from ${sourceStatus} to ${destinationStatus}`, timestamp: new Date().toISOString() }
        ];

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
