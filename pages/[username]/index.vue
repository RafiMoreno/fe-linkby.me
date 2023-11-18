<script setup lang="ts">
    import { Icon } from '@iconify/vue'
    import { useProfileStore } from '~/store/profile';
    const route = useRoute();
    var username: string | string[] = route.params.username;

    // const { data, pending, error, refresh } = await useFetch<ProfileResponse>(`http://127.0.0.1:8080/api/v1/profile/${username}`)
    const { loading, profile, error, linkBoxStyle, pageStyle } = storeToRefs(useProfileStore());
    const { fetchProfile } = useProfileStore();
    fetchProfile(`${username}`);
    console.log(`localhost:8080/api/v1/profile/${username}`)

    
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
                :style="linkBoxStyle" 
                v-for="link in profile.links" 
                v-bind:key="link.id" 
                :url="link.url" 
                :image-url="link.imageUrl"
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

<style scoped>
.profileImg{
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.30));
}
</style>
