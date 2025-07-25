import { NavLink, Outlet, Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import logo from "../../assets/logo.png";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon},
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    setIsSeller(false);
    localStorage.removeItem("isSeller"); // also remove from storage if you added persistence
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={logo} alt="" className="h-12 w-12" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Sellers</p>
          <button className="border rounded-full text-sm px-4 py-1 bg-primary hover:bg-primary-dull text-white" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                    : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-7 h-7" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="flex-1 px-4 md:px-8 py-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
