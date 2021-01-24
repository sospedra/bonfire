import { useCallback, useEffect, useRef, useState } from 'react'

export const Audio: React.FC<{}> = () => {
  const ref = useRef<HTMLAudioElement>()
  const [status, setStatus] = useState<'pause' | 'play'>('pause')
  const play = useCallback(() => setStatus('play'), [])
  const pause = useCallback(() => setStatus('pause'), [])

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('play', play)
      ref.current.addEventListener('pause', pause)
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('play', play)
        ref.current.removeEventListener('pause', pause)
      }
    }
  }, [ref])

  return (
    <div>
      <audio ref={ref} loop preload='auto'>
        <source src='/bonfire.aac' type='audio/aac' />
      </audio>

      <button
        className='flex flex-row items-center'
        onClick={() => {
          switch (status) {
            case 'pause':
              return ref.current?.play()
            case 'play':
              return ref.current?.pause()
          }
        }}
      >
        <span className='flex items-center justify-center w-8 h-8 mr-2 text-sm text-center bg-white rounded-full bg-opacity-30'>
          {status === 'play' ? (
            <span className='flex pl-1' aria-label='speaker on'>
              🔊
            </span>
          ) : (
            <span className='flex pl-1' aria-label='speaker off'>
              🔇
            </span>
          )}
        </span>
        Ambience sound
      </button>
    </div>
  )
}
