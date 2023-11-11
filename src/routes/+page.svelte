<script lang="ts">
  import Buble from "$lib/Buble.svelte";
  import { remult } from "remult";
  import { onDestroy, onMount } from "svelte";
  import { Message } from "../shared/Message";
  import { signOut } from "@auth/sveltekit/client";
  import { MessageController } from "../shared/MessageController";

  export let msg = "";

  let messages: Message[] = [];
  let unSub: (() => void) | null = null;

  onMount(async () => {
    // TODO Svelte issue
    // messages = await remult.repo(Message).find({ include: { who: true } });
    unSub = remult
      .repo(Message)
      // .liveQuery({ include: { who: true } })
      .liveQuery()
      .subscribe(async (info) => {
        // let's do this for now has the include is in live Query?
        messages = await remult.repo(Message).find({ include: { who: true } });
        console.log(`messages`, messages);

        // messages = info.applyChanges(messages).sort((a, b) => {
        //   return a.createdAt.getTime() < b.createdAt.getTime() ? 1 : -1;
        // });
      });
  });
  onDestroy(() => {
    unSub && unSub();
  });

  const logout = () => {
    signOut();
    remult.user = undefined;
  };

  const send = async () => {
    try {
      await MessageController.send(msg);
      msg = "";
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };
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

        <span>
          | Using
          <a class="link link-secondary" href="https://kit.svelte.dev/"
            >SvelteKit</a
          >,
          <a class="link link-secondary" href="https://remult.dev/">Remult</a>,
          <a class="link link-secondary" href="https://daisyui.com/">DaisyUI</a>
          |
        </span>

        <button class="btn btn-ghost" type="button" on:click={() => logout()}
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

        <span>
          | Using
          <a class="link link-secondary" href="https://kit.svelte.dev/"
            >SvelteKit</a
          >,
          <a class="link link-secondary" href="https://remult.dev/">Remult</a>,
          <a class="link link-secondary" href="https://daisyui.com/">DaisyUI</a>
          |
        </span>
      {/if}
    </div>

    <form on:submit={send} class="flex gap-4">
      <input
        class="input input-bordered w-full"
        placeholder="Your message?"
        bind:value={msg}
      />
      <button class="btn btn-primary" disabled={remult.user ? false : true}
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
          who={who?.name}
          {createdAt}
          pos={remult.user?.name === who?.name ? "right" : "left"}
        />
      {/each}
    </div>
  </div>
</div>
