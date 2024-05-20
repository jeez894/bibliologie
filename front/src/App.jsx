import { useState, useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from "react-redux"
import { verifyToken } from './slices/UserSlice';
import { AdultStatusProvider } from './context/AdultStatusContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

import Home from './containers/Home'
import Register from './containers/user/Register'
import Login from './containers/user/Login'
import Logout from './containers/user/Logout'
import Profil from './containers/user/Profil'
import VolumeDetail from './containers/VolumeDetail'
import UserLibraries from './containers/UserLibraries';
import LibraryContent from './containers/LibraryContent';
import ShopHome from './containers/ShopHome';
import LatestProductsPage from './containers/LatestProductsPage';
import AllProductsPage from './containers/AllProductsPage';
import ProductDetail from './containers/ProductDetail';
import CartPage from './containers/CartPage';
import AdminDashboard from './containers/admin/AdminDashboard';
import CheckoutForm from './components/CheckoutForm';
import Header from './components/Header'
import Footer from './components/Footer'
import RequireAuth from './helpers/RequireAuth'


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);



function App({config}) {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('b4y-token');
		if (token) {
			dispatch(verifyToken(token));
		}
	}, [dispatch]);

	return (
		<>
			<CartProvider>
				<AdultStatusProvider>
					<Header />
						<main>
							<Routes>
								<Route path='/' element={<RequireAuth child={Home} auth={false} admin={false} />}/>
								<Route path='/login' element={<Login />}/>
								<Route path='/register' element={<Register />}/>
								<Route path='/logout' element={<RequireAuth child={Logout} auth={true} admin={false} />}/>
								<Route path='/profil' element={<RequireAuth child={Profil} auth={true} admin={false} />}/>
								<Route path="/admin" element={<AdminDashboard />} />
								<Route path="*" element={<Navigate to="/" />} />
								<Route path="/volume/:id" element={<VolumeDetail />} />
								<Route path="/user-libraries" element={<UserLibraries />} />
								<Route path="/library/:userId/:classId" element={<LibraryContent />} />
								<Route path="/shop/home" element={<ShopHome />} />
								<Route path="/shop/latest" element={<LatestProductsPage />} />
								<Route path="/shop/all" element={<AllProductsPage />} />
								<Route path="/product/:productID" element={<ProductDetail />} />
								<Route path="/cart" element={<CartPage />} />
								<Route path="/checkout" element={
									<Elements stripe={stripePromise}>
										<CheckoutForm />
									</Elements>
								} />
							</Routes>
						</main>
					<Footer />
					<ToastContainer autoClose={5000} hideProgressBar={false} />
				</AdultStatusProvider>
			</CartProvider>
		</>
	)
}

export default App