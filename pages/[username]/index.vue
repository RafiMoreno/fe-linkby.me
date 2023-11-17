<script setup lang="ts">
    import { Icon } from '@iconify/vue'

    interface Link {
        id: string,
        url: string,
        linkTitle : string,
        clickCount: string,
        imageUrl?:string  
    }

    interface Profile {
        ID: number,
        CreatedAt?: string,
        UpdatedAt?: string,
        DeletedAt?: null,
        displayName: string,
        primaryColor: string
        secondaryColor: string
        description: string,
        displayPicture: string,
        links?: Link[]
    }

    interface ProfileResponse {
        profile: Profile,
    }

    const route = useRoute();
    var username: string | string[] = route.params.username;

    const { data, pending, error, refresh } = await useFetch<ProfileResponse>(`http://127.0.0.1:8080/api/v1/profile/${username}`)


    console.log(`localhost:8080/api/v1/profile/${username}`)
    console.log("data", data.value)
    const dummyData: Profile = reactive({
        'ID':1,
        'displayName': `Display Name ${username}`,
        'primaryColor': '#A44646',
        'secondaryColor': '#EEEEEE',
        'description': "Aenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere. Nullam lectus justo",
        'displayPicture': "https://picsum.photos/200/300",
        'links':[
            {
                id: '001', 
                url:'https://www.instagram.com',
                linkTitle :'Instagram',
                clickCount:'10',
                imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/900px-Instagram-Icon.png'
            },
            {
                id: '002', 
                url:'https://www.instagram.com',
                linkTitle :'Instagram',
                clickCount:'10',
                imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/900px-Instagram-Icon.png'
            },
            {
                id: '003', 
                url:'https://www.instagram.com',
                linkTitle :'Instagram',
                clickCount:'10',
                imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/900px-Instagram-Icon.png'
            },
            {
                id: '004', 
                url:'https://www.instagram.com',
                linkTitle :'Instagram',
                clickCount:'10',
                imageUrl:'a'
            },
            {
                id: '005', 
                url:'https://www.instagram.com',
                linkTitle :'Instagram',
                clickCount:'10',
                imageUrl:''
            },
        ]
    }) 

    if (data.value){
        data.value!.profile.links = dummyData.links
    }


    const profile = data.value?.profile


    
    const linkBoxStyle = { 'color': profile?.primaryColor ?? '#A44646', 'backgroundColor':profile?.secondaryColor ?? '#FFFFFF' }
    const pageStyle = { 'backgroundColor': profile?.primaryColor ??'#A44646', 'color':profile?.secondaryColor ?? '#FFFFFF'}
</script>


<template>
    <div :style="pageStyle" class="h-screen overflow-scroll">
        <div v-if="profile != null" class="flex flex-col pt-12 pb-3 px-[12px] max-w-[700px] items-center gap-[12px] mx-auto ">
            <NuxtImg 
                v-if="profile.displayPicture != undefined && profile.displayPicture!=''" 
                class="object-cover w-[150px] rounded-[50%] aspect-square profileImg" 
                :src="profile.displayPicture"
                />
            <b class="text-2xl">{{ profile.displayName }}</b>
            <p>{{ profile.description }}</p>
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
                {{ error.cause }}
            </li>
            <li>
                {{ error.data }}
            </li>
            <li>
                {{ error.message }}
            </li>
        </ul></div>
    </div>
</template>

<style scoped>
.profileImg{
    filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.30));
}
</style>
