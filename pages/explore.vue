<template>
  <section class="bg-color-background">
    <div class="section-container-swiper">
      <PageHeader
        pageTitle="Explorar"
        pageDescription="Aqui você encontra ferramentas, recursos e atalhos que podem te ajudar no seu dia a dia na mídia da igreja."
      />
      <div
        class="tools-sections"
        v-for="category in toolsByCategory"
        :key="category"
      >
        <h3 class="font-bold flex justify-center px-4 mb-2 text-2xl text-color-text">
          {{ category.categoryInfo.tct_name }}
        </h3>
        <p
          class="flex justify-center px-4 mb-6 text-center font-light text-color-text-muted-75"
        >
          {{ category.categoryInfo.tct_descricao }}
        </p>

        <Swiper
          :breakpoints="{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }"
          :slidesPerView="3"
          :spaceBetween="30"
          :centered-slides="true"
          :autoplay="{
            delay: randomDelay(2000, 4500),
            disableOnInteraction: false,
          }"
          :pagination="{
            clickable: true,
          }"
          :modules="[SwiperPagination, SwiperNavigation, SwiperAutoplay]"
          class="swiper-category"
        >
          <SwiperSlide v-for="tool in category.tools" :key="tool" class="p-2 pb-4">
            <CardTool
              :title="tool.too_name"
              :description="tool.too_descricao"
              :image="tool.too_image_ref"
              :imageAlt="tool.too_name.toLowerCase() + ' image'"
              :link="tool.too_url"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>

useSeoMeta({
  title: "Explorar",
  description: "Aqui você encontra ferramentas que podem te ajudar no seu dia a dia.",
})

import { retriveAllToolsWithCategory } from "~/services/toolsServices";

const tools = await retriveAllToolsWithCategory();

const categories = tools.map((tool) => tool.too_category);

// Remove duplicate categories
const uniqueCategories = [];

categories.forEach((category) => {
  if (
    !uniqueCategories.some(
      (uniqueCategory) => uniqueCategory.tct_id === category.tct_id
    )
  ) {
    uniqueCategories.push(category);
  }
});

const toolsByCategory = uniqueCategories.map((category) => {
  const toolsPerCategory = tools.filter(
    (tool) => tool.too_category.tct_id === category.tct_id
  );
  return {
    categoryInfo: category,
    tools: toolsPerCategory,
  };
});

const randomDelay = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
</script>

<style scoped>
.tools-sections {
  padding: 0 1rem;
  margin-bottom: 4rem;
}
.swiper-category > .swiper-wrapper {
  align-items: center;
}
</style>
