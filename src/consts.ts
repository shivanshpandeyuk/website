// Central site metadata. Edit here, it flows everywhere.
export const SITE = {
  name: 'Shivansh Pandey',
  shortName: 'Shiv Pandey',
  title: 'Shivansh Pandey',
  tagline: 'Economics, statistics, and equity research.',
  description:
    'Shivansh Pandey — B.A. Economics, Cambridge and M.S. Statistics, LSE. My Cambridge economics notes, the stock pitches I have worked up, writing on investing and how to think about it, some code, and my dissertation.',
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
  { label: 'Dissertation', href: '/dissertations' },
];
