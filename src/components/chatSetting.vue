<template>
  <div class="setting">
    <div style="display: flex; justify-content: space-between">
      <el-switch
        v-model="theme"
        class="mt-2"
        active-value="light"
        inactive-value="dark"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
        size="large"
        :change="changeTheme()"
      />
      <el-button type="info" :icon="RefreshLeft" circle @click="undoChat()" />

      <el-switch
        v-model="local"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        active-text="local"
        size="large"
        :change="changeLocal()"
      />
      <el-button type="info" :icon="Refresh" circle @click="clearChat()" />
    </div>
    <div class="slider-demo-block spacing">
      <div class="illustrate">
        <span class="demonstration" :illustrate="$t('illustrate[0]')"
          >Temperature: {{ chatStore.Temperature }}</span
        >
      </div>
      <el-slider v-model="chatStore.Temperature" :max="1" :step="0.01" />
    </div>
    <div class="slider-demo-block spacing">
      <div class="illustrate">
        <span class="demonstration" :illustrate="$t('illustrate[1]')"
          >Maximum length: {{ chatStore.MaxLength }}</span
        >
      </div>
      <el-slider v-model="chatStore.MaxLength" :max="4000" :step="1" />
    </div>
    <div class="slider-demo-block spacing">
      <div class="illustrate">
        <span class="demonstration" :illustrate="$t('illustrate[2]')"
          >Top P: {{ chatStore.TopP }}</span
        >
      </div>
      <el-slider v-model="chatStore.TopP" :max="1" :step="0.01" />
    </div>
    <div class="slider-demo-block spacing">
      <div class="illustrate">
        <span class="demonstration" :illustrate="$t('illustrate[3]')"
          >Frequency penalty: {{ chatStore.frequencyPenalty }}</span
        >
      </div>
      <el-slider v-model="chatStore.frequencyPenalty" :max="2" :step="0.01" />
    </div>
    <div class="slider-demo-block spacing">
      <div class="illustrate">
        <span class="demonstration" :illustrate="$t('illustrate[4]')"
          >Presence penalty: {{ chatStore.presencePenalty }}</span
        >
      </div>
      <el-slider v-model="chatStore.presencePenalty" :max="2" :step="0.01" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { chatAiStore } from "../store/modules/chatAiPinia";
import { ref } from "vue";
import { Sunny, Moon, Refresh, RefreshLeft } from "@element-plus/icons-vue";
const chatStore = chatAiStore();
const local = ref(chatStore.local);
const theme = ref(chatStore.theme);
function changeTheme() {
  chatStore.setTheme(theme.value);
}
function changeLocal() {
  chatStore.setLocal(local.value);
}
function undoChat() {
  chatStore.undoAiChat();
}
function clearChat() {
  chatStore.prompt = [
    "AI: I am an AI. How can I help you today?(Recommended language: English)",
  ];
}
</script>
<style scoped lang="scss">
.setting {
  max-width: 300px;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  color: black;
  //   justify-content: space-between;
}
.spacing {
  margin-top: 30px;
}
.illustrate {
  position: relative;

  :hover::before {
    content: attr(illustrate);
    max-width: 200px;
    margin-top: 30px;
    white-space: pre-wrap;
    background-color: #c2c8d1;
    padding: 0 6px;
    color: #fff;
    border-radius: 6px;
    font-size: 11px;
    z-index: 3;
    position: absolute;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>
