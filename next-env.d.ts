/// <reference types="next" />
/// <reference types="next/types/global" />

type Sound = {
  artwork_url: string
  created_at: string
  description: string
  duration: number
  full_duration: number
  id: number
  kind: string
  label_name: string
  last_modified: string
  release_date: string
  title: string
  track_format: string
  uri: string
  urn: string
  display_date: string
  user: {
    id: number
    kind: string
    urn: string
    username: string
  }
}

type Widget = {
  bind: (eventName: string, listener: Function) => void
  play: () => void
  pause: () => void
  toggle: () => void
  seekTo: (milliseconds: number) => void
  setVolume: (volume: number) => void
  next: () => void
  prev: () => void
  getVolume: (callback: () => [number, number]) => void
  getDuration: (callback: () => number) => void
  getPosition: (callback: () => number) => void
  getCurrentSound: (callback: (sound: Sound) => void) => void
  isPaused: (callback: (isPaused: boolean) => void) => void
}

type WidgetFactory = (iframe: HTMLIFrameElement) => Widget

type Events = {
  Events: {
    LOAD_PROGRESS: string
    PLAY_PROGRESS: string
    PLAY: string
    PAUSE: string
    FINISH: string
    SEEK: string
    READY: string
  }
}

interface Window {
  SC: {
    Widget: WidgetFactory & Events
  }
}
