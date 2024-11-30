import { Observable } from '@nativescript/core';
import { NavigationUtil } from '../../utils/navigation.util';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

export class DashboardViewModel extends Observable {
    private eventService: EventService;
    public nearbyEvents: Event[] = [];

    constructor() {
        super();
        this.eventService = EventService.getInstance();
        this.loadNearbyEvents();
    }

    async loadNearbyEvents() {
        try {
            const events = await this.eventService.getNearbyEvents();
            this.set('nearbyEvents', events);
        } catch (error) {
            console.error('Error loading nearby events:', error);
        }
    }

    onFindEvents() {
        NavigationUtil.navigate('EVENTS');
    }

    onCreateEvent() {
        NavigationUtil.navigate('EVENT_CREATE');
    }

    onViewProfile() {
        NavigationUtil.navigate('PROFILE');
    }

    onViewMessages() {
        NavigationUtil.navigate('MESSAGES');
    }
}