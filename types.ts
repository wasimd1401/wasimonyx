export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: 'pink' | 'orange' | 'teal';
}

export interface Step {
  title: string;
  description: string;
  subDescription: string;
  icon: string;
  gradient: 'sphere-1' | 'sphere-2' | 'sphere-3';
  color: string;
}
