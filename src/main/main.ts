/* eslint no-console: off, promise/always-return: off */
import path from 'path';
import { app, BrowserWindow, Menu, shell, ipcMain, dialog } from 'electron';
import log from 'electron-log';
import { checkEnvironment, EnvironmentCheckResult } from './environmentCheck';
import { installPackages } from './packageInstaller';
import { enableServices } from './serviceManager';
import { applyTweaks } from './tweakManager';
import { resolveHtmlPath } from './util';
import startAutoUpdates from './updates';

// No menu bar below the title bar. Electron would otherwise install its
// default File/Edit/View menu.
Menu.setApplicationMenu(null);

let mainWindow: BrowserWindow | null = null;

const sendInstallProgress = (message: string): void => {
  mainWindow?.webContents.send('packages:install-progress', message);
};

const sendServiceProgress = (message: string): void => {
  mainWindow?.webContents.send('services:enable-progress', message);
};

const sendTweakProgress = (message: string): void => {
  mainWindow?.webContents.send('tweaks:apply-progress', message);
};

const showEnvironmentWarnings = async (
  environment: EnvironmentCheckResult,
): Promise<void> => {
  const missingRequirements: string[] = [];

  if (!environment.yayInstalled) {
    missingRequirements.push('yay is not installed or is not available in PATH.');
  }
  if (!environment.chaoticAurEnabled) {
    missingRequirements.push(
      'The Chaotic-AUR repository is not enabled in /etc/pacman.conf.',
    );
  }

  if (missingRequirements.length === 0) return;

  await dialog.showMessageBox(mainWindow ?? undefined, {
    type: 'warning',
    title: 'System setup needed',
    message: 'Some Tiago Linux Utility features may not work yet.',
    detail: missingRequirements.join('\n'),
    buttons: ['OK'],
  });
};

ipcMain.handle('packages:install', (_, packageNames: unknown) =>
  installPackages(packageNames, sendInstallProgress),
);

ipcMain.handle('services:enable', (_, serviceNames: unknown) =>
  enableServices(serviceNames, sendServiceProgress),
);

ipcMain.handle('tweaks:apply', (_, tweakIndexes: unknown) =>
  applyTweaks(tweakIndexes, sendTweakProgress),
);

if (process.env.NODE_ENV === 'production') {
  process.setSourceMapsEnabled(true);
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  void import('electron-debug')
    .then(({ default: debug }) => debug())
    .catch(console.error);
}

const installExtensions = async () => {
  const { installExtension, REACT_DEVELOPER_TOOLS } =
    await import('electron-devtools-installer');
  return installExtension(REACT_DEVELOPER_TOOLS, {
    forceDownload: !!process.env.UPGRADE_EXTENSIONS,
  }).catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(app.getAppPath(), 'assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1355,
    height: 715,
    minWidth: 520,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
    },
  });

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const win = mainWindow;

  if (isDebug) {
    win.webContents.on('context-menu', (_, { x, y }) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => win.webContents.inspectElement(x, y),
        },
      ]).popup({ window: win });
    });
  }

  // Open urls in the user's browser
  win.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  await win.loadURL(resolveHtmlPath('index.html'));
};

app.on('window-all-closed', () => {
  app.quit();
});

function reportWindowError(error: unknown) {
  log.error('Failed to create the application window', error);
  mainWindow?.destroy();
  mainWindow = null;
}

app
  .whenReady()
  .then(async () => {
    await createWindow();
    await showEnvironmentWarnings(await checkEnvironment());
    startAutoUpdates();
  })
  .catch((error: unknown) => {
    reportWindowError(error);
    app.quit();
  });
