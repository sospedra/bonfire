import { useState } from 'react'
import { Countdown } from './Countdown'
import { Start } from './Start'

export const Timer: React.FC<{}> = () => {
  const [status, setStatus] = useState<'idle' | 'long' | 'short'>('idle')

  return (
    <div className='w-full mb-12'>
      {status === 'idle' ? (
        <Start onSelect={(mode) => setStatus(mode)} />
      ) : (
        <Countdown mode={status} done={() => setStatus('idle')} />
      )}
    </div>
  )
}
