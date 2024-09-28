<script setup lang="ts">
const menuItems = ref([
  { path: "dashboard", icon: "/images/dashboard.svg" },
  {
    path: "customers",
    icon: "/images/customers.svg",
  },
  { path: "product", icon: "/images/product.svg" },
  { path: "posts", icon: "/images/post.svg" },
  { path: "source", icon: "/images/source.svg" },
  { path: "users", icon: "/images/user.svg" },
  { path: "setting", icon: "/images/setting.svg" },
]);

const route = useRoute();

const activeTab = "bg-[#393E46] text-white rounded-2xl mx-2";
const activeOrHover = (path: string) => {
  return computed(() => {
    return {
      [activeTab]: path === route.path,
      [`hover:${activeTab}`]: true,
    };
  });
};
</script>

<template>
  <!-- Sidebar -->
  <aside class="w-1/6">
    <div class="bg-[#222831] h-full rounded-sm">
      <UiLogo />
      <nav>
        <template>
          <ul>
            <li v-for="menuItem in menuItems" :key="menuItem.path">
              <NuxtLinkLocale
                :to="menuItem.path"
                class="flex justify-between items-center my-1 font-[Cambria]"
                :class="activeOrHover(menuItem.path).value"
              >
                <span class="flex flex-row gap-2 items-center p-4">
                  <NuxtImg :src="menuItem.icon" alt="icon" class="w-10 h-10" />
                  <span class="text-white text-lg font-bold">{{
                    $t(menuItem.path)
                  }}</span>
                </span>
                <span class="text-xl pr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m9 5l6 7l-6 7"
                    />
                  </svg>
                </span>
              </NuxtLinkLocale>
            </li>
          </ul>
        </template>
      </nav>
    </div>
  </aside>
</template>
