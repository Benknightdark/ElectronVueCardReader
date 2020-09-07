import {isLogin} from '../helpers/ahtuHelper.js';
export const siteMenuComponent = Vue.component('site-menu', {
  created: function () {
    this.$router.options.routes.forEach(route => {
      this.items.push({
        name: route.name
        , path: route.path
      })
    })
  },
  data: function () {
    return {
      items: []
    }
  },
  methods: {},
  template: `
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item"  v-for="item in items">
            <router-link :to="item.path" class="nav-link">
            <span data-feather="home"></span>
            {{item.name}}
            </router-link>
        </li>    
      </ul>
    </div>
  </nav>`
})

export const siteHeaderComponent = Vue.component('site-header', {
  data: function () {
    return {

    }
  },
  methods: {},
  template: `<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse"
      data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign out</a>
      </li>
    </ul>
  </nav>`
})

export const siteFooterMenuComponent = Vue.component('site-footer', {
  data: function () {
    return {}
  },
  methods: {},
  template: ``
}) 
export const sitePageComponent=Vue.component('site-page',{
  data: function () {
    return {}
  },
  methods: {
    isLogin() {
      return isLogin()
    }
  },
  template: ` 
  <div>
    <site-header  v-if='isLogin()'></site-header>
    <div class="container-fluid">
      <div class="row">

        <site-menu  v-if='isLogin()'></site-menu>

        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div  v-if='isLogin()'
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2" id='page-header-id'>Dashboard</h1>
          </div>

          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>`
})