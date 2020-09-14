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
        link: '/pages/ais/aisConfigs',
      },
    ],
  },
  {
    title: 'Support Programs',
    icon: 'color-picker-outline',
    children: [
      {
        title: 'V100',
        link: '/pages/support/support',
        queryParams: {productName: 'v100'},
      },
      {
        title: 'SR203',
        link: '/pages/support/support',
        queryParams: {productName: 'sr203'},
      },
      {
        title: 'E100',
        link: '/pages/support/support',
        queryParams: {productName: 'e100'}
      },
    ],
  },
  {
    title: 'Firmware',
    icon: 'smartphone-outline',
    link: '/pages/firmware',
  },
];
