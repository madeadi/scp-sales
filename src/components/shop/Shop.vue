<template>
  <div>    
    <div>
      <PageHeader />

      <div class="container">
        <Login />
        <!-- <Coupons /> -->
        <div class="row mt-2">
          <div class="col-sm-9">
            <ProductList />
          </div>
          <div class="col-sm-3">
            <ShoppingCart />
          </div>
        </div>
      </div>

    </div>
  </div>  
</template>

<script>
import PageHeader from './../shared/PageHeader'
// import Coupons from './Coupons'
import ProductList from './products/ProductList'
import ShoppingCart from './shopping-cart/ShoppingCart'
import Login from './Login'

export default {
  name: 'Shop',
  components: {
    PageHeader,
    ProductList,
    ShoppingCart,
    Login
  }
}
</script>
