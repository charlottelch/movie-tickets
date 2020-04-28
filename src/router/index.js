import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/loginAndRegister/login'
import Register from '@/pages/loginAndRegister/register'
import HomePage from '@/pages/homePage/homePage'
import Tickets from '@/pages/tickets/tickets'
import MovieDetail from '@/pages/tickets/movieDetail'
import TicketsBuy from '@/pages/tickets/ticketsBuy'
import Grade from '@/pages/tickets/grade'

import SelectSeat from '@/pages/tickets/selectSeat'

import CinemaDetail from '@/pages/tickets/cinemaDetail'
import CinemaMap from '@/pages/tickets/CinemaMap'

import PersonalCenter from '@/pages/personalCenter/personalCenter'
import Message from '@/pages/personalCenter/message'
import Setting from '@/pages/personalCenter/setting'
import NicknameEdit from '@/pages/personalCenter/nicknameEdit'
import ChangePassword from '@/pages/personalCenter/changePassword'
import SignIn from '@/pages/personalCenter/signIn'
import MovieTickets from '@/pages/personalCenter/MovieTickets'
import TicketDetail from '@/pages/personalCenter/TicketDetail'

import Community from '@/pages/community/community'
import City from '@/components/city'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }, {
      path: '/Tickets',
      name: 'Tickets',
      component: Tickets
    },
    {
      path: '/Tickets/CinemaMap',
      name: 'CinemaMap',
      component: CinemaMap
    }, {
      path: '/Tickets/MovieDetail',
      name: 'MovieDetail',
      component: MovieDetail
    },
    {
      path: '/Tickets/MovieDetail/SelectSeat',
      name: 'SelectSeat',
      component: SelectSeat
    },
    {
      path: '/Tickets/MovieDetail/Grade',
      name: 'Grade',
      component: Grade
    }, {
      path: '/Tickets/TicketsBuy',
      name: 'TicketsBuy',
      component: TicketsBuy
    }, {
      path: '/Tickets/CinemaDetail',
      name: 'CinemaDetail',
      component: CinemaDetail
    }, {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    }, {
      path: '/PersonalCenter/Message',
      name: 'Message',
      component: Message
    }, {
      path: '/PersonalCenter/Setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/PersonalCenter/Setting/NicknameEdit',
      name: 'NicknameEdit',
      component: NicknameEdit
    }, {
      path: '/PersonalCenter/Setting/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    }, {
      path: '/PersonalCenter/SignIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/PersonalCenter/MovieTickets',
      name: 'MovieTickets',
      component: MovieTickets
    }, {
      path: '/PersonalCenter/MovieTickets/TicketDetail',
      name: 'TicketDetail',
      component: TicketDetail
    }, {
      path: '/Community',
      name: 'Community',
      component: Community
    }, {
      path: '/City',
      name: 'City',
      component: City
    }
  ]

})


