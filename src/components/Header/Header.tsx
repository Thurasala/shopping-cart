import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { styles } from './HeaderStyles'
import { RootState } from '../../Store/Store'
import { useSelector } from 'react-redux'


function Header() {
  const cartList = useSelector((state:RootState) => state.productsList.cartList)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Products
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
            <Link to='/' style={{textDecoration: 'none'}}>
              <Typography sx={styles.home_menu} >Home</Typography>          
            </Link>
            
            <Link to='/cart'>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  color="inherit"
                >
                  <Badge badgeContent={cartList.length} color="error">
                    <ShoppingCart sx={styles.cart_icon}/>
                  </Badge>
                </IconButton>
              
              </Box>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header