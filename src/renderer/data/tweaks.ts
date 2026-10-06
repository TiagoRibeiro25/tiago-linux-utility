export type Tweak = {
  label: string;
  description: string;
  command: string;
  requiresSudo: boolean;
};

export const TWEAKS: Tweak[] = [
  {
    label: 'Add docker group',
    description:
      'Add the current user to the docker group to allow running docker commands without sudo.',
    command: 'sudo usermod -aG docker $USER',
    requiresSudo: true,
  },
  {
    label: 'Add flathub repository',
    description: 'Add the flathub repository to allow installing flatpak apps.',
    command:
      'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo',
    requiresSudo: false,
  },
];
