import { EventReturn } from '../types'
import { create } from 'zustand'

interface EventStore {
  galleryEvents: EventReturn[]
  setGalleryEvents: (events: EventReturn[]) => void
}

export const useEventStore = create<EventStore>((set) => ({
  galleryEvents: [],
  setGalleryEvents: (events: EventReturn[]) => set({ galleryEvents: events }),
}))
