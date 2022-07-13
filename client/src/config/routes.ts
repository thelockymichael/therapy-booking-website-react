import LyhytterapiaPage from '../components/pages/Lyhytterapia'
import KukaOlenPage from '../components/pages/KukaOlenPage'
import HinnastoPage from '../components/pages/HinnastoPage'
import Asiakasrekisteri from '../components/pages/Asiakasrekisteri'
import AjanvarausPage from '../components/pages/AjanvarausPage'
import EtusivuPage from '../components/pages/EtusivuPage'
import NoMatch from '../components/pages/NoMatch'

import BookingPage from '../components/pages/bookingPages/BookingPage'
import EditBooking from '../components/pages/bookingPages/EditBooking'

interface IRoute {
  path: Array<string> | string
  name: string
  exact?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
}

const routes: IRoute[] = [
  {
    path: ['/', '/etusivu'],
    name: 'Etusivu',
    component: EtusivuPage,
    exact: true,
  },
  {
    path: '/lyhytterapia',
    name: 'Lyhytterapia',
    component: LyhytterapiaPage,
  },
  {
    path: '/kuka-olen',
    name: 'Kuka olen',
    component: KukaOlenPage,
  },
  {
    path: '/hinnasto',
    name: 'Hinnasto',
    component: HinnastoPage,
  },
  {
    path: '/asiakasrekisteri-ja-tietosuojaseloste',
    name: 'Asiakasrekisteri ja tietosuojaseloste',
    component: Asiakasrekisteri,
  },
  {
    path: '/ajanvaraus',
    name: 'Ajanvaraus',
    component: AjanvarausPage,
  },
  // Edit Booking
  {
    path: '/booking/terapiapalvelut/booking/:confirmationCode',
    name: 'Edit Booking',
    component: EditBooking,
  },
  // Booking Page
  {
    path: '/booking/terapiapalvelut',
    name: 'Booking',
    component: BookingPage,
  },
  // 404 Not Found Page
  {
    path: '/*',
    name: 'Page Not Found',
    component: NoMatch,
    exact: true,
  },
]

export default routes
