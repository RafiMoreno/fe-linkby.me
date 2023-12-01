<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useProfileStore } from "~/store/profile";

const route = useRoute();
var username: string | string[] = route.params.username;
var isColorEditorActive = useState<Boolean>("isColorEditorActive", () => false);
var isProfileEditorActive = useState<Boolean>("isProfileEditorActive", () => false);
var isOverlayActive = useState<Boolean>("isOverlayActive", () => false);
const { loading, profile, error, linkBoxStyle, pageStyle } = storeToRefs(
    useProfileStore()
);
const { fetchProfile } = useProfileStore();
fetchProfile(`${username}`);
console.log(`localhost:8080/api/v1/profile/${username}`);
console.log(loading.value);
const handleEditClick = function (data: Object) {
    console.log(data);
};

definePageMeta({
    middleware: ["auth", "profile-owner"], // this should match the name of the file inside the middleware directory
});
</script>

<template>
    <div v-if="!loading" :style="pageStyle" class="relative h-screen overflow-auto">
        <div v-if="isOverlayActive" class="fixed flex bg-[#000000] h-screen w-full opacity-60 justify-center z-20" />
        <ColorEditor v-if="isColorEditorActive"
            @close-editor="isColorEditorActive = !isColorEditorActive; isOverlayActive = !isOverlayActive" />
        <ProfileEditor v-if="isProfileEditorActive" @close-editor="isProfileEditorActive = !isProfileEditorActive; isOverlayActive = !isOverlayActive"/>
        <div class="flex flex-row p-2">
            <div>
                <Icon @click="isColorEditorActive = !isColorEditorActive; isOverlayActive = !isOverlayActive"
                    icon="material-symbols:palette-outline" color="pageStyle" width="32"
                    class="transition ease-in-out delay-75 hover:-translate-y-[-4px] hover:scale-125 duration-75" />
            </div>
            <div class="ml-auto">
                <Icon v-on:click="navigateTo(``)" icon="ic:outline-done" color="pageStyle" width="32"
                    class="transition ease-in-out delay-75 hover:-translate-y-[-4px] hover:scale-125 duration-75" />
            </div>
        </div>
        <div v-if="profile != null"
            class="flex flex-col pt-12 pb-3 px-[12px] max-w-[700px] items-center gap-[12px] mx-auto select-none">
            <div class="text-center w-full">
                <div class="relative inline-block justify-center mb-[-16px] z-10">
                    <Icon :style="pageStyle" icon="mdi:pencil" width="32"
                        class="absolute right-[10px] top-[6px] rounded-2xl border-[2px] bg-origin-padding p-1 z-10 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75" />
                    <NuxtImg v-if="profile.displayPicture != undefined &&
                        profile.displayPicture != ''
                        " class="object-cover w-[150px] rounded-[50%] aspect-square profileImg"
                        :src="profile.displayPicture" />
                </div>
                <div :style="pageStyle" class="relative border-[3px] border-solid rounded-[30px] p-2">
                    <Icon :style="pageStyle" icon="mdi:pencil" width="32"
                        class="absolute right-[-6px] top-[-12px] rounded-2xl border-[2px] bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75" 
                        @click = "isProfileEditorActive = !isProfileEditorActive; isOverlayActive = !isOverlayActive"/>
                    <b class="text-2xl select-text">{{ profile.displayName }}</b>
                    <p class="select-text">{{ profile.description }}</p>
                </div>
            </div>
            <div class="pt-7" />
            <LinkBox variant="edit" :style="linkBoxStyle" v-for="link in profile.links" v-bind:key="link.id" :url="link.url"
                :image-url="link.imageUrl" :handle-edit-click="() => handleEditClick(link)">
                {{ link.linkTitle }}
            </LinkBox>
            <LinkBox variant="create" :style="linkBoxStyle" class="transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-75" >
                Add New Link
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
}</style>
