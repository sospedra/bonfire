import { useRef, useState } from 'react'
import { parsePlaylistID } from '../../service/playlist'

export const Playlist: React.FC<{}> = () => {
  const [status, setStatus] = useState<'idle' | 'warn'>('idle')
  const input = useRef<HTMLInputElement>()

  return (
    <div>
      <label htmlFor='playlist'>Soundcloud iframe</label>
      <input ref={input} id='playlist' />
      {status === 'warn' && <p>This will reload the page immediately</p>}
      <button
        onClick={() => {
          if (status === 'idle') {
            setStatus('warn')
          } else {
            const playlistID = parsePlaylistID(input.current.value)
            window.location.href = `/${playlistID}`
          }
        }}
      >
        Save playlist
      </button>
    </div>
  )
}
