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

const app = new Vue({
  el: '#app',
  data: {
    searchText: "",
    onlyFutureEvents: false,
    eventsData: {}
  },
  created() {
    fetch('data/eventsData.json')
      .then(response => response.json())
      .then(this.addRemaingDays)
      .then(this.addEventDateRelatedData)
      .then(events => {
        this.eventsData = events;
      })
  },
  methods: {
    addEventDateRelatedData(events) {
      return events.map(ev => {
        ev.remainingDays = this.remainingDays(ev.date);
        ev.isEventPassed = ev.remainingDays <= 0;
        ev.remainingDaysText = ev.isEventPassed ? 'Pasado' : ev.remainingDays + ' días';
        return ev
      })
    },
    remainingDays(dayString) {
      const today = moment();
      const eventDay = moment(dayString);

      return eventDay.diff(today, 'days');
    }
  }
})
