<template>
  <div class="flex flex-row justify-between items-center pt-2">
    <!-- Page Title -->
    <h1 class="text-black font-bold text-3xl">
      {{ $t(pageTitle) }}
    </h1>
    <div class="flex flex-row gap-2 items-center">
      <!-- Switch Language -->
      <a-select
        ref="select"
        class="w-36"
        @change="(value: any ) => handleChange(value)"
        v-model:value="lang"
      >
        <!-- Hidden option for the current locale from the cookie -->
        <a-select-option
          v-if="currentLocale"
          :key="currentLocale.code"
          :value="currentLocale.code"
          style="display: none"
        >
          <p class="flex flex-row items-center gap-3">
            <NuxtImg class="w-5 h-5" :src="currentLocale.icon" />
            <span>{{ currentLocale.name }}</span>
          </p>
        </a-select-option>

        <!-- Show only available locales (excluding the current one) -->
        <a-select-option
          v-for="locale in availableLocales"
          :key="locale.code"
          :value="locale.code"
        >
          <p class="flex flex-row items-center gap-3">
            <NuxtImg class="w-5 h-5" :src="locale.icon" />
            <span>{{ locale.name }}</span>
          </p>
        </a-select-option>
      </a-select>

      <!-- Notifications -->
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

      <!-- User Info -->
      <div class="flex flex-col justify-items-end">
        <h5 class="font-semibold">{{ testUser.name }}</h5>
        <p>{{ $t(testUser.role) }}</p>
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
const pageTitle = computed(() => route.name as string);
const hide = ref<boolean>(false);
const activeTab = ref<boolean>(true);
const setActiveTab = (tab: boolean): void => {
  activeTab.value = tab;
};
const activeClass = "bg-blue-500 text-white py-1 px-2 rounded";
const inactiveClass = "bg-transparent text-black py-1 px-2 rounded";

const { locale, locales, setLocale, setLocaleCookie, getLocaleCookie } =
  useI18n();

const lang = ref(getLocaleCookie());

const currentLocale = computed(() => {
  return locales.value.find((i) => i.code === lang.value);
});

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const handleChange = (value: string) => {
  setLocale(value);
  setLocaleCookie(value);
};

const testUser = ref({
  name: "Hai Nguyen",
  role: "admin",
});
</script>
