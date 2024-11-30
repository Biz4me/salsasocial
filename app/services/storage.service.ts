import { Observable } from '@nativescript/core';

export class StorageService extends Observable {
    private static instance: StorageService;
    private storage: { [key: string]: any } = {};

    private constructor() {
        super();
    }

    static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    setItem(key: string, value: any): void {
        this.storage[key] = value;
        this.notify({
            eventName: 'storageChanged',
            object: this,
            data: { key, value }
        });
    }

    getItem(key: string): any {
        return this.storage[key];
    }

    removeItem(key: string): void {
        delete this.storage[key];
        this.notify({
            eventName: 'storageChanged',
            object: this,
            data: { key, value: null }
        });
    }

    clear(): void {
        this.storage = {};
        this.notify({
            eventName: 'storageCleared',
            object: this
        });
    }
}