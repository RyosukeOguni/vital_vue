<template>
  <header>
    <nav class="navbar navbar-dark">
      <h1 class="h6 my-0">
        <router-link to="/" class="text-white">体調管理システム</router-link>
      </h1>
      <b-dropdown right no-caret variant="hidden">
        <template #button-content>
          <b-icon
            icon="list"
            aria-hidden="true"
            class="text-white"
            style="width: 2rem; height: 2rem"
          ></b-icon>
        </template>
        <b-dropdown-item
          ><router-link to="/weather">バイタル登録</router-link></b-dropdown-item
        >
        <b-dropdown-item
          ><router-link to="/user">利用者登録</router-link></b-dropdown-item
        >
      </b-dropdown>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NaviBar',
}
</script>

<style>
header nav {
  background: #859ad3;
}
header nav a,
header nav a:hover {
  color: #000;
  text-decoration: none;
}
header nav h1 a:hover {
  text-decoration: transparent;
  opacity: 0.6;
}
header nav .dropdown button {
  padding: 0;
}
</style>
