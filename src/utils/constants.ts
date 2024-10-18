import { User } from './types';

export const API = 'https://shift-backend.onrender.com';

export const USER_FIELDS: { label: string; key: keyof User }[] = [
  { label: 'ID', key: '_id' },
  { label: 'Телефон', key: 'phone' },
  { label: 'Имя', key: 'firstname' },
  { label: 'Отчество', key: 'middlename' },
  { label: 'Фамилия', key: 'lastname' },
  { label: 'Email', key: 'email' },
  { label: 'Город', key: 'city' },
];
