import {observable, action, runInAction, toJS} from "mobx";
import agent from "../../agent";
import userStore from "../users/userStore";

class EventStore {
    @observable isLoading = true;
    @observable isFailure = false;
    @observable isLoadingDetail = true;
    @observable events = [];
    @observable event = {};
    
    @action async getEvents() {
        try {
            const data = await agent.Events.all();
            runInAction(() => {
                data.events.forEach((event) => {
                    event.host = event.attendees.filter(h => h.isHost === true)[0];
                });
                this.isLoading = false;
                this.events = data.events;
            })
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = true;
                this.events = [];
            })
        }
    }
    
    @action async getEvent(id) {
        try {
            const data = await agent.Events.get(id);
            runInAction(() => {
                this.isLoadingDetail = false;
                data.event.host = data.event.attendees.filter(h => h.isHost === true)[0];
                this.event = data.event;
            })
        } catch (e) {
            runInAction(() => {
                this.isLoadingDetail = false;
                this.event = {};
            })
        }
    }
    
    @action
    createEvent = (eventToCreate) => {
        const newEvent = {...eventToCreate};
        let attendees = [];
        let attendee = userStore.currentUser;
        attendee.isHost = true;
        attendees.push(attendee);
        newEvent.attendees = attendees;
        newEvent.host = attendees.filter(h => h.isHost === true)[0];
        newEvent.id = 99;
        console.log(newEvent);
        
        this.events.push(newEvent);
        console.log(toJS(this.events));
    }
}

export default new EventStore();