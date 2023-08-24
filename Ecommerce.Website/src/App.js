import { NotFound } from "components";
import AuthLayout from "layout/Auth Layout";
import HomeLayout from "layout/Home Layout";
import CartPage from "pages/Cart Page";
import CategoryPage from "pages/Category Page";
import CheckoutPage from "pages/Checkout Page";
import HistoryPurchasePage from "pages/History Purchase Page";
import HomePage from "pages/Home Page";
import ProductDetail from "pages/Product Detail Page";
import ProductListPage from "pages/Product List Page";
import SignIn from "pages/Sign In Page";
import SignUp from "pages/Sign Up Page";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
		  <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
		  <Route path="/category" element={<></>} />
		  <Route path="/category/:slug" element={<CategoryPage />} />
		  <Route path="/cart" element={<CartPage />} />
		  <Route path="/checkout/:orderId" element={<CheckoutPage />} />
		  <Route path="/account/purchase" element={<HistoryPurchasePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
		<Route element={<AuthLayout />}>
		  <Route path="/auth" element={<Navigate to="/auth/signin"/>} />
		  <Route path="/auth/sign-in" element={<SignIn />}/>
		  <Route path="/auth/sign-up" element={<SignUp />} />
		</Route>
      </Routes>
  );
}
export default App;
