import React, { useEffect } from 'react';
import { Bloge, Cart, FilterSection, Footer, Header, Home, HomeSLider, HomeSlider1, Services } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return <main className="w-screen min-h-screen flex items-center justify-center flex-col bg-primary">
    <Header />
    <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
      <Home />
      <HomeSLider /> 
      <FilterSection />  
      <HomeSlider1 /> 
      <Bloge />
      <Services />
    </div>
    {isCart && <Cart />}
    <Footer />
  </main>

};

export default Main;
