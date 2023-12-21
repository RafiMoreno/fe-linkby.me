import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: (): ProfileState => ({
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
  getters: {
    isLoading: (state) => state.profile == null,
  },
  actions: {
    async fetchProfile(username: string) {
      // useFetch from nuxt 3
      const { data, error } = await useFetch<ProfileResponse>(
        `/api/v1/profile/${username}`,
        {
          method: "get",
          baseURL: useRuntimeConfig().public.APIBaseUrl,
        },
      );
      if (data.value) {
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
      } else if (error.value) {
        console.log("error on fetchProfile", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async fetchLinks(username: string) {
      // useFetch from nuxt 3
      const { data, error } = await useFetch<LinkResponse>(
        `/api/v1/profile/${username}/link`,
        {
          method: "get",
          baseURL: useRuntimeConfig().public.APIBaseUrl,
        },
      );
      if (data.value) {
        this.links = data.value.links;
      } else if (error.value) {
        console.log("error on fetchLinks", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async editProfile(payload: ProfileEditPayload, username: string) {
      const { data, error } = await useFetch<ProfileResponse>(
        `/api/v1/profile/${username}`,
        {
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
          credentials: "include",
        },
      );
      if (data.value) {
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
        this.theme = {
          primaryColor: data.value.profile.primaryColor,
          secondaryColor: data.value.profile.secondaryColor,
        };
      }
      if (error.value) {
        this.error = error.value as ErrorResponse;
      }
    },
    async editDisplayImage(payload: FormData, username: string) {
      const { data, error } = await useFetch<ImageResponse>(
        `/api/v1/profile/${username}/upload-image`,
        {
          method: "put",
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          body: payload,
          credentials: "include",
        },
      );
      if (data.value && this.profile != null) {
        this.profile.displayPicture = data.value.displayPicture;
      }
      if (error.value) {
        this.error = error.value as ErrorResponse;
      }
    },
    async addLink(payload: LinkSubmitPayload, username: string) {
      const { data, error } = await useFetch<LinkResponse>(
        `/api/v1/profile/${username}/link`,
        {
          baseURL: useRuntimeConfig().public.APIBaseUrl,
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
        console.log("error on addLink", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async editLink(payload: LinkEditPayload, username: string) {
      const headers = useRequestHeaders(["cookie"]);
      const { data, error } = await useFetch<LinkResponse>(
        `/api/v1/profile/${username}/link/${payload.ID}`,
        {
          method: "put",
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: payload,
          pick: ["links"] as never[],
          credentials: "include",
        },
      );
      if (data.value) {
        this.links = data.value.links;
      } else if (error.value) {
        console.log("error on editLinks", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async deleteLink(linkID: string, username: string) {
      const headers = useRequestHeaders(["cookie"]);
      const { data, error } = await useFetch<LinkResponse>(
        `/api/v1/profile/${username}/link/${linkID}`,
        {
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          headers,
          method: "delete",
          pick: ["links"] as never[],
          credentials: "include",
        },
      );
      if (data.value) {
        this.links = data.value.links;
      } else if (error.value) {
        console.log("error on deleteLinks", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
    async incrementClick(linkID: string, username: string) {
      const { data, error } = await useFetch<Link>(
        `/api/v1/profile/${username}/link/${linkID}/increment-click`,
        {
          method: "put",
          baseURL: useRuntimeConfig().public.APIBaseUrl,
          credentials: "include",
        },
      );
      if (data.value) {
        const newLinks = this.links.map((link) =>
          link.ID === data.value?.ID ? data.value : link,
        );
        this.links = newLinks;
      } else if (error.value) {
        console.log("error on incrementClick", error.value?.message);
        this.error = error.value as ErrorResponse;
      }
    },
  },
});
