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
    template: ` <div> 
    <h1>登入</h1>
    <button @click='go'>fucking go</button>
    </div>       `
  }) 
export   default loginPageComponent  