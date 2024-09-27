export const getActiveCategory = (categorySlug, categoryList) => {
  const currentCategory = categoryList?.data.find(
    (category) => category.slug === categorySlug
  );

  return currentCategory;
};

export const getProductPreview = (productSlug, productsList) => {
  const product = productsList?.find((product) => product.slug === productSlug);

  return product;
};
