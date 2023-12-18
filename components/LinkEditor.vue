<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useProfileStore } from "~/store/profile";

const emit = defineEmits(["closeEditor"]);

const props = defineProps({
  link: {
    type: Object as PropType<Link>,
    default: () => ({}),
  },
});

const { editLink, deleteLink } = useProfileStore();

const { error } = storeToRefs(useProfileStore());

const route = useRoute();

const snackbar = useSnackbar();

const username: string = route.params.username.toString();

const linkInput = ref<LinkEditPayload>({
  ID: props.link.ID,
  title: props.link.title,
  url: props.link.url,
  iconUrl: props.link.iconUrl,
  iconColor: props.link.iconColor,
});

const isLoading = ref(false);

const isFormValid = computed(
  () => linkInput.value.title !== "" && linkInput.value.url !== "",
);

const handleSubmit = async () => {
  console.log("link submit payload", linkInput.value);
  if (isFormValid) {
    isLoading.value = true;
    await editLink(linkInput.value, username);
    if (error.value) {
      snackbar.add({
        type: "error",
        text: error.value.data?.error ?? "Error while editing link",
      });
    } else {
      snackbar.add({
        type: "success",
        text: "Link edited",
      });
    }
    emit("closeEditor");
  }
};

const handleDelete = async () => {
  await deleteLink(props.link.ID, username);
  if (error.value) {
    snackbar.add({
      type: "error",
      text: error.value.data?.error ?? "Error while deleting link",
    });
  } else {
    snackbar.add({
      type: "success",
      text: "Link deleted",
    });
  }
  emit("closeEditor");
};

const handleIconSelect = (icon: IconInput) => {
  linkInput.value.iconColor = icon.color;
  linkInput.value.iconUrl = icon.name;
};
</script>

<template>
  <form
    class="fixed flex flex-col z-20 px-3 py-6 bg-white text-black rounded-[30px] top-1/2 left-1/2 gap-3 translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[80%] lg:w-[60%]"
    @submit.prevent="handleSubmit"
  >
    <Icon
      icon="mingcute:close-fill"
      color="#FFFFFF"
      width="24"
      class="absolute top-[-4px] right-[-2px] border-[2px] border-[#FFFFFF] bg-[#A44646] rounded-2xl bg-origin-padding p-1 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-75"
      @click="$emit('closeEditor')"
    />
    <p class="text-center font-bold text-xl">Edit a Link</p>

    <TextInput v-model="linkInput.title" title="Title" />
    <TextInput v-model="linkInput.url" title="URL" />
    <label> Icon </label>
    <IconifySelect
      class="flex flex-row align-center gap-4 border pl-2 rounded-xl border-[#dddddd]"
      :initial-value="{ name: linkInput.iconUrl, color: linkInput.iconColor }"
      @on-icon-select="handleIconSelect"
    >
      <Icon
        v-if="linkInput.iconUrl"
        :icon="linkInput.iconUrl"
        :color="linkInput.iconColor ?? 'black'"
        class="w-[32px] h-[32px]"
      />
      <p class="flex-auto truncate">{{ linkInput.iconUrl }}</p>
      <div class="w-32">
        <Button
          type="button"
          variant="outline"
          class="font-bold min-w-min px-4"
        >
          Change Icon
        </Button>
      </div>
    </IconifySelect>
    <div type="button" class="flex flex-col-reverse sm:flex-row gap-2">
      <Button
        type="button"
        variant="outline"
        class="rounded-2xl font-bold text-xl"
        @click.prevent="handleDelete"
        >Delete
      </Button>
      <Button
        type="submit"
        class="rounded-2xl font-bold text-xl"
        :disabled="!isFormValid || isLoading"
      >
        <LoadingSpinner v-if="isLoading" size="20px" />
        Save
      </Button>
    </div>
  </form>
</template>
