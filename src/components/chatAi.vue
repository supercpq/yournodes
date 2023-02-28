<template>
  <div :class="chatStore.theme == 'light' ? 'chat-light' : 'chat-dark'">
    <div class="chat" style="width: 100%" id="chat">
      <div v-for="(item, index) in chatStore.prompt" :key="index">
        <div style="display: flex" :id="`chat-${index}`">
          <div class="img-icon" v-show="index % 2 === 0">
            <img src="/ai.svg" alt="" class="avatar" />
          </div>
          <div
            :class="chatStore.theme == 'light' ? 'ai-light' : 'ai-dark'"
            v-show="index % 2 === 0"
          >
            <span class="chat-content-a">
              {{ item }}
            </span>
          </div>
        </div>
        <div style="display: flex; float: right" :id="`chat-${index}`">
          <div class="human-chat" v-show="index % 2 === 1">
            <span class="chat-content-h">
              {{ item }}
            </span>
          </div>
          <div class="img-icon" v-show="index % 2 === 1">
            <img :src="userStore.avatarLink" alt="" class="avatar" />
          </div>
        </div>
      </div>
    </div>
    <div class="input">
      <div class="menu">
        <el-button
          type="success"
          :icon="Setting"
          circle
          @click="showSetting()"
        />
      </div>
      <div class="human-input">
        <el-input
          v-model="humanInput"
          :autosize="{ minRows: 1, maxRows: 3 }"
          type="textarea"
          maxlength="900"
          placeholder="Please input"
          show-word-limit
        />
      </div>
      <div class="submit">
        <el-button
          type="primary"
          :icon="Position"
          circle
          @click="submit()"
          :disabled="disable"
        />
      </div>
    </div>
    <el-drawer
      ref="drawerRef"
      v-model="dialog"
      :title="$t('setting')"
      direction="ltr"
      size="70%"
      class="demo-drawer"
    >
      <chatSetting />
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { chatAiStore } from "../store/modules/chatAiPinia";
import { useUserStore } from "../store/modules/user";
import { ref, onMounted } from "vue";
import { Position, Setting } from "@element-plus/icons-vue";
import chatSetting from "./chatSetting.vue";
const disable = ref(false);
const humanInput = ref("");
const userStore = useUserStore();
const dialog = ref(false);
const chatStore = chatAiStore();
chatStore.$subscribe((mutations, state) => {
  if (state.prompt.length % 2 !== 0) {
    disable.value = false;
  }
  let ele = document.getElementById(`chat`);
  if (ele != null) {
    ele.scrollTop = ele.scrollHeight;
  }
});
function showSetting() {
  dialog.value = true;
}
function submit() {
  disable.value = true;
  chatStore.submitChat(humanInput.value);
  humanInput.value = "";
}
onMounted(() => {
  userStore.getBaseInfo();
});
</script>
<style scoped lang="scss">
.img-icon {
  padding: 3px;
}
.avatar {
  border-radius: 50%;
  max-height: 30px;
  max-width: 30px;
}
.chat-content-a {
  padding: 6px;
}
.chat-content-h {
  padding: 6px;
}
.chat-light {
  height: 100%;
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-rows: 90% 10%;
  border-radius: 10px;
  padding: 10px;
}
.chat-dark {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: grid;
  grid-template-rows: 90% 10%;
  border-radius: 10px;
  padding: 10px;
}
.chat {
  grid-row-start: 1;
  overflow: auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  max-height: 800px;
}
.input {
  grid-row-start: 2;
  display: grid;
  padding: 0 10px;
  grid-template-columns: 90% 10%;
}
.menu {
  display: none;
}
.human-input {
  grid-column-start: 1;
}
.submit {
  grid-column-start: 2;
}
.ai-light {
  margin: 10px;
  background-color: white;
  color: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  word-break: break-all;
  text-align: left;
}
.ai-dark {
  margin: 10px;
  background-color: dimgrey;
  border-radius: 6px;
  text-align: left;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  word-break: break-all;
}
.human-chat {
  margin: 10px;
  color: black;
  border-style: solid;
  border-radius: 6px;
  border-width: 1px;
  background-color: chartreuse;
  text-align: left;
  margin-right: 0;
  word-break: break-all;
}

@media only screen and (max-width: 767px) {
  .chat {
    grid-row-start: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    max-height: 600px;
  }
  .input {
    grid-template-columns: 10% 80% 10%;
  }
  .menu {
    display: block;
    grid-column-start: 1;
  }
  .human-input {
    grid-column-start: 2;
  }
  .submit {
    grid-column-start: 3;
  }
}
</style>
