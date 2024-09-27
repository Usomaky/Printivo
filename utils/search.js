function getSearch(categoryList, value) {
  let products = null;
  let productsResult = null;
  const categoryResult = categoryList?.filter(
    (item) =>
      item.name.match(new RegExp(value, "gi")) ||
      item.products.filter((subItem) =>
        subItem.name.includes(value, "gi")
      ).length > 0 || item.products.filter((subItem) =>
      subItem.name.match(new RegExp(value, "gi"))
    ).length > 0 || item.name.includes(value, "gi")
  );
  if (categoryResult && categoryResult.length > 0) {
    products = categoryResult.map((item) => ({
      id: item.id,
      name: item.name,
      products: item.products.filter((subItem) =>
        subItem.name.includes(value, "gi") || subItem.name.match(new RegExp(value, "gi"))
      ),
    }));
    if (products && products.length > 0 && products[0].products.length > 0) {
      productsResult = products;
    }
  } else products = null;
  return { categoryResult, productsResult };
}

export default getSearch;
