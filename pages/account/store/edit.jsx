import Layout from "@/components/layout/layout";
import api from "@/services/api";
import { useRef, useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { fetcher, getInitials, slugify } from "@/utils/index";
import useSWR from "swr";
import Toastr from "toastr";
import "twin.macro";
import Loader from "@/components/states/Loader";
import { useRouter } from "next/router";
import LimitedTextArea from "@/components/form/LimitedTextArea";

const EditAccountStore = () => {
  const { user } = useUser();
  const router = useRouter();

  const [storeAvatar, setStoreAvatar] = useState(null);
  const [storeBanner, setStoreBanner] = useState(null);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState("");

  const storeId = user?.user?.store.id;

  const coverInput = useRef(null);
  const aviInput = useRef(null);

  const { data: storeData, error } = useSWR(`/stores/${storeId}.json`, fetcher);

  useEffect(() => {
    if (storeData) {
      setStoreBanner(storeData.banner);
      setStoreAvatar(storeData.logo);
      setSlug(storeData.slug);
    }
  }, [storeData]);

  const openHeaderFile = () => {
    coverInput.current.click();
  };

  const openAviFile = () => {
    aviInput.current.click();
  };

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent <= 100) {
        setUploadProgress(percent);
      }
    },
  };

  const uploadFile = async (file, type) => {
    const fileData = new FormData();
    fileData.append("file", file);
    setUploadType(type);
    setLoading(true);
    setIsUploading(true);
    try {
      const { data } = await api.post("/utils/upload.json", fileData, options);
      if (type === "avi") {
        setStoreAvatar(data.full_path);
      } else {
        setStoreBanner(data.full_path);
      }
    } catch (error) {
      const { response } = error;
      if (response) {
        Toastr.error(response.data.message);
      } else {
        Toastr.error("An error occured, please try again");
      }
    } finally {
      Toastr.success("Succesfully Uploaded");
      setLoading(false);
      setIsUploading(false);
    }
  };

  const onNameChange = (e) => {
    setSlug(slugify(e.target.value));
  };

  const onAviChange = (e) => {
    uploadFile(e.target.files[0], "avi");
  };

  const onBannerChange = (e) => {
    uploadFile(e.target.files[0], "banner");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData);

    const newStoreData = {
      ...postData,
      slug,
      banner: storeBanner,
      logo: storeAvatar,
    };

    setLoading(true);

    try {
      await api.put(`/stores/${storeId}.json`, newStoreData);
      Toastr.success("Store successfully updated");
      formRef.current.reset();
      router.push("/account/store");
    } catch (error) {
      const { response } = error;
      if (response) {
        Toastr.error(response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store c-store--owner md:pt-9 pt-11">
            <div className="flex justify-between items-center content-container mx-auto mb-10">
              <h1 className="font-dm text-blue-dark font-32 md:text-4xl">
                My Store
              </h1>
              <div>
                <button
                  form="editStore"
                  disabled={loading || isUploading}
                  className="bg-red-light font-sf px-6 py-2 rounded-sm text-white font-15 c-button__save"
                >
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
            <div className="c-store--owner__hero c-hero">
              <div className="c-hero__background c-hero__background--edit w-full">
                <div
                  className="w-full"
                  tw="bg-cover!"
                  style={{
                    background: `url(${storeBanner})`,
                    backgroundColor: storeBanner ? "" : "#383B54",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
                <div className="background-upload flex justify-center items-center w-full p-4">
                  <div className="c-inner">
                    <button
                      className="py-2 px-4 font-sf--reg text-lg"
                      onClick={openHeaderFile}
                      disabled={isUploading && uploadType === "banner"}
                    >
                      {isUploading && uploadType === "banner" ? (
                        <span>Uploading...</span>
                      ) : (
                        <span>Upload Cover image</span>
                      )}
                    </button>
                    <input
                      type="file"
                      name="coverImage"
                      id="coverImage"
                      className="hidden"
                      ref={coverInput}
                      onChange={onBannerChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div className="c-hero__info justify-between relative px-5">
                <div className="c-owner md:flex">
                  <div className="c-owner__avi c-owner__avi--edit md:mr-14 flex-shrink-0">
                    <div
                      className="avi-preview flex items-center justify-center"
                      tw="bg-cover!"
                      style={{
                        background: `url(${storeAvatar})`,
                        backgroundColor: storeAvatar ? "" : "#383B54",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                    >
                      {!storeAvatar && (
                        <h2 tw="text-6xl text-white font-sans font-bold">
                          {storeData?.name && getInitials(storeData?.name)}
                        </h2>
                      )}
                    </div>
                    <div className="avi-upload flex justify-center items-center">
                      <button
                        className="py-2 px-4 font-sf text-base"
                        onClick={openAviFile}
                        disabled={isUploading && uploadType === "avi"}
                      >
                        {isUploading && uploadType === "avi" ? (
                          <span>Uploading...</span>
                        ) : (
                          <span>Upload image</span>
                        )}
                      </button>
                      <input
                        type="file"
                        name="avi"
                        id="avi"
                        className="hidden"
                        ref={aviInput}
                        onChange={onAviChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="c-owner__name mt-10">
                    <h1 className="font-dm text-blue-dark text-3xl md:text-4xl mb-2">
                      {storeData?.name}
                    </h1>
                    <p className="text-sm font-sf--reg text-blue-dark">
                      {storeData?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="c-store--owner__form pb-56 content-container mx-auto">
              <form
                className="mx-auto py-14 px-8"
                onSubmit={submitHandler}
                id="editStore"
              >
                <div className="form-inner mx-auto">
                  <label htmlFor="name">Store Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="My Store Name"
                    defaultValue={storeData?.name}
                    onChange={(e) => onNameChange(e)}
                  />

                  <label htmlFor="slug">Your Store URL</label>

                  <div className="input-row flex">
                    <div className="base-url py-3 px-4">
                      printivo.com/store/
                    </div>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      disabled
                      required
                      placeholder="my-store-name"
                      value={slug}
                    />
                  </div>

                  <label htmlFor="description">Description</label>
                  {/* <textarea
                    className="mb-5 pt-3"
                    name="description"
                    placeholder="This is a short store description that should fit into two lines at best."
                    cols="30"
                    rows="4"
                    required
                    defaultValue={storeData?.description}
                  /> */}
                  <LimitedTextArea
                    limit={130}
                    name="description"
                    placeholder="This is a short store description that should fit into two lines at best."
                    defaultValue={storeData?.description}
                    required={true}
                    classNamez="mb-5 pt-3"
                    cols="30"
                    rows="4"
                    value={storeData?.description}
                  />

                  <button
                    type="submit"
                    disabled={loading || isUploading}
                    className="flex ml-auto bg-red-light font-sf px-6 py-3 rounded-sm text-white"
                  >
                    <span>Save Store Details</span>
                    {loading && <Loader />}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default EditAccountStore;
