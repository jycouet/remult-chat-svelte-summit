<script lang="ts">
  import { goto } from "$app/navigation";
  import Buble from "$lib/Buble.svelte";
  import { remult } from "remult";
  import { onDestroy, onMount } from "svelte";
  import { Message } from "../shared/Message";

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
      await remult.repo(Message).insert({ msg, who: remult.user?.name });
      msg = "";
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };
  import { signOut } from "@auth/sveltekit/client";
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex-initial divider" />
  <div class="flex-initial grid">
    <div class="flex gap-4" />

    <div class="flex gap-4 items-center">
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img
            src="https://www.gravatar.com/avatar/{remult.user
              ?.name}?s=75&d=identicon"
            alt="pic"
          />
        </div>
      </div>
      {#if remult.user}
        <div class="text-primary">
          {remult.user.name}
        </div>

        <button class="btn btn-ghost" type="button" on:click={() => signOut}
          >SignOut</button
        >
        <!-- <input
          class="input input-bordered w-full"
          placeholder="Who?"
          bind:value={whoSend}
        /> -->
      {:else}
        <a
          class="btn btn-primary"
          href="/auth/signin"
          data-sveltekit-preload-data="off">Sign in</a
        >
      {/if}
    </div>

    <form on:submit={send} class="flex gap-4">
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
          pos={remult.user?.name === who ? "right" : "left"}
        />
      {/each}
    </div>
  </div>
</div>
