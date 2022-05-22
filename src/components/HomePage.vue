<template>
  <div class="columns is-multiline">
    <div class="column is-3" v-for="item in lists_filter" :key="item.id ">
      <div style="width=100%; height: 200px; background: red;">
         {{item.name}}
         <img :src="item.img" alt="" style="width:100%; height: 200px;"> 
      </div> 
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
            item.img_places = JSON.parse(item.img_places);
            item.img = item.img_places[0]
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
  },
});
</script>

<style>
</style>