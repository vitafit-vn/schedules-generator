import { createContext } from 'preact-context';

const PAGES_CONFIG = [
  {
    key: 'home',
    label: 'Trang chủ',
    path: '/',
  },
  {
    key: 'schedules',
    label: 'Lịch tập',
    path: '/schedules',
  },
  {
    disabled: true,
    key: 'meals',
    label: 'Thực đơn',
    path: '/meals',
  },
  {
    disabled: true,
    key: 'sales',
    label: 'Sales kit',
    path: '/sales',
  },
];

const GlobalDataContext = createContext({});

/* eslint-disable import/prefer-default-export */

export { PAGES_CONFIG, GlobalDataContext };
