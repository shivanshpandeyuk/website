// Central site metadata. Edit here, it flows everywhere.
export const SITE = {
  name: 'Shivansh Pandey',
  shortName: 'Shiv Pandey',
  title: 'Shivansh Pandey',
  tagline: 'Economics, statistics, and equity research.',
  description:
    'Shivansh Pandey: M.S. Statistics at LSE, B.A. Economics from Cambridge. Notes from both degrees, stock pitches, code, my dissertation and what I am reading.',
  email: 'shivanshpandeyuk@gmail.com',
  url: 'https://shivanshpandeyuk.github.io',
} as const;

export const SOCIALS: { label: string; href: string }[] = [
  { label: 'Email', href: 'mailto:shivanshpandeyuk@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/shivanshpandeyuk' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shivansh-pandey-uk/' },
];

// Primary navigation.
export const NAV: { label: string; href: string }[] = [
  { label: 'About', href: '/' },
  { label: 'Notes', href: '/notes' },
  { label: 'Pitches', href: '/pitches' },
  { label: 'Writing', href: '/writing' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reading', href: '/reading' },
  { label: 'Dissertation', href: '/dissertations' },
];
