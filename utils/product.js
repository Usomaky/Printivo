export const formatEachSpec = (specObject) => {
  let arr = [];
  for (const key in specObject) {
    arr.push({ name: key, ...specObject[key] });
  }
  return arr;
};

export const formatSpecs = (specs, format) => {
  let arr = [];
  for (const key in specs) {
    arr.push({ name: key, options: formatEachSpec(specs[key]) });
  }
  return arr;
};

export const setActiveSpecs = (
  specs,
  optionIndex = 0,
  specName = null,
  prevSelectedIndex = null,
  quantity = 0,
  shirt
) => {
  if (!specName) {
    return specs.map((spec) => {
      return {
        ...spec,
        options: spec.options.map((option, i) => {
          if (i === optionIndex) {
            return {
              ...option,
              selected: true,
            };
          } else {
            return {
              ...option,
              selected: false,
            };
          }
        }),
      };
    });
  } else if (shirt) {
    return specs.map((spec) => {
      if (spec.name === specName) {
        return {
          ...spec,
          options: spec.options.map((option, i) => {
            if (i === optionIndex) {
              return {
                ...option,
                selected: true,
                quantity,
              };
            } else if (i === prevSelectedIndex) {
              return {
                ...option,
                selected: false,
                quantity: 0,
              };
            } else {
              return {
                ...option,
              };
            }
          }),
        };
      } else {
        return spec;
      }
    });
  } else {
    return specs.map((spec) => {
      if (spec.name === specName) {
        return {
          ...spec,
          options: spec.options.map((option, i) => {
            if (i == optionIndex) {
              return {
                ...option,
                selected: true,
              };
            } else {
              return {
                ...option,
                selected: false,
              };
            }
          }),
        };
      } else {
        return spec;
      }
    });
  }
};

export const specsToObject = (specs, tshirt) => {
  const specObject = {};
  specs.forEach((spec) => {
    const selectedSpec = spec.options
      .filter((option) => option.selected === true)
      .map((option) => {
        if (tshirt) {
          return {
            name: option.name,
            quantity: option.quantity,
          };
        } else {
          return {
            name: option.name,
          };
        }
      });
    specObject[`${spec.name}`] = selectedSpec;
  });

  return specObject;
};

// const categoriesToProducts = (categories) => {
//   let products = [];
//   categories.forEach((category) => {
//     products.push(...category.products);
//   });
//   return products;
// };

export const getProductById = (products, id) => {
  const product = products.find((product) => product.id === id);
  return product;
};
