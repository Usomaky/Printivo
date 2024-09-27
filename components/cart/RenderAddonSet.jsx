import React, { useState, useEffect } from "react";
import "twin.macro";

const RenderAddOnSet = ({
  addOns,
  chooseAddon,
  addOnsSelected,
  isTshirt,
  tshirtQuantity,
}) => {
  const [sizesCount, setSizesCount] = useState([tshirtQuantity]);

  useEffect(() => {
    setSizesCount([tshirtQuantity]);
  }, [tshirtQuantity]);

  const addOnkeys = Object.keys(addOns);
  const addOnvalues = Object.values(addOns);
  const tshirtSizes = isTshirt && Object.keys(addOns.Size);
  return (
    <div className="w=full h-auto">
      <div className="w-full font-bold py-3 text-blue-dark font-sans">
        <h4>Add ons</h4>
      </div>
      {addOnkeys &&
        addOnkeys.length > 0 &&
        addOnkeys.map((spec, index) => {
          const subItemValues = Object.values(addOnvalues[index]);
          const subItemKeys = Object.keys(addOnvalues[index]);
          return (
            
              <div key={spec} className="w-full pb-6 pt-4 border-b-2">
                <h5 className="mb-3 font-bold text-blue-dark">{spec}</h5>
                <div className="w-full flex flex-wrap">
                  {isTshirt && spec === "Size" ? (
                    <div className="w-full">
                      <div className="flex items-center my-2 py-3 px-4 border-l-2 border-tivo-magenta w-full h-auto">
                        <div className="px-2 mr-2 bg-grey-light text-grey-darker rounded-full">
                          Note:
                        </div>
                        <div className="py">
                          {" "}
                          You can not select the same size twice.{" "}
                        </div>
                      </div>

                      <div className="w-full py-2">
                        {addOnsSelected &&
                          addOnsSelected.Size &&
                          addOnsSelected.Size.map(
                            (selectedSize, addOnsSelectedIndex) => (
                              <div
                                key={selectedSize.name}
                                className="w-full flex py-2"
                              >
                                <div className="w-full flex">
                                  {tshirtSizes &&
                                    tshirtSizes.map((size, i) => (
                                      <div
                                        key={size}
                                        role="option"
                                        tabIndex={i}
                                        aria-selected={
                                          size === selectedSize.name
                                        }
                                        onClick={() => {
                                          chooseAddon(
                                            spec,
                                            { name: size },
                                            addOnsSelectedIndex,
                                            false
                                          );
                                        }}
                                        onKeyPress={(e) => e}
                                        className={`cursor-pointer w-10 h-10 font-semibold mx-1 flex justify-center items-center border border-grey text-sm
                                            ${
                                              size === selectedSize.name
                                                ? "border-tivo-magenta bg-red-light text-white"
                                                : "border-white text-blue-dark"
                                            }`}
                                      >
                                        {size}
                                      </div>
                                    ))}
                                </div>

                                <select
                                  name="size"
                                  id="size"
                                  className="h-10 mx-2 text-sm border-brown-light w-4/5 ml-2"
                                  tw="border[1px solid #cbcac8] font-sans text-indent[10px]"
                                  onChange={(e) => {
                                    const tempSizeCount = sizesCount;
                                    tempSizeCount[addOnsSelectedIndex] = Number(
                                      e.target.value
                                    );
                                    const totalCount = sizesCount.reduce(
                                      (a, b) => a + b
                                    );
                                    const comparison =
                                      totalCount < tshirtQuantity;
                                    const leftover =
                                      tshirtQuantity - totalCount;

                                    if (comparison) {
                                      tempSizeCount.push(leftover);
                                    }
                                    setSizesCount(tempSizeCount);
                                    chooseAddon(
                                      spec,
                                      { quantity: e.target.value },
                                      addOnsSelectedIndex,
                                      comparison,
                                      leftover
                                    );
                                  }}
                                >
                                  {[
                                    ...Array(
                                      sizesCount[addOnsSelectedIndex]
                                    ).keys(),
                                  ].map((count, i, array) => (
                                    <option
                                      key={count}
                                      selected={array.length - 1 === count}
                                      value={count + 1}
                                    >
                                      {count + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  ) : (
                    !Array.isArray(subItemValues[0]) && (
                      subItemValues &&
                      subItemValues.map((i, subItemIndex) => {
                        const subItemName = subItemKeys[subItemIndex];
                        return (
                          <div key={subItemIndex} className="w-1/3 pr-2 mb-2">
                            <button
                              type="button"
                              onClick={() => chooseAddon(spec, subItemName)}
                              className={`w-full items-center p-3 rounded font-sans font-semibold
                            ${i.image && "h-full flex flex-col"}
                            ${
                              addOnsSelected[spec] != null &&
                              addOnsSelected[spec].length > 0 &&
                              addOnsSelected[spec][0] &&
                              addOnsSelected[spec][0].name === subItemName
                                ? "bg-red-light text-white"
                                : "text-blue-dark"
                            }`}
                            >
                              {i.image && (
                                <img
                                  src={i.image}
                                  alt="Add on"
                                  className="w-full h-auto"
                                />
                              )}
                              <div className={`text-sm ${i.image && "pt-3"}`}>
                                {subItemName}
                              </div>
                            </button>
                          </div>
                        );
                      })
                    )
                  )}
                  {spec === "Shipping" ? (
                    <div className="w-full mt-2 mb-6 px-6 py-4 bg-grey-lighter text-sm">
                      <div>
                        <p>
                          <strong>Standard:</strong> 3 - 5 working days for
                          Lagos, 5 - 7 working days for other cities
                          <br />
                        </p>
                        <p className="mb-0">
                          <strong>Express:</strong> <em>Lagos only</em>. Same
                          day delivery for orders placed before 10AM, 24-hour
                          delivery for orders after 10AM.
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            
          );
        })}
    </div>
  );
};

export default RenderAddOnSet;
