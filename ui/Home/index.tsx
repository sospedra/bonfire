import Head from 'next/head'
import { Goatcounter } from '../../service/analytics'
import { useAudio } from '../Audio'
import { Background } from '../Background'
import { Footer } from '../Footer'
import { Player } from '../Player'
import { Settings } from '../Settings'
import { Timer } from '../Timer'

export const Home: React.FC<{ playlistID: string }> = (props) => {
  const { Audio, audio } = useAudio()
  return (
    <div className='text-white'>
      <Head>
        <title>Bonfire | The work room</title>
        <Goatcounter />
        <script
          src='https://w.soundcloud.com/player/api.js'
          type='text/javascript'
        />
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>'
        />
      </Head>

      <aside>
        <Background />
      </aside>

      <div className='fixed right-0 flex flex-col items-center justify-between w-full h-screen p-4 lg:p-12 lg:w-2/3 lg:left-1/3 bg-gradient-to-r from-transparent to-black'>
        <main className='flex flex-col justify-center flex-1'>
          <Timer />
          <Player audio={audio} playlistID={props.playlistID} />
          {Audio}
        </main>

        <Settings />
        <Footer />
      </div>
    </div>
  )
}
