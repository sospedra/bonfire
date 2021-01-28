import { MutableRefObject } from 'react'
import { usePlayback } from '../../service/use-playback'
import css from './player.module.css'

export const Player: React.FC<{
  audio: MutableRefObject<HTMLAudioElement>
}> = (props) => {
  const {
    Soundcloud,
    progress,
    progressEnd,
    play,
    pause,
    isPlaying,
    time,
    duration,
    song,
  } = usePlayback(props.audio)

  return (
    <div>
      <Soundcloud />
      <div className='flex flex-row items-center justify-between w-80'>
        <div>
          <p className='overflow-ellipsis'>{song.title}</p>
        </div>
        <div>
          {isPlaying ? (
            <button onClick={pause}>⏸</button>
          ) : (
            <button onClick={play}>▶️</button>
          )}
        </div>
      </div>
      <div className='flex flex-row items-center justify-between font-mono text-xs'>
        <span>{time}</span>
        <progress className={css.progress} max={progressEnd} value={progress} />
        <span>{duration}</span>
      </div>
    </div>
  )
}
