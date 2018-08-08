<template>
  <nav class="navbar navbar-light bg-faded" v-if="profile.limit">
    <div class="container">
      <a class="navbar-brand" href="/">SCP Mining</a>

      <span class="navbar-text float-xs-right">
        Hello <strong>{{email}}</strong>
      </span>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState({
      profile: state => state.profile.data
    })
  }
}
</script>
