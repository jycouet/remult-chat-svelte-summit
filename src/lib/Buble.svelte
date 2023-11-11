<script lang="ts">
  export let name = "Obi-Wan Kenobi";
  export let time = "12:45";
  export let msg = "You were the Chosen One!";
  export let pos: "left" | "right" = "left";
</script>

<div class="chat {pos === 'left' ? 'chat-start' : 'chat-end'}">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        src="https://www.gravatar.com/avatar/{name}?s=75&d=identicon"
        alt="package"
      />
    </div>
  </div>
  <div class="chat-header">
    {name}
    <time class="text-xs opacity-50">{time}</time>
  </div>
  <div class="chat-bubble">{msg}</div>
  <!-- <div class="chat-footer opacity-50">Delivered</div> -->
</div>
