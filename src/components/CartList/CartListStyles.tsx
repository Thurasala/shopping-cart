export const styles ={
    cart_page:{
        // display:'flex',
        // alignItems:'center',
        // justifyContent:'center',
        padding: '10px',
    },
    empty_container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cart_list:{
        display:'flex',
        flexWrap: 'wrap',
        marginTop: '20px',
        padding:'20px',
    },
    cart_card:{
        display:'flex',
        flexDirection:'column',
        marginBottom: '20px',
        maxWidth:'300px'
    },
    thumbnail_img:{
        width:'300px',
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
    qnty_container:{
        marginTop: '10px',
        display:'flex',
        justifyContent: 'space-between',
    },
    qnty_buttons_container:{
        display:'flex',
        alignItems: 'center',  
    },
    remove_button:{
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
    qnty_buttons:{
        border: 'none',
        margin:'10px',
        cursor:'pointer',
    },
    
}