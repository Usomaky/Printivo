import Link from "../link";
import ProductBox from "../product/productBox";

const CategoryTab = ({ previewProducts, switchTabs }) => {
  return (
    <div className="c-products-preview content-container mx-auto pt-2 pb-8">
      {previewProducts?.length > 0 ? (
        <div className="c-preview__main mt-6">
          {previewProducts?.map((item) =>
            item.products.map((product) => (
              <ProductBox
                productName={product.name}
                src={product.thumbnail_path}
                cost={product.minimum_price.toLocaleString()}
                url={product.slug}
                per={product.minimum_quantity}
              />
            ))
          )}
        </div>
      ) : (
        <div className="py-14">
          <div>
            <img
              src="data:image/svg+xml,%3Csvg width='54' height='60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.867 1.733A2.667 2.667 0 0111 .667h32c.84 0 1.63.395 2.133 1.066l8 10.667c.347.461.534 1.023.534 1.6v37.333a8 8 0 01-8 8H8.333a8 8 0 01-8-8V14c0-.577.188-1.139.534-1.6l8-10.667zM12.333 6l-6.666 8.889v36.444A2.667 2.667 0 008.333 54h37.334a2.667 2.667 0 002.666-2.667V14.89L41.667 6H12.333z' fill='%23B0B8C2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M.333 14A2.667 2.667 0 013 11.333h48a2.667 2.667 0 110 5.334H3A2.667 2.667 0 01.333 14zM16.333 22A2.667 2.667 0 0119 24.667a8 8 0 0016 0 2.667 2.667 0 015.333 0 13.333 13.333 0 01-26.666 0A2.667 2.667 0 0116.333 22z' fill='%23B0B8C2'/%3E%3C/svg%3E"
              alt="shopping bag"
              className="mx-auto"
            />
          </div>
          <h1 className="text-blue-dark font-dm font-32 leading-9 text-center max-w-xl mx-auto mt-8">
            Hey, turns out we could not find the product you are looking
            for. 🤧
          </h1>
          <p className="font-sf--bold text-blue-dark text-lg text-center md:mt-10 mt-5">
            Try checking{" "}
            <span
              onClick={() => switchTabs("product")}
              className="text-red-light underline cursor-pointer"
            >
              Product Results
            </span>{" "}
            or Call a customer rep on 07032749223
          </p>

          <Link to="/">
            <button className="bg-red-light text-white font-sf rounded-sm mt-10 mx-auto block py-3 px-6">
              Return to Homepage
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryTab;
