<template>
  <div>
    <h3>Cart</h3>

    <ShoppingCartItem
      v-for="item in items"
      :item="item"
      :key="item.id" />

    <ShoppingCartSummary />

    <div class="select-currency">
      <label>Checkout with: </label>
      <vSelect :options='[
        { label: "LTC Testnet", value: "LTC" },
        { label: "Bitcoin (BTC)", value: "BTC" },
        { label: "Litecoin (LTC)", value: "LTC" }
      ]' @input='setCurrency' ></vSelect>
    </div>
    

    <div class="mt-1 text-xs-center">
      <button class="btn btn-success"
        :disabled="currency == ''"
        @click="checkout">
        Checkout
      </button>
      <p v-if="orderOnLimit">Order is over limit.</p>
    </div>
  </div>
</template>

<script>
import ShoppingCartItem from './ShoppingCartItem'
import ShoppingCartSummary from './ShoppingCartSummary'
import { mapGetters, mapActions } from 'vuex'
import vSelect from 'vue-select'
// import axios from 'axios'

export default {
  name: 'ShoppingCart',
  computed: mapGetters({
    items: 'cartProducts',
    quantity: 'itemsQuantity',
    orderOnLimit: 'orderOnLimit',
    subtotal: 'subtotal',
    taxes: 'taxes',
    profile: 'getProfile',
    currency: 'currency'
  }),
  components: {
    ShoppingCartItem,
    ShoppingCartSummary,
    vSelect
  },
  methods: {
    ...mapActions([
      'showLogin',
      'changeCurrency',
      'checkout'
    ]),

    setCurrency (currency) {
      this.changeCurrency(currency.value)
    }
  }
}
</script>
