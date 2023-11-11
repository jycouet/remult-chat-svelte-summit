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

<div class="container max-w-4xl py-8 px-4 mx-auto h-screen">
  <div class="text-center">
    <h1 class="text-lg lg:text-4xl text-primary mb-4 font-bold">
      Welcome to Svelte Summit - Chat
    </h1>
    <p class="text-sm text-base-content/60">
      Using
      <a class="link link-hover" href="https://kit.svelte.dev/">SvelteKit</a>,
      <a class="link link-hover" href="https://remult.dev/">Remult</a>,
      <a class="link link-hover" href="https://daisyui.com/">DaisyUI</a>
    </p>
  </div>
  <slot />
</div>
