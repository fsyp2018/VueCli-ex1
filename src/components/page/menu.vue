<template>
  <div class="hello my-3">



<ul class="nav">
  <li class="nav-item">
    <router-link class="nav-link" to="/page/">卡片 1</router-link>
  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/page/child2">卡片 2</router-link>
  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/page/child3">卡片 3</router-link>
  </li>

</ul>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  }
}
</script>

