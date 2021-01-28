import { usePlayback } from '../../service/use-playback'

export const Player: React.FC<{}> = () => {
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
  } = usePlayback()

  return (
    <div>
      <Soundcloud />
      <div className='flex flex-row items-center justify-between'>
        <div>
          <p className='overflow-ellipsis'>{song.user.username}</p>
          <p className='overflow-ellipsis'>{song.title}</p>
        </div>
        <div>
          {isPlaying ? (
            <button onClick={pause}>Pause</button>
          ) : (
            <button onClick={play}>Play</button>
          )}
        </div>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <span>{time}</span>
        <progress className='mx-2' max={progressEnd} value={progress} />
        <span>{duration}</span>
      </div>
    </div>
  )
}
