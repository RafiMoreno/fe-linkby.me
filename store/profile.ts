import { defineStore } from "pinia";

interface Link {
  id: string;
  url: string;
  title: string;
  clickCount: string;
  iconUrl?: string;
}

interface Profile {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: null;
  displayName: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  displayPicture: string;
}

interface ProfileResponse {
  profile: Profile;
}

export const useProfileStore = defineStore("profile", {
  state: () => ({
    loading: false,
    profile: null as Profile | null,
    error: null as any,
    links: [] as Link[],
    errorMessage: "",
    linkBoxStyle: {
      color: "#A44646",
      backgroundColor: "#FFFFFF",
      borderColor: "#A44646",
    },
    pageStyle: {
      backgroundColor: "#A44646",
      color: "#FFFFFF",
      borderColor: "#A44646",
    },
  }),
  actions: {
    fetchProfile(username: string) {
      // useFetch from nuxt 3
      this.loading = true;
      const { data, error } = useFetch<ProfileResponse>(
        `http://127.0.0.1:8080/api/v1/profile/${username}`,
        {
          method: "get",
        },
      );
      if (data.value) {
        this.loading = false;
        this.profile = data.value.profile;
        this.linkBoxStyle = {
          color: data.value.profile.primaryColor,
          backgroundColor: data.value.profile.secondaryColor,
          borderColor: data.value.profile.primaryColor,
        };
        this.pageStyle = {
          backgroundColor: data.value.profile.primaryColor,
          color: data.value.profile.secondaryColor,
          borderColor: data.value.profile.secondaryColor,
        };
        console.log("color", this.pageStyle);
      } else if (error.value) {
        this.loading = false;
        console.log("error on fetchProfile", error.value?.message);
        this.error = error.value?.data;
        this.errorMessage = error.value?.message ?? "";
      }
    },
    fetchLinks(username: string) {
      // useFetch from nuxt 3
      this.loading = true;
      const { data, error } = useFetch<Link[]>(
        `http://127.0.0.1:8080/api/v1/profile/${username}/link`,
        {
          method: "get",
        },
      );
      if (data.value) {
        console.log("fetch links", data.value);
        this.loading = false;
        this.links = data.value;
      } else if (error.value) {
        this.loading = false;
        console.log("error on fetchLinks", error.value?.message);
        this.error = error.value?.data;
        this.errorMessage = error.value?.message ?? "";
      }
    },
  },
});
