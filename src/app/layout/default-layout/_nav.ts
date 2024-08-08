import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Clientes',
    title: true
  },
  {
    name: 'Clientes',
    url: '/clientes',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Financeiro',
    title: true
  },
  {
    name: 'Financeiro',
    url: '/financeiro',
    iconComponent: { name: 'cil-notes' },
  }
];
