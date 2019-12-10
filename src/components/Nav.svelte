<script>
  export let segment;
  import { stores } from "@sapper/app";
  const { session } = stores();
  console.log($session);
</script>

<style>
  nav {
    display: flex;
  }
  ul {
    display: flex;
    list-style: none;
  }
  li {
    padding: 0 5px;
  }
  a {
    text-decoration: none;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        class={segment === 'blog' ? 'selected' : ''}
        href="blog">
        blog
      </a>
    </li>
    <li>
      <a href="/user">Profile</a>
    </li>
    {#if !$session.user}
      <li>
        <a href="/api/auth/login">Login</a>
      </li>
    {:else}
      <!-- TODO User component -->
      <a href="/api/auth/logout">Logout</a>
    {/if}
  </ul>
</nav>
