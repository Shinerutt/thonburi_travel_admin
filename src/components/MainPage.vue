<template>
  <div class="hello">
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://bulma.io">
          <img
            src="http://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </a>

        <a
          class="navbar-item is-hidden-desktop"
          href="https://github.com/jgthms/bulma"
          target="_blank"
        >
          <span class="icon" style="color: #333">
            <i class="fa fa-github"></i>
          </span>
        </a>

        <a
          class="navbar-item is-hidden-desktop"
          href="https://twitter.com/jgthms"
          target="_blank"
        >
          <span class="icon" style="color: #55acee">
            <i class="fa fa-twitter"></i>
          </span>
        </a>

        <div class="navbar-burger burger" data-target="navMenubd-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenubd-example" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/main/home"><a class="navbar-item" href="#"> Homepage </a></router-link>
          <router-link to="/main/recommend"><a class="navbar-item" href="#"> Recommend </a></router-link>
          <router-link to="/main/trips"><a class="navbar-item" href="#"> trips </a></router-link>
          <router-link to="/main/video"><a class="navbar-item" href="#"> Video </a></router-link>
          
          
          
        </div>
      </div>
    </nav>
    <section>
      <div class="content">
        <router-view>

        </router-view>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.content {
  padding: 20px;
  width: 100vw;
  height: 95vh;
  
}
</style>
