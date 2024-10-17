<script lang="ts"></script>

<template>
  <div class="flex flex-row h-screen">
    <SidebarMenu />
    <!-- Main tab content -->
    <div class="flex-col pb-1 w-full bg-[#fff] ml-64">
      <UserInfo />
      <slot />
    </div>
  </div>
</template>
