export const loginPageComponent = Vue.component('login-page', {
    data: function () {
      return {}
    },
    methods: {
     go:function(){
       localStorage.setItem('jwt','fuck');
       this.$router.push('/')
     }
    },
    template: `#login-template`
  }) 
export   default loginPageComponent  