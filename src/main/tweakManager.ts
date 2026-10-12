import { spawn } from 'node:child_process';
import os from 'node:os';
import log from 'electron-log';
import { TWEAKS } from '../renderer/data/tweaks';

export type TweakApplyResult = {
  success: boolean;
  message: string;
};

type ProgressListener = (message: string) => void;

type Command = {
  executable: string;
  arguments: string[];
};

const isValidTweakSelection = (
  tweakIndexes: unknown,
): tweakIndexes is number[] =>
  Array.isArray(tweakIndexes) &&
  tweakIndexes.length > 0 &&
  tweakIndexes.every(
    (tweakIndex) =>
      Number.isInteger(tweakIndex) &&
      tweakIndex >= 0 &&
      tweakIndex < TWEAKS.length,
  );

const getCommand = (tweakIndex: number): Command => {
  const tweak = TWEAKS[tweakIndex];
  const commandParts = tweak.command.split(' ');
  const executable = commandParts.shift() ?? '';
  const argumentsToPass = commandParts.map((argument) =>
    argument === '$USER' ? os.userInfo().username : argument,
  );

  if (tweak.requiresSudo) {
    return {
      executable: '/usr/bin/pkexec',
      arguments: [executable, ...argumentsToPass],
    };
  }

  return {
    executable: ` /usr/bin/${executable}`.trim(),
    arguments: argumentsToPass,
  };
};

const forwardOutput = (listener: ProgressListener, output: string): void => {
  output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach(listener);
};

const runCommand = (
  command: Command,
  onProgress: ProgressListener,
): Promise<{ success: boolean; output: string }> =>
  new Promise((resolve) => {
    const childProcess = spawn(command.executable, command.arguments, {
      env: process.env,
    });
    let output = '';

    const handleOutput = (chunk: Buffer): void => {
      const text = chunk.toString();
      output += text;
      forwardOutput(onProgress, text);
    };

    childProcess.stdout.on('data', handleOutput);
    childProcess.stderr.on('data', handleOutput);
    childProcess.on('error', (error) => {
      log.error('Failed to apply tweak', error);
      resolve({
        success: false,
        output: `Could not start tweak: ${error.message}`,
      });
    });
    childProcess.on('close', (code) =>
      resolve({ success: code === 0, output: output.trim() }),
    );
  });

export const applyTweaks = async (
  tweakIndexes: unknown,
  onProgress: ProgressListener,
): Promise<TweakApplyResult> => {
  if (!isValidTweakSelection(tweakIndexes)) {
    return {
      success: false,
      message: 'No valid tweaks were selected.',
    };
  }

  for (const tweakIndex of tweakIndexes) {
    const tweak = TWEAKS[tweakIndex];
    onProgress(`Applying ${tweak.label}...`);
    const result = await runCommand(getCommand(tweakIndex), onProgress);

    if (!result.success) {
      return {
        success: false,
        message: result.output || `${tweak.label} could not be applied.`,
      };
    }
  }

  return {
    success: true,
    message: 'Selected tweaks applied successfully.',
  };
};
