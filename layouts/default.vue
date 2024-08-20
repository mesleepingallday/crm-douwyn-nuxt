<script lang="ts"></script>

<template>
  <div class="flex flex-row h-screen">
    <SidebarMenu />
    <!-- Main tab content -->
    <div class="flex-col ml-32 pr-2 py-1 w-full">
      <UserInfo />
      <slot />
    </div>
  </div>
</template>
