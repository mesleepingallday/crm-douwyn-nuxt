<template>
  <!--Posts-->
  <div class="mx-4 my-4">
    <Toolbar>
      <template #start>
        <Button
          :label="$t('createPost')"
          class="mr-2"
          @click="visibleCreatePost = true"
        />
        <Button
          outlined
          @click="handleDeletePosts"
          severity="danger"
          :disabled="!selectedPosts || !selectedPosts.length"
          ><Icon size="1.2em" name="ri:delete-bin-5-line" />{{
            $t("deletePost")
          }}</Button
        >
      </template>
      <template #end>
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          customUpload
          :chooseLabel="$t('import')"
          class="mr-2"
          auto
          :chooseButtonProps="{ severity: 'secondary' }"
        />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      v-model:selection="selectedPosts"
      :value="posts"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 justify-end">
          <IconField>
            <InputIcon>
              <Icon name="ri:search-line" />
            </InputIcon>
            <InputText :placeholder="$t('search') + '...'" />
          </IconField>
        </div>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column field="title" :header="$t('title')" class="min-w-3"></Column>
      <Column field="author" :header="$t('author')" class="min-w-4"></Column>
      <Column
        field="categories"
        :header="$t('category')"
        class="min-w-4"
      ></Column>
      <Column field="tags" :header="$t('tags')" class="min-w-4"></Column>
      <Column
        field="publishDate"
        :header="$t('publishDate')"
        sortable
        class="min-w-4"
      ></Column>
      <Column field="seo" header="SEO" class="min-w-4"></Column>
      <Column :exportable="false" class="min-w-4">
        <template #body="slotProps">
          <Button outlined rounded class="mr-2"
            ><Icon size="1em" name="ri:pencil-line"
          /></Button>
          <Button outlined rounded severity="danger"
            ><Icon size="1em" name="ri:delete-bin-line"
          /></Button>
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Create Post Dialog -->
  <Dialog
    :header="$t('createPost')"
    v-model:visible="visibleCreatePost"
    modal
    :pt="dialogStyle"
  >
    <!-- Post Title, Language, Preview, Save -->
    <div class="flex gap-3">
      <InputText
        type="text"
        label="Title"
        v-model="title"
        :placeholder="$t('titlePlaceholder')"
        :pt="titleStyle"
        unstyled
      />
      <Select
        v-model="selectedLanguage"
        :options="languageOfPost"
        optionLabel="name"
        :pt="selectLanguageStyle"
        pt:root="w-64 flex items-center"
        pt:label="text-sm"
        :placeholder="$t('languagePlaceholder')"
      />
      <Button unstyled :pt="previewStyle" @click="getData">
        <span>{{ $t("preview") }}</span>
        <Icon size="1.2em" name="ri:eye-line" />
      </Button>
      <Button
        @click="getData"
        unstyled
        class="bg-sky-500 text-white rounded-lg flex gap-2 items-center justify-center font-medium text-lg px-4 py-2 hover:bg-sky-700"
      >
        <span>{{ $t("save") }}</span>
        <Icon size="1.2em" name="ri:save-3-fill" />
      </Button>
    </div>

    <!-- Content, Meta, SEO -->
    <div class="flex flex-row gap-3 h-[500px]">
      <Tabs value="0" :pt="tabsStyle" unstyled>
        <TabList :pt="tabListStyle" unstyled>
          <Tab
            v-for="tab in contentTabs"
            :key="tab.title"
            :value="tab.value"
            :pt="tabStyle"
            unstyled
            >{{ $t(tab.title) }}</Tab
          >
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <Editor
              v-model="contentEditor"
              pt:root="h-96 w-full "
              pt:content="h-96 overflow-y-scroll"
              pt:toolbar="top-0 left-0"
              pt:tooltip="z-100"
            />
          </TabPanel>
          <TabPanel value="1">
            <h1>Hustlang</h1>
          </TabPanel>
          <TabPanel value="2">
            <h1>zzz</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div class="flex flex-col w-56">
        <label for="author" class="font-bold block mb-2">{{
          $t("author")
        }}</label>
        <Select
          id="author"
          v-model="selectedAuthor"
          :options="authorList"
          optionLabel="name"
          :pt="selectAuthorStyle"
        />
        <label for="post-date" class="font-bold block mt-2 mb-2">{{
          $t("postDate")
        }}</label>
        <DatePicker
          id="post-date"
          v-model="date"
          showIcon
          pt:pcTodayButton="bg-red-100 text-red-100"
        />
        <label for="post-category" class="font-bold block mt-2 mb-2">{{
          $t("category")
        }}</label>
        <MultiSelect
          id="post-category"
          v-model="selectedCategories"
          :options="categories"
          optionLabel="name"
          filter
          display="chip"
          :maxSelectedLabels="2"
          :pt="multiSelectStyle"
        >
        </MultiSelect>
        <label for="post-tags" class="font-bold block mt-2 mb-2">{{
          $t("tags")
        }}</label>
        <MultiSelect
          id="post-tags"
          v-model="selectedTags"
          :options="tags"
          optionLabel="name"
          filter
          display="chip"
          :maxSelectedLabels="3"
          :pt="multiSelectStyle"
        >
        </MultiSelect>
        <label for="post-featured-image" class="font-bold block mt-2 mb-2">{{
          $t("featuredImage")
        }}</label>
        <img
          class="border-dashed border-2 border-slate-800 rounded-lg mb-4"
          v-if="featuredImage.content !== ''"
          :key="featuredImage.name"
          :src="featuredImage.content"
          alt="file.name"
        />
        <Button
          :label="$t('uploadImage')"
          @click="visibleFeaturedImage = true"
          class="py-4"
          id="post-featured-image"
        />
        <Dialog
          id="upload-featured-image"
          v-model:visible="visibleFeaturedImage"
          modal
          :pt="featureImageStyle"
          unstyled
          v-on:hide="closeDialog"
        >
          <Tabs value="0" :pt="tabsStyle" class="w-full" unstyled>
            <TabList :pt="tabListStyle" unstyled>
              <Tab
                v-for="tab in featuredImageTabs"
                :key="tab.title"
                :value="tab.value"
                :pt="tabStyle"
                unstyled
                >{{ $t(tab.title) }}</Tab
              >
            </TabList>
            <TabPanels>
              <TabPanel
                value="0"
                class="h-[450px] flex justify-center items-center gap-8 rounded-md"
              >
                <div class="flex flex-col gap-4 justify-center items-center">
                  <div class="grid gap-4">
                    <a
                      class="px-4 py-2 bg-lime-400 rounded-md text-black no-underline"
                      v-for="link in fileLinks"
                      :key="link"
                      :href="`/userFiles/specificFolder/${link}`"
                      >{{ link }}</a
                    >
                  </div>
                  <Toast />
                  <p>{{ $t("dropFileToUpload") }}</p>
                  <p>{{ $t("or") }}</p>
                  <FileUpload
                    id="image-upload"
                    type="file"
                    ref="fileInput"
                    mode="basic"
                    name="images[]"
                    url="/api/upload"
                    accept="image/*"
                    :maxFileSize="1000000"
                    :auto="true"
                    :chooseLabel="$t('selectFile')"
                    @upload="onUpload"
                    @input="handleFileInput"
                  />
                  <p>{{ $t("maximumUploadFileSize") }}: 8MB</p>
                </div>
                <img
                  v-for="file in files"
                  :key="file.name"
                  :src="file.content"
                  alt="file.name"
                  class="w-96 border-dashed border-2 border-slate-800 rounded-lg"
                />
              </TabPanel>
              <TabPanel value="1" class="h-[500px]">
                <div class="w-10/12 h-full p-8 bg-red-400 overflow-y-scroll">
                  <h1>Hustlang</h1>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div class="w-full bg-white py-2 flex justify-end pr-2">
            <Button
              :label="$t('chooseImage')"
              @click="submitImage"
              :pt="confirmButtonStyle"
            />
          </div>
        </Dialog>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { useMyPreviewPostStore } from "~/stores/preview-post";
import { FilterMatchMode } from "@primevue/core/api";

interface File {
  name: string;
  content: string;
  size: string;
  type: string;
  lastModified: string;
}
const { handleFileInput, files } = useFileStorage();
const previewPostStore = useMyPreviewPostStore();
const approveUpload = ref("");
const fileInput = ref<HTMLInputElement>();
const fileLinks = ref<string[]>([]);
const featuredImage = ref<File>({
  name: "",
  content: "",
  size: "",
  type: "",
  lastModified: "",
});
const submitImage = async () => {
  const response = await $fetch("/api/files", {
    method: "POST",
    body: {
      files: files.value,
    },
  });
  if (!response) return;
  approveUpload.value = "true";
  fileLinks.value = response;
  const jsonFiles = JSON.parse(JSON.stringify(files.value));
  featuredImage.value = jsonFiles[0];
  console.log(featuredImage);
  visibleFeaturedImage.value = false;
};
const toast = useToast();

const onUpload = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Image Uploaded",
    life: 3000,
  });
};

const closeDialog = () => {
  if (!approveUpload.value) {
    files.value = [];
  }
};

const date = ref();
const contentEditor = ref("");
const selectedLanguage = ref(null);
const selectedCategories = ref();
const selectedTags = ref();
const categories = ref([
  { name: "News", slug: "/news" },
  { name: "Uncategory", slug: "/uncategory" },
  { name: "Uncategor", slug: "/uncategor" },
]);
const tags = ref([
  { name: "trending", slug: "/trending" },
  { name: "tech", slug: "/tech" },
]);
const selectedAuthor = ref(null);
const visibleCreatePost = ref(false);
const visibleFeaturedImage = ref(false);
const title = ref("");
const contentTabs = ref([
  { title: "content", value: "0" },
  { title: "Meta", value: "1" },
  { title: "SEO", value: "2" },
]);
const featuredImageTabs = ref([
  { title: "uploadFiles", value: "0" },
  { title: "mediaLibrary", value: "1" },
]);
const languageOfPost = ref([
  { name: "English" },
  { name: "Vietnamese" },
  { name: "Chinese" },
]);
const authorList = ref([
  { name: "Hai Nguyen" },
  { name: "Jane Doe" },
  { name: "Alice" },
]);

const getData = async () => {
  const data = {
    title: title.value,
    lang: selectedLanguage.value || "en",
    content: contentEditor.value,
    author: selectedAuthor.value || "",
    publishDate: date.value,
    categories: selectedCategories.value,
    tags: selectedTags.value,
    featuredImage: featuredImage.value.content,
  };

  previewPostStore.setPreviewData(data);
  await navigateTo("/post-preview", {
    open: {
      target: "_blank",
      windowFeatures: {
        width: 800,
        height: 800,
      },
    },
  });
};

const handleDeletePosts = () => {
  console.log("Delete posts");
};
const selectedPosts = ref();
const dt = ref();
const posts = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const titleStyle = ref({
  root: "titleStyle disableOutline",
});
const buttonStyle = ref({
  root: "buttonStyle",
  icon: "iconStyle",
});
const confirmButtonStyle = ref({
  root: `buttonStyle`,
  label: "text-gray-900 text-sm",
});
const previewStyle = ref({
  root: "previewButton buttonStyle",
});
const dialogStyle = ref({
  root: "w-10/12 bg-[#E9EFEC] p-10 rounded-md flex flex-col gap-2",
  content: "flex flex-col gap-5",
  header: "font-semibold text-sky-900 text-2xl",
});
const tabsStyle = ref({
  root: "bg-white w-10/12 rounded-md border border-gray-300",
});
const tabListStyle = ref({
  root: "bg-[#E9EFEC] flex gap-1",
});
const tabStyle = ref({
  root: "can-active text-gray-900 font-roboto font-medium text-lg py-3 px-5 border border-gray-200",
});
const selectLanguageStyle = ref({
  root: "previewButton",
  listContainer: "bg-white",
});
const selectAuthorStyle = ref({
  root: "previewButton buttonStyle authorStyle",
  listContainer: "bg-white",
});
const datePickerStyle = ref({
  root: "flex gap-1 w-5",
  calendarContainer:
    "h-full bg-white shadow-lg rounded-lg p-4 border border-gray-200",
  dayView: "",
  header: "flex flex-row gap-4 justify-center items-center",
  title: "flex gap-2",
});
const multiSelectStyle = ref({
  root: "flex flex-row gap-2 bg-white px-2 py-1 rounded-md",
  overlay: "bg-white rounded-md shadow-lg border border-gray-200 p-4",
  header: "flex flex-row gap-2 justify-between items-center",
});
const featureImageStyle = ref({
  root: "w-10/12 h-[700px] bg-[#CBD2A4] p-10 rounded-md flex flex-col gap-2",
});
</script>

<style lang="postcss" scoped>
* {
  --p-toolbar-border-color: white;
}
.titleStyle {
  @apply p-2 text-gray-900 rounded-lg placeholder:text-gray-500 border-2 border-gray-200 w-9/12 font-roboto font-semibold text-2xl;
}
.disableOutline {
  @apply active:outline-none focus:outline-none;
}
.buttonStyle {
  @apply bg-[#3FA2F6] rounded-lg flex gap-2 items-center justify-center text-white font-roboto font-medium text-lg px-3;
}
.previewButton {
  @apply bg-white border border-gray-200 text-gray-900 w-44 hover:bg-gray-100;
}
.authorStyle {
  @apply flex justify-between w-56 h-10;
}
.dateStyle {
  @apply bg-black w-24 flex flex-row;
}
.hourStyle {
  @apply w-2;
}
.iconStyle {
  @apply font-normal text-base;
}
.contentStyle {
  @apply flex flex-col gap-5;
}
.can-active[data-p-active="true"] {
  @apply bg-white text-blue-500 border-b-0;
}
button[id^="pv_id_"][id$="_tab_0"] {
  @apply rounded-tl-md;
}
</style>
