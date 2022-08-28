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
        <div>
          {{ item.title }}
          <img
            :src="item.img_cover"
            alt=""
            style="width: 100%; height: 200px"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-bind:class="{ modal: true, 'is-active': modal_open }">
    <div class="modal-background" @click="close_modal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Video</p>
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

        <div class="field">
          <label class="label">Image Cover URL</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail.img_cover"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Video Link</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail.vdo_link"
            />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save_detail">
          Save changes
        </button>
        <button class="button" @click="close_modal">Cancel</button>
        <button class="button is-danger" @click="delete_vdo">Delete</button>
      </footer>
    </div>
  </div>

  <div v-bind:class="{ modal: true, 'is-active': modal_create_open }">
    <div class="modal-background" @click="close_modal_create"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Video</p>
        <button
          class="delete"
          aria-label="close"
          @click="close_modal_create"
        ></button>
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

        <div class="field">
          <label class="label">Image Cover URL</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail_create.img_cover"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Video Link</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail_create.vdo_link"
            />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save_detail_create">
          Save changes
        </button>
        <button class="button" @click="close_modal_create">Cancel</button>
        
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
const end_point = "http://https://api.system-searchpet.com";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      lists: [],
      modal_open: false,
      modal_create_open: false,
      detail: {
        id: "",
        img_cover:"",
        name: "",
        vdo_link: [],
      },
      detail_create: {
        id: "",
        img_cover:"",
        name: "",
        vdo_link: [],
      },
    };
  },
  created() {
    this.get_vdo();
  },
  methods: {
    get_vdo() {
      axios.get(`${end_point}/vdo`).then((res) => {
        console.log(res.data);
        this.lists = res.data;
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
    delete_vdo(){
      axios.delete(`${end_point}/vdo/${this.detail.id}`)
      .then((res)=>{
        if(res.data.status == true){
        alert("Delete Video Success")
        this.get_vdo();
      }
      else{
        alert(res.data.message)
      }
      })
    .catch(()=>{
      alert ("Can not delete Video.")
    })
      
    },
    save_detail() {
      axios.post(`${end_point}/update/vdo/${this.detail.id}`,this.detail )
     .then((res)=>{
      if(res.data.status == true){
        alert("Update Video Success")
        this.get_vdo();
      }
      else{
        alert(res.data.message)
      }
     })
    .catch(()=>{
      alert ("Can not update Video.")
    })
    },
    save_detail_create() {
     axios.post(`${end_point}/vdo`,this.detail_create )
     .then((res)=>{
      if(res.data.status == true){
        alert("Create Video Success")
        this.get_vdo();
      }
      else{
        alert(res.data.message)
      }
     })
    .catch(()=>{
      alert ("Can not create Video.")
    })
    },
    add_img() {
      this.detail.img_places.push({ img: "" });
    },
    delete_img(position) {
      this.detail.img_places.splice(position, 1);
    },
    show_modal_create() {
      this.modal_create_open = true;
    },
  },
});
</script>

<style>
</style>