<script>
  import Buble from "$lib/Buble.svelte";
  export let who = "JYC";
  export let msg = "";
</script>

<div class="container w-1/2 m-auto mt-4">
  <h1 class="text-4xl text-primary">Welcome to Remult Chat</h1>

  <Buble />
  <Buble pos="right" />

  <form>
    <input class="input input-bordered" bind:value={who} />
    <input class="input input-bordered" bind:value={msg} />
    <button class="btn">Send</button>
  </form>
</div>
