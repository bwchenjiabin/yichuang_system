import {baseURL} from 'common/config'

export default {
    state: {
        baseURL
    },
    getters: {
      baseURL: state => state.baseURL
    }
  }