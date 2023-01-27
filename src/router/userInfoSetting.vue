<template>
  <div class="setting">
    <div class="navigation">
      <button @click="backToMyInfo()">
        <el-icon><ArrowLeftBold /></el-icon>{{ $t("backtoperson") }}
      </button>
    </div>
    <div class="details">
      <div class="tab">
        <div class="insidetabs">
          <div
            v-for="item in tabs"
            class="onetab"
            @click="componentNameId = item.componentName"
          >
            <div v-if="'tabIcon' in item" class="tabIcon">
              <img
                :src="item.tabIcon"
                alt=""
                style="max-width: 60%; max-height: 60%; margin: 5px"
              />
            </div>
            <!-- 
        @mouseenter="rotateOver()"
        @mouseleave="rotateOut()"
             -->
            <div class="tabTitle">
              <p>{{ item.tabName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <component
          :is="componentTabs[componentNameId]"
          style="height: 100%; width: 100%"
        ></component>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, markRaw } from "vue";
import { routerStore } from "../store/modules/routerPinia";
import { infoTabs } from "../api/userinfo";
import basicSetting from "../components/basicSetting.vue";
import accountSetting from "../components/accountSetting.vue";

const componentNameId = ref("");

const componentTabs = {
  basicSetting,
  accountSetting,
};
const routerPath = routerStore();
interface infoTab {
  tabName: string;
  componentName: string;
  tabUrl: string;
  tabIcon?: string;
}
const tabs = ref<infoTab[]>([]);

function settingTabs(url: string) {
  routerPath.routerPath = url;
}

function backToMyInfo() {
  routerPath.routerPath = "myinfo";
}

onMounted(() => {
  infoTabs().then(
    (res: any) => {
      if (res.status == 0) {
        tabs.value = res.tabs;
        componentNameId.value = tabs.value[0].componentName;
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
});
</script>
<style lang="scss" scoped>
.setting {
  display: grid;
  padding: 30px;
  max-width: 1200px;
  width: 100%;
  height: 800px;
  margin: auto;
  grid-template-rows: 5% 80%;
  grid-gap: 20px;
  button {
    float: left;
    background-color: rgba(255, 255, 255, 0.1);
    :hover {
      outline: none;
    }
  }
}
.navigation {
  grid-row-start: 1;
  background-color: rgba(255, 255, 255, 0.3);
}

.details {
  max-width: 1180px;
  grid-row-start: 2;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-gap: 20px;
}

.tab {
  grid-column-start: 1;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  .insidetabs {
    padding: 5px;
    width: 95%;
    :hover {
      cursor: pointer;
    }
  }

  .onetab {
    display: grid;
    width: 100%;
    height: 40px;
    margin-top: 6px;
    grid-template-columns: 30% 60%;
    background-color: rgba(255, 255, 255, 0.3);
    :hover {
      background-color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
    }
  }
  .tabIcon {
    grid-column-start: 1;
    max-height: 40px;
    max-width: 60px;
  }
  .tabTitle {
    grid-column-start: 2;
    max-width: 120px;
    max-height: 40px;
    vertical-align: middle;
    display: table-cell;
    p {
      margin: 5px;
      text-align: center;
    }
  }
}

.info {
  grid-column-start: 2;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
