import { defineStore } from 'pinia';

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

const dummyData = {
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
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    loading: false,
    profile: null as Profile | null,
    error: null as any,
    errorMessage: "",
    linkBoxStyle: { 'color': '#A44646', 'backgroundColor': '#FFFFFF', 'borderColor' : '#A44646' },
    pageStyle: { 'backgroundColor': '#A44646', 'color': '#FFFFFF', 'borderColor' : '#A44646'}
    

  }),
  actions: {
     fetchProfile(username: string) {
      // useFetch from nuxt 3
      this.loading = true
      const { data, pending, error } =  useFetch<ProfileResponse>(`http://127.0.0.1:8080/api/v1/profile/${username}`, {
        method: 'get'
      });
      this.loading = pending.value;
      if (data.value) {
        this.profile = data.value.profile;
        this.profile.links = dummyData.links
        this.linkBoxStyle = { 'color': data.value.profile.primaryColor, 'backgroundColor': data.value.profile.secondaryColor, 'borderColor' : data.value.profile.primaryColor }
        this.pageStyle = { 'backgroundColor': data.value.profile.primaryColor, 'color': data.value.profile.secondaryColor, 'borderColor' : data.value.profile.secondaryColor }
        console.log("color", this.pageStyle)
        
      } 
      else if (error.value) {
        console.log("error on fetchProfile",error.value?.message);
        this.error = error.value?.data;
        this.errorMessage = error.value?.message ?? "";
      }
    },
  },
});