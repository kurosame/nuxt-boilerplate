export interface IEventState {
  title: string
  catch: string
  description: string
  eventUrl: string
  startedAt: string
  endedAt: string
  address: string
}

export interface IEventsState {
  events: IEventState[]
}

export const state: IEventsState = {
  events: []
}

export const mutations = {
  setEvents(state: IEventsState, events: IEventState[]) {
    state.events = [...state.events, ...events]
  }
}