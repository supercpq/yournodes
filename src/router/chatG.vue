<template>
  <div class="chat">
    <div class="chat-ai"><chatAi /></div>
    <div class="chat-setting"><chatSetting /></div>
    <div class="tools"><normalTools /></div>
  </div>
</template>
<script setup lang="ts">
import chatAi from "../components/chatAi.vue";
import chatSetting from "../components/chatSetting.vue";
import normalTools from "../components/normalTools.vue";
</script>
<style scoped lang="scss">
.chat {
  width: 100%;
  height: 100%;
  display: grid;
  margin-top: 10px;
  grid-template-columns: 60% 30% 10%;
  .chat-ai {
    margin: 0 10px;
    grid-template-columns: 1;
  }
  .tools {
    grid-template-columns: 2;
  }
  .chat-setting {
    grid-template-columns: 3;
  }
}

//pad端
@media only screen and (min-width: 768px) and (max-width: 1150px) {
  .chat {
    grid-template-columns: 70% 30%;
  }
  .tools {
    display: none;
  }
}
// 手机端
@media only screen and (max-width: 767px) {
  .chat {
    grid-template-columns: 100%;
  }
  .chat-setting {
    display: none;
  }
  .tools {
    display: none;
  }
}
</style>
