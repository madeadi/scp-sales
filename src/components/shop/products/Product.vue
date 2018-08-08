<template>
  <div class="card text-xs-center">
    <div class="card-img-top vue-logo">
      <img v-bind:src="product.img_url">
    </div>

    <div class="card-block">
      <h5 class="card-title">{{product.title}}</h5>
      <p class="card-text">{{product.price | formatMoney}}</p>
      <AddToCart :product="product" />
    </div>
  </div>
</template>

<script>
import AddToCart from './AddToCart'

export default {
  name: 'Product',
  props: {
    product: Object
  },
  components: { AddToCart }
}
</script>

<style scoped>
  .vue-logo {
    padding-bottom: 2rem;
    background-size: 40%;
    height: 200px;
  }
  .vue-logo img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
