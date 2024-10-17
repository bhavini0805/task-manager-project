import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'done';
  created_at?: string;
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.post<Task>(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (id: number, status: Task['status']): Promise<Task> => {
  try {
    const response = await axios.put<Task>(`${API_URL}/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};