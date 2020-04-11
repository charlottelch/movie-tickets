import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/pages/homePage/homePage'
import Tickets from '@/pages/tickets/tickets'
import PersonalCenter from '@/pages/personalCenter/personalCenter'
import Massage from '@/pages/personalCenter/massage'

import Community from '@/pages/community/community'
import MovieDetail from '@/pages/tickets/movieDetail'
import TicketsBuy from '@/pages/tickets/ticketsBuy'
import Grade from '@/pages/tickets/grade'
import CinemaDetail from '@/pages/tickets/cinemaDetail'
import City from '@/components/city'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }, {
      path: '/Tickets',
      name: 'Tickets',
      component: Tickets
    },{
      path: '/Tickets/MovieDetail',
      name: 'MovieDetail',
      component: MovieDetail
    },{
      path: '/Tickets/MovieDetail/Grade',
      name: 'Grade',
      component: Grade
    },{
      path: '/Tickets/TicketsBuy',
      name: 'TicketsBuy',
      component: TicketsBuy
    },{
      path: '/Tickets/CinemaDetail',
      name: 'CinemaDetail',
      component: CinemaDetail
    },{
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },{
      path: '/PersonalCenter/Massage',
      name: 'Massage',
      component: Massage
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
