import api from './../../api/fixtures'
import axios from 'axios'

const url = 'https://hash.scoop.tech/api'

export const getProfile = ({ commit }) => {
  // api.getProfile(profile => {
  //   commit('RECEIVE_PROFILE', profile)
  // })
}

export const register = ({ commit }, profile) => {
  var cb = cannotRegister => {
    if (cannotRegister) {
      console.log('cannot register')
      return false
    } else {
      commit('REGISTER', profile)
      return true
    }
  }
  api.checkEmail(cb, profile.email)
}

export const login = ({ commit }, email, password) => {
  var cb = (canLogin) => {
    if (canLogin) {
      commit('SUCCESSFUL_LOGIN', email, password)
      return true
    } else {
      console.log('Cannot login. Wrong username/password')
      return false
    }
  }
  api.login(cb, email, password)
}

export const getProducts = ({ commit }) => {
  axios
    .get(url + '/Sales')
    .then(response => {
      const products = response.data.available_products
      products.map(product => {
        product['id'] = product.product_id
        product['title'] = product.manu_model
        product['price'] = product.usd_price
        product['inventory'] = 100000
        product['shipping'] = 0
      })
      commit('RECEIVE_PRODUCTS', products)
    })
}

export const getPromotions = ({ commit }) => {
  api.getPromotions(promotions => {
    commit('RECEIVE_PROMOTIONS', promotions)
  })
}

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit('ADD_TO_CART', product.id)
  }
}

export const removeFromCart = ({ commit }, product) => {
  commit('REMOVE_FROM_CART', product)
}

export const toggleCoupon = ({ commit }, coupon) => {
  commit('TOGGLE_COUPON', coupon)
}

export const changeCurrency = ({ commit }, currency) => {
  commit('CHANGE_CURRENCY', currency)
}

export const showLogin = ({ commit }) => {
  commit('LOGIN_SHOW')
}

export const hideLogin = ({ commit }) => {
  commit('LOGIN_HIDE')
}

export const checkout = ({ commit, state }) => {
  var email = state.profile.data.email
  var password = state.profile.data.password
  var orderedItems = state.shoppingCart.added
  var total = 1000
  var currency = state.shoppingCart.currency

  if (email === '') {
    showLogin({commit})
    return
  }

  var orders = []
  orderedItems.forEach(element => {
    orders.push({
      product_id: element.id,
      qty: element.quantity
    })
  })

  var payload = {
    user_email: email,
    user_pwd: password,
    order: orders,
    payment_method: 'CRYPTO',
    usd_amount: total,
    desired_crypto: currency
  }

  var cb = (response) => {
    window.open(response.status_url)
  }
  api.placeOrder(cb, payload)
}
