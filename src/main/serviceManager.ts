import { spawn } from 'node:child_process';
import log from 'electron-log';

export type ServiceEnableResult = {
  success: boolean;
  message: string;
};

type ProgressListener = (message: string) => void;

const SERVICE_NAME_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9@._:-]*$/;

const isValidServiceList = (
  serviceNames: unknown,
): serviceNames is string[] =>
  Array.isArray(serviceNames) &&
  serviceNames.length > 0 &&
  serviceNames.every(
    (serviceName) =>
      typeof serviceName === 'string' &&
      SERVICE_NAME_PATTERN.test(serviceName) &&
      !serviceName.startsWith('-'),
  );

const forwardOutput = (
  listener: ProgressListener,
  output: string,
): void => {
  output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach(listener);
};

export const enableServices = async (
  serviceNames: unknown,
  onProgress: ProgressListener,
): Promise<ServiceEnableResult> => {
  if (!isValidServiceList(serviceNames)) {
    return {
      success: false,
      message: 'No valid services were selected.',
    };
  }

  onProgress('Requesting administrator permission...');

  return new Promise((resolve) => {
    const command = [
      '/usr/bin/pkexec',
      '/usr/bin/systemctl',
      'enable',
      '--now',
      ...serviceNames,
    ];
    const [executable, ...argumentsToPass] = command;
    const serviceManager = spawn(executable, argumentsToPass, {
      env: process.env,
    });
    let output = '';

    const handleOutput = (chunk: Buffer): void => {
      const text = chunk.toString();
      output += text;
      forwardOutput(onProgress, text);
    };

    serviceManager.stdout.on('data', handleOutput);
    serviceManager.stderr.on('data', handleOutput);
    serviceManager.on('error', (error) => {
      log.error('Failed to enable services', error);
      resolve({
        success: false,
        message: `Could not start systemctl: ${error.message}`,
      });
    });
    serviceManager.on('close', (code) => {
      const success = code === 0;
      resolve({
        success,
        message: success
          ? 'Selected services enabled and started successfully.'
          : output.trim() || `Service setup failed with exit code ${code}.`,
      });
    });
  });
};
