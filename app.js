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
    eventsData: []
  },
  created() {
    moment.locale('es');
    fetch('data/eventsData.json')
      .then(response => response.json())
      .then(this.addEventDateRelatedData)
      .then(events => {
        this.eventsData = events;
      })
  },
  computed: {
    filteredEvents() {
      return this.eventsData
        .filter(event => {
          if (this.onlyFutureEvents) {
            return !event.isEventPast;
          }

          return true;
        })
        .filter(event => {
          if (this.searchText) {
            return event.title.toLowerCase().indexOf(
              this.searchText.toLowerCase()
            ) >= 0;
          }

          return true;
        })
    }
  },
  methods: {
    addEventDateRelatedData(events) {
      return events.map(ev => {
        ev.remainingDays = this.remainingDays(ev.date);
        ev.isEventPast = ev.remainingDays <= 0;
        ev.remainingDaysText = ev.isEventPast ? 'Pasado' : ev.remainingDays + ' días';
        return ev
      })
    },
    remainingDays(dayString) {
      const today = moment();
      const eventDay = moment(dayString);

      return eventDay.diff(today, 'days');
    }
  },
  filters: {
    date(dateString) {
      return moment(dateString).format('DD MMM YYYY');
    }
  }
})
