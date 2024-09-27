export function computeAddon(
  product,
  addOnsAvailable,
  addOnsSelected,
  addonKey,
  addonvalue,
  index,
  addNew,
  leftover,
  action,
  location
) {
  const { add_on_set, is_tshirt } = product;
  const { Size } = addOnsSelected;
  const key = Object.keys(addonvalue)[0];
  const value = Object.values(addonvalue)[0];
  const sizesArray = add_on_set.Size && Object.keys(add_on_set.Size);
  let temp;
  let selectedAddOn = addOnsAvailable[addonKey].filter(
    (item) => item.name === addonvalue
  )[0];
  if (is_tshirt && addonKey === "Size") {
    temp = { Size: [...Size], ...addOnsSelected };
    if (
      addonvalue.name &&
      Object.values(temp.Size)
        .map((item) => item.name)
        .includes(addonvalue.name)
    ) {
    } else {
      temp.Size[index] = { ...temp.Size[index], [key]: value };
    }

    const nameFilter = temp.Size.map((item) => item.name);
    const remainderNameArray = sizesArray.filter(
      (item) => !nameFilter.includes(item)
    );

    addNew &&
      remainderNameArray.length > 0 &&
      temp.Size.push({
        name: remainderNameArray[0],
        quantity: leftover,
        price: 0,
      });
  } else {
    temp = { ...addOnsSelected, [addonKey]: [selectedAddOn] };
  }

  if (location === "cc") {
    action.setState({ addOnsSelected: temp });
  } else {
    action(temp);
  }
}
