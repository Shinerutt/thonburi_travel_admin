<template>
  <div class="columns" style="width: 100%">
    <button class="button is-primary" @click="show_modal_create">create</button>
  </div>
  <div class="columns is-multiline">
    <div
      class="column is-3"
      v-for="item in lists"
      :key="item.id"
     
    >
      <div
        style="width=100%; height: 200px; background:green ; margin-top:25px ; "
      >
        {{ item.name }}
        <img :src="item.img_places"  @click="open_detail(item)" alt="" style="width: 100%; height: 200px" />
        <button class="button is-primary" @click="delete_item(item.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
  <div v-bind:class="{ modal: true, 'is-active': modal_open }">
    <div class="modal-background" @click="close_modal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Recommenddetail</p>
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
          <label class="label">Content</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="e.g. Hello world"
              v-model="detail.content"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Image_Places</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail.img_places"
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

  <div v-bind:class="{ modal: true, 'is-active': modal_create_open }">
    <div class="modal-background" @click="close_modal_create"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Recommenddetail</p>
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
          <label class="label">Content</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="e.g. Hello world"
              v-model="detail_create.content"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Image_Places</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="detail_create.img_places"
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
const end_point = "http://128.199.103.191:3333";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      lists: [],
      modal_open: false,
      modal_create_open: false,
      detail: {
        name: "",
        content: "",
        ref_recommended: "",
        img_places: "",
      },
      detail_create: {
        name: "",
        content: "",
        img_places: "",
        ref_recommended: "",
      },
    };
  },
  created() {
    //    (this.$route.params.id)
    this.get_recommend();
    this.detail_create.ref_recommended = this.$route.params.id;
  },
  methods: {
    get_recommend() {
      axios
        .get(`${end_point}/view/recommededPlaces/${this.$route.params.id}`)
        .then((res) => {
          console.log(res.data);
          this.lists = res.data.detail;
        });
    },
    open_detail(item) {
      this.modal_open = true;
      this.detail = item;
      this.detail.ref_recommended = this.$route.params.id;
    },
    close_modal() {
      this.modal_open = false;
    },
    close_modal_create() {
      this.modal_create_open = false;
    },
    save_detail_create() {
      axios
        .post(`${end_point}/recommendedPlaceDetail`, this.detail_create)
        .then((res) => {
          if (res.data.status == true) {
            alert("Create RecommendedPlaceDetail Success");
            this.get_recommend();
          } else {
            alert(res.data.message);
          }
        })
        .catch(() => {
          alert("Can not Create RecommendedPlaceDetail.");
        });
    },
    save_detail() {
      axios
        .put(
          `${end_point}/recommendedPlaceDetail/${this.detail.id}`,
          this.detail
        )
        .then((res) => {
          if (res.data.status == true) {
            alert("Upadte RecommendedPlaceDetail Success");
            this.get_recommend();
          } else {
            alert(res.data.message);
          }
        })
        .catch(() => {
          alert("Can not Upadte RecommendedPlaceDetail.");
        });
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
    delete_item(id) {
      axios
        .delete(`${end_point}/recommendedPlaceDetail/${id}`)
        .then((res) => {
          if (res.data.status == true) {
            alert("Delete ItemID Success");
            this.get_recommend();
          } else {
            alert(res.data.message);
          }
        })
        .catch(() => {
          alert("Can not Delete ItemID.");
        });
    },
  },
});
</script>

<style scoped>
</style>
