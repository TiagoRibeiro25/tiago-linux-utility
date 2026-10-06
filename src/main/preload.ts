// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;

export type PackageInstallResult = {
  success: boolean;
  message: string;
};

export type ServiceEnableResult = {
  success: boolean;
  message: string;
};

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
  packages: {
    install(packageNames: string[]): Promise<PackageInstallResult> {
      return ipcRenderer.invoke('packages:install', packageNames);
    },
    onInstallProgress(listener: (message: string) => void) {
      const subscription = (_event: IpcRendererEvent, message: string) =>
        listener(message);
      ipcRenderer.on('packages:install-progress', subscription);

      return () => {
        ipcRenderer.removeListener('packages:install-progress', subscription);
      };
    },
  },
  services: {
    enable(serviceNames: string[]): Promise<ServiceEnableResult> {
      return ipcRenderer.invoke('services:enable', serviceNames);
    },
    onEnableProgress(listener: (message: string) => void) {
      const subscription = (_event: IpcRendererEvent, message: string) =>
        listener(message);
      ipcRenderer.on('services:enable-progress', subscription);

      return () => {
        ipcRenderer.removeListener('services:enable-progress', subscription);
      };
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
