<template>
  <section class="container">
    <h3 class="title">
      List of Tenants
    </h3>
    <hr>

    <div class="columns is-variable is-multiline">
      <div v-for="(item, i) in tenants" :key="item._id" class="column is-3 is-one-quarter">
        <div :class="i">
          <nuxt-link :to="`tenants/${item._id}`">
            <img src="/img/macbook-pro-16-inch.jpg">
          </nuxt-link>
          <h3>{{ item.title }}</h3>
          <h5>Price: {{ item.price }}</h5>
          <h5>Quantity: {{ item.quantity }}</h5>
        </div>
      </div>
      <infinite-loading v-if="tenants.length" @infinite="infiniteScroll" spinner="spiral" />
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'listing-layout',
  data: () => ({
    tenants: [],
    page: 1
  }),
  computed: {
    url () {
      return `${process.env.API_BASE_URL}/tenants?page=${this.page}&limit=3`
    }
  },
  created () {
    this.fetchTenants()
  },
  methods: {
    async fetchTenants () {
      await axios.get(this.url).then(data => (this.tenants = data.data.docs))
    },
    infiniteScroll ($state) {
      setTimeout(() => {
        this.page++
        axios
          .get(this.url)
          .then((response) => {
            if (response.data.docs.length > 1) {
              response.data.docs.forEach(item => this.tenants.push(item))
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }, 500)
    }
  }
}
</script>
