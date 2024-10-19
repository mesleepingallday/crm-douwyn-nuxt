<template>
  <div
    class="flex flex-row justify-between items-center p-6 bg-white pl-20 border-b-1 border-slate-200 shadow-md"
  >
    <!-- Page Title -->
    <h1 v-if="pageTitle" class="text-black font-bold text-3xl">
      {{ $t(pageTitle) }}
    </h1>
    <div class="flex flex-row gap-2 items-center">
      <!-- Switch Language -->
      <Select
        v-model="selectedLanguage"
        :options="languages"
        optionLabel="name"
        pt:root="w-44"
        @change="handleChange"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center gap-2">
            <Icon size="1em" :name="slotProps.value.icon" />
            <div>{{ $t(slotProps.value.name) }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center gap-2">
            <Icon size="1em" :name="slotProps.option.icon" />
            <div>{{ $t(slotProps.option.name) }}</div>
          </div>
        </template>
      </Select>

      <!-- Notifications -->
      <Icon
        name="icons:bell"
        size="1.5em"
        alt="bell"
        class="text-slate-600"
        @click="toggle"
      />
      <Popover ref="notification" pt:root="top-8 bg-white rounded-md border">
        <div class="w-56">
          <p class="font-semibold text-lg">{{ $t("notification") }}</p>
          <span class="flex flex-row gap-3 m-1">
            <button
              @click="setActiveTab(true)"
              :class="activeTab ? activeClass : inactiveClass"
            >
              {{ $t("all") }}
            </button>
            <button
              @click="setActiveTab(false)"
              :class="activeTab ? inactiveClass : activeClass"
            >
              {{ $t("unread") }}
            </button>
          </span>
        </div>
      </Popover>

      <!-- User Info -->
      <div class="flex flex-col justify-items-end w-28">
        <h5 class="font-semibold">{{ testUser.name }}</h5>
        <p>{{ $t(testUser.role) }}</p>
      </div>
      <NuxtImg src="/images/demo-avatar.png" alt="avatar" class="w-14 h-14" />
      <Icon size="1em" name="ri:arrow-down-s-fill" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { locale, setLocale, setLocaleCookie } = useI18n();
const languages = ref([
  { name: "english", code: "en", icon: "icons:english" },
  { name: "vietnamese", code: "vi", icon: "icons:vietnam" },
  { name: "chinese", code: "cn", icon: "icons:china" },
]);
const selectedLanguage = ref(
  languages.value.find(
    (lang: { name: string; code: string; icon: string }) =>
      lang.code === locale.value
  )
);
const handleChange = (value: any) => {
  setLocale(value.value.code);
  setLocaleCookie(value.value.code);
  console.log(locale);
};

const pageTitle = computed(() => (route.name ? (route.name as string) : ""));

const notification = ref();
const toggle = (event: any): void => {
  notification.value.toggle(event);
};
const activeTab = ref<boolean>(true);
const setActiveTab = (tab: boolean): void => {
  activeTab.value = tab;
};
const activeClass = "bg-blue-500 text-white py-1 px-2 rounded";
const inactiveClass = "bg-transparent text-black py-1 px-2 rounded";

const testUser = ref({
  name: "Hai Nguyen",
  role: "admin",
});
</script>
