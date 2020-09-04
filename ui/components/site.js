export const siteMenuComponent=Vue.component('site-menu', {
  data: function () {
    return {

    }
  },
  methods: {},
  template: `
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
            <router-link to="/car-reader" class="nav-link">
            <span data-feather="home"></span>
            健保卡資料
            </router-link>
        </li>    
      </ul>
    </div>
  </nav>`
})

export const siteHeaderComponent=Vue.component('site-header', {
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

export const siteFooterMenuComponent=Vue.component('site-footer', {
  data: function () {
    return {}
  },
  methods: {},
  template: ``
}) 