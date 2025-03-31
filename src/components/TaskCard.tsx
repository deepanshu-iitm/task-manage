import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/task';
import { Card, CardContent, Typography, Chip, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: { bg: 'rgba(0, 188, 212, 0.2)', color: '#00bcd4' },
  medium: { bg: 'rgba(255, 152, 0, 0.2)', color: '#ff9800' },
  high: { bg: 'rgba(244, 67, 54, 0.2)', color: '#f44336' },
};

const statusColors = {
  'todo': { bg: 'rgba(96, 125, 139, 0.2)', color: '#607d8b' },
  'in-progress': { bg: 'rgba(33, 150, 243, 0.2)', color: '#2196f3' },
  'completed': { bg: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        position: 'relative',
        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        '&:hover': {
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            '& .task-actions': { opacity: 1 },
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <Box
            {...attributes}
            {...listeners}
            sx={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              mr: 1,
              p: 0.5,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <DragHandleIcon />
          </Box>
          
          <Chip
            label={task.priority}
            size="small"
            sx={{
              backgroundColor: priorityColors[task.priority].bg,
              color: priorityColors[task.priority].color,
              fontWeight: 600,
            }}
          />
          <Chip
            label={task.status.replace('-', ' ')}
            size="small"
            sx={{
              backgroundColor: statusColors[task.status].bg,
              color: statusColors[task.status].color,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
          <Box
            className="task-actions"
            sx={{
              ml: 'auto',
              opacity: 0,
              transition: 'opacity 0.2s',
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => onEdit(task)}
              sx={{ color: '#00bcd4' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(task.id)}
              sx={{ color: '#f44336' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'white' }}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
          {task.description}
        </Typography>
        <Typography variant="caption" color="gray">
          Updated {format(new Date(task.updatedAt), 'MMM d, yyyy HH:mm')}
        </Typography>
      </CardContent>
    </Card>
  );
};