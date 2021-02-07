import useInterval from '@use-it/interval'
import { useRef, useState } from 'react'
import { toTime } from '../../service/time'
import { plans } from './plans'
import css from './countdown.module.css'

export const Countdown: React.FC<{
  mode: 'long' | 'short'
  done: () => void
}> = (props) => {
  const audio = useRef<HTMLAudioElement>()
  const { current: plan } = useRef(plans[props.mode])
  const [status, setStatus] = useState({
    index: 0,
    countdown: plan[0].time,
  })

  useInterval(() => {
    if (status.countdown > 0) {
      if (status.countdown === 5000) {
        audio.current.play()
      }

      setStatus({
        ...status,
        countdown: status.countdown - 1000,
      })
    } else if (plan[status.index + 1]) {
      setStatus({
        index: status.index + 1,
        countdown: plan[status.index + 1].time,
      })
    } else {
      props.done()
    }
  }, 1000)

  return (
    <div>
      <audio ref={audio} preload='auto'>
        <source src='/pips.aac' type='audio/aac' />
      </audio>

      <p className='font-mono text-center text-8xl'>
        {toTime(status.countdown)}
      </p>
      <div className='flex flex-row items-center justify-between w-full mt-4'>
        {plan.map(({ type }, position) => {
          return (
            <>
              <div
                className={`${css.bullet} ${css[type]} ${
                  position === status.index ? css.bulletActive : ''
                } ${position <= status.index ? css.bulletDone : ''}`}
              />
              {position !== plan.length - 1 && (
                <div
                  className={`${css.dash} ${
                    position < status.index ? css.dashDone : ''
                  }`}
                />
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}
