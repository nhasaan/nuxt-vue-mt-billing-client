<template>
  <div class="container">
    <section class="tenant-detail">
      <h3 class="title">
        {{ tenant.title }}, {{ tenant.price }}
      </h3>
      <hr>

      <div class="columns">
        <div class="column is-full">
          <div>
            <img src="/img/macbook-pro-16-inch.jpg">
            <div class="description">
              <p>Stock available: {{ tenant.quantity }}</p>
              <p>{{ tenant.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'listing-layout',
  async asyncData ({ params, $axios }) {
    const tenant = await $axios.$get(
      `${process.env.API_BASE_URL}/tenants/${params.id}`
    )
    // .then(data => (tenant = data.data))
    return { tenant }
  }
}
</script>
