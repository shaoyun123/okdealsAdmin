<template>
  <div class="footer">
    <div class="row">
      <div class="col-md-6">
        <strong style="color: white; font-size: 20px;"
          >Get Updates for <span style="color: #f93;">Free</span></strong
        >
        <p style="color: white;">
          Subscribe to our newsletter for latest deals.
        </p>
      </div>
      <div class="col-md-6">
        <div id="vue-subscribe-email" class="input-group">
          <input
            type="text"
            placeholder="Please enter your email"
            class="form-control input-lg"
            style="height:42px;"
          />
          <span class="input-group-btn"
            ><button type="button" class="btn btn-cbb btn-lg">
              Subscribe
            </button></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-footer'
}
</script>
<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #131921;
  padding: 20px 9.2%;
}
</style>
