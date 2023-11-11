<script lang="ts">
  import Buble from "$lib/Buble.svelte";
  import { remult } from "remult";
  import { Message } from "../shared/Message";
  import { onDestroy, onMount } from "svelte";
  export let whoSend = "";
  export let msg = "";

  let messages: Message[] = [];
  let unSub: (() => void) | null = null;

  onMount(async () => {
    unSub = remult
      .repo(Message)
      .liveQuery()
      .subscribe((info) => {
        messages = info.applyChanges(messages);
      });
  });
  onDestroy(() => {
    unSub && unSub();
  });

  const send = async () => {
    try {
      await remult.repo(Message).insert({ msg, who: whoSend });
      msg = "";
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };
</script>

<div class="container w-1/2 m-auto mt-4">
  <h1 class="text-4xl text-primary mb-4">Welcome to Remult Chat</h1>

  <div class="m-4">
    {#each messages as { msg, who, createdAt }}
      <Buble {msg} {who} {createdAt} pos={whoSend === who ? "right" : "left"} />
    {/each}
  </div>

  <form on:submit={send} class="flex gap-4">
    <div class="chat-image avatar">
      <div class="w-12 rounded-full">
        <img
          src="https://www.gravatar.com/avatar/{whoSend}?s=75&d=identicon"
          alt="package"
        />
      </div>
    </div>
    <input
      class="input input-bordered"
      placeholder="Who?"
      bind:value={whoSend}
    />
    <input
      class="input input-bordered"
      placeholder="Your message?"
      bind:value={msg}
    />
    <button class="btn">Send</button>
  </form>
</div>
