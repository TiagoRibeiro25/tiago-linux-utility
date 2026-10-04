import About from '../views/About';
import Home from '../views/Home';
import Packages from '../views/Packages';
import Services from '../views/Services';
import Tweaks from '../views/Tweaks';

export type NavigationLink = {
  path: string;
  name: string;
  hidden: boolean;
  element: React.JSX.Element;
};

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    path: '/',
    name: 'Home',
    hidden: true,
    element: Home,
  },
  {
    path: '/packages',
    name: 'Packages',
    hidden: false,
    element: Packages,
  },
  {
    path: '/services',
    name: 'Services',
    hidden: false,
    element: Services,
  },
  {
    path: '/tweaks',
    name: 'Tweaks',
    hidden: false,
    element: Tweaks,
  },
  {
    path: '/about',
    name: 'About',
    hidden: false,
    element: About,
  },
];
