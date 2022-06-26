<template>
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
        {{ item.name }}
        <img :src="item.img_places" alt="" style="width: 100%; height: 200px" />
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
</template>

<script>
import { defineComponent } from "vue";
const end_point = "http://127.0.0.1:3333";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      lists: [],
      modal_open: false,
      detail: {
        name: "",
        content: "",
        img_places: "",
      },
    };
  },
  created() {
    //    (this.$route.params.id)
    this.get_recommend();
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
    },
    close_modal() {
      this.modal_open = false;
    },
    save_detail() {
      alert("Hello world");
    },
    add_img() {
      this.detail.img_places.push({ img: "" });
    },
    delete_img(position) {
      this.detail.img_places.splice(position, 1);
    },
  },
});
</script>

<style scoped>
</style>
