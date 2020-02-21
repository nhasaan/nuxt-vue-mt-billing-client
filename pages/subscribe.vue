<template>
  <div class="container-fluid">
    <h3 class="title">
      Register and Subscribe your tenant
    </h3>
    <hr class="hrm">
    <div class="columns is-desktop is-centered">
      <div class="column">
        <div class="field">
          <label class="label">Custom Subdomain for the Tenant</label>
          <div class="control has-icons-left has-icons-right has-prefix has-suffix">
            <input
              v-validate="'required|excluded: ,@,&,!'"
              v-model="domain"
              :class="{'input': true, 'is-danger': errors.has('domain') }"
              type="text"
              name="domain"
              placeholder="Custom subdomain prefix e.g. some.domain.com"
            >
            <span class="prefix icon is-small is-left">
              <b>https://</b>
            </span>
            <span class="suffix icon is-small is-right">
              <b>.domain.com</b>
            </span>
            <span v-show="errors.has('domain')" class="help is-danger">{{ errors.first('domain') }}</span>
          </div>
        </div>
        <div class="field">
          <label class="label">Tenant Name</label>
          <div class="control">
            <input
              v-validate="'required'"
              v-model="name"
              :class="{'input': true, 'is-danger': errors.has('name') }"
              type="text"
              name="name"
              placeholder="Tenant name"
            >
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
          </div>
        </div>
        <div class="field">
          <label class="label">Service(s) Included</label>
          <div class="control">
            <label class="checkbox" disabled checked>
              <input v-model="services" type="checkbox" value="1" disabled checked>
              Identity Service
            </label>
            <label class="checkbox" disabled checked>
              <input v-model="services" type="checkbox" value="2" disabled checked>
              UAM Service
            </label>
            <label class="checkbox" disabled checked>
              <input v-model="services" type="checkbox" value="3" disabled checked>
              Client Service
            </label>
            <label class="checkbox" disabled checked>
              <input v-model="services" type="checkbox" value="4" disabled checked>
              Invoice Service
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">Choose a Billing Period</label>
          <div class="control">
            <label class="radio">
              <input v-model="subscription" type="radio" value="1" name="subscription">
              Monthly
            </label>
            <label class="radio">
              <input v-model="subscription" type="radio" value="2" name="subscription">
              Yearly
            </label>
            <span
              v-show="errors.has('subscription')"
              class="help is-danger"
            >{{ errors.first('subscription') }}</span>
          </div>
        </div>

        <div class="field">
          <label class="label">Tenant Description</label>
          <div class="control">
            <textarea
              v-validate="'required|min:50|max:250'"
              v-model="description"
              :class="{'textarea': true, 'is-danger': errors.has('description') }"
              rows="5"
              name="description"
              placeholder="Tenant description"
            />
            <span
              v-show="errors.has('description')"
              class="help is-danger"
            >{{ errors.first('description') }}</span>
          </div>
        </div>
        <div class="field">
          <label class="label">Payment Method</label>
          <div class="control">
            <label class="radio">
              <input v-model="payment_method" type="radio" value="1" name="payment_method">
              Offline
            </label>
            <span
              v-show="errors.has('payment_method')"
              class="help is-danger"
            >{{ errors.first('payment_method') }}</span>
          </div>
        </div>

        <div class="field">
          <hr>
          <div class="control">
            <button @click="subscribe()" class="button is-success">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app-layout',
  data: () => ({
    name: '',
    domain: '',
    description: '',
    services: [1, 2, 3, 4],
    subscription: 1,
    payment_method: 1

  }),
  head () {
    return {
      title: `Register your tenant`
    }
  },
  asyncData () {
    return {
      formError: null,
      name: '',
      domain: '',
      description: '',
      services: [1, 2, 3, 4],
      subscription: 1,
      payment_method: 1
    }
  },
  methods: {
    /* --------------Start Subscribe-------------- */
    async subscribe () {
      const response = await fetch(`${process.env.API_BASE_URL}/subscriptions/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${this.$store.state.auth.token}`
        },
        body: JSON.stringify({
          name: this.name,
          domain: this.domain,
          description: this.description,
          services: this.services,
          subscription: this.subscription,
          payment_method: this.payment_method
        })
      })
      const result = await response.json()
      if (result.success) {
        this.$toast.success(
          'Congrats, successfuly subscribed. Please create your client list and send invoice!', { duration: 3000 }
        )
        // this.$router.push('/admin')
      } else {
        this.$toast.error('Please filled out all required field', { duration: 3000 })
      }
    }
    /* --------------End Subscription-------------- */
  }
}
</script>
