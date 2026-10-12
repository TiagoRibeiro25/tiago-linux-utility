import { spawn } from 'node:child_process';
import log from 'electron-log';

export type PackageInstallResult = {
  success: boolean;
  message: string;
};

type ProgressListener = (message: string) => void;

const PACKAGE_NAME_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9+._@:/-]*$/;

const isValidPackageList = (packageNames: unknown): packageNames is string[] =>
  Array.isArray(packageNames) &&
  packageNames.length > 0 &&
  packageNames.every(
    (packageName) =>
      typeof packageName === 'string' &&
      PACKAGE_NAME_PATTERN.test(packageName) &&
      !packageName.startsWith('-'),
  );

const getInstallCommand = (packageNames: string[]): string[] => {
  return [
    '/usr/bin/yay',
    '-S',
    '--needed',
    '--noconfirm',
    '--sudo',
    '/usr/bin/pkexec',
    ...packageNames,
  ];
};

const forwardOutput = (listener: ProgressListener, output: string): void => {
  output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach(listener);
};

export const installPackages = async (
  packageNames: unknown,
  onProgress: ProgressListener,
): Promise<PackageInstallResult> => {
  if (!isValidPackageList(packageNames)) {
    return {
      success: false,
      message: 'No valid packages were selected.',
    };
  }

  onProgress('Requesting administrator permission...');

  return new Promise((resolve) => {
    const [command, ...argumentsToPass] = getInstallCommand(packageNames);
    const installer = spawn(command, argumentsToPass, {
      env: process.env,
    });
    let output = '';

    const handleOutput = (chunk: Buffer): void => {
      const text = chunk.toString();
      output += text;
      forwardOutput(onProgress, text);
    };

    installer.stdout.on('data', handleOutput);
    installer.stderr.on('data', handleOutput);
    installer.on('error', (error) => {
      log.error('Failed to start package installation', error);
      resolve({
        success: false,
        message: `Could not start yay: ${error.message}`,
      });
    });
    installer.on('close', (code) => {
      const success = code === 0;
      resolve({
        success,
        message: success
          ? 'Selected packages installed successfully.'
          : output.trim() || `Installation failed with exit code ${code}.`,
      });
    });
  });
};
