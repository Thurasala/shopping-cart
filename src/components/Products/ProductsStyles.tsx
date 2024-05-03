export const styles = {
    products_page:{
        padding:'15px',
    },
    products_list:{
        display:'flex',
        flexWrap: 'wrap',
        marginTop: '20px',
        padding:'20px',
    },
    product_card:{
        display:'flex',
        flexDirection:'column',
        marginBottom: '20px',
        maxWidth:'360px',
    },
    thumbnail_img:{
        width:'360px',
        height:'300px',
        borderBottom: '1px solid #c8c8c8',
    },
    card_content_container:{
        display:'flex',
        flexDirection:'column',
        padding: '18px',
    },
    price_container:{
        display:'flex',
        alignItems: 'center',
        marginTop: '10px',
    },
    price_value:{
        fontWeight:'bold',
        fontSize:'20px',
    },
    discount_value:{
        marginLeft: '10px',
        color:'green',  
    },
    add_to_cart_button:{
        backgroundColor:'transparent',
        borderRadius:'5px',
        border:'1px solid green',
        color:'green',
        fontSize:'18px',
        fontWeight:'bold',
        outline:'none',
        padding:'10px',
        marginTop: '10px',
        cursor:'pointer',
    },
    loading_failure_container:{
        height:'100vh',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qnty_container:{
        marginTop: '10px',
        display:'flex',
        justifyContent: 'space-between',
    },
    qnty_buttons_container:{
        display:'flex',
        alignItems: 'center',  
        alignSelf: 'center',
        marginTop:'20px',
    },
    qnty_buttons:{
        border: 'none',
        margin:'10px',
        backgroundColor:'green',
        color:'white',
        cursor:'pointer',
    },

    searchBox: {
        display:'flex',
        flexDirection:'center',
        alignItems:'center',
    
        marginBottom: 16,
        
      },

      searchInput: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0, 
        },
        '& .MuiOutlinedInput-notchedOutline': { 
            borderColor: 'gray',
        },
    }
}

