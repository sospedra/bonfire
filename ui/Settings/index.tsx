import { useCallback, useState } from 'react'

export const Settings: React.FC<{}> = () => {
  const [modalVisibility, setModalVisibility] = useState<'hidden' | 'block'>(
    'hidden',
  )
  const toggleVisibility = useCallback(() => {
    setModalVisibility(modalVisibility === 'hidden' ? 'block' : 'hidden')
  }, [modalVisibility])

  return (
    <div>
      <button className='absolute top-0 right-0 p-4' onClick={toggleVisibility}>
        <span aria-label='settings'>⚙️</span>
      </button>

      <aside
        className={`${modalVisibility} fixed inset-0 bg-opacity-70 bg-black flex justify-center items-center p-16`}
      >
        <div onClick={toggleVisibility} className='absolute inset-0' />
        <div className='relative w-full max-w-lg p-6 bg-black border-2 border-white rounded'>
          <button
            onClick={toggleVisibility}
            className='absolute top-0 right-0 pt-3 pr-4'
          >
            𝗫
          </button>
          <h1 className='text-6xl font-bold'>Bonfire</h1>
          <h2 className='pb-6 text-2xl'>The working room</h2>
          <h3 className='py-4 text-xl'>How it works?</h3>
          <h3 className='py-4 text-xl'>Settings</h3>
          <h3 className='py-4 text-xl'>Credits</h3>
        </div>
      </aside>
    </div>
  )
}
