<script lang="ts"></script>

<template>
  <div class="flex flex-row h-screen">
    <SidebarMenu />
    <div class="flex-col pb-1 w-full bg-[#fff]">
      <UserInfo />
      <slot />
    </div>
  </div>
</template>
