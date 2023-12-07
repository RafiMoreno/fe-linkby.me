import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: (): ProfileState => ({
    loading: false,
    profile: null as Profile | null,
    error: null as ErrorResponse | null,
    links: [] as Link[],
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
    theme: {
      primaryColor: "#A44646",
      secondaryColor: "#EEEEEE",
    } as ProfileTheme,
  }),
  actions: {
    async fetchProfile(username: string) {
      // useFetch from nuxt 3
      this.loading = true;
      const { data, error } = await useFetch<ProfileResponse>(
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
        // primary color = page background, icon background
        // secondary color = text, icon
        this.theme = {
          primaryColor: data.value.profile.primaryColor,
          secondaryColor: data.value.profile.secondaryColor,
        };

        console.log("color", this.pageStyle);
      } else if (error.value) {
        this.loading = false;
        console.log("error on fetchProfile", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async fetchLinks(username: string) {
      // useFetch from nuxt 3
      this.loading = true;
      const { data, error } = await useFetch<LinkResponse>(
        `http://127.0.0.1:8080/api/v1/profile/${username}/link`,
        {
          method: "get",
        },
      );
      if (data.value) {
        this.loading = false;
        this.links = data.value.links;
      } else if (error.value) {
        this.loading = false;
        console.log("error on fetchLinks", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async addLink(payload: LinkSubmitPayload, username: string) {
      const { data, error } = await useFetch<LinkResponse>(
        `http://localhost:8080/api/v1/profile/${username}/link`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
          pick: ["links"] as never[],
          credentials: "include",
        },
      );
      if (data.value) {
        this.links = data.value.links;
      } else if (error.value) {
        console.log("error on fetchLinks", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
  },
});
