import { NavItem, Feature, Step } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'SERVICES', href: '#services' },
  { label: 'ABOUT', href: '#about' },
  { label: 'BLOG', href: '#blog' },
  { label: 'CONTACT', href: '#contact' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Workflow Magic',
    description: 'Automate invoicing, email sorting, and scheduling. Watch your to-do list shrink automatically without lifting a finger.',
    icon: 'auto_fix_high',
    color: 'pink',
  },
  {
    title: 'Customer Insights',
    description: 'Know exactly what your customers want before they do. Our AI analyzes trends so you can act fast and stay ahead.',
    icon: 'insights',
    color: 'orange',
  },
  {
    title: 'Set It & Forget It',
    description: 'Deploy intelligent bots that handle customer support and lead qualification 24/7, even while you sleep.',
    icon: 'smart_toy',
    color: 'teal',
  },
];

export const STEPS: Step[] = [
  {
    title: 'The Chat',
    description: 'We listen to your business pains.',
    subDescription: 'We identify the bottlenecks slowing you down.',
    icon: 'chat_bubble',
    gradient: 'sphere-1',
    color: 'text-onyx-pink',
  },
  {
    title: 'The Blueprint',
    description: 'We map out the simple fixes.',
    subDescription: 'A clear plan to automate the messy stuff.',
    icon: 'architecture',
    gradient: 'sphere-2',
    color: 'text-onyx-orange',
  },
  {
    title: 'The Launch',
    description: 'We handle the tech, you enjoy the results.',
    subDescription: 'We deploy, test, and hand you the keys.',
    icon: 'rocket_launch',
    gradient: 'sphere-3',
    color: 'text-onyx-teal',
  },
];
