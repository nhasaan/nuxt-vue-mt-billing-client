'use strict'
import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
import parser from 'cookie'

export const state = () => ({
  auth: {
    loggedIn: false,
    token: null,
    user: null
  }
})

export const mutations = {
  SET_USER (state, data) {
    state.auth.token = data.token
    state.auth.loggedIn = data.isAuthenticated
    state.auth.user = data.userinfo
  },
  SET_HEAD (state, heading) {
    state.heading.title = heading[0]
    state.heading.subtitle = heading[1]
  }
}

export const actions = {
  nuxtServerInit ({
    commit
  }, {
    req
  }) {
    if (req) {
      try {
        if (req.headers.cookie) {
          const c = parser.parse(req.headers.cookie)
          const userData = c.multi_tenant_cookie ? JSON.parse(c.multi_tenant_cookie) : {
            token: '1'
          }
          if (userData.token && userData.token.length > 0) {
            commit('SET_USER', userData)
          }
        }
      } catch (e) {
        return false
      }
    }
  },
  async login ({
    commit
  }, {
    email,
    password
  }) {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const result = await response.json()
    // console.log(result)
    // let userData = { token: result.access_token, userinfo: result.userinfo }
    // let userInfo = {userinfo: result.data.fname}
    if (result.success) {
      commit('SET_USER', result.userData)
      cookie.set('multi_tenant_cookie', result.userData)
    }
    return result
  },
  async signup ({
    commit
  }, {
    name,
    email,
    password
  }) {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    const result = await response.json()
    const userData = {
      token: result.success
    }
    commit('SET_USER', userData)
    // cookie.set("photographers_cookie", userData)
  },
  async logout ({
    commit,
    state
  }) {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.auth.token}`
      }
    })
    const result = await response.json()
    if (result.success) {
      commit('SET_USER', {
        userData: {}
      })
      cookie.set('multi_tenant_cookie', null)
      this.$router.push('/login')
    }
  }
  /* forgotpassword({ commit }, { email }) {
    return axios.post(`${process.env.baseUrl}/api/user/forgot-password`, {
      email
    })
    .then((res) => {
      return true
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error('Not found!')
      }
    })
  } */
}
