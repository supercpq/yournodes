<template>
  <div class="outside">
    <!-- 最外面的大框 -->
    <div class="inside">
      <!-- 内层盒子 -->
      <div
        class="img-icon"
        @mouseenter="rotateOver()"
        @mouseleave="rotateOut()"
      >
        <!-- img盒子，记得加一个旋转动画 -->
        <img :src="userStore.avatarLink" alt="" class="avatar" />
      </div>
      <div class="basic-info">
        <!-- 名字，职业的flex -->
        <div class="user-title">
          <h2>
            {{ userStore.name }}
          </h2>
        </div>
        <div class="user-job">
          {{ userStore.profession }}
          <!-- 职业和编辑按钮的flex -->
        </div>
        <div class="user-setting">
          <button @click="setInfo()">{{ $t("editInfo") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/modules/user";
import { ref, onMounted } from "vue";
import { routerStore } from "../store/modules/routerPinia";
const routerPath = routerStore();
const userStore = useUserStore();
var rotateSpeed = ref("1s");
var timer;
var speed = 1;
onMounted(() => {
  userStore.getBaseInfo();
});
function rotateOver() {
  if (speed == 1) {
    timer = setInterval(() => {
      changeSpeed();
    }, 20);
  }
}
function changeSpeed() {
  if (speed > 0.1) {
    speed = speed - 0.004;
    rotateSpeed.value = String(speed) + "s";
  }
}
function rotateOut() {
  speed = 1;
  if (speed == 1) {
    clearInterval(timer);
  }
}
function setInfo() {
  routerPath.routerPath = "myinfo/setting";
}
</script>

<style scoped lang="scss">
.outside {
  max-width: 1000px;
  min-width: 800px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.15);
}
.inside {
  padding: 20px 40px;
  display: grid;
  grid-template-columns: 30% 70%;
}
.img-icon {
  padding: 3px;
  grid-column-start: 1;
  :hover {
    animation: rotate v-bind("rotateSpeed") linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
.avatar {
  border-radius: 50%;
  max-height: 150px;
  max-width: 150px;
  transform: rotate(0deg);
}
.basic-info {
  grid-column-start: 2;
  display: grid;
  grid-template-rows: 30% 30% 40%;
  padding: 3px;
}
.user-title {
  grid-row-start: 1;
  padding: 5px 10px;
  text-align: left;
}
.user-job {
  grid-row-start: 2;
  padding: 5px 10px;
  text-align: left;
}
.user-setting {
  grid-row-start: 3;
  padding: 5px 10px;
  text-align: left;
  button {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
