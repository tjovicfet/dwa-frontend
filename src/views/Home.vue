<template>
  <div class="home position-relative overflow-hidden" style="height: 100vh;">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Aplikacija</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">


          <b-nav-item href="#"><router-link to="profil">{{korisnik.ime}}</router-link></b-nav-item>
          <b-nav-item @click="odjava">Odjava</b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div style="width: 100%;padding: 50px; text-align: left;">
      <h1>Pregled institucija</h1>
    </div>

    <div style="height: 75%;overflow-y: scroll; width: 90%; margin: 0 auto;">
      <b-list-group v-for="i in institucije" :key="i.id">
        <b-list-group-item href="#" @click="postaviDetalje(i)" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{i.naziv}}</h5>
            <small>Pula</small>
          </div>

          <p>{{i.adresa}}</p>

          <div>
            <small class="mb-1 mr-1" style="display: inline-block;">Telefon: </small>
            <p style="display: inline-block;">{{i.tel}}</p>
          </div>

          <div>
            <small class="mb-1 mr-1" style="display: inline-block;">Radno vrijeme:</small>
            <p style="display: inline-block;">{{i.radnoVrijeme}}</p>
          </div>

          <p>{{i.ned}}</p>

        </b-list-group-item>

      </b-list-group>
    </div>

    <b-modal ref="institucija-detalji" hide-footer :title="institucijaDetalji.naziv">
      <div class="d-block text-center">
        <h3>Odaberite razlog posjete.</h3>
        <b-button v-for="(r, index) in institucijaDetalji.razlog" :key="'r-' + index" @click="razlogPosjete = true" class="mr-1" variant="success">{{r}}</b-button>
        <div v-if="razlogPosjete" class="p-2 text-left">
          <small>Trenutno ljudi u redu: </small>
          <i>{{institucijaDetalji.red}}</i>
          <br>
          <small>Procijenjeno vrijeme čekanja: </small>
          <i>{{institucijaDetalji.vrijemeCekanja}}</i>
          <small>min</small>
          <br>
          <div style="width: 100%; padding: 5px; text-align: center;">
            <b-button @click="rezervirajBroj" variant="primary">Rezerviraj broj</b-button>
          </div>

        </div>
      </div>
    </b-modal>

    <div v-if="obavijest" class="position-absolute obavijest">
      <h5>Uskoro ste na redu. Pripremite se.</h5>
      <b-button @click="obavijest = false">Zatvori</b-button>
    </div>

    <div v-if="mojRed" class="position-absolute obavijest">
      <h5>Trenutno je Vaš red!</h5>
      <b-button @click="mojRed = false">Zatvori</b-button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      korisnik: '',
      institucije: [],
      institucijaDetalji: {},
      rezervacija: {
        idInstitucije: '',
        naziv: '',
        mojBroj: ''
      },
      obavijest: false,
      mojRed: false,
      razlogPosjete: false
    }
  },
  created () {
    this.korisnik = this.$store.getters.dohvatiKorisnika;
    this.dohvatiInstitucije();
  },
  methods: {
    async dohvatiInstitucije () {
      await axios.get('/institucije')
      .then((r) => {
        let inst = this.institucije;
        r.data.institucije.forEach(function(i) {
          if (i[1] === 'Pošta') {
            inst.push({id: i[0], naziv: i[1],adresa: i[4], radnoVrijeme: i[2], ned: i[3], tel: i[5], razlog: ['Slanje pošte', 'Preuzimanje pošte', 'Plaćanje računa']});
          } else if (i[1] === 'Bolnica') {
            inst.push({id: i[0], naziv: i[1],adresa: i[4], radnoVrijeme: i[2], ned: i[3], tel: i[5], razlog: ['Pregled']});
          } else {
            inst.push({id: i[0], naziv: i[1],adresa: i[4], radnoVrijeme: i[2], ned: i[3], tel: i[5], razlog: ['Transakcije', 'Računi', 'Krediti', 'Sastanak s bankarom']});
          }
        })
      })
      .catch((e) => {
        console.log('Doslo je do pogreske. Eror: ', e);
      })
    },
    odjava () {
      this.$emit('stanje-prijave', false);
      this.$store.commit('postaviKorisnika', {});
    },
    postaviDetalje (institucija) {
      institucija.red = Math.floor(Math.random() * 21);
      institucija.vrijemeCekanja = institucija.red * 1.2;
      this.institucijaDetalji = institucija;
      this.$refs['institucija-detalji'].show();
    },
    rezervirajBroj () {
      this.$refs['institucija-detalji'].hide();
      this.rezervacija.idInstitucije = this.institucijaDetalji.id;
      this.rezervacija.naziv = this.institucijaDetalji.naziv;
      this.rezervacija.mojBroj = this.institucijaDetalji.red++;
      this.smanjiRed();
    },
    smanjiRed () {
      setTimeout(() => {
        if (this.rezervacija.mojBroj < 5) this.obavijest = true;
        if (this.rezervacija.mojBroj === 0) {
          this.obavijest = false;
          this.mojRed = true;
        } else {
          this.rezervacija.mojBroj--;
          this.smanjiRed();
        }
        console.log('Redni broj: ', this.rezervacija.mojBroj);
      }, 2000);
    }
  }
}
</script>

<style scoped>
.obavijest {
  top: 45%;
  left: 43.5%;
  background-color: lightskyblue;
  width: 250px;
  height: 160px;
  padding: 35px 0;
  z-index: 999999;
  border-radius: 10px;
  box-shadow: 0 0 15px 2px lightgray;
}
</style>
