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
    link: '/pages/user',
    home: true,
  },
  {
    title: 'AIS',
    icon: 'shake-outline',
    children: [
      {
        title: 'MMSI Management',
        link: '/pages/ais/mmsi',
      },
      {
        title: 'Configs',
        link: '/auth/register',
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
