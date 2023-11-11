<script lang="ts">
  export let who = "Obi-Wan Kenobi";
  export let msg = "You were the Chosen One!";
  export let createdAt = new Date();
  export let pos: "left" | "right" = "left";
</script>

<div class="chat {pos === 'left' ? 'chat-start' : 'chat-end'}">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        src="https://www.gravatar.com/avatar/{who}?s=75&d=identicon"
        alt="package"
      />
    </div>
  </div>
  <div class="chat-header">
    {who}
    <time class="text-xs opacity-50">{createdAt.toLocaleTimeString()}</time>
  </div>
  <div class="chat-bubble">{msg}</div>
  <!-- <div class="chat-footer opacity-50">Delivered</div> -->
</div>
