import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import CastBallot from '@/components/CastBallot'
import QueryAll from '@/components/QueryAll'
import GetCurrentStanding from '@/components/GetCurrentStanding'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/castBallot',
      name: 'CastBallot',
      component: CastBallot
    },
    {
      path: '/queryAll',
      name: 'QueryAll',
      component: QueryAll
    },
    {
      path: '/getCurrentStanding',
      name: 'GetCurrentStanding',
      component: GetCurrentStanding
    }
  ]
})
