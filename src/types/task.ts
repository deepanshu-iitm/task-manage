export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TaskState {
    tasks: Task[];
    filter: {
      status: string | null;
      priority: string | null;
      sortBy: 'date' | 'priority';
      sortOrder: 'asc' | 'desc';
    };
  }