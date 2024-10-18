<script setup lang="ts">
const isCollapsed = ref(false);
const route = useRoute();
interface MenuItem {
  path: string;
  icon: string;
}
const menuItems = ref<MenuItem[]>([
  { path: "dashboard", icon: "icons:dashboard" },
  { path: "customers", icon: "icons:customers" },
  { path: "product", icon: "icons:product" },
  { path: "posts", icon: "icons:post" },
  { path: "source", icon: "icons:source" },
  { path: "users", icon: "icons:user" },
  { path: "setting", icon: "icons:setting" },
]);

const menuItemStyle = (menuItem: MenuItem) => {
  return {
    "relative flex items-center my-1 py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group":
      true,
    "bg-gradient-to-tr from-slate-300 to-slate-600 text-sky-800":
      route.path === "/" + menuItem.path,
    "hover:bg-slate-500 text-gray-600": route.path !== "/" + menuItem.path,
  };
};
</script>

<
<template>
  <!-- Sidebar -->
  <aside class="h-screen">
    <nav
      class="h-full flex flex-col bg-[#222831] border-r shadow-sm transition-all duration-300"
    >
      <div class="relative flex flex-col justify-between p-4 pb-2">
        <Icon
          :name="
            isCollapsed
              ? 'material-symbols:arrow-circle-right'
              : 'material-symbols:arrow-circle-left'
          "
          @click="isCollapsed = !isCollapsed"
          size="3em"
          class="absolute cursor-pointer text-sky-600 m-4 -right-12 shadow-lg"
        />
        <UiLogo
          :class="{ 'w-20': isCollapsed }"
          class="overflow-hidden transition-all"
        />
      </div>
      <ul class="flex-1 px-3">
        <li
          v-for="menuItem in menuItems"
          :key="menuItem.path"
          class="flex justify-center"
        >
          <NuxtLink :to="menuItem.path" :class="menuItemStyle(menuItem)">
            <span class="flex flex-row gap-2 items-center">
              <Icon
                :name="menuItem.icon"
                :size="isCollapsed ? '2.5em' : '2.5em'"
              />
              <span
                v-if="!isCollapsed"
                class="w-44 ml-3 text-white text-lg font-bold"
              >
                {{ $t(menuItem.path) }}
              </span>
            </span>
            <span
              v-if="isCollapsed"
              class="absolute w-28 left-full rounded-md px-2 py-1 ml-6 bg-slate-100 text-slate-800 text-base invisible opacity-20 -translate-x-3 transition-all z-50 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
            >
              {{ $t(menuItem.path) }}
            </span>
          </NuxtLink>
        </li>
      </ul>
      <div>
        <p>Dark mode</p>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
* {
  font-family: Roboto, sans-serif;
}
</style>
