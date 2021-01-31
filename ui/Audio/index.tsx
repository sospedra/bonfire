import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useAudio = () => {
  const audio = useRef<HTMLAudioElement>()
  const [status, setStatus] = useState<'pause' | 'play'>('pause')
  const play = useCallback(() => setStatus('play'), [])
  const pause = useCallback(() => setStatus('pause'), [])

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = 0.5
      audio.current.addEventListener('play', play)
      audio.current.addEventListener('pause', pause)
    }
    return () => {
      if (audio.current) {
        audio.current.removeEventListener('play', play)
        audio.current.removeEventListener('pause', pause)
      }
    }
  }, [audio])
  const Audio = useMemo(
    () => (
      <div>
        <audio ref={audio} loop preload='auto'>
          <source src='/bonfire.aac' type='audio/aac' />
        </audio>

        <button
          className='flex flex-row items-center justify-end w-full text-sm'
          onClick={() => {
            switch (status) {
              case 'pause':
                return audio.current?.play()
              case 'play':
                return audio.current?.pause()
            }
          }}
        >
          <input
            type='checkbox'
            name='ambience'
            defaultChecked={status === 'play'}
            className='cursor-pointer'
          />
          <label htmlFor='ambience' className='ml-1 cursor-pointer'>
            ambience sound
          </label>
        </button>
      </div>
    ),
    [status, audio],
  )

  return { Audio, audio }
}
