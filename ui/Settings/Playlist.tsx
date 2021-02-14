import { useRef, useState } from 'react'
import { parsePlaylistID } from '../../service/playlist'
import { ExternalLink } from '../ExternalLink'

export const Playlist: React.FC<{}> = () => {
  const [status, setStatus] = useState<'idle' | 'warn'>('idle')
  const input = useRef<HTMLInputElement>()

  return (
    <form
      className='flex flex-col items-start w-full'
      onSubmit={(e) => {
        e.preventDefault()

        if (status === 'idle') {
          setStatus('warn')
        } else {
          const playlistID = parsePlaylistID(input.current.value)
          window.location.href = `/${playlistID}`
        }
      }}
    >
      <label className='flex flex-row' htmlFor='playlist'>
        SoundCloud embed code{' '}
        <ExternalLink
          className='flex items-center justify-center w-6 h-6 ml-2 bg-gray-600 rounded-full'
          href='https://help.soundcloud.com/hc/en-us/articles/115003568008-Embedding-a-track-or-playlist-'
        >
          <span aria-label='help'>?</span>
        </ExternalLink>
      </label>
      <div className='flex flex-row flex-wrap w-full'>
        <input
          type='text'
          minLength={10}
          required
          placeholder='<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1198136710&color=%230c1c04&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/barradeen" title="Barradeen" target="_blank" style="color: #cccccc; text-decoration: none;">Barradeen</a> · <a href="https://soundcloud.com/barradeen/sets/spotify" title="spotify" target="_blank" style="color: #cccccc; text-decoration: none;">spotify</a></div>'
          className='flex-1 px-2 py-1 mt-2 mr-2 text-black rounded'
          ref={input}
          id='playlist'
        />
        <input
          className={`${
            status === 'warn' ? 'bg-yellow-700' : ''
          } px-2 py-1 mt-2 bg-black border-2 border-white rounded cursor-pointer hover:underline`}
          type='submit'
          value={status === 'warn' ? 'Save now' : 'Set playlist'}
        />
      </div>
      <p className='italic text-yellow-300'>
        {status === 'warn' ? (
          'This will reload the page immediately'
        ) : (
          <span className='text-transparent'>_</span>
        )}
      </p>
    </form>
  )
}
