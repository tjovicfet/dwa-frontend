<template>
  <div class="profil">

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

    <div v-if="!izmjene" class="info">
      <h1 class="mb-2">{{korisnik.ime}}</h1>
      <p class="mb-1">Email: {{korisnik.email}}</p>
      <p class="mb-1">Telefon: {{korisnik.tel}}</p>
      <p class="mb-1">Grad: {{korisnik.grad}}</p>
    </div>

    <div v-else class="info">
      <h1 class="mb-2">{{korisnik.ime}}</h1>
      <b-form @submit="spremiIzmjene">
        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="korisnik.email"
            type="text"
            required
            placeholder="Unesite vase ime i prezime"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Telefon:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="korisnik.tel"
            type="number"
            required
            placeholder="Unesite broj telefona"
          ></b-form-input>
        </b-form-group>

        <b-form-input
          id="input-3"
          v-model="korisnik.grad"
          type="text"
          required
          placeholder="Unesite grad"
        ></b-form-input>
      </b-form-group>
        <b-button type="submit" variant="primary">Spremi izmjene</b-button>
      </b-form>
    </div>

    <b-button @click="napraviIzmjenu">{{btn}}</b-button>

    <div v-if="obavijest" class="obavijest">
      <h4 style="margin: 0 auto; color: white;">Podaci su uspješno izmjenjeni!</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Profil',
  data () {
    return {
      korisnik: '',
      izmjene: false,
      btn: 'Izmjeni podatke',
      obavijest: false
    }
  },
  created () {
    this.korisnik = this.$store.getters.dohvatiKorisnika;
    // Nepravilno spremanje - this.$store.state.korisnik = 'korisnik'
    // Pravilno spremanje - this.$store.commit('postaviKorisnika', 'korisnik')
    // Nepravilno citanje - this.korisnik = this.$store.state.korisnik;
    //Pravilno citanje - this.korisnik = this.$store.getters.dohvatiKorisnika;
  },
  watch: {
    obavijest () {
      setTimeout(() => {
        this.obavijest = false;
      }, 3500);
    }
  },
  methods: {
    odjava () {
      this.$emit('stanje-prijave', false);
      this.$store.commit('postaviKorisnika', {});
    },
    napraviIzmjenu () {
      if (this.izmjene) {
        this.izmjene = false;
        this.btn = 'Izmjeni podatke';
      } else {
        this.izmjene = true;
        this.btn = 'Odustani';
      }
    },
    spremiIzmjene () {
      event.preventDefault();
      axios.post('/izmjena', this.korisnik)
        .then(() => {
          console.log('hello');
          this.izmjene = false;
          this.$store.commit('postaviKorisnika', this.korisnik);
          this.obavijest = true;
        })
        .catch((e) => {
          console.log('Doslo je do pogreske. Eror: ', e);
        })
    }
  }
}
</script>


<style scoped>
.info {
  text-align: left;
  padding: 80px 0 80px 40px;
}
.info input {
  width: 30%;
}
.obavijest {
  position: absolute;
  top: 45%;
  left: 43.5%;
  background-color: lightskyblue;
  width: 250px;
  height: 120px;
  padding: 35px 0;
  z-index: 999999;
  border-radius: 10px;
  box-shadow: 0 0 15px 2px lightgray;
}
</style>
