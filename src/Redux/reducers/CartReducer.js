import { ActionTypes } from "../constants/action-types"

const initialState = {
    numberCart: 0,
    Carts: [],
    productData: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_NUMBER_CART:
            return {
                ...state
            };
        case ActionTypes.ADD_TO_CART:
            //cart is empty no need to check, add product directly
            if (state.numberCart === 0) {
                let item = {
                    ...payload,
                    quantity: 1
                };
                state.Carts.push(item);
            } else {
                //cart is not empty, check if the product is already added, yes increase thby 1
                let check = false;
                state.Carts.map((item, index) => {

                    if (item._id === payload._id) {
                        state.Carts[index].quantity++;
                        check = true;
                    }
                });
                //cart is not empty and adding new product
                if (!check) {
                    let _item = {
                        ...payload,
                        quantity: 1
                    }
                    state.Carts.push(_item);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1
            }
        case ActionTypes.FETCH_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                productData: payload,
            };

        default:
            return state
    }
}
