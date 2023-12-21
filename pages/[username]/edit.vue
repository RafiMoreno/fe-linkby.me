<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useProfileStore } from "~/store/profile";

const route = useRoute();
const username: string = route.params.username.toString();
const isColorEditorActive = useState<Boolean>(
  "isColorEditorActive",
  () => false,
);
const isProfileEditorActive = useState<Boolean>(
  "isProfileEditorActive",
  () => false,
);
const isImageEditorActive = useState<Boolean>(
  "isImageEditorActive ",
  () => false,
);
const isOverlayActive = useState<Boolean>("isOverlayActive", () => false);
const isAddLinkActive = useState<Boolean>("isAddLinkActive", () => false);
const isEditLinkActive = useState<Boolean>("isEditLinkActive", () => false);
const isViewClicksActive = useState<Boolean>("isViewClicksActive", () => false);

const linkEditData = ref<Link>();

const { isLoading, profile, links, pageStyle } = storeToRefs(useProfileStore());

const { fetchProfile, fetchLinks } = useProfileStore();

const handleLinkEdit = (link: Link) => {
  linkEditData.value = link;
  isEditLinkActive.value = true;
  isOverlayActive.value = true;
};

fetchProfile(username);

fetchLinks(username);

definePageMeta({
  middleware: ["auth", "profile-owner"], // this should match the name of the file inside the middleware directory
});
</script>

<template>
  <div
    v-if="isLoading"
    class="h-screen w-screen bg-dark-red grid justify-center items-center"
  >
    <LoadingSpinner size="200px" color="white" thickness="12px" />
  </div>
  <div v-else :style="pageStyle" class="relative h-full overflow-hidden">
    <div
      v-if="isOverlayActive"
      class="fixed flex bg-[#000000] h-screen w-full opacity-60 justify-center z-20"
    />
    <ColorEditor
      v-if="isColorEditorActive"
      :primary-color="profile ? profile.primaryColor : ''"
      :secondary-color="profile ? profile.secondaryColor : ''"
      :username="username"
      @close-editor="
        isColorEditorActive = !isColorEditorActive;
        isOverlayActive = !isOverlayActive;
      "
    />
    <ProfileEditor
      v-if="isProfileEditorActive"
      :username="username"
      :display-name="profile ? profile.displayName : ''"
      :description="profile ? profile.description : ''"
      @close-editor="
        isProfileEditorActive = !isProfileEditorActive;
        isOverlayActive = !isOverlayActive;
      "
    />
    <ImageEditor
      v-if="isImageEditorActive"
      :username="username"
      :current-display-picture="profile ? profile.displayPicture : ''"
      @close-editor="
        isImageEditorActive = !isImageEditorActive;
        isOverlayActive = !isOverlayActive;
      "
    />
    <LinkCreator
      v-if="isAddLinkActive"
      @close-editor="
        isAddLinkActive = false;
        isOverlayActive = false;
      "
    />
    <LinkEditor
      v-if="isEditLinkActive"
      :link="linkEditData"
      @close-editor="
        isEditLinkActive = false;
        isOverlayActive = false;
      "
    />
    <div class="flex flex-row p-2 gap-4">
      <Icon
        icon="material-symbols:palette-outline"
        color="pageStyle"
        width="32"
        @click="
          isColorEditorActive = !isColorEditorActive;
          isOverlayActive = !isOverlayActive;
        "
      />
      <Icon
        v-if="!isViewClicksActive"
        icon="carbon:view"
        color="pageStyle"
        width="32"
        @click="isViewClicksActive = true"
      />
      <Icon
        v-if="isViewClicksActive"
        icon="carbon:view-off-filled"
        color="pageStyle"
        width="32"
        @click="isViewClicksActive = false"
      />
      <div class="ml-auto">
        <Icon
          icon="ic:outline-done"
          color="pageStyle"
          width="32"
          @click="navigateTo(``)"
        />
      </div>
    </div>
    <div
      v-if="profile != null"
      class="flex flex-col pt-12 pb-6 px-[12px] max-w-[700px] items-center gap-[12px] mx-auto select-none"
    >
      <div class="text-center w-full">
        <div class="relative inline-block justify-center mb-[-20px] z-10">
          <Icon
            :style="pageStyle"
            icon="mdi:pencil"
            width="32"
            class="absolute right-[10px] top-[6px] rounded-2xl border-[2px] bg-origin-padding p-1 z-10 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75"
            @click="
              isImageEditorActive = !isImageEditorActive;
              isOverlayActive = !isOverlayActive;
            "
          />
          <NuxtImg
            v-if="
              profile.displayPicture != undefined &&
              profile.displayPicture != ''
            "
            class="object-cover w-[150px] rounded-[50%] aspect-square profileImg"
            :src="profile.displayPicture"
          />
        </div>
        <div
          :style="pageStyle"
          class="relative border-[3px] border-solid rounded-[30px] p-2"
        >
          <Icon
            :style="pageStyle"
            icon="mdi:pencil"
            width="32"
            class="absolute right-[-6px] top-[-12px] rounded-2xl border-[2px] bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75"
            @click="
              isProfileEditorActive = !isProfileEditorActive;
              isOverlayActive = !isOverlayActive;
            "
          />
          <b class="text-2xl select-text">{{ profile.displayName }}</b>
          <p class="select-text">{{ profile.description }}</p>
        </div>
      </div>
      <div class="pt-7" />
      <LinkBox
        v-for="link in links"
        :key="link.ID"
        :link="link"
        variant="edit"
        :primary-color="profile.primaryColor"
        :secondary-color="profile.secondaryColor"
        :show-click-count="isViewClicksActive"
        @click="() => handleLinkEdit(link)"
      >
        {{ link.title }}
      </LinkBox>
      <LinkBox
        variant="create"
        :primary-color="profile.primaryColor"
        :secondary-color="profile.secondaryColor"
        @click="
          isAddLinkActive = true;
          isOverlayActive = true;
        "
      >
        Add New Link
      </LinkBox>
    </div>
  </div>
</template>

<style scoped>
.profileImg {
  filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.3));
}
</style>
