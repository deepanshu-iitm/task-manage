import React from 'react';
import { TaskState } from '../types/task';
import {
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface TaskFiltersProps {
  filters: TaskState['filter'];
  onFilterChange: (filters: Partial<TaskState['filter']>) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
        <FilterListIcon color="primary" />
        <Typography variant="h6" component="h2">
          Filters
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel shrink>Status</InputLabel>
            <Select
              value={filters.status || ''}
              label="Status"
              displayEmpty
              onChange={(e) => onFilterChange({ status: e.target.value || null })}
            >
              <MenuItem value="" disabled>All</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel shrink>Priority</InputLabel>
            <Select
              value={filters.priority || ''}
              label="Priority"
              displayEmpty
              onChange={(e) => onFilterChange({ priority: e.target.value || null })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => onFilterChange({ sortBy: e.target.value as 'date' | 'priority' })}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            onClick={() => onFilterChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            variant="outlined"
            fullWidth
            sx={{ height: '56px' }}
            startIcon={filters.sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          >
            {filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};