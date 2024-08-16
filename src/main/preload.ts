// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const Channels = [
    'update-rank',
] as const;

export type Channels = (typeof Channels)[number];

const electronHandler = {
    ipcRenderer: {
        on(channel: Channels, func: (...args: any[]) => void) {
            const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args);
            ipcRenderer.on(channel, subscription);

            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        },
        once(channel: Channels, func: (...args: any[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
        send(channel: Channels, ...args: any[]) {
            ipcRenderer.send(channel, ...args);
        },
        invoke(channel: Channels, ...args: any[]) {
            return ipcRenderer.invoke(channel, ...args);
        },
    },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
export type ElectronHandler = typeof electronHandler;
