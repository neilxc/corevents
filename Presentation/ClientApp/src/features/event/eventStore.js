import {observable, action, runInAction, computed} from "mobx";
import agent from "../../agent";

class EventStore {
    @observable isLoading = false;
    @observable isFailure = false;
    @observable isLoadingDetail = true;
    @observable eventsRegistry = observable(new Map());
    // @observable events = [];
    // @observable event = {};
    
    @computed get events() {
        return Array.from(this.eventsRegistry.values());
    }
    
    clear() {
        this.eventsRegistry.clear();
    }
    
    getEvent(id) {
        return this.eventsRegistry.get(id);
    }
    
    @action loadEvents() {
        this.isLoading = true;
        return agent.Events.all()
            .then(action(({events}) => {
                this.eventsRegistry.clear();
                events.forEach(event => {
                    event.host = event.attendees.filter(h => h.isHost === true)[0];
                    this.eventsRegistry.set(event.id, event);
                });
            }))
            .finally(action(() => {this.isLoading = false}));
    }
    
    @action loadEvent(id, {acceptCached = false} = {}) {
        if (acceptCached) {
            const event = this.getEvent(id);
            if (event) return Promise.resolve(event);
        }
        this.isLoading = true;
        return agent.Events.get(id)
            .then(action(({event}) => {
                event.host = event.attendees.filter(h => h.isHost === true)[0];
                this.eventsRegistry.set(event.id, event);
                return event;
            }))
            .finally(action(() => {this.isLoading = false;}))
    }
    
    @action
    async createEvent(eventToCreate) {
        try {
            this.isLoading = true;
            const data = await agent.Events.create(eventToCreate);
            runInAction(() => {
                this.isLoading = false;
                data.event.host = data.event.attendees.filter(h => h.isHost === true)[0];
                this.events.push(data.event);
            })
        } catch (e) {
            this.isLoading = false;
            this.isFailure = true;
            console.log(e);
        }
    }
    
    @action
    updateEvent(data) {
        return agent.Events.update(data)
            .then(({event}) => {
                event.host = event.attendees.filter(h => h.isHost === true)[0];
                this.eventsRegistry.set(event.id, event);
                return event;
            })
    }
}


class EventAttendee {
    @observable id = null;
    @observable isHost = false;
    @observable photoUrl = '';
    @observable userName = '';
    
    constructor(id, isHost, photoUrl, userName) {
        this.id = id;
        this.isHost = isHost;
        this.photoUrl = photoUrl;
        this.userName = userName;
    }
}

export default new EventStore();