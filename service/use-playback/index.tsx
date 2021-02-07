import {
  MutableRefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { toTime } from '../time/toTime'
import { createSong } from './create-song'

type Progress = {
  currentPosition: number
  relativePosition: number
}

const defaultState = {
  song: { user: {} } as Sound,
  isReady: false,
  isPlaying: false,
  duration: '0:00',
  time: '0:00',
  progress: 0,
  progressEnd: 0,
  pristine: true,
}

export const usePlayback = (
  audio: MutableRefObject<HTMLAudioElement>,
  playlistID: string,
) => {
  const iframe = useRef<HTMLIFrameElement>()
  const widget = useRef<ReturnType<typeof window.SC.Widget>>()
  const [state, dispatch] = useReducer(
    (
      state: typeof defaultState,
      action:
        | { type: 'ready' }
        | { type: 'play'; sound: Sound }
        | { type: 'pause' }
        | { type: 'progress'; progress: Progress },
    ) => {
      switch (action.type) {
        case 'ready': {
          return { ...state, isReady: true }
        }
        case 'play': {
          const song = createSong(action.sound)

          if (state.pristine) {
            audio.current.play()
          }

          return {
            ...state,
            song,
            duration: toTime(song.duration),
            progressEnd: song.duration,
            isPlaying: true,
            pristine: false,
          }
        }
        case 'pause': {
          return { ...state, isPlaying: false }
        }
        case 'progress': {
          const time = toTime(action.progress.currentPosition)
          return { ...state, time, progress: action.progress.currentPosition }
        }
        default: {
          return state
        }
      }
    },
    defaultState,
  )
  const Soundcloud = useCallback(
    () => (
      <div className='absolute hidden w-0 h-0 overflow-hidden'>
        <iframe
          allow='autoplay'
          ref={iframe}
          scrolling='no'
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistID}&color=%230c1c04&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
        />
      </div>
    ),
    [],
  )
  const play = useCallback(() => {
    widget.current?.play()
  }, [widget])
  const pause = useCallback(() => {
    widget.current?.pause()
  }, [widget])

  useEffect(() => {
    ;(async () => {
      if (iframe.current) {
        if (typeof window.SC !== 'undefined') {
          widget.current = window.SC.Widget(iframe.current)

          widget.current.bind(window.SC.Widget.Events.READY, function () {
            dispatch({ type: 'ready' })

            widget.current.bind(window.SC.Widget.Events.PLAY, () => {
              widget.current.getCurrentSound((sound) => {
                dispatch({
                  type: 'play',
                  sound,
                })
              })
            })

            widget.current.bind(window.SC.Widget.Events.PAUSE, () => {
              dispatch({ type: 'pause' })
            })

            widget.current.bind(
              window.SC.Widget.Events.PLAY_PROGRESS,
              (progress: Progress) => {
                dispatch({ type: 'progress', progress: progress })
              },
            )
          })
        }
      }
    })()
  }, [iframe])

  return {
    ...state,
    widget,
    Soundcloud,
    play,
    pause,
  }
}
