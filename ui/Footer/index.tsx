import { ExternalLink } from '../ExternalLink'
import css from './footer.module.css'

export const Footer: React.FC<{}> = () => {
  return (
    <footer className='flex text-xs italic text-center'>
      <p>
        hand-crafted with 💜 by{' '}
        <ExternalLink href='https://sospedra.me' className={css.signature}>
          sospedra
        </ExternalLink>
      </p>
    </footer>
  )
}
