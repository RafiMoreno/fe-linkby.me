<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useProfileStore } from "~/store/profile";
const route = useRoute();
const username: string = route.params.username.toString();
const isMyProfile = isProfileOwner(username).value;

const { loading, profile, links, error, pageStyle } =
  storeToRefs(useProfileStore());
const { fetchProfile, fetchLinks } = useProfileStore();
fetchProfile(username);
fetchLinks(username);
</script>

<template>
  <div v-if="!loading" :style="pageStyle" class="h-screen overflow-scroll">
    <div class="flex p-2 justify-end">
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
      class="flex flex-col pt-12 pb-3 px-[12px] max-w-[700px] items-center gap-[12px] mx-auto select-none"
    >
      <NuxtImg
        v-if="
          profile.displayPicture != undefined && profile.displayPicture != ''
        "
        class="object-cover w-[150px] rounded-[50%] aspect-square profileImg"
        :src="profile.displayPicture"
      />
      <b class="text-2xl select-text">{{ profile.displayName }}</b>
      <p class="select-text">{{ profile.description }}</p>
      <div class="h-[25px]" />
      <LinkBox
        v-for="link in links"
        :key="link.id"
        :url="link.url"
        :image-url="link.iconUrl"
        :primary-color="profile.primaryColor"
        :secondary-color="profile.secondaryColor"
      >
        {{ link.title }}
      </LinkBox>
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
