import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/loginAndRegister/login'
import Register from '@/pages/loginAndRegister/register'
import HomePage from '@/pages/homePage/homePage'
import SecondSwipe from '@/pages/homePage/secondSwipe'
import FirstSwipe from '@/pages/homePage/FirstSwipe'

import Tickets from '@/pages/tickets/tickets'
import MovieDetail from '@/pages/tickets/movieDetail'
import TicketsBuy from '@/pages/tickets/ticketsBuy'
import Grade from '@/pages/tickets/grade'
import Performer from '@/pages/tickets/performer'

import SelectSeat from '@/pages/tickets/selectSeat'
import BuyTickets from '@/pages/tickets/buyTickets'
import PaymentOptions from '@/pages/tickets/paymentOptions'
import PayNow from '@/pages/tickets/payNow'
import PaySuccess from '@/pages/tickets/paySuccess'
import AllMovieComments from '@/pages/tickets/allMovieComments'
import MovieCommentReply from '@/pages/tickets/movieCommentReply'
import VideoPlay from '@/pages/tickets/videoPlay'

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
import Coupon from '@/pages/personalCenter/coupon'
import LikeMoviePage from '@/pages/personalCenter/likeMoviePage'
import Member from '@/pages/personalCenter/member'
import UserComment from '@/pages/personalCenter/userComment'

import Community from '@/pages/community/community'
import Video from '@/pages/community/video'
import PersonalHomepage from '@/pages/community/personalHomepage'
import EditCommunity from '@/pages/community/editCommunity'
import FollowAndFansList from '@/pages/community/followAndFansList'

import City from '@/components/city'
import Search from '@/components/search'
import SearchVideo from '@/components/searchVideo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/Register',
      name: 'Register',
      component: Register
    }, {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },{
      path: '/SecondSwipe',
      name: 'SecondSwipe',
      component: SecondSwipe
    },{
      path: '/FirstSwipe',
      name: 'FirstSwipe',
      component: FirstSwipe
    }, {
      path: '/Tickets',
      name: 'Tickets',
      component: Tickets
    }, {
      path: '/Tickets/CinemaMap',
      name: 'CinemaMap',
      component: CinemaMap
    }, {
      path: '/Tickets/MovieDetail',
      name: 'MovieDetail',
      component: MovieDetail
    },{
      path: '/Tickets/MovieDetail/Performer',
      name: 'Performer',
      component: Performer
    }, {
      path: '/Tickets/MovieDetail/SelectSeat',
      name: 'SelectSeat',
      component: SelectSeat
    }, {
      path: '/Tickets/MovieDetail/SelectSeat/BuyTickets',
      name: 'BuyTickets',
      component: BuyTickets
    },{
      path: '/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions',
      name: 'PaymentOptions',
      component: PaymentOptions
    },{
      path: '/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions/PayNow',
      name: 'PayNow',
      component: PayNow
    },{
      path: '/Tickets/MovieDetail/SelectSeat/BuyTickets/PaymentOptions/PayNow/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    },{
      path: '/Tickets/MovieDetail/AllMovieComments',
      name: 'AllMovieComments',
      component: AllMovieComments
    },{
      path: '/Tickets/MovieDetail/AllMovieComments/MovieCommentReply',
      name: 'MovieCommentReply',
      component: MovieCommentReply
    },{
      path: '/Tickets/VideoPlay',
      name: 'VideoPlay',
      component: VideoPlay
    }, {
      path: '/Tickets/MovieDetail/Grade',
      name: 'Grade',
      component: Grade
    }, {
      path: '/Tickets/TicketsBuy',
      name: 'TicketsBuy',
      component: TicketsBuy,
      meta: {
        requireAuth: true
      }
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
      component: SignIn,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/PersonalCenter/Coupon',
      name: 'Coupon',
      component: Coupon,
      meta: {
        requireAuth: true
      }
    },{
      path: '/PersonalCenter/Member',
      name: 'Member',
      component: Member,
      meta: {
        requireAuth: true
      }
    },{
      path: '/PersonalCenter/UserComment',
      name: 'UserComment',
      component: UserComment,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/PersonalCenter/LikeMoviePage',
      name: 'LikeMoviePage',
      component: LikeMoviePage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/PersonalCenter/MovieTickets',
      name: 'MovieTickets',
      component: MovieTickets,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/PersonalCenter/MovieTickets/TicketDetail',
      name: 'TicketDetail',
      component: TicketDetail
    }, {
      path: '/Community',
      name: 'Community',
      component: Community
    }, {
      path: '/Community/Video',
      name: 'Video',
      component: Video
    }, {
      path: '/Community/PersonalHomepage',
      name: 'PersonalHomepage',
      component: PersonalHomepage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/Community/EditCommunity',
      name: 'EditCommunity',
      component: EditCommunity,
      meta: {
        requireAuth: true
      }
    },{
      path: '/Community/FollowAndFansList',
      name: 'FollowAndFansList',
      component: FollowAndFansList
    }, {
      path: '/City',
      name: 'City',
      component: City
    }, {
      path: '/Search',
      name: 'Search',
      component: Search
    }, {
      path: '/SearchVideo',
      name: 'SearchVideo',
      component: SearchVideo
    }
  ]

})


