<template>
  <Button label="Show" @click="visibleCreatePost = true" />
  <Dialog
    header="Create New Post"
    v-model:visible="visibleCreatePost"
    modal
    :pt="dialogStyle"
  >
    <div class="flex gap-3">
      <InputText
        type="text"
        label="Title"
        v-model="value"
        :pt="titleStyle"
        unstyled
      />
      <Select
        v-model="selectedLanguage"
        :options="languageOfPost"
        optionLabel="name"
        placeholder="Select language"
        :pt="selectLanguageStyle"
        pt:root="w-64 flex items-center"
        pt:label="text-sm"
      />
      <Button unstyled :pt="previewStyle">
        <span>Preview</span>
        <i class="pi pi-eye"></i>
      </Button>
      <Button unstyled :pt="buttonStyle">
        <span>Save</span>
        <i class="pi pi-save iconStyle"></i>
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
            >{{ tab.title }}</Tab
          >
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <Editor
              v-model="contentEditor"
              pt:root="h-96"
              pt:content="h-96 overflow-y-scroll"
              pt:toolbar="bg-red-100 z-10"
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
        <label for="author" class="font-bold block mb-2">Author</label>
        <Select
          id="author"
          v-model="selectedAuthor"
          :options="authorList"
          optionLabel="name"
          placeholder="Select author"
          :pt="selectAuthorStyle"
        />
        <label for="post-date" class="font-bold block mt-2 mb-2"
          >Post Date</label
        >
        <DatePicker
          id="post-date"
          v-model="date"
          showIcon
          pt:pcTodayButton="bg-red-100 text-red-100"
        />
        <label for="post-category" class="font-bold block mt-2 mb-2"
          >Category</label
        >
        <MultiSelect
          id="post-category"
          v-model="selectedCategories"
          :options="categories"
          optionLabel="name"
          filter
          display="chip"
          placeholder="Select Categories"
          :maxSelectedLabels="2"
          :pt="multiSelectStyle"
        >
        </MultiSelect>
        <label for="post-tags" class="font-bold block mt-2 mb-2">Tags</label>
        <MultiSelect
          id="post-tags"
          v-model="selectedTags"
          :options="tags"
          optionLabel="name"
          filter
          display="chip"
          placeholder="Select Categories"
          :maxSelectedLabels="3"
          :pt="multiSelectStyle"
        >
        </MultiSelect>
        <label for="post-featured-image" class="font-bold block mt-2 mb-2"
          >Featured Image</label
        >
        <Button
          label="+ Upload"
          @click="visibleFeaturedImage = true"
          id="post-featured-image"
        />
        <Dialog
          v-model:visible="visibleFeaturedImage"
          modal
          :pt="featureImageStyle"
          unstyled
        >
          <Tabs value="0" :pt="tabsStyle" class="w-full" unstyled>
            <TabList :pt="tabListStyle" unstyled>
              <Tab
                v-for="tab in featuredImageTabs"
                :key="tab.title"
                :value="tab.value"
                :pt="tabStyle"
                unstyled
                >{{ tab.title }}</Tab
              >
            </TabList>
            <TabPanels>
              <TabPanel
                value="0"
                class="h-[500px] flex justify-center items-center"
              >
                <div class="flex flex-col gap-4 justify-center items-center">
                  <Toast />
                  <p>Drop files to upload</p>
                  <p>or</p>
                  <Toast />
                  <FileUpload
                    mode="basic"
                    name="demo[]"
                    url="/api/upload"
                    accept="image/*"
                    :maxFileSize="1000000"
                    :auto="true"
                    chooseLabel="Select File"
                    @upload="onUpload"
                  />
                  <p>Maximum upload file size: 8MB</p>
                </div>
              </TabPanel>
              <TabPanel value="1" class="h-[500px]">
                <div class="w-10/12 h-full p-8 bg-red-400 overflow-y-scroll">
                  <h1>Hustlang</h1>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div class="w-full bg-white p-2 flex justify-end">
            <Button
              label="Choose image"
              @click="visibleFeaturedImage = false"
              :pt="confirmButtonStyle"
            />
          </div>
        </Dialog>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
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
const value = ref(null);
const contentTabs = ref([
  { title: "Content", value: "0" },
  { title: "Meta", value: "1" },
  { title: "SEO", value: "2" },
]);
const featuredImageTabs = ref([
  { title: "Upload files", value: "0" },
  { title: "Media Library", value: "1" },
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
const toast = useToast();

const onUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

// Styles
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
const editorStyle = ref({});
</script>

<style scoped>
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
  @apply bg-white border border-gray-200 text-gray-900 w-36;
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
  @apply text-white font-normal text-base;
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
