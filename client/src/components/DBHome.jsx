import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import {CChart} from "@coreui/react-chartjs"

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const Airbird = products?.filter((item) => item.product_category === "Airbird");
  const Android = products?.filter((item) => item.product_category === "Android");
  const Camera = products?.filter((item) => item.product_category === "Camera");
  const iPhone = products?.filter((item) => item.product_category === "iPhone");
  const Leptop = products?.filter((item) => item.product_category === "Leptop");
  const Watch = products?.filter((item) => item.product_category === "Watch");

  useEffect(() => {
    if(!products){
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);


  return ( <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
            <div className="gird w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="flex items-center justify-center">
              <div className="w-340 md:w-508">
              <CChart
                type="bar"
                  data={{
                    labels: [
                      "Airbird", 
                      "Android", 
                      "Camera", 
                      "iPhone", 
                      "Leptop", 
                      "Watch", 
                      ],
                    datasets: [
                      {
                        label: 'Category wise Count',
                        backgroundColor: '#3786DF',
                        data: [
                          Airbird?.length,
                          Android?.length,
                          Camera?.length,
                          iPhone?.length,
                          Leptop?.length,
                          Watch?.length,
                        ],
                      },
                    ],
                  }}
                  labels="months"
                  />
              </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                  <div className="w-275 md:w-460">
                  <CChart
                    type="doughnut"
                    data={{
                          labels: [
                            "Orders", 
                            "Delivered", 
                            "Cancelled", 
                            "Paid",
                            "Not Paid",
                          ],
                          datasets: [
                            {
                              backgroundColor: [
                                "#41B883", 
                                "#E46651", 
                                "#00D8FF", 
                                "#DD1B16",
                                "#0077FF",
                              ],
                              data: [80, 40, 10, 50, 50],
                            },
                          ],
                        }}
                      />
                  </div>
              </div>
            </div>
          </div>
  );
};

export default DBHome;
