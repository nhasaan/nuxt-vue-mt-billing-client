<template>
  <div class="container">
    <section class="client-detail">
      <h3 class="title">
        {{ client.title }}, {{ client.price }}
      </h3>
      <hr>

      <div class="columns">
        <div class="column is-full">
          <div>
            <div class="description">
              <p>Stock available: {{ client.quantity }}</p>
              <p>{{ client.description }}</p>
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
    const client = await $axios.$get(
      `${process.env.API_BASE_URL}/clients/${params.id}`
    )
    // .then(data => (client = data.data))
    return { client }
  }
}
</script>
