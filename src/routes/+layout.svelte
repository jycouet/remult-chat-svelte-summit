<script lang="ts">
  import { remult } from "remult";
  import "../app.postcss";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;

  // set this globaly
  $: remult.user = data.user;
</script>

<svelte:head>
  <title>Svelte Summit - Chat</title>
</svelte:head>

<div class="container pt-8 px-1 m-auto h-screen">
  <h1 class="text-4xl text-primary mb-4">Welcome to Svelte Summit - Chat</h1>
  <slot />
</div>
