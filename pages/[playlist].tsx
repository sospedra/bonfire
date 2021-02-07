import { GetServerSideProps } from 'next'
import { Home } from '../ui/Home'

export default function Root(props: { playlistID: string }) {
  return <Home playlistID={props.playlistID} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      playlistID: context.params.playlist,
    },
  }
}
