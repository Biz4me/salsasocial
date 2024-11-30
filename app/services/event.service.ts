import { Observable } from '@nativescript/core';
import { Event } from '../models/event.model';
import { StorageService } from './storage.service';

export class EventService extends Observable {
    private static instance: EventService;
    private storageService: StorageService;
    private readonly EVENTS_KEY = 'events';

    private constructor() {
        super();
        this.storageService = StorageService.getInstance();
        this.initializeEvents();
    }

    static getInstance(): EventService {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }
        return EventService.instance;
    }

    private initializeEvents(): void {
        const events = this.storageService.getItem(this.EVENTS_KEY);
        if (!events) {
            this.storageService.setItem(this.EVENTS_KEY, this.getMockEvents());
        }
    }

    async getNearbyEvents(): Promise<Event[]> {
        return this.storageService.getItem(this.EVENTS_KEY) || [];
    }

    async createEvent(event: Event): Promise<void> {
        const events = await this.getNearbyEvents();
        events.push({
            ...event,
            id: Date.now().toString(),
            participants: []
        });
        this.storageService.setItem(this.EVENTS_KEY, events);
    }

    private getMockEvents(): Event[] {
        return [
            {
                id: '1',
                title: "Salsa Night at Club Tropicana",
                description: "Join us for a night of amazing salsa music and dancing!",
                type: 'party',
                date: new Date(),
                location: {
                    address: "123 Dance Street",
                    latitude: 48.8566,
                    longitude: 2.3522
                },
                price: 10,
                organizerId: 'org1',
                acceptedLevels: ['beginner', 'intermediate', 'advanced'],
                participants: []
            },
            {
                id: '2',
                title: "Beginner Salsa Workshop",
                description: "Learn the basics of salsa in this beginner-friendly workshop",
                type: 'class',
                date: new Date(Date.now() + 86400000),
                location: {
                    address: "Dance Studio Downtown",
                    latitude: 48.8566,
                    longitude: 2.3522
                },
                price: 25,
                organizerId: 'org2',
                acceptedLevels: ['beginner'],
                participants: []
            }
        ];
    }
}