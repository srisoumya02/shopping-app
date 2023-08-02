import { ActionTypes } from "../constants/action-types"

const initialState = {
  numberCart: 0,
  Carts: [],
  productData: [],
  cartItems: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
  console.log(state)
  console.log(payload)
  

  switch (type) {
    case ActionTypes.GET_NUMBER_CART:
      return {
        ...state
      };
      case ActionTypes.ADD_TO_CART:
       
          if (state.Carts.length === 0) {
            // If the cart is empty, add the new product as a new item
            const newItem = {
              ...payload,
              quantity: 1,
            };
            console.log(newItem)
            return {
              ...state,
              Carts: [newItem],
              numberCart: state.numberCart + 1,
            };
          } else {
            // Check if the product with the same _id exists in the cart
            

            const existingItem = state.Carts.find(item =>{
              
              return (item.id === payload.id)
            } );
        
            if (existingItem) {
              // If the product exists, update its quantity using map
            
              return {
                ...state,
                Carts: state.Carts.map(item =>
                  item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                numberCart: state.numberCart + 1,
              };
            } else {
              // If the product is not in the cart, add it as a new item
            
              const newItem = {
                ...payload,
                quantity: 1,
              };
              console.log(state)
              return {
                ...state,
                Carts: [...state.Carts, newItem],
                numberCart: state.numberCart + 1,
              };
             
            }
          }
        

    case ActionTypes.FETCH_PRODUCT_DATA_SUCCESS:
      console.log(state);
 

      return {
        ...state,
        productData: [...state.Carts],
      };
     
    case ActionTypes.REMOVE_FROM_CART:
    const itemToRemove=state.Carts.find((item)=>item.id === payload);
    if(!itemToRemove){
      return state;
    }
    if(itemToRemove.quantity > '1'){
      const updatedCarts=state.Carts.map((item)=>
      item.id === payload ?{...item,quantity:item.quantity - 1}:item)
      
      return{
        ...state,
      Carts:updatedCarts,
    numberCart:state.numberCart - 1,
        };
    }else{
      const updatedCarts=state.Carts.filter((item)=>item.id !== payload);
      return {
        ...state,
        Carts: updatedCarts,
        numberCart: state.numberCart - 1,
      };
    }
  
    case ActionTypes.UPDATE_CART_ITEM_QUANTITY:
      const { productId, newQuantity } = payload;
      const updatedCartItems = state.Carts.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );

      const updatedNumberCart = updatedCartItems.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        Carts: updatedCartItems,
        numberCart: updatedNumberCart,
      };
    default:
      return state;
  }
};
