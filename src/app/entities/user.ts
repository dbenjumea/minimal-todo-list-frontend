import {Task} from 'src/app/entities/task';

export interface User {
  id: number;
  username: string;
  password: string;
  items: Task[];
}
