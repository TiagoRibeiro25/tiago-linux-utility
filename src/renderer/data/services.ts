export type Service = {
  label: string;
  serviceName: string;
};

export const SERVICES: Service[] = [
  {
    label: 'Docker',
    serviceName: 'docker.socket',
  },
  {
    label: 'Firewalld',
    serviceName: 'firewalld.service',
  },
  {
    label: "Lact",
    serviceName: 'lact.service',
  },
  {
    label: 'Throttled',
    serviceName: 'throttled.service',
  },
  {
    label: 'TLP',
    serviceName: 'tlp.service',
  },
];
