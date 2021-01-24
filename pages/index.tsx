import Head from 'next/head'
import { Audio } from '../ui/Audio'
import { Background } from '../ui/Background'
import { Player } from '../ui/Player'
import { Timer } from '../ui/Timer'

export default function Home() {
  return (
    <div className='text-white'>
      <Head>
        <title>Bonfire | The work room</title>
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
          <Player />
          <Audio />
        </main>
        <footer className='flex'>
          <p>footah</p>
        </footer>
      </div>
    </div>
  )
}
