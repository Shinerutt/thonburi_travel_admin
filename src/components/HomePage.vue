<template>
  <div class="columns" style="width: 100%">
    <button class="button is-primary" @click="show_modal_create" >create</button>
  </div>
  <div class="columns is-multiline">
    <div
      class="column is-3"
      v-for="item in lists_filter"
      :key="item.id"
      @click="open_detail(item)"
    >
      <div
        style="width=100%; height: 200px; background:green ; margin-top:25px ; "
      >
        {{ item.name }}
        <img :src="item.img" alt="" style="width: 100%; height: 200px" />
      </div>
    </div>
  </div>
  <div v-bind:class="{ modal: true, 'is-active': modal_open }">
    <div class="modal-background" @click="close_modal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Place Details</p>
        <button class="delete" aria-label="close" @click="close_modal"></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail.name"
            />
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Lat</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Text input"
                  v-model="detail.lat"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Lng</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Text input"
                  v-model="detail.lng"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Detail</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="e.g. Hello world"
              v-model="detail.detail"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="detail.category">
                <option v-for="item in cat_option" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label class="label">Image</label>
          <div
            class="field has-addons"
            v-for="(item_img, index) in detail.img_places"
            :key="index"
          >
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Input Link Image"
                v-model="item_img.img"
              />
            </div>
            <div class="control">
              <a class="button is-danger" @click="delete_img(index)">
                Delete
              </a>
            </div>
          </div>
          <button class="button is-info" @click="add_img">add</button>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save_detail">
          Save changes
        </button>
        <button class="button" @click="close_modal">Cancel</button>
        <button class="button is-danger" @click="delete_places">Delete</button>
      </footer>
    </div>
  </div>

  <div v-bind:class="{ modal: true, 'is-active': modal_create_open }">
    <div class="modal-background" @click="close_modal_create"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Place Details</p>
        <button class="delete" aria-label="close" @click="close_modal_create"></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail_create.name"
            />
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Lat</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Text input"
                  v-model="detail_create.lat"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Lng</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Text input"
                  v-model="detail_create.lng"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Detail</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="e.g. Hello world"
              v-model="detail_create.detail"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="detail_create.category">
                <option v-for="item in cat_option" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label class="label">Image</label>
          <div
            class="field has-addons"
            v-for="(item_img, index) in detail_create.img_places"
            :key="index"
          >
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Input Link Image"
                v-model="item_img.img"
              />
            </div>
            <div class="control">
              <a class="button is-danger" @click="delete_img_create(index)">
                Delete
              </a>
            </div>
          </div>
          <button class="button is-info" @click="add_img_create">add</button>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save_detail_create">
          Create
        </button>
        <button class="button" @click="close_modal_create">Cancel</button>
        
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
const end_point = "http://127.0.0.1:3333";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      lists: [],
      lists_filter: [],
      modal_open: false,
      modal_create_open: false,
      detail: {
        id: "",
        name: "Rutjanakorn",
        lat: 0,
        lng: 0,
        detail: "",
        category: "",
        img_places: [],
      },
      detail_create: {
        id: "",
        name: "Rutjanakorn",
        lat: 0,
        lng: 0,
        detail: "",
        category: "",
        img_places: [],
      },
      cat_option: ["landmark", "market", "temple", "restaurant"],
    };
  },
  created() {
    this.get_places_by_cat("all");
  },
  methods: {
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
    close_modal_create() {
      this.modal_create_open = false;
    },
    delete_places(){
      axios.delete(`${end_point}/places/${this.detail.id}`)
      .then((res)=>{
        if(res.data.status == true){
        alert("Delete Places Success")
        this.get_places_by_cat("all");
      }
      else{
        alert(res.data.message)
      }
      })
    .catch(()=>{
      alert ("Can not delete Places.")
    })
      
    },
    save_detail() {
      axios.post(`${end_point}/update/places/${this.detail.id}`,this.detail )
     .then((res)=>{
      if(res.data.status == true){
        alert("Update Places Success")
        this.get_places_by_cat("all");
      }
      else{
        alert(res.data.message)
      }
     })
    .catch(()=>{
      alert ("Can not update Places.")
    })
    },
    save_detail_create() {
      
      axios.post(`${end_point}/places`,this.detail_create )
      .then((res)=>{
        if(res.data.status == true){
          alert("create places Success")
          this.get_places_by_cat("all");
        }
        else{
          alert(res.data.message)
        }
      })
      .catch(()=>{
        alert ("Can not create places.")
      })

      
    },
    add_img() {
      this.detail.img_places.push({ img: "" });
    },
    add_img_create() {
      this.detail_create.img_places.push({ img: "" });
    },
    delete_img(position) {
      this.detail.img_places.splice(position, 1);
    },
    delete_img_create(position) {
      this.detail_create.img_places.splice(position, 1);
    },
    show_modal_create(){
      this.modal_create_open = true;
    },
  },
});
</script>

<style>
</style>