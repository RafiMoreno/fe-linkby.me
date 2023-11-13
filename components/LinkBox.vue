<script setup> 
  const props = defineProps({
    variant: {
        type: String,
        validators: value =>
          ['default', 'edit', 'view', 'add',].includes(value),
      },
    url:  String,
    imageUrl:  String
  })

  const handleClick = () => {
      if (process.browser) { 
        window.open(props.url, '_blank').focus();
      } 
  }
</script>

<template>
  <div :class="[$style.baseLinkBox, variant]" v-bind="$attrs" @click="handleClick">

      <NuxtImg 
        v-if="imageUrl != undefined && imageUrl!=''" 
        class="object-contain w-[32px] h-[32px]" 
        :src="imageUrl"                 
      />
      <div v-else class="w-[32px] h-[32px]"/>

      <div class="flex-1 font-bold"> <slot/></div>

  </div>

</template>

<style module>
.baseLinkBox {
  display: flex;
  width: 100%;
  height: fit-content;
  min-height: 64;
  padding: 16px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 30px;
  box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
}

.baseLinkBox:hover{
  filter: brightness(90%);
}

</style>