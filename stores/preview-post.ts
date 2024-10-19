interface PreviewPostData {
  title: string;
  lang: string;
  content: string;
  author: string;
  publishDate: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
}

export const useMyPreviewPostStore = defineStore({
  id: "myPreviewPostStore",
  state: () => ({
    title: "",
    lang: "",
    content: "",
    author: "",
    publishDate: "",
    categories: [] as string[],
    tags: [] as string[],
    featuredImage: "",
  }),
  actions: {
    setPreviewData(data: PreviewPostData) {
      this.title = data.title;
      this.lang = data.lang;
      this.content = data.content;
      this.author = data.author;
      this.publishDate = data.publishDate;
      this.categories = data.categories;
      this.tags = data.tags;
      this.featuredImage = data.featuredImage;
    },
  },
});
