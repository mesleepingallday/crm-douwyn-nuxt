<template>
  <Button label="Show" @click="visible = true" />
  <Dialog v-model:visible="visible" modal :pt="dialogStyle" unstyled>
    <div class="flex gap-3">
      <InputText
        type="text"
        label="Title"
        v-model="value"
        :pt="titleStyle"
        unstyled
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
    <div>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Header I</Tab>
          <Tab value="1">Header II</Tab>
          <Tab value="2">Header III</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </TabPanel>
          <TabPanel value="1">
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel value="2">
            <p class="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
const visible = ref(false);
const value = ref(null);

// Styles
const titleStyle = ref({
  root: "titleStyle disableOutline",
});
const buttonStyle = ref({
  root: "buttonStyle",
  icon: "iconStyle",
});
const previewStyle = ref({
  root: "previewButton buttonStyle",
});
const dialogStyle = ref({
  root: "w-10/12 bg-[#E9EFEC] p-10 rounded-md flex flex-col gap-2",
  content: "contentStyle",
});
</script>

<style scoped>
.titleStyle {
  @apply p-2 text-gray-900 rounded-lg placeholder:text-gray-500 border-2 border-gray-200 w-10/12 font-roboto font-semibold text-2xl;
}
.disableOutline {
  @apply active:outline-none focus:outline-none;
}
.buttonStyle {
  @apply bg-[#3FA2F6] rounded-lg flex gap-2 items-center justify-center text-white font-roboto font-medium text-lg px-3;
}
.iconStyle {
  @apply text-white font-normal text-base;
}
.previewButton {
  @apply bg-white border-2 border-gray-200 text-gray-900;
}
.contentStyle {
  @apply flex flex-col gap-5;
}
</style>
