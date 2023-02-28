<template>
  <div>
    <div class="tabinfo">
      <h4>{{ $t("userinfo") }}</h4>
    </div>
    <div class="info-detail">
      <div class="info-form">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
        >
          <el-form-item :label="$t('username')">
            <el-input
              v-model.trim="formLabelAlign.name"
              placeholder="user name"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item :label="$t('profession')">
            <el-input
              v-model.trim="formLabelAlign.profession"
              placeholder="profession"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item :label="$t('company')">
            <el-input
              v-model.trim="formLabelAlign.type"
              placeholder="company"
              maxlength="20"
            />
          </el-form-item>
        </el-form>
        <button @click="updataInfo()" style="float: left">
          {{ $t("sureToChange") }}
        </button>
        <el-alert
          v-if="isSuccess == 1"
          title="success"
          type="success"
          center
          show-icon
          :closable="false"
        />
        <el-alert
          v-else-if="isSuccess == 2"
          title="error"
          type="error"
          center
          show-icon
          :closable="false"
        />
      </div>
      <div class="info-avatar">
        <div class="info-mask">
          <el-upload
            class="avatar-uploader"
            :action="imgUpdataUrl"
            :headers="jwtoken"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formLabelAlign.imageUrl"
              :src="formLabelAlign.imageUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            <div class="masks">
              <h5>{{ $t("changeava") }}</h5>
              <el-icon :size="40"><CirclePlus /></el-icon>
            </div>
          </el-upload>
        </div>
        <p>{{ $t("uploadimg") }}</p>
        <p v-if="avatarcheck" style="color: red">{{ avataralert }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useUserStore } from "../store/modules/user";
import type { UploadProps } from "element-plus";
import { baseInfo, updatebaseinfo } from "../api/userinfo";
import { getToken } from "../utils/user";
import _ from "lodash";

const imgUpdataUrl = ref("/myinfo/settingnewimg");
const isSuccess = ref(0);
const avatarcheck = ref(false);
const labelPosition = ref("left");
const avataralert = ref("");
const userStore = useUserStore();
const jwtoken = reactive({ Authorization: "" });
const screenWidth = ref(document.body.clientWidth);
const formLabelAlign = reactive({
  name: userStore.name,
  profession: userStore.profession,
  imageUrl: userStore.avatarLink,
  type: "",
});

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  formLabelAlign.imageUrl = URL.createObjectURL(uploadFile.raw!);
  userStore.avatarLink = formLabelAlign.imageUrl;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!(rawFile.type == "image/jpeg" || rawFile.type == "image/png")) {
    avataralert.value = "注意文件格式";
    avatarcheck.value = true;
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    avataralert.value = "不能大于5MB";
    avatarcheck.value = true;
    return false;
  }
  const token = getToken();
  if (token) {
    const data = JSON.parse(token);
    const now = new Date().getTime();
    const expired = parseInt(data.expires) - now <= 0;
    if (expired) {
      location.replace(
        window.location.protocol + "//" + window.location.host + "/login"
      );
      return;
    } else {
      jwtoken.Authorization = "Bearer " + data.accessToken;
    }
  }
  avatarcheck.value = false;
  return true;
};

function updataInfo() {
  updatebaseinfo(formLabelAlign).then(
    (res: any) => {
      if (res.status == 0) {
        isSuccess.value = 1;
      } else {
        isSuccess.value = 2;
      }
    },
    (err) => {
      isSuccess.value = 2;
    }
  );
}

onMounted(() => {
  baseInfo().then(
    (res: any) => {
      if (res.status == 0) {
        formLabelAlign.name = res.info.userName;
        formLabelAlign.profession = res.info.profession;
        formLabelAlign.imageUrl = res.info.avatarLink;
        formLabelAlign.type = res.info.company;
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
    })();
  };
});
const changeLable = _.debounce(
  (screenWidth: number) => {
    if (screenWidth < 767) {
      labelPosition.value = "top";
    }
  },
  200,
  {
    leading: true,
  }
);
watch(screenWidth, (newVal, oldVal) => {
  //
  changeLable(newVal);
});
</script>
<style lang="scss" scoped>
.tabinfo {
  text-align: left;
  margin-left: 20px;
}
.info-detail {
  display: grid;
  width: 100%;
  height: 90%;
  grid-template-columns: 60% 30%;
  gap: 20px;
}
.info-form {
  grid-column-start: 1;
  margin-left: 20px;
}
.info-avatar {
  grid-column-start: 2;
  p {
    font-size: 10px;
    margin: auto;
    text-align: center;
    max-width: 120px;
  }
}
:deep(.avatar) {
  max-width: 160px;
  max-height: 160px;
  min-height: 120px;
  min-width: 120px;
  border-radius: 50%;
  // clip-path: circle(80px at center);
  // mask-image: url(mask.svg#mask1);
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
  // mask: linear-gradient(90deg, transparent, #000);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.info-mask {
  margin: auto;
  position: relative;
  width: 160px;
  height: 160px;
}
.masks {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  background: rgba(101, 101, 101, 0.6);
  color: #ffffff;
  opacity: 0;
}
// .masks :hover {
//   opacity: 0.1;
// }
.info-mask :hover .masks {
  opacity: 1;
}
.masks h5 {
  text-align: center;
}
@media only screen and (max-width: 767px) {
  .info-detail {
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;
  }
  .info-form {
    grid-column-start: 1;
    grid-row-start: 1;
  }
  .info-avatar {
    grid-column-start: 1;
    grid-row-start: 2;
  }

  .info-detail {
    width: 80%;
  }
}
</style>
