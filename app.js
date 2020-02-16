const header = new Vue({
  el: '#header',
  data: {
    vueLogo: "assets/vue-logo.png",
    vueLogoStyles: {
      height: '35px',
      marginLeft: '16px'
    },
    appFullTitle: "Buscador de eventos"
  },
  computed : {
    appTitle() {
      if (this.vueLogo) {
        return this.appFullTitle.slice(1);
      }

      return this.appFullTitle;
    }
  }
})
