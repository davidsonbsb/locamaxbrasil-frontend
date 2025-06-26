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
    name: 'Aplicativos',
    url: '/aplicativos',
    iconComponent: { name: 'cil-puzzle' },
  },
  {
    name: 'Financeiro',
    title: true
  },
  {
    name: 'Lançamentos',
    url: '/lancamento',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Extrado',
    url: '/extrato',
    iconComponent: { name: 'cil-chart' },
  },
];
