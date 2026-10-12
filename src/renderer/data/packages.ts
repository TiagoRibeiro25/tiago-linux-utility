export type Category =
  'Development' | 'Games' | 'Internet' | 'Multimedia' | 'Office' | 'Utilities';

export type Package = {
  label: string;
  packageName: string;
  category: Category;
};

export const CATEGORIES: Category[] = [
  'Development',
  'Internet',
  'Multimedia',
  'Office',
  'Games',
  'Utilities',
];

export const PACKAGES: Package[] = [
  {
    label: 'AnyDesk',
    packageName: 'anydesk-bin',
    category: 'Utilities',
  },
  {
    label: 'Appmanager',
    packageName: 'appmanager',
    category: 'Utilities',
  },
  {
    label: 'Gnome Disk Usage Analyzer',
    packageName: 'baobab',
    category: 'Utilities',
  },
  {
    label: 'Bat',
    packageName: 'bat',
    category: 'Utilities',
  },
  {
    label: 'btop',
    packageName: 'btop',
    category: 'Utilities',
  },
  {
    label: 'Desktop Plus (AUR)',
    packageName: 'desktop-plus-bin',
    category: 'Development',
  },
  {
    label: 'Docker',
    packageName: 'docker',
    category: 'Development',
  },
  {
    label: 'Docker Compose',
    packageName: 'docker-compose',
    category: 'Development',
  },
  {
    label: 'EasyEffects',
    packageName: 'easyeffects',
    category: 'Multimedia',
  },
  {
    label: 'Fastfetch',
    packageName: 'fastfetch',
    category: 'Utilities',
  },
  {
    label: 'Fcitx5',
    packageName: 'fcitx5',
    category: 'Utilities',
  },
  {
    label: 'Fcitx5 Config Tool',
    packageName: 'fcitx5-configtool',
    category: 'Utilities',
  },
  {
    label: 'Firewalld',
    packageName: 'firewalld',
    category: 'Utilities',
  },
  {
    label: 'Firewalld GUI',
    packageName: 'firewall-config',
    category: 'Utilities',
  },
  {
    label: 'Flatpak',
    packageName: 'flatpak',
    category: 'Utilities',
  },
  {
    label: 'Gnome Calculator',
    packageName: 'gnome-calculator',
    category: 'Utilities',
  },
  {
    label: 'Gnome Disk Utility',
    packageName: 'gnome-disk-utility',
    category: 'Utilities',
  },
  {
    label: 'Gnome System Monitor',
    packageName: 'gnome-system-monitor',
    category: 'Utilities',
  },
  {
    label: 'Google Chrome',
    packageName: 'google-chrome',
    category: 'Internet',
  },
  {
    label: 'Gwenview',
    packageName: 'gwenview',
    category: 'Multimedia',
  },
  {
    label: 'Intel Undervolt',
    packageName: 'intel-undervolt',
    category: 'Utilities',
  },
  {
    label: 'Jdownloader',
    packageName: 'jdownloader2',
    category: 'Utilities',
  },
  {
    label: 'KeepassXC',
    packageName: 'keepassxc',
    category: 'Utilities',
  },
  {
    label: 'Lact',
    packageName: 'lact',
    category: 'Utilities',
  },
  {
    label: 'LocalSend',
    packageName: 'localsend',
    category: 'Utilities',
  },
  {
    label: 'MegaSync',
    packageName: 'megasync-bin',
    category: 'Utilities',
  },
  {
    label: 'Microsoft Fonts',
    packageName: 'ttf-ms-fonts',
    category: 'Utilities',
  },
  {
    label: 'Mission Center',
    packageName: 'mission-center',
    category: 'Utilities',
  },
  {
    label: 'NBFC (Notebook Fan Control)',
    packageName: 'nbfc',
    category: 'Utilities',
  },
  {
    label: 'Node.js',
    packageName: 'nodejs',
    category: 'Development',
  },
  {
    label: 'Microsoft Edge',
    packageName: 'microsoft-edge-stable-bin',
    category: 'Internet',
  },
  {
    label: 'MongoDB Compass',
    packageName: 'mongodb-compass',
    category: 'Development',
  },
  {
    label: 'NPM Check Updates',
    packageName: 'npm-check-updates',
    category: 'Development',
  },
  {
    label: 'NVM',
    packageName: 'nvm',
    category: 'Development',
  },
  {
    label: 'Nvtop',
    packageName: 'nvtop',
    category: 'Utilities',
  },
  {
    label: 'OBS Studio',
    packageName: 'obs-studio-browser',
    category: 'Multimedia',
  },
  {
    label: 'Okular',
    packageName: 'okular',
    category: 'Multimedia',
  },
  {
    label: 'Only Office',
    packageName: 'onlyoffice-bin',
    category: 'Office',
  },
  {
    label: 'OpenCode',
    packageName: 'opencode',
    category: 'Development',
  },
  {
    label: 'OpenRGB',
    packageName: 'openrgb',
    category: 'Utilities',
  },
  {
    label: 'Parsec',
    packageName: 'parsec-bin',
    category: 'Games',
  },
  {
    label: 'Postman',
    packageName: 'postman-bin',
    category: 'Development',
  },
  {
    label: 'Protonplus',
    packageName: 'protonplus',
    category: 'Games',
  },
  {
    label: 'Python',
    packageName: 'python3',
    category: 'Development',
  },
  {
    label: 'Spotify (Adblock)',
    packageName: 'spotify-adblock-git',
    category: 'Multimedia',
  },
  {
    label: 'Snapshot',
    packageName: 'snapshot',
    category: 'Utilities',
  },
  {
    label: 'Stress',
    packageName: 'stress',
    category: 'Utilities',
  },
  {
    label: 'Trash Cli',
    packageName: 'trash-cli',
    category: 'Utilities',
  },
  {
    label: 'Throttled',
    packageName: 'throttled',
    category: 'Utilities',
  },
  {
    label: 'TLP',
    packageName: 'tlp',
    category: 'Utilities',
  },
  {
    label: 'TLP Power Daemon',
    packageName: 'tlp-pd',
    category: 'Utilities',
  },
  {
    label: 'TLPUI',
    packageName: 'tlpui',
    category: 'Utilities',
  },
  {
    label: 'Vesktop',
    packageName: 'vesktop-bin',
    category: 'Internet',
  },
  {
    label: 'Video Trimmer',
    packageName: 'video-trimmer',
    category: 'Utilities',
  },
  {
    label: 'Visual Studio Code',
    packageName: 'visual-studio-code-bin',
    category: 'Development',
  },
  {
    label: 'VLC',
    packageName: 'vlc',
    category: 'Multimedia',
  },
  {
    label: 'VM Curator (AUR)',
    packageName: 'vm-curator-bin',
    category: 'Utilities',
  },
  {
    label: 'Vulkan Tools',
    packageName: 'vulkan-tools',
    category: 'Utilities',
  },
  {
    label: 'Youtube Music',
    packageName: 'pear-desktop',
    category: 'Utilities',
  },
];
