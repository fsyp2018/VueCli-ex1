<template>
  <div class="hello">
    <div>
      <img class="card-img-top" :src="user.picture.large" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ user.gender }}</h5>
        <p
          class="card-text"
        >{{ user.email }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      user: {
        picture: {}
      }
    };
  },
  created() {
    const vm = this;
    this.$http.get("https://randomuser.me/api/").then(response => {
      console.log(response);
      vm.user = response.data.results[0];
    });
  }
};
</script>

