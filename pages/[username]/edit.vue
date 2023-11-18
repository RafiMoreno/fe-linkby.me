<script setup lang="ts">
    import { useProfileStore } from '~/store/profile';
    const route = useRoute();
    var username: string | string[] = route.params.username;

    const { loading, profile, error, linkBoxStyle, pageStyle } = storeToRefs(useProfileStore());
    const { fetchProfile } = useProfileStore();
    fetchProfile(`${username}`);
    console.log(`localhost:8080/api/v1/profile/${username}`)
    console.log(loading.value)

    const handleEditClick = function (data: Object) {console.log(data)}

    definePageMeta({
    middleware: ['auth', 'profile-owner'] // this should match the name of the file inside the middleware directory 
})
</script>


<template>
    <div v-if="!loading" :style="pageStyle" class="h-screen overflow-scroll">
        <div v-if="profile != null" class="flex flex-col pt-12 pb-3 px-[12px] max-w-[700px] items-center gap-[12px] mx-auto  select-none">
            <NuxtImg 
                v-if="profile.displayPicture != undefined && profile.displayPicture!=''" 
                class="object-cover w-[150px] rounded-[50%] aspect-square profileImg" 
                :src="profile.displayPicture"
                />
            <b class="text-2xl select-text">{{ profile.displayName }}</b>
            <p class="select-text">{{ profile.description }}</p>
            <div class="h-[25px]"/>
            <LinkBox 
                variant="edit" 
                :style="linkBoxStyle" 
                v-for="link in profile.links" 
                v-bind:key="link.id" 
                :url="link.url" 
                :image-url="link.imageUrl"
                :handle-edit-click="() => handleEditClick(link)"
                >
                {{link.linkTitle}}
            </LinkBox>
        </div>
        <div v-if="error"><ul>
            <li>
                {{ error }}
            </li>
        </ul></div>
    </div>

</template>
