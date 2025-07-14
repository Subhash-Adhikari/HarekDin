import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import WishlistButton from "../components/WishlistButton";
import AddToCart from "../components/AddToCart";

const ProductDetails = () => {
  const { products, currency } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productCopy = [...products];
      productCopy = productCopy.filter(
        (item) => product.category === item.category && item._id !== product._id
      );
      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image?.[0] || null);
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mt-12 px-4 mb-16">
      <p className="text-sm">
        <Link to="/">Home</Link> /{" "}
        <Link to="/products">Products</Link> /{" "}
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link> /{" "}
        <span className="text-primary">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border max-w-24 border-gray-300 rounded overflow-hidden cursor-pointer ${
                  thumbnail === image ? "ring-2 ring-primary" : ""
                }`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden max-w-md relative">
            <div className="absolute top-3 right-3 z-10">
              <WishlistButton productId={product._id} size="large" />
            </div>
            <img 
              src={thumbnail} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-5"
                />
              ))}
            <p className="text-base ml-2">(4.5)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 line-through">
              MRP: {currency}{product.price}
            </p>
            <p className="text-2xl font-medium">
              Price: {currency}{product.offerPrice}
            </p>
            <p className="text-gray-500 text-sm">
              (inclusive of all taxes)
            </p>
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium">About Product</p>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              {product.description.map((desc, index) => (
                <li key={index} className="mb-1">{desc}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-8">
            <div className="flex-1">
              <AddToCart product={product} size="large" />
            </div>
            <button
              className="flex-1 py-3 font-medium bg-primary text-white hover:bg-primary-dull transition rounded"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-medium mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <Link 
                key={product._id} 
                to={`/products/${product.category.toLowerCase()}/${product._id}`}
                className="border rounded-lg p-3 hover:shadow-md transition relative group"
              >
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <WishlistButton productId={product._id} />
                </div>
                <img 
                  src={product.image[0]} 
                  alt={product.name}
                  className="w-full h-40 object-contain"
                />
                <p className="font-medium mt-2">{product.name}</p>
                <p className="text-indigo-600 font-medium">
                  {currency}{product.offerPrice}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;