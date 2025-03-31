import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../store/store';
import { addTask, updateTask, deleteTask, reorderTasks, setFilter } from '../store/taskSlice';
import { Task } from '../types/task';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';

const priorityOrder = { low: 0, medium: 1, high: 2 };

export const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (filter.status) {
      result = result.filter((task) => task.status === filter.status);
    }
    if (filter.priority) {
      result = result.filter((task) => task.priority === filter.priority);
    }

    result.sort((a, b) => {
      if (filter.sortBy === 'date') {
        return filter.sortOrder === 'asc'
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        return filter.sortOrder === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

    return result;
  }, [tasks, filter]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeTaskId = String(active.id);
      const overTaskId = String(over.id);
      
      const oldIndex = filteredAndSortedTasks.findIndex(task => task.id === activeTaskId);
      const newIndex = filteredAndSortedTasks.findIndex(task => task.id === overTaskId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedFilteredTasks = arrayMove(
          [...filteredAndSortedTasks], 
          oldIndex, 
          newIndex
        );
        const taskMap = new Map(tasks.map(task => [task.id, task]));
        
        const filteredTaskIds = new Set(filteredAndSortedTasks.map(task => task.id));
        
        const newTasksOrder = tasks.filter(task => !filteredTaskIds.has(task.id));
    
        reorderedFilteredTasks.forEach(task => {
          newTasksOrder.unshift(task);
        });
        newTasksOrder.reverse();
        dispatch(reorderTasks(newTasksOrder));
      }
    }
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch(addTask(taskData));
  };

  const handleUpdateTask = (taskData: Task) => {
    dispatch(updateTask(taskData));
    setEditingTask(undefined);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
          sx={{ px: 3 }}
        >
          Add Task
        </Button>
      </Box>

      <TaskFilters
        filters={filter}
        onFilterChange={(newFilters) => dispatch(setFilter(newFilters))}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredAndSortedTasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{ mt: 2 }}>
            {filteredAndSortedTasks.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No tasks found. Create a new task to get started!
              </Typography>
            ) : (
              filteredAndSortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </Box>
        </SortableContext>
      </DndContext>

      {(isFormOpen || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(undefined);
          }}
        />
      )}
    </Box>
  );
};