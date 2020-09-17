<template>
  <div class="position-relative" style="width: 100%; height: 100vh; padding-top: 100px;">

    <div class="prijava">
      <b-form @submit="onSubmit" v-if="prijava">
        <b-form-group
          id="input-group-1"
          label="Email adresa:"
          label-for="input-1"
          style="text-align: left;"
        >
          <b-form-input
            id="input-1"
            v-model="korisnikPrijava.email"
            type="email"
            required
            placeholder="Unesite email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Lozinka:" label-for="input-2" style="text-align: left;">
          <b-form-input
            id="input-2"
            v-model="korisnikPrijava.lozinka"
            type="password"
            required
            placeholder="Unesite lozinku"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" style="margin-right: 15px;">Prijavi se</b-button>
        <b-button @click="prijava = false" variant="danger">Nemaš račun?</b-button>
      </b-form>
      <b-form @submit="onSubmit" v-else>
        <b-form-group
          id="input-group-3"
          label="Ime i prezime:"
          label-for="input-1"
          style="text-align: left;"
        >
          <b-form-input
            id="input-1"
            v-model="korisnikRegistracija.ime"
            type="text"
            required
            placeholder="Unesite vase ime i prezime"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Email adresa:" label-for="input-2" style="text-align: left;">
          <b-form-input
            id="input-2"
            v-model="korisnikRegistracija.email"
            type="email"
            required
            placeholder="Unesite lozinku"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Lozinka:" label-for="input-3" style="text-align: left;">
          <b-form-input
            id="input-3"
            v-model="korisnikRegistracija.lozinka"
            type="password"
            required
            placeholder="Unesite lozinku"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Broj telefona:" label-for="input-4" style="text-align: left;">
          <b-form-input
            id="input-4"
            v-model="korisnikRegistracija.tel"
            type="number"
            required
            placeholder="Unesite broj telefona"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Grad:" label-for="input-5" style="text-align: left;">
          <b-form-input
            id="input-5"
            v-model="korisnikRegistracija.grad"
            type="text"
            required
            placeholder="Unesite grad"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" style="margin-right: 15px;">Registriraj se</b-button>
        <b-button @click="prijava = true; resetirajFormu()" variant="danger">Imaš račun?</b-button>
      </b-form>
    </div>


    <div v-if="obavijest" class="obavijest">
      <h4 style="margin: 0 auto; color: white;">Registracija je uspješna!</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: "Prijava",
  data () {
    return {
      prijava: true,
      korisnikPrijava: {
        email: '',
        lozinka: ''
      },
      korisnikRegistracija: {
        ime: '',
        email: '',
        lozinka: '',
        tel: '',
        grad: ""
      },
      obavijest: false
    }
  },
  watch: {
    obavijest () {
      setTimeout(() => {
        this.obavijest = false;
      }, 3500);
    }
  },
  methods: {
    onSubmit () {
      event.preventDefault();
      if (this.prijava) {
        axios.post('/prijava', this.korisnikPrijava)
        .then((r) => {
          console.log('r => ', r.data);
          let k = r.data.korisnik;
          this.$store.commit('postaviKorisnika', {id: k[0], ime: k[1], email: k[2], tel: k[4], grad: k[5]});
          this.$emit('stanje-prijave', true);
        })
        .catch((e) => {
          console.log('Doslo je do pogreske. Eror: ', e);
        })
      } else {
        axios.post('/registracija', this.korisnikRegistracija)
          .then((r) => {
            this.resetirajFormu();
            console.log('r => ', r.data);
            this.obavijest = true;
            this.prijava = true;
          })
          .catch((e) => {
            console.log('Doslo je do pogreske. Eror: ', e);
          })
      }
    },
    resetirajFormu () {
      this.korisnikRegistracija.ime = "";

    }
  }
}
</script>

<style scoped>
.prijava {
  margin: 0 auto;
  width: 450px;
  height: 430px;
  padding: 25px 50px;
  border: 1px solid lightgray;
  border-radius: 10px;
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
