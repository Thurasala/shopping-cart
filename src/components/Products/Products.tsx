import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../Store/Store';
import { Box, CircularProgress, Grid, Pagination, Paper, Rating, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { styles } from './ProductsStyles';
import { AppDispatch } from '../../Store/Store';
import Header from '../Header/Header';
import { fetchProducts, addToCart, incrementQnty, decrementQnty } from '../../Actions/ProductsSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();

function Products() {
  const getProductsList = useSelector((state: RootState) => state.productsList.productsList);
  const getStatus = useSelector((state: RootState) => state.productsList.status);
  const cartList = useSelector((state: RootState) => state.productsList.cartList);
  const isAdded = useSelector((state: RootState) => state.productsList.isAdded);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ limit: 10, skip: 0 }));
  }, [dispatch]);

  const filteredProducts = getProductsList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderLoadingView = () => {
    return (
      <Box sx={styles.loading_failure_container}>
        <CircularProgress />
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box sx={styles.loading_failure_container}>
        <Box component={'img'} src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1685016941/Group_7522_v58x3m.png" alt="failure view" />
        <Typography> Oops! Something went wrong</Typography>
      </Box>
    );
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchProducts({ limit: 10, skip: (value - 1) * 10 }));
  };

  const renderSuccessView = () => {
    return (
      <>
      <Box sx={styles.searchBox}  
       display="flex"
       justifyContent="center"
        alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
         
          sx={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps ={{
            endAdornment : (
                <InputAdornment position="end">
                <SearchIcon/>
                </InputAdornment>
            ),
              
            
          }}
        />
        </Box>
        <Grid container component={'ul'} sx={styles.products_list}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={'auto'} m={2} key={product.id}>
              <Paper sx={styles.product_card}>
                <Box component={'img'} src={product.thumbnail} sx={styles.thumbnail_img} />
                <Box sx={styles.card_content_container}>
                  <Box component={'h3'}>{product.title}</Box>
                  <Rating name="read-only" value={product.rating} readOnly />
                  <Box sx={styles.price_container}>
                    <Typography sx={styles.price_value}>&#8377; {product.price}</Typography>
                    <Box component={'span'} sx={styles.discount_value}>-{product.discountPercentage} % </Box>
                  </Box>
                  {cartList.find((Item) => Item.id === product.id && isAdded) ? (
                    <Box sx={styles.qnty_buttons_container}>
                      <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(decrementQnty(product.id))}>
                        -
                      </Box>
                      <Typography variant="h5">{cartList.find((eachItem) => eachItem.id === product.id)?.quntity}</Typography>
                      <Box component={'button'} sx={styles.qnty_buttons} onClick={() => dispatch(incrementQnty(product.id))}>
                        +
                      </Box>
                    </Box>
                  ) : (
                    <Box component={'button'} sx={styles.add_to_cart_button} onClick={() => dispatch(addToCart(product.id))}>
                      Add to Cart
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderResultView = () => {
    switch (getStatus) {
      case 'loading':
        return renderLoadingView();
      case 'succeeded':
        return renderSuccessView();
      case 'failed':
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Box sx={styles.products_page}>
        <Box component={'h1'}>All Products</Box>
        {renderResultView()}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={10} defaultPage={1} page={page} onChange={handlePaginationChange} color="primary" />
        </Box>
      </Box>
    </>
  );
}

export default Products;




































// import React, { useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState } from '../../Store/Store';
// import { Box, CircularProgress, Grid, Pagination, Paper, Rating, Typography } from '@mui/material';
// import { styles } from './ProductsStyles';
// import {AppDispatch} from '../../Store/Store';
// import Header from '../Header/Header';
// import { fetchProducts, addToCart, incrementQnty, decrementQnty } from '../../Actions/ProductsSlice';


// export const useAppDispatch = () => useDispatch<AppDispatch>()

// function Products() {
//     const getProductsList = useSelector((state:RootState) => state.productsList.productsList)
//     const getStatus = useSelector((state:RootState) => state.productsList.status)
//     const cartList = useSelector((state:RootState) => state.productsList.cartList)
//     const isAdded = useSelector((state:RootState) => state.productsList.isAdded)
//     const dispatch = useAppDispatch()
//     const [page, setPage] = useState(1);
//     // const [searchItem,setSearchItem]=useState<string>('');
    
//     useEffect(() => {
//       dispatch(fetchProducts({limit:10, skip:0}))
//     }, [])

//     const renderLoadingView = () => {
//         return (
//             <Box sx={styles.loading_failure_container}>
//                 <CircularProgress />
//             </Box>
//         )
//     }

//     const renderFailureView = () => {
//         return (
//             <Box sx={styles.loading_failure_container}>
//                 <Box component={'img'} src='https://res.cloudinary.com/dbyzrfi0m/image/upload/v1685016941/Group_7522_v58x3m.png' alt='failure view' />
//                 <Typography> Oops! Somthing went wrong</Typography>
//             </Box>
//         )
//     }

//     const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
//         setPage(value);
//         dispatch(fetchProducts({limit:10, skip:(value-1)*10}))
//       };
//     //   const handleSearchChange =(event:React.ChangeEvent<HTMLInputElement>) => {
//     //   setSearchItem(event.target.value);
//     //   }

//     const renderSuccessView = () => {
//         return (
//             <>
//                 <Grid container component={'ul'} sx={styles.products_list}>
//                     {getProductsList && getProductsList.map(product => 
//                         <Grid item xs={12} sm={6} md={4} lg={'auto'} m={2} key={product.id}>
//                             <Paper sx={styles.product_card}>
//                                 <Box component={'img'} src={product.thumbnail} sx={styles.thumbnail_img}/>
//                                 <Box sx={styles.card_content_container}>
//                                     <Box component={'h3'}>{product.title}</Box>
//                                     <Rating name="read-only" value={product.rating} readOnly />
//                                     <Box sx={styles.price_container}>
//                                         <Typography sx={styles.price_value}>&#8377; {product.price}</Typography>
//                                         <Box component={'span'} sx={styles.discount_value}>-{product.discountPercentage} % </Box>
//                                     </Box>
//                                     {cartList.find(Item => Item.id === product.id && isAdded) ? 
//                                         <Box sx={styles.qnty_buttons_container}>
//                                             <Box component={'button'} sx={styles.qnty_buttons} onClick={()=>dispatch(decrementQnty(product.id))}>-</Box>
//                                             <Typography variant='h5'>{cartList.find(eachItem => eachItem.id === product.id)?.quntity}</Typography>                                            
//                                             <Box component={'button'} sx={styles.qnty_buttons} onClick={()=>dispatch(incrementQnty(product.id))}>+</Box>
//                                         </Box>
//                                         :
//                                         <Box component={'button'} sx={styles.add_to_cart_button} onClick={() => dispatch(addToCart(product.id))}>Add to Cart</Box>
//                                     }
//                                 </Box>
//                             </Paper>
//                         </Grid>                           
//                     )}
//                 </Grid>    
//             </>
//         )
//     }

//     const renderResultView = () => {
//         switch (getStatus) {
//             case 'loading':
//                 return renderLoadingView();
//             case 'succeeded':
//                 return renderSuccessView();
//             case 'failed':
//                 return renderFailureView();
//             default:
//                 return null;
//         }
//     }

//     return (
//         <>
//             <Header/>
//             <Box sx={styles.products_page}>
//                 <Box component={'h1'}>All Products</Box>
//                 {renderResultView()}
//                 <Box sx={{display:'flex', justifyContent:'center'}}>
//                  <Pagination count={10} defaultPage={1} page={page} onChange={handlePaginationChange} color="primary" />
//                 </Box>
//             </Box>   
//         </>
//     )
// }

// export default Products
