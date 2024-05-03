import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useRazorpay from "react-razorpay";

import React, { useState, useCallback } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { styles } from "./CartListStyles";
import {
  deleteItem,
  decrementQnty,
  incrementQnty,
  clearCart,
} from "../../Actions/ProductsSlice";

interface IState {
  showDeliveryAddress: boolean;
  fullName: string;
  streetAddress: string;
  city: string;
}

function CartList() {
  // const [deliveryAddress, setDeliveryAddress] = useState<IState['deliveryAddress']>('');
  // const [showdeliveryAddress, setShowDeliveryAddress] = useState<IState['showdeliveryAddress']>(false);
  const [deliveryAddress, setDeliveryAddress] = useState<IState>({
    fullName: "",
    streetAddress: "",
    city: "",
    showDeliveryAddress: false,
  });

  const getCartList = useSelector(
    (state: RootState) => state.productsList.cartList
  );
  const dispatch = useDispatch();

  const [Razorpay] = useRazorpay();

  const priceList = getCartList.map((eachitem) => eachitem.price);
  const quantityList = getCartList.map((eachitem) => eachitem.quntity);
  const productprice = priceList.map(
    (price, index) => price * quantityList[index]
  );
  const totalPrice = productprice.reduce((cur, prev) => cur + prev, 0);
  const handlePayment = useCallback(() => {
    if (
      !deliveryAddress.fullName ||
      !deliveryAddress.streetAddress ||
      !deliveryAddress.city
    ) {
      setDeliveryAddress((prev) => ({ ...prev, showDeliveryAddress: true }));

      return;
    }

    const options = {
      key: "rzp_test_GjdBFw1Kwrj8b7",

      amount: `${totalPrice * 100}`,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "",
      handler: (res: any) => {
        dispatch(clearCart());
        console.log(res);
      },
      prefill: {
        name: "deliveryAddress.fullName",
        email: "youremail@example.com",
        contact: "9999999999",
        address: `${deliveryAddress.streetAddress}, ${deliveryAddress.city}`,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, dispatch, totalPrice, deliveryAddress]);

  return (
    <>
      <Header />
      <Box sx={styles.cart_page}>
        <Box>
          <Box component="h2">Cart Products</Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {getCartList.length === 0 ? (
            <Box sx={styles.empty_container}>
              <Typography variant="h2">Your cart is empty</Typography>
            </Box>
          ) : (
            <Grid container component={"ul"} sx={styles.cart_list}>
              {getCartList.map((eachItem) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={eachItem.id}>
                  <Paper sx={styles.cart_card}>
                    <Box
                      component={"img"}
                      src={eachItem.thumbnail}
                      sx={styles.thumbnail_img}
                    />
                    <Box sx={styles.card_content_container}>
                      <Box component={"h3"}>{eachItem.title}</Box>
                      <Box sx={styles.price_container}>
                        <Typography sx={styles.price_value}>
                          &#8377; {eachItem.price}
                        </Typography>
                        <Box component={"span"} sx={styles.discount_value}>
                          -{eachItem.discountPercentage} %{" "}
                        </Box>
                      </Box>
                      <Box sx={styles.qnty_container}>
                        <Typography variant="h5">Qnty </Typography>
                        <Box sx={styles.qnty_buttons_container}>
                          <Box
                            component={"button"}
                            sx={styles.qnty_buttons}
                            onClick={() => {
                              if (eachItem.quntity > 1)
                                dispatch(decrementQnty(eachItem.id));
                            }}
                          >
                            -
                          </Box>
                          <Typography variant="h5">
                            {eachItem.quntity}
                          </Typography>
                          <Box
                            component={"button"}
                            sx={styles.qnty_buttons}
                            onClick={() => dispatch(incrementQnty(eachItem.id))}
                          >
                            +
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        component={"button"}
                        sx={styles.remove_button}
                        onClick={() => dispatch(deleteItem(eachItem.id))}
                      >
                        Remove Item
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Box sx={{ width: "400px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Price</Typography>
            <Typography>&#8377;{totalPrice.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>Delivery Charges</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography>
                <s>&#8377;10 </s>
              </Typography>
              <Typography ml={1} sx={{ color: "green" }}>
                Free
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography>GST (7%)</Typography>
            <Typography>&#8377;{(totalPrice * 0.07).toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography fontWeight={600}>Total Amount</Typography>
            <Typography fontWeight={600}>
              &#8377;{totalPrice.toFixed(2)}
            </Typography>
          </Box>
          {/* <Button variant='contained' color="primary" onClick={handlePayment} >Place</Button> */}

          {deliveryAddress.showDeliveryAddress && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <Typography variant="h6">Enter Delivery Address:</Typography>

              <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                fullWidth
                value={deliveryAddress.fullName}
                onChange={(event) =>
                  setDeliveryAddress((prev) => ({
                    ...prev,
                    fullName: event.target.value,
                  }))
                }
              />

              <TextField
                type="text"
                label="Street Address"
                variant="outlined"
                fullWidth
                value={deliveryAddress.streetAddress}
                onChange={(event) =>
                  setDeliveryAddress((prev) => ({
                    ...prev,
                    streetAddress: event.target.value,
                  }))
                }
              />

              <TextField
                type="text"
                label="City"
                variant="outlined"
                fullWidth
                value={deliveryAddress.city}
                onChange={(event) =>
                  setDeliveryAddress((prev) => ({
                    ...prev,
                    city: event.target.value,
                  }))
                }
              />
            </Box>
          )}
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="primary"
            onClick={handlePayment}
          >
            {deliveryAddress.showDeliveryAddress
              ? "Proceed to Payment"
              : "Place Order"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CartList;

// import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
// import useRazorpay from "react-razorpay";

// import React, { useState,useCallback } from 'react'
// import Header from '../Header/Header'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../Store/Store'
// import { styles } from './CartListStyles'
// import { deleteItem, decrementQnty, incrementQnty, clearCart } from '../../Actions/ProductsSlice'

// interface IState {
//   deliveryAddress:string;
//   showdeliveryAddress:boolean;

// }

// function CartList() {

//   const [deliveryAddress, setDeliveryAddress] = useState<IState['deliveryAddress']>('');
//   const [showdeliveryAddress, setShowDeliveryAddress] = useState<IState['showdeliveryAddress']>(false);

//     const getCartList = useSelector((state:RootState) => state.productsList.cartList)
//     const dispatch = useDispatch()

//     const [Razorpay] = useRazorpay();

//     const priceList = getCartList.map(eachitem=>eachitem.price);
//     const quantityList= getCartList.map(eachitem=>eachitem.quntity);
//     const productprice = priceList.map((price,index)=> price*quantityList[index]);
//     const totalPrice = productprice.reduce((cur,prev)=>cur+prev,0);
//     const handlePayment = useCallback(() => {
//       if(!deliveryAddress){
//         setShowDeliveryAddress(true);
//         return;
//       }

//         const options = {
//           key: "rzp_test_GjdBFw1Kwrj8b7",

//           amount: `${totalPrice*100}`,
//           currency: "INR",
//           name: "Acme Corp",
//           description: "Test Transaction",
//           image: "https://example.com/your_logo",
//           order_id: '',
//           handler: (res:any) => {
//             dispatch(clearCart());
//             console.log(res);
//           },
//           prefill: {
//             name: "Piyush Garg",
//             email: "youremail@example.com",
//             contact: "9999999999",
//             address:"deliveryAddress",
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const rzpay = new Razorpay(options);
//         rzpay.open();
//       }, [Razorpay, dispatch,totalPrice, deliveryAddress]);

//   return (
//     <>
//         <Header/>
//         <Box sx={styles.cart_page }>
//             <Box>
//               <Box component="h2">Cart Products</Box>

//              </Box>

//       <Box sx={{display:'flex' ,alignItems:'center', justifyContent:'space-between'}}>

//             {getCartList.length === 0 ?
//                 <Box sx={styles.empty_container}>
//                     <Typography variant='h2'>Your cart is empty</Typography>
//                 </Box>
//                 :
//                 <Grid container component={'ul'} sx={styles.cart_list}>
//                     {getCartList.map(eachItem =>
//                         <Grid item xs={12} sm={6} md={4} lg={3} key={eachItem.id}>

//                             <Paper sx={styles.cart_card}>
//                                 <Box component={'img'} src={eachItem.thumbnail} sx={styles.thumbnail_img}/>
//                                 <Box sx={styles.card_content_container}>
//                                     <Box component={'h3'}>{eachItem.title}</Box>
//                                     <Box sx={styles.price_container}>
//                                         <Typography sx={styles.price_value}>&#8377; {eachItem.price}</Typography>
//                                         <Box component={'span'} sx={styles.discount_value}>-{eachItem.discountPercentage} % </Box>
//                                     </Box>
//                                     <Box sx={styles.qnty_container}>
//                                         <Typography variant='h5'>Qnty </Typography>
//                                         <Box sx={styles.qnty_buttons_container}>
//                                             <Button sx={styles.qnty_buttons} onClick={() => {if(eachItem.quntity>1) dispatch(decrementQnty(eachItem.id))}}>-</Button>
//                                             <Typography variant='h5'>{eachItem.quntity}</Typography>
//                                             <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(incrementQnty(eachItem.id))}>+</Box>
//                                         </Box>
//                                     </Box>
//                                     <Box component={'button'} sx={styles.remove_button} onClick={() => dispatch(deleteItem(eachItem.id))}>Remove Item</Box>
//                                 </Box>
//                             </Paper>

//                         </Grid>
//                     )}
//                 </Grid>
//             }
//             </Box>
//                <Box sx={{width:"400px"}}>
//                 <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
//                     <Typography>Price</Typography>
//                     <Typography>&#8377;{totalPrice.toFixed(2)}</Typography>
//                   </Box>

//                   <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
//                     <Typography>Delivery Charges</Typography>
//                     <Box sx={{display:'flex'}}>
//                       <Typography><s>&#8377;10 </s></Typography>
//                       <Typography ml={1} sx={{color:'green'}}>Free</Typography>
//                     </Box>
//                   </Box>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                    <Typography>GST (7%)</Typography>
//                    <Typography>&#8377;{(totalPrice * 0.07).toFixed(2)}</Typography>
//                   </Box>
//                   <Divider sx={{my:2}}/>
//                   <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
//                     <Typography fontWeight={600}>Total Amount</Typography>
//                     <Typography fontWeight={600}>
//                     &#8377;{(totalPrice.toFixed(2))}
//                       </Typography>
//                   </Box>
//                   {/* <Button variant='contained' color="primary" onClick={handlePayment} >Place</Button> */}

//                   <Box sx={{ width: "400px" }}>

//               {showdeliveryAddress && (
//                <Box sx={{gap:1}}>
//                 <Typography variant="h6">Enter Delivery Address:</Typography>

//                 <input
//                  type="text"
//                  value={deliveryAddress}
//                  onChange={(e) => setDeliveryAddress(e.target.value)}
//                  />
//                </Box>
//               )}

//             <Button variant="contained" color="primary" onClick={handlePayment}>
//             {showdeliveryAddress ? 'Proceed to Payment' : 'Place Order'}
//            </Button>
//          </Box>
//         </Box>

//        </Box>
//     </>
//   )
// }

// export default CartList
// function usestate(): [any, any] {
//   throw new Error('Function not implemented.');
// }
