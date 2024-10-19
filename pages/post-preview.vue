<template>
  <div>
    <h1>{{ previewPostStore.title }}</h1>
    <p>Language: {{ previewPostStore.lang }}</p>
    <div v-html="previewPostStore.content"></div>
    <p>Author: {{ previewPostStore.author }}</p>
    <p>Publish Date: {{ previewPostStore.publishDate }}</p>
    <p>Categories: {{ previewPostStore.categories.join(", ") }}</p>
    <p>Tags: {{ previewPostStore.tags.join(", ") }}</p>
    <img :src="previewPostStore.featuredImage" alt="img" />
  </div>
</template>

<script lang="ts" setup>
import { useMyPreviewPostStore } from "~/stores/preview-post";

const previewPostStore = useMyPreviewPostStore();
console.log(previewPostStore);
</script>
