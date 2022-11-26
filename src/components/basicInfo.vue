<template>
  <div class="outside">
    <!-- 整个按掘金设计，最外面的大框 -->
    <div class="inside">
      <!-- 内层盒子 -->
      <div class="img-icon">
        <!-- img盒子，记得加一个旋转动画 -->
        <img :src="userStore.avatarLink" alt="" class="avatar" />
      </div>
      <div class="basic-info">
        <!-- 名字，职业的flex -->
        <div class="user-title">
          <h2>{{ userStore.name }}</h2>
        </div>
        <div class="user-job">
          {{ userStore.profession }}
          <!-- 职业和编辑按钮的flex -->
        </div>
        <div class="user-setting">
          <button>编辑信息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/modules/user";
import { ref } from "vue";
const userStore = useUserStore();
const rotationAngle = ref(0);
</script>

<style scoped lang="scss">
.outside {
  max-width: 1000px;
  min-width: 800px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.15);

  /* min-height: 300px; */
}
.inside {
  padding: 20px 40px;
  display: grid;
  grid-template-columns: 30% 70%;
}
.img-icon {
  padding: 3px;
  grid-column-start: 1;
}
.avatar {
  border-radius: 50%;
  max-height: 150px;
  max-width: 150px;
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
