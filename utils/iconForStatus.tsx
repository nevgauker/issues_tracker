import { Status } from '@prisma/client'
import { RiProgress3Line } from 'react-icons/ri'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { FaDoorClosed } from 'react-icons/fa'

export const iconForStatus = (status: Status) => {
  switch (status) {
    case Status.CLOSED:
      return <FaDoorClosed />
    case Status.CLOSED:
      return <FaDoorClosed />

    case Status.CLOSED:
      return <FaDoorClosed />
  }
}
