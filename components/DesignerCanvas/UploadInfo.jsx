import { fetcher } from "@/utils/index";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import useSWR from "swr";
import Loader from "../states/Loader";
import Toastr from "toastr";
import api from "@/services/api";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { getCustomStyles } from "./styles";

const UploadInfo = ({ product, ccData, images }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { user } = useUser();
  const store_id = user?.user?.store.id;

  const formRef = useRef(null);

  const [tags, setTags] = useState(null);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    let result = await fetcher(`/products/${product.id}.json`);
    if (result) {
      const { tags } = result;
      let filtered = [];
      tags.forEach((index) => {
        filtered.push({
          value: index,
          label: index,
        });
      });
      setTags(filtered);
    }
  };

  const handleChange = (option) => {
    if (option.length > 3) {
      return;
    }
    setSelectedOptions(option);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submitData = Object.fromEntries(formData);

    const ccBaseUrl = process.env.NEXT_PUBLIC_CC.PREVIEW_BASE_URL;
    const tempPreviewUrl = images[0][0].split(ccBaseUrl)[1];
    // let tags = "";

    // if (selectedOptions.length) {
    //   selectedOptions.forEach((option, index) => {
    //     tags =
    //       index + 1 === selectedOptions.length
    //         ? tags.concat(`${option}`)
    //         : tags.concat(`${option},`);
    //   });
    // }

    const formattedTags =
      selectedOptions.length > 0 &&
      selectedOptions.map((option) => option.value);

    if (!selectedOptions.length) {
      Toastr.error("Please select at least one tag");
      return;
    }

    const requestBody = {
      product_id: product.id,
      name: submitData.designName,
      description: submitData.designDesc,
      tags: formattedTags,
      state: ccData.stateId,
      preview_file: tempPreviewUrl,
      supports_customization: !!submitData.customize,
      supports_straight_to_cart: !submitData.customize,
      store_id,
    };

    setIsLoading(true);

    try {
      await api.post("designers/request.json", requestBody);
      // Toastr.success('Design successfully created')
      Toastr.success(
        "Design request successfully submitted. You will be notified when it is approved between 1-5 days"
      );
      formRef.current.reset();
      setSelectedOptions([]);
      router.push("/account/store/uploads");
    } catch (error) {
      const { response } = error;
      Toastr.error(response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1 className="font-dm text-blue-dark font-32 mb-8">
        Design Information
      </h1>

      <section>
        <h3 className="text-blue-md font-sf text-lg mb-14">
          Please provide information about your template design and submit.
        </h3>

        <form
          onSubmit={submitForm}
          className="w-full py-14 px-8 upload-form mb-20"
          ref={formRef}
        >
          <div className="form-inner mx-auto">
            <label htmlFor="designName">Design Name</label>
            <input
              type="text"
              name="designName"
              required
              placeholder="Enter design name"
            />

            <div className="inline-flex relative items-center mb-2">
              <input
                type="checkbox"
                name="customize"
                id="customize"
                className="mr-2 c-checkbox c-checkbox--red"
                // value={!isAgree}
                // onChange={() => setIsAgree(!isAgree)}
              />
              <label
                htmlFor="customize"
                className="text-blue-dark font-sf--bold text-base ml-1 check-label"
              >
                Allow users customize this design.
              </label>
            </div>

            <p className="c-disclaimer font-sf--reg text-sm text-blue-md mb-8">
              Examples of products that users should not be able to customize
              include, T-shirts, Mugs, facemask etc.
            </p>

            <label htmlFor="designDesc">Design Description</label>
            <textarea
              className="mb-5 pt-3"
              name="designDesc"
              placeholder="Enter a description for your design"
              id="designDesc"
              cols="30"
              rows="6"
              required
            ></textarea>

            <label htmlFor="tags">Tags</label>
            {tags && (
              <Select
                options={tags}
                name="tags"
                id="tags"
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                styles={getCustomStyles()}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Enter a tag name"
              />
            )}
            <p className="text-blue-dark font-sf--bold text-sm mb-8">
              Select a maximum of 3 tags
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="ml-auto transition-all flex bg-red-light font-sf px-6 py-3 rounded-sm text-white"
            >
              Submit Design Request
              {isLoading && <Loader />}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UploadInfo;
