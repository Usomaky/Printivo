import React, { Component } from "react";
import axios from "axios";
import Carousel from "nuka-carousel";
import numeral from "numeraljs";
import { CORE_API_BASE_URL } from "@/utils/index";
import image from "@/utils/image";
import RenderAddOnSet from "../RenderAddonSet/RenderAddonSet";
import { computeAddon } from "../RenderAddonSet/renderAddonSetUtil";
import api from "@/services/api";
import { withRouter } from "next/router";

class CustomerCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // State to hold the design progress
      step: 1,
      product: null,
      design: null,
      dataLoaded: false,
      images: [],

      price: 0,
      quantity: null,

      basePrice: 0,
      addOnsAvailable: null,
      addOnsSelected: {},

      ccData: {},

      tk: null,
      loading: false,
      save: {
        status: null,
        message: "",
      },
    };

    this.editor = null;

    this.openReview = this.openReview.bind(this);
    this.saveDesign = this.saveDesign.bind(this);
    this.chooseAddon = this.chooseAddon.bind(this);
    this.configureCC = this.configureCC.bind(this);
    this.finishDesign = this.finishDesign.bind(this);
    this.defineReviewPage = this.defineReviewPage.bind(this);
    this.changeQuoteSelected = this.changeQuoteSelected.bind(this);
  }

  componentDidMount() {
    // Before unload function.
    window.addEventListener(
      "beforeunload",
      () =>
        "Are you sure you want to leave? Changes made to this design will be lost!"
    );
    window.scrollTo(0, 0);

    // API request for the page
    // this.props.getCart()

    // return false
    axios
      .all([
        axios.get(
          `${CORE_API_BASE_URL}products/${this.props.slug}.json?include=quotes`
        ),
        axios.get(`${CORE_API_BASE_URL}designs/${this.props.design}.json`),
      ])
      .then(
        axios.spread((firstRes, secondRes) => {
          const product = firstRes.data;

          this.setState({ product, design: secondRes.data, dataLoaded: true });
          this.setState({ product, design: secondRes.data, dataLoaded: true });
          this.configureCC();
          this.defineReviewPage();
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  defineReviewPage() {
    const self = this;
    const { product } = this.state;

    window.ReviewPage = {
      open(data) {
        this.data = data;

        self.setState({ images: data, price: product.minimum_price });
      },

      close() {
        ReviewPage.imgLoadedCount = 0;
        ReviewPage.data = undefined;
        ReviewPage.currImgIndex = 0;
        self.setState({ step: 1 });
      },

      getImageUrls() {
        return ReviewPage.data.proofImageUrls;
      },
    };
  }

  configureCC() {
    // Product definition
    const { design, product } = this.state;

    let productDefinition = {};
    const psdFile1 = design && design.psd_file ? design.psd_file : null;
    const psdFile2 = design && design.psd_file_2 ? design.psd_file_2 : null;

    const config = {
      customStyle: "noPadding",
      userId: null,
      initialMode: "Advanced",
      widgets: {
        FinishButton: {
          mode: "disabled",
        },
      },
      preloader: {
        enabled: true,
        errorMessage: "The Editor failed to load.",
        firstTimeMessage: "",
      },
    };

    const iframe = document.getElementById("iframe");

    if (design !== null) {
      if (design.state === null) {
        productDefinition = design.cc_options;
      } else {
        productDefinition = design.state;
      }
    }

    if (window.innerWidth < 767) {
      iframe.style.height = `${`product`.cc_xs_height}px`;
    } else if (window.innerWidth >= 768) {
      iframe.style.height = `${product.cc_sm_height}px`;
    } else if (window.innerWidth >= 992) {
      iframe.style.height = `${product.cc_md_height}px`;
    } else if (window.innerWidth >= 1200) {
      iframe.style.height = `${product.cc_lg_height}px`;
    }
    //
    CustomersCanvas.IframeApi.loadEditor(iframe, productDefinition, config)
      .then((res) => {
        this.editor = res;
        console.log("Product Definition => ", productDefinition);
      })
      .catch((error) => {
        console.log("Product Definition => ", productDefinition);
        console.error("The editor failed to load with an exception: ", error);
      });
  }

  openReview() {
    const {
      product: {
        quotes: {
          0: { add_ons, price, quantity },
        },
      },
    } = this.state;
    const iframe = document.getElementById("iframe");

    window.removeEventListener(
      "beforeunload",
      () =>
        "Are you sure you want to leave? Changes made to this design will be lost!"
    );

    this.editor
      .finishProductDesign({ proofMaxHeight: 640, proofMaxWidth: 640 })
      .then((result) => {
        const {
          proofImageUrls,
          returnToEditUrl,
          stateId,
          userId,
          hiResOutputUrls,
        } = result;
        const addOnsSelected = {};

        const ccData = {
          pdf: hiResOutputUrls[0],
          stateId,
          userId,
          returnToEditUrl,
        };

        ReviewPage.open(proofImageUrls);
        const tempval = Object.values(add_ons);
        const tempkey = Object.keys(add_ons);

        tempval.map((item, index) => {
          const temp = tempkey[index];
          addOnsSelected[temp] = [item[0]];
        });

        this.setState({
          step: 2,
          addOnsAvailable: add_ons,
          basePrice: price,
          quantity,
          price,
          ccData,
          addOnsSelected,
        });
      })
      .catch((error) => {
        console.error(
          "Preview images could not be generated with an exception: ",
          error
        );
      });
  }

  changeQuoteSelected(e) {
    const { price, quantity, add_ons } = JSON.parse(e.target.value);
    const addOnsSelected = {};

    const tempval = Object.values(add_ons);
    const tempkey = Object.keys(add_ons);

    tempval.map((item, index) => {
      const temp = tempkey[index];
      addOnsSelected[temp] = [item[0]];
    });

    this.setState({
      addOnsSelected,
      quantity,
      price,
      basePrice: price,
      addOnsAvailable: add_ons,
    });
  }

  chooseAddon(addonKey, addonvalue, index, addNew, leftover) {
    computeAddon(
      this.state.product,
      this.state.addOnsAvailable,
      this.state.addOnsSelected,
      addonKey,
      addonvalue,
      index,
      addNew,
      leftover,
      this,
      "cc"
    );
  }

  saveDesign() {
    const { user } = this.props;
    const { ccData, images, product, design } = this.state;
    const { stateId, pdf } = ccData;

    const ccBaseUrl = process.env.NEXT_PUBLIC_CC.PREVIEW_BASE_URL;
    const tempPreviewUrl = images[0][0].split(ccBaseUrl);
    const tempPdfUrl = pdf.split(ccBaseUrl);
    const data = {
      category_name: product.name,
      product_name: design.name,
      product_id: product.id,
      member_id: user !== null ? user.id : "",
      state_file_name: stateId,
      design_id: design.id,
      pdf_file_name: tempPdfUrl[1],
      page_1_preview: tempPreviewUrl[1],
      page_2_preview:
        images.length > 1
          ? images[1][0].split(ccBaseUrl)[1]
          : images[0][1] && images[0][1].split(ccBaseUrl)[1],
    };
    let save;

    if (user == null) {
      save = {
        status: false,
        message: "You have to be signed in to save a design.",
      };
    } else {
      api
        .post("saved-items.json", data)
        .then((res) => {
          save = {
            status: true,
            message: "Your Design was saved successfully.",
          };
        })
        .catch((res) => {
          save = {
            status: false,
            message: "Sorry, some error happened. Please try again.",
          };
        })
        .finally(() => {
          this.setState({ save });
        });
    }
  }

  finishDesign() {
    this.setState({ loading: true });
    const router = this.props.router;

    const {
      quantity,
      basePrice,
      design,
      product,
      images,
      ccData,
      price,
      addOnsSelected,
    } = this.state;
    const { user, cart, orderData } = this.props;
    console.log(cart);
    const ccBaseUrl = process.env.NEXT_PUBLIC_CC.PREVIEW_BASE_URL;

    const tempPreviewUrl = images[0][0].split(ccBaseUrl);
    const tempPdfUrl = ccData.pdf.split(ccBaseUrl);
    const data = {
      items: [
        {
          product_id: product.id,
          category_id: product.id,
          design_id: design.id,
          quantity,
          price: basePrice,
          add_ons: addOnsSelected,
          state_file_name: ccData.stateId,
          pdf_file_name: tempPdfUrl[1],
          page_1_preview: tempPreviewUrl[1],
          page_2_preview:
            images.length > 1
              ? images[1][0].split(ccBaseUrl)[1]
              : images[0][1] && images[0][1].split(ccBaseUrl)[1],
          amount: price,
          name: design.name,
          order_status: "in-cart",
          add_ons_amount: 0,
          item_type: "cc",
          files: {
            "-1_-1.pdf": tempPdfUrl[1],
          },
        },
      ],
    };

    console.log(this.props);
    console.log(data);
    // return false

    if (cart) {
      data.items.order_id = cart.id;
      console.log("Cart found");

      api
        .patch(`orders/${orderData.id}.json`, data)
        .then((res) => {
          console.log("Successfully added item!", res);
          // window.fbq("track", "AddToCart");
          router.push("/cart");
        })
        .catch((err) => {
          console.log("An Error occured", err);
          this.setState({ loading: false });
        });
    } else if (!cart) {
      console.log("Cart Not found");

      api
        .post("orders.json", data)
        .then((res) => {
          console.log("Successfully created a store!", res);
          router.push("/cart");
          // window.fbq('track', 'AddToCart')
          // window.location.href = `/cart?added=${product.slug}`
        })
        .catch((err) => {
          console.log("An Error occured", err);
        });
    }
  }

  render() {
    const {
      step,
      images,
      product,
      addOnsSelected,
      basePrice,
      quantity,
      dataLoaded,
      save,
      loading,
    } = this.state;
    const swRoot = "/p3-demo/icons";
    let totalPrice = parseFloat(basePrice);

    const addOnsSelectedValuesArray = Object.values(addOnsSelected);

    addOnsSelectedValuesArray.forEach((item) => {
      totalPrice += parseFloat(item[0].price);
    });
    return (
      <section>
        <div>
          {dataLoaded ? (
            <div className="w-full mx-auto my-16">
              <div className="content-container mx-auto">
                {step === 1 && (
                  <div className="w-full">
                    <div className="w-full">
                      <iframe
                        title={step}
                        style={{ border: "none", width: "100%" }}
                        className="w-full"
                        id="iframe"
                      />
                      <button
                        type="button"
                        className="bg-red-500 w-64 py-4 text-white text-center bg-tivo-magenta float-right my-5"
                        onClick={this.openReview}
                      >
                        Proceed review →
                      </button>
                    </div>

                    <div className="w-full flex flex-col md:flex-row p-5 md:py-5 border shadow my-5">
                      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r p-5">
                        <div className="w-full text-lg px-5">
                          Product Specification
                        </div>
                        <div
                          className="p-5"
                          dangerouslySetInnerHTML={{
                            __html: product && product.details,
                          }}
                        />
                      </div>
                      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r p-5">
                        <div className="w-full text-lg px-5">
                          Delivers In...
                        </div>
                        <div className="p-5">
                          {product && product.prop_delivery}
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 p-5">
                        <div className="w-full text-lg px-5"> Starts From </div>
                        <div className="p-5">
                          &#8358;
                          {numeral(
                            product ? parseFloat(product.minimum_price) : 0
                          ).format("0,0.00")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="w-full mt-10">
                    <div className="w-full">
                      <h3>Preview</h3>
                    </div>

                    <div className="w-full flex flex-col md:flex-row py-5">
                      <div className="w-full md:w-3/5 relative flex flex-col mb-10 md:mb-0 md:pr-10">
                        <div className="w-full mb-5 h-auto flex flex-col relative md:sticky md:top-0 md:pt-5">
                          {images.length > 1 || images[0].length > 1 ? (
                            <Carousel
                              dragging
                              autoplayInterval={4000}
                              autoplay
                              slidesToShow={1}
                              slidesToScroll={1}
                              width="100%"
                              wrapAround
                              renderCenterLeftControls={({ previousSlide }) => (
                                <button
                                  type="button"
                                  className="p-3"
                                  onClick={previousSlide}
                                >
                                  <img
                                    src={image.getCloudinaryUrlFromS3Path(
                                      `${swRoot}/previous-icon.png`
                                    )}
                                    className="w-6"
                                    alt="Previous"
                                  />
                                </button>
                              )}
                              renderCenterRightControls={({ nextSlide }) => (
                                <button
                                  type="button"
                                  className="p-3"
                                  onClick={nextSlide}
                                >
                                  <img
                                    src={image.getCloudinaryUrlFromS3Path(
                                      `${swRoot}/next-icon.png`
                                    )}
                                    className="w-6"
                                    alt="Next"
                                  />
                                </button>
                              )}
                            >
                              {images.length > 1 &&
                                images.map((item) => (
                                  <img
                                    style={{ width: "500px", height: "500px" }}
                                    src={item}
                                    alt=""
                                    key={item}
                                    className="w-auto mx-auto object-contain"
                                  />
                                ))}
                              {images[0].length > 1 &&
                                images[0].map((item) => (
                                  <img
                                    style={{ width: "500px", height: "500px" }}
                                    src={item}
                                    alt=""
                                    key={item}
                                    className="w-auto mx-auto object-contain"
                                  />
                                ))}
                            </Carousel>
                          ) : (
                            <img
                              src={images[0][0]}
                              alt="Product"
                              className="h-full w-auto mx-auto"
                            />
                          )}
                          <div className="w-full flex justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                this.setState({ step: 1 }, () => {
                                  this.configureCC();
                                });
                              }}
                              className="w-64 py-3 mt-5 border border-tivo-magenta text-center
                            text-tivo-magenta hover:bg-tivo-magenta hover:text-white"
                            >
                              ← Back to Design
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-3/4 md:w-2/5 sm:px-5 flex flex-col mx-auto">
                        <div className="w-full pb-5">
                          <h4>Quantity</h4>
                        </div>

                        <div className="w-full pb-5 relative">
                          <select
                            onChange={this.changeQuoteSelected}
                            name="quantity-select"
                            id="quantity-select"
                            className="p-4 w-full border appearance-none"
                          >
                            {Object.values(product.quotes).map((item) => (
                              <option
                                key={item.id}
                                value={JSON.stringify(item)}
                              >
                                {item.quantity}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pb-5 text-grey-darker">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>

                        {product !== null && (
                          <RenderAddOnSet
                            addOns={product.add_on_set}
                            chooseAddon={this.chooseAddon}
                            addOnsSelected={addOnsSelected}
                            isTshirt={product.is_tshirt}
                            tshirtQuantity={quantity}
                          />
                        )}

                        <div className="w-full py-5">
                          <div className="text-lg">TOTAL</div>
                          <div className="text-4xl">
                            &#8358;{numeral(totalPrice).format("0,0.00")}
                          </div>
                        </div>

                        {save.status !== null && (
                          <div
                            role="button"
                            tabIndex="0"
                            className={`w-full pl-4 py-4 mb-5 border-l-2 text-grey-darker
                          cursor-pointer flex transition-2 items-baseline ${
                            save.status
                              ? "border-green bg-green-lightest"
                              : "border-red bg-red-lightest"
                          }`}
                            onClick={() =>
                              this.setState({
                                save: { status: null, message: "" },
                              })
                            }
                            onKeyPress={() =>
                              this.setState({
                                save: { status: null, message: "" },
                              })
                            }
                          >
                            {save.message}
                            <div className="text-sm pl-3">
                              (Click to dismiss)
                            </div>
                          </div>
                        )}

                        <div className="w-full flex">
                          <div className="pr-3 w-1/2">
                            <button
                              type="button"
                              className="w-full py-3 bg-white text-tivo-magenta text-center border border-tivo-magenta"
                              onClick={this.saveDesign}
                            >
                              Save Design
                            </button>
                          </div>
                          <div className="pl-3 w-1/2">
                            <button
                              type="button"
                              disabled={loading}
                              className={`bg-red-500 text-white text-center py-3 w-full ${
                                loading
                                  ? "h-16 bg-grey-light"
                                  : "bg-tivo-magenta"
                              }`}
                              onClick={this.finishDesign}
                            >
                              {loading ? (
                                <img
                                  className="h-full py-4 w-full"
                                  src={image.getCloudinaryUrlFromS3Path(
                                    "/img/tivo-loader-90px.gif"
                                  )}
                                  alt="Loading product..."
                                />
                              ) : (
                                "PROCEED"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full flex max-w-4xl mx-auto my-16">
                <img
                  src={image.getCloudinaryUrlFromS3Path(
                    "/img/tivo-loader-90px.gif"
                  )}
                  alt="Loading..."
                  className="p-5 mx-auto"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default withRouter(CustomerCanvas);
