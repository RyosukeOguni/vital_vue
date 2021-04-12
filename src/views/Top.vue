<template>
  <main class="container">
    <article class="top_menu row justify-content-center">
      <section class="mt-5 col-md-8">
        <ul class="row list-unstyled">
          <li class="col-md-6">
            <router-link
              to="/weather"
              class="position-relative d-block border border-white"
              style="background: #9aadd3"
            >
              <span class="position-absolute h3 text-white text-center w-100 d-block"
                >バイタル登録</span
              >
            </router-link>
          </li>
          <li class="col-md-6">
            <router-link
              to="/user"
              class="position-relative d-block border border-white"
              style="background: #f19c99"
            >
              <span class="position-absolute h3 text-white text-center w-100 d-block">
                利用者登録
              </span>
            </router-link>
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>
<script>
export default {
  name: 'Top',
}
</script>
<style>
/* top_menu */
.top_menu ul a {
  padding-top: 100%;
}
.top_menu ul a:hover {
  text-decoration: transparent;
  opacity: 0.6;
}
@media (max-width: 767px) {
  .top_menu ul a {
    padding-top: 4rem;
  }
}
.top_menu ul a span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
