<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useProfileStore } from "~/store/profile";

const snackbar = useSnackbar();
const route = useRoute();
const username: string = route.params.username.toString();
const isMyProfile = isProfileOwner(username).value;
const isBottomPopUpActive = useCookie("token").value == undefined ? ref(true) : ref(false);


const { isLoading, profile, links, error, pageStyle } =
  storeToRefs(useProfileStore());
const { fetchProfile, fetchLinks } = useProfileStore();
fetchProfile(username);
fetchLinks(username);

const copyUrl = () => {
  navigator.clipboard.writeText(window.location.href);
  snackbar.add({
    type: "success",
    text: "Successfully copied link",
    background: profile.value?.secondaryColor
  });
}
</script>

<template>
  <div
    v-if="isLoading"
    class="h-screen w-screen bg-dark-red grid justify-center items-center"
  >
    <LoadingSpinner size="200px" color="white" thickness="12px" />
  </div>
  <div v-else :style="pageStyle" class="h-full overflow-hidden">
    <div class="flex p-2 justify-end">
      <Icon
        icon="solar:link-broken"
        color="pageStyle"
        width="28"
        class="mr-auto"
        @click="copyUrl"
      />
      <Icon
        v-if="isMyProfile"
        icon="mdi:pencil-circle"
        color="pageStyle"
        width="32"
        class=""
        @click="navigateTo(`${username}/edit`)"
      />
      
    </div>
    <div
      v-if="profile != null"
      class="flex flex-col pt-12 pb-3 px-[12px] max-w-[700px] items-center mx-auto select-none"
    >
      <NuxtImg
        v-if="
          profile.displayPicture != undefined && profile.displayPicture != ''
        "
        class="object-cover w-[150px] rounded-[50%] aspect-square profileImg"
        :src="profile.displayPicture"
      />
      <b class="text-2xl select-text">{{ profile.displayName }}</b>
      <p class="select-text text-center">{{ profile.description }}</p>
      <div class="pt-14" />
      <div class="flex flex-col gap-[12px] w-full items-center">
        <LinkBox
          v-for="link in links"
          :key="link.ID"
          :link="link"
          :primary-color="profile.primaryColor"
          :secondary-color="profile.secondaryColor"
        >
          {{ link.title }}
        </LinkBox>
      </div>
      <VisitorPopUp 
      class="mt-4"
      v-if="isBottomPopUpActive"
      :primary-color="profile.secondaryColor"
      :secondary-color="profile.primaryColor"
      @closePopUp="isBottomPopUpActive = !isBottomPopUpActive"
      />
    </div>
    <div v-if="error">
      <ul>
        <li>
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.profileImg {
  filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.3));
}
</style>
