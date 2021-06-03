<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a
            href="/#/index"
            style="
              background-color: #131921;
              color: #f93;
              font-weight: 600;
              font-size: 18px;
            "
            >卖家中心</a
          >
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username" @click="login">{{
            username
          }}</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-header',
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    if (this.$store.state.USERINFO) {
      this.username = this.$store.state.USERINFO.userName
    }
  },
  methods: {
    login() {
      this.$router.push('/account')
    },
    logout() {
      this.$store.dispatch('logout').then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.$router.replace('/login')
      })
    }
  }
}
</script>
<style lang="scss">
.active {
  border-bottom: 1px solid #409eff;
}

.header {
  .nav-topbar {
    height: 55px;
    line-height: 55px;
    background-color: rgb(19, 25, 33);
    color: #b0b0b0;

    .container {
      max-width: 100%;
      display: flex;
      justify-content: space-between;

      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
    }
  }
}
</style>
