import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'User Management',
    icon: 'people-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'AIS',
    icon: 'shake-outline',
    children: [
      {
        title: 'MMSI Management',
        link: '/auth/login',
      },
      {
        title: 'Configs',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'Support Programs',
    icon: 'color-picker-outline',
    children: [
      {
        title: 'E100',
        link: '/auth/login',
      },
      {
        title: 'V100',
        link: '/auth/register',
      },
    ],
  },
  {
    title: 'Firmware',
    icon: 'smartphone-outline',
    link: '/pages/firmware',
  },
];
