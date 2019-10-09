import Vue from 'vue'
import Vuex from 'vuex'

import player from './player'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      player,
      common
    },
    state:{
      count:0
    },
    getters:{

    },
    mutations:{
      increment(state){
        state.count +=1
      },
      decrement(state){
        state.count -=1
      }
    },
    actions:{

    }
})