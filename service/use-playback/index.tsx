import { useCallback, useEffect, useReducer, useRef } from 'react'
import { toTime } from './toTime'

type Song = Parameters<
  Parameters<ReturnType<typeof window.SC.Widget>['getCurrentSound']>[0]
>[0]
type Progress = {
  currentPosition: number
  relativePosition: number
}

const defaultState = {
  song: { user: {} } as Song,
  isReady: false,
  isPlaying: false,
  duration: '0:00',
  time: '0:00',
  progress: 0,
  progressEnd: 0,
}

export const usePlayback = () => {
  const iframe = useRef<HTMLIFrameElement>()
  const widget = useRef<ReturnType<typeof window.SC.Widget>>()
  const [state, dispatch] = useReducer(
    (
      state: typeof defaultState,
      action:
        | { type: 'ready' }
        | { type: 'play'; song: Song }
        | { type: 'pause' }
        | { type: 'progress'; progress: Progress },
    ) => {
      switch (action.type) {
        case 'ready': {
          return { ...state, isReady: true }
        }
        case 'play': {
          return {
            ...state,
            song: action.song,
            duration: toTime(action.song.duration),
            progressEnd: action.song.duration,
            isPlaying: true,
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
      <iframe
        allow='autoplay'
        // className='hidden'
        ref={iframe}
        scrolling='no'
        src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1201400941&color=%230c1c04&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false'
      />
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
              widget.current.getCurrentSound((song) => {
                dispatch({
                  type: 'play',
                  song,
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
