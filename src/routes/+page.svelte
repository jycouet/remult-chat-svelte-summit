<script lang="ts">
  import { goto } from "$app/navigation";
  import Buble from "$lib/Buble.svelte";
  import { remult } from "remult";
  import { onDestroy, onMount } from "svelte";
  import { Message } from "../shared/Message";
  export let whoSend = "JYC";
  export let msg = "";

  let messages: Message[] = [];
  let unSub: (() => void) | null = null;

  onMount(async () => {
    messages = await remult.repo(Message).find();
    // unSub = remult
    //   .repo(Message)
    //   .liveQuery()
    //   .subscribe((info) => {
    //     messages = info.applyChanges(messages);
    //   });
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

<div class="flex flex-col w-full h-full">
  <div class="flex-initial divider" />
  <div class="flex-initial grid">
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img
            src="https://www.gravatar.com/avatar/{whoSend}?s=75&d=identicon"
            alt="package"
          />
        </div>
      </div>
      <input
        class="input input-bordered w-full"
        placeholder="Who?"
        bind:value={whoSend}
      />
    </div>
    <form on:submit={send}>
      <input
        class="input input-bordered w-full"
        placeholder="Your message?"
        bind:value={msg}
      />
      <button
        class="btn btn-primary"
        disabled={!remult.repo(Message).metadata.apiInsertAllowed()}
        >Send</button
      >
    </form>
  </div>
  <div class="flex-initial divider" />
  <div class="grid card">
    <div class="m-4">
      {#each messages as { msg, who, createdAt }}
        <Buble
          {msg}
          {who}
          {createdAt}
          pos={whoSend === who ? "right" : "left"}
        />
      {/each}
    </div>
  </div>
</div>
