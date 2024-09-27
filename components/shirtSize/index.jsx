import React, { useState, useEffect } from "react";
import "twin.macro";
import Toastr from "toastr";

export default function ShirtSize({ specs, quantity, handleSpecsChange }) {
  const [selectedSizes, setSelectedSizes] = useState([
    { quantity: 0, sizeIndex: 0 },
  ]);
  let shirt = {};
  specs.forEach((spec) => {
    if (spec.name === "Size") {
      shirt = { ...spec };
    }
  });
  useEffect(() => {
    if (selectedSizes.length === 1) {
      const newSelectedSize = [...selectedSizes];
      newSelectedSize[0].quantity = +quantity;
      handleSpecsChange(0, shirt.name, null, +quantity, true);
      setSelectedSizes(newSelectedSize);
    } else if (selectedSizes.length > 1) {
      let localQuantity = 0;
      selectedSizes.forEach((size, i) => {
        if (i !== 0) {
          localQuantity += +size.quantity;
        }
      });

      let firstSizeQuantity = +quantity - localQuantity;
      if (firstSizeQuantity > 0) {
        const newSelectedSize = [...selectedSizes];
        newSelectedSize[0].quantity = firstSizeQuantity;
        handleSpecsChange(
          newSelectedSize[0].sizeIndex,
          shirt.name,
          null,
          firstSizeQuantity,
          true
        );
        setSelectedSizes(newSelectedSize);
      } else {
        selectedSizes.forEach((size) => {
          handleSpecsChange(-1, shirt.name, size.sizeIndex, 0, true);
        });
        handleSpecsChange(0, shirt.name, null, +quantity, true);
        setSelectedSizes([{ quantity: +quantity, sizeIndex: 0 }]);
      }
    }
  }, [quantity]);

  const handleSizeChange = (index, prevSelectedIndex, quantity) => {
    let alreadyExist = false;
    selectedSizes.forEach((size) => {
      if (size.sizeIndex === index) {
        alreadyExist = true;
      }
    });
    if (index === prevSelectedIndex) {
      return;
    } else if (alreadyExist) {
      Toastr.error("You can't select a size that already exist");
      return;
    } else {
      const indexOfPrevSelectedSize = selectedSizes.findIndex(
        (selectedSize) => selectedSize.sizeIndex === prevSelectedIndex
      );
      const newSelectedSize = [...selectedSizes];
      const newQuantity = newSelectedSize[indexOfPrevSelectedSize].quantity;
      newSelectedSize[indexOfPrevSelectedSize] = {
        quantity: newQuantity,
        sizeIndex: index,
      };
      handleSpecsChange(index, shirt.name, prevSelectedIndex, +quantity, true);
      setSelectedSizes(newSelectedSize);
    }
  };

  const getSizesNotSelectedYet = () => {
    let selectedSizesObject = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    };
    selectedSizes.forEach((size) => {
      selectedSizesObject[size.sizeIndex] = true;
    });
    let selectedIndex = null;
    for (let i = 0; i < 5; i++) {
      if (!selectedSizesObject[`${i}`]) {
        selectedIndex = i;
        return selectedIndex;
      }
    }

    return selectedIndex;
  };

  const findSelectedSizeIndex = (identifier) => {
    return selectedSizes.findIndex((size) => size.sizeIndex === identifier);
  };

  const quantityOnChangeHandler = (e, itemQuantity, index) => {
    let calculatedQuantity = 0;
    if (+e.target.value < itemQuantity) {
      if (selectedSizes.length < 5) {
        selectedSizes.forEach((size) => {
          if (size.sizeIndex === index) {
            calculatedQuantity += +e.target.value;
          } else {
            calculatedQuantity += size.quantity;
          }
        });
        let newSizeQuantity = quantity - calculatedQuantity;
        let newSizeIndex = getSizesNotSelectedYet();
        let newSizesArray = [...selectedSizes];
        let sizeIndex = findSelectedSizeIndex(index);
        newSizesArray[sizeIndex].quantity = +e.target.value;
        newSizesArray.push({
          quantity: newSizeQuantity,
          sizeIndex: newSizeIndex,
        });
        setSelectedSizes(newSizesArray);
        handleSpecsChange(
          newSizeIndex,
          shirt.name,
          null,
          newSizeQuantity,
          true
        );
        handleSpecsChange(index, shirt.name, null, +e.target.value, true);
      } else {
        let newSizesArray = [...selectedSizes];
        let sizeIndex = findSelectedSizeIndex(index);
        newSizesArray[sizeIndex].quantity = +e.target.value;
        setSelectedSizes(newSizesArray);
        handleSpecsChange(index, shirt.name, null, +e.target.value, true);
      }
    }
  };

  const SelectOptionCreator = (index, quantity) => {
    let optionArray = [];
    for (let i = 0; i < quantity; i++) {
      optionArray.push(i + 1);
    }
    return (
      <select
        value={quantity}
        className="border border-brown-light rounded ml-0 md:ml-4 p-1"
        tw="width[5rem] height[2.5rem]"
        onChange={(e) => quantityOnChangeHandler(e, quantity, index)}
      >
        {optionArray.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div className="flex flex-col">
      {selectedSizes.map((selected) => (
        <div className="flex items-center mb-6">
          {shirt.options.map((option, i) => (
            <div key={option.name} className="mr-5">
              <button
                className={`no-outline ${
                  selected.sizeIndex === i
                    ? "bg-red-light text-white"
                    : "text-blue-dark"
                }`}
                tw="width[31px] height[31px] flex items-center justify-center p-1"
                onClick={() =>
                  handleSizeChange(i, selected.sizeIndex, selected.quantity)
                }
              >
                {option.name}
              </button>
            </div>
          ))}
          {SelectOptionCreator(selected.sizeIndex, selected.quantity)}
        </div>
      ))}
    </div>
  );
}
