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
      .liveQuery({ include: { who: true } })
      .subscribe(async (info) => {
        messages = info.applyChanges(messages).sort((a, b) => {
          return a.createdAt.getTime() < b.createdAt.getTime() ? 1 : -1;
        });
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

<div class="flex flex-col w-full">
  <div class="divider" />
  <div class="grid gap-6">
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
        <div class="text-base-content/60 grow">
          {remult.user.name}
        </div>

        <button class="btn btn-ghost" type="button" on:click={() => logout()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clip-rule="evenodd"
            />
          </svg>
          SignOut
        </button>
        <!-- <input
          class="input input-bordered w-full"
          placeholder="Who?"
          bind:value={whoSend}
        /> -->
      {:else}
        <div class="grow" />
        <a
          class="btn btn-primary"
          href="/auth/signin"
          data-sveltekit-preload-data="off"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
              clip-rule="evenodd"
            />
          </svg>
          Sign in
        </a>
      {/if}
    </div>

    <form on:submit={send} class="flex gap-4">
      <input
        class="input input-bordered w-full"
        placeholder="Your message?"
        bind:value={msg}
      />
      <button
        class="btn lg:btn-wide btn-primary"
        disabled={remult.user ? false : true}
      >
        Send
        <svg
          class="w-5 h-5 stroke-current"
          width="16"
          height="16"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M16 18L8 26L16 34"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          /><path
            d="M40 10V23C40 24.6569 38.6569 26 37 26H8"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >
      </button>
    </form>
  </div>
  <div class="divider" />
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
