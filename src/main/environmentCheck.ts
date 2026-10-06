import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const PACMAN_CONFIG_PATH = '/etc/pacman.conf';
const CHAOTIC_AUR_SECTION =
  /^\s*\[chaotic-aur\]\s*\r?\n\s*Include\s*=\s*\/etc\/pacman\.d\/chaotic-mirrorlist\s*$/m;

export type EnvironmentCheckResult = {
  yayInstalled: boolean;
  chaoticAurEnabled: boolean;
};

const isYayInstalled = async (): Promise<boolean> => {
  try {
    await execFileAsync('sh', ['-c', 'command -v yay']);
    return true;
  } catch {
    return false;
  }
};

const isChaoticAurEnabled = async (): Promise<boolean> => {
  try {
    const pacmanConfig = await readFile(PACMAN_CONFIG_PATH, 'utf8');
    return CHAOTIC_AUR_SECTION.test(pacmanConfig);
  } catch {
    return false;
  }
};

export const checkEnvironment = async (): Promise<EnvironmentCheckResult> => {
  const [yayInstalled, chaoticAurEnabled] = await Promise.all([
    isYayInstalled(),
    isChaoticAurEnabled(),
  ]);

  return { yayInstalled, chaoticAurEnabled };
};
