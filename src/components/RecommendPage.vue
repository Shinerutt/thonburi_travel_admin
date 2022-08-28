<template>
<div class="columns" style="width: 100%">
    <button class="button is-primary" @click="show_modal_create">create</button>
  </div>
  <div class="columns is-multiline">
    <div
      class="column is-3"
      v-for="item in lists"
      :key="item.id"
      @click="open_detail(item)"
    >
      <div
        style="width=100%; height: 200px; background:green ; margin-top:25px ; "
      >
        <router-link :to="`recommend/${item.id}`">
          <div>
            {{ item.title }}
            <img
              :src="item.img_cover"
              alt=""
              style="width: 100%; height: 200px"
            />
          </div>
        </router-link>
      </div>
    </div>
    </div>
   <div v-bind:class="{ modal: true, 'is-active': modal_open }">
      <div class="modal-background" @click="close_modal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit RecommededPlaces Details</p>
          <button
            class="delete"
            aria-label="close"
            @click="close_modal"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Text input"
                v-model="detail.title"
              />
            </div>
          </div>

           <div class="field">
            <label class="label">Image Cover</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Text input"
                v-model="detail.img_cover"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save_detail">
            Save changes
          </button>
          <button class="button" @click="close_modal">Cancel</button>
        </footer>
      </div>
    </div>
  
</template>

<script>
import { defineComponent } from "vue";
const end_point = "https://api.system-searchpet.com";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      lists: [],
      lists_filter: [],
      modal_open: false,
      detail: {
        id: "",
        title: "",
        img_cover: "",
        created_at: "",
        updated_at: "",
      },
      // cat_option: ["landmark", "market", "temple", "restaurant"],
    };
  },
  created() {
    this.get_recommended();
  },
  methods: {
    get_recommended() {
      axios.get(`${end_point}/recommededPlaces`).then((res) => {
        console.log(res.data);
        this.lists = res.data;
      });
    },
    getdata() {
      console.log("hello");
    },
    get_places_by_cat(cat) {
      this.lists = [];
      axios
        .get(`${end_point}/places/${cat}`)
        .then((res) => {
          this.lists = res.data.map((item) => {
            item.img_places = JSON.parse(item.img_places).map((x) => ({
              img: x,
            }));
            item.img = item.img_places[0].img;
            return item;
          });

          this.lists_filter = this.lists;
        })
        .catch((error) => {
          console.log("catch", error);
        })
        .finally(() => {
          console.log("finally");
        });
    },
    open_detail(item) {
      this.modal_open = true;
      this.detail = item;
    },
    close_modal() {
      this.modal_open = false;
    },
    save_detail() {
       axios.post(`${end_point}/recommededPlaces`,this.detail )
     .then((res)=>{
      if(res.data.status == true){
        alert("Update RecommededPlaces Success")
        this.get_recommended();
      }
      else{
        alert(res.data.message)
      }
     })
    .catch(()=>{
      alert ("Can not update RecommededPlaces.")
    })
    },
    add_img() {
      this.detail.img_places.push({ img: "" });
    },
    delete_img(position) {
      this.detail.img_places.splice(position, 1);
    },
    show_modal_create() {
      this.modal_open = true;
    },
  },
});
</script>

<style>
</style>