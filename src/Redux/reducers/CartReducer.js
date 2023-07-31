import { ActionTypes } from "../constants/action-types"

const initialState = {
  numberCart: 0,
  Carts: [],
  productData: [],
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
              console.log(item.id);
              console.log(payload.id);
              return (item.id === payload.id)
            } );
        
            if (existingItem) {
              // If the product exists, update its quantity using map
              console.log(state)
              return {
                ...state,
                Carts: state.Carts.map(item =>
                  item._id === payload._id ? { ...item, quantity: item.quantity + 1 } : item
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
        productData: payload,
      };
     
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        Carts: state.Carts.filter((item) => item._id !== payload),
        numberCart: state.numberCart - 1,
      };
    default:
      return state;
  }
};
