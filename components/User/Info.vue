<template>
  <div class="flex flex-row justify-between items-center pt-2">
    <!-- Page Title-->
    <h1 class="text-black font-bold text-3xl">
      {{ pageTitle }}
    </h1>
    <div class="flex flex-row gap-2 items-center">
      <!--Switch Language-->
      <a-select ref="select" class="w-36">
        <a-select-option value="en"
          ><p class="flex flex-row items-center gap-3">
            <NuxtImg class="w-5 h-5" src="/images/english.svg" /><span
              >English</span
            >
          </p></a-select-option
        >
        <a-select-option value="vi"
          ><p class="flex flex-row items-center gap-3">
            <NuxtImg class="w-5 h-5" src="/images/vietnam.svg" /><span
              >Vietnamese</span
            >
          </p></a-select-option
        >
      </a-select>
      <!-- Notifications-->
      <a-popover v-model:open="hide" placement="bottomRight" trigger="click">
        <template #content>
          <div class="w-56 p-2">
            <p class="font-semibold text-lg">Notifications</p>
            <span class="flex flex-row gap-3 m-1">
              <button
                @click="setActiveTab(true)"
                :class="activeTab ? activeClass : inactiveClass"
              >
                All
              </button>
              <button
                @click="setActiveTab(false)"
                :class="activeTab ? inactiveClass : activeClass"
              >
                Unread
              </button>
            </span>
          </div>
        </template>
        <a-badge :dot="true" :offset="[-6, 3]" class="mr-4">
          <a-avatar
            src="/images/bell.svg"
            size="small"
            alt="bell"
            class="text-slate-600"
          />
        </a-badge>
      </a-popover>

      <!-- User Info-->
      <div class="flex flex-col justify-items-end">
        <h5 class="font-semibold">{{ testUser.name }}</h5>
        <p>{{ testUser.role }}</p>
      </div>
      <NuxtImg src="/images/demo-avatar.png" alt="avatar" class="w-14 h-14" />
      <NuxtImg
        src="/images/arrow-down.svg"
        alt="arrow down"
        class="text-slate-600"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const pageTitle = computed(() => {
  return route.name === "index" ? "Dashboard" : useCapitalize(route.name);
});
const hide = ref<boolean>(false);
const activeTab = ref<boolean>(true);
const setActiveTab = (tab: boolean): void => {
  activeTab.value = tab;
};
const activeClass = "bg-blue-500 text-white py-1 px-2 rounded";
const inactiveClass = "bg-transparent text-black py-1 px-2 rounded";

// const { locale, setLocale } = useI18n();
// const handleChange = (value: string) => {
//   setLocale(value);
// };
const testUser = ref({
  name: "Hai Nguyen",
  role: "Admin",
});
</script>
