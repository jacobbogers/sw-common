<script lang="ts">
  import "../app.css";

  let {children} = $props();
</script>

<svelte:head>
  <meta http-equiv="x-dns-prefetch-control" content="off" />
</svelte:head>
<!-- 
 nothing to do here this is the login form doesnt need a general layout
 this can change later on
  -->
{@render children()}
