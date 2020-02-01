<template>
  <main>

    <div class="row justify-content-center">
      <div class="col-md-4">

        <p>
          <router-link
            to="/text-encoding"
            class="btn btn-block btn-light"
          >Text Encoding</router-link>
        </p>

        <p>
          <router-link
            to="/base64"
            class="btn btn-block btn-light"
          >Base64</router-link>
        </p>

        <p>
          <router-link
            to="/qrcode"
            class="btn btn-block btn-light"
          >QR Code</router-link>
        </p>

        <p>
          <router-link
            to="/broadlink"
            class="btn btn-block btn-light"
          >Broadlink</router-link>
        </p>

        <p>
          <router-link
            to="/loan"
            class="btn btn-block btn-light"
          >Loan</router-link>
        </p>

      </div>
    </div>

  </main>
</template>

<script>
export default {
  metaInfo: {
    title: 'Vales Tools'
  }
}
</script>
