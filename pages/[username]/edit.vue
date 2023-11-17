<script setup lang="ts">
    const route = useRoute();
    var username: string | string[] = route.params.username;
    const data = reactive({
        'displayName': `Edit Page ${username}`,
        'user':{
            'username': username
        },
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
    const linkBoxStyle = { 'color': data.primaryColor, 'backgroundColor':data.secondaryColor }
    const pageStyle = { 'backgroundColor': data.primaryColor, 'color':data.secondaryColor }
    const handleEditClick = function (data: Object) {console.log(data)}

    definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})
</script>


<template>
    <div :style="pageStyle" class="h-screen overflow-scroll">
        <div class="flex flex-col pt-12 pb-3 px-[12px] max-w-[700px] items-center gap-[12px] mx-auto">
            <!-- <Icon icon="mdi:pencil" /> -->
            <NuxtImg 
                v-if="data.displayPicture != undefined && data.displayPicture!=''" 
                class="object-cover w-[150px] rounded-[50%] aspect-square" 
                :src="data.displayPicture"
                />
            <b class="text-2xl">{{ data.displayName }}</b>
            <p>{{ data.description }}</p>
            <div class="h-[25px]"/>
            <LinkBox 
                variant="edit" 
                :style="linkBoxStyle" 
                v-for="link in data.links" 
                v-bind:key="link.id" 
                :url="link.url" 
                :image-url="link.imageUrl"
                :handle-edit-click="() => handleEditClick(link)"
                >
                {{link.linkTitle}}
            </LinkBox>
        </div>
    </div>
</template>
