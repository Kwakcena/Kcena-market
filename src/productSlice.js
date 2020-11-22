import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProducts,
  fetchProduct,
  postProductFireStore,
  uploadProductImages,
  fetchloggedInUserSellProducts,
  deleteProductFireStore,
} from './services/api';

const { actions, reducer: productReducer } = createSlice({
  name: 'productSlice',
  initialState: {
    product: null,
    products: [],
    userProducts: [],
  },
  reducers: {
    setProducts(state, { payload: products }) {
      return {
        ...state,
        products,
      };
    },
    setProduct(state, { payload: product }) {
      return {
        ...state,
        product,
      };
    },
    setloggedInUserSellProducts(state, { payload: loggedInUserSellProducts }) {
      return {
        ...state,
        loggedInUserSellProducts,
      };
    },
  },
});

export const {
  setProducts,
  setProduct,
  setloggedInUserSellProducts,
  writeNewProduct,
  initialNewProduct,
} = actions;

export function loadInitProducts() {
  return async (dispatch) => {
    const products = await fetchProducts();
    dispatch(setProducts(products));
  };
}

export function loadProduct({ productId }) {
  return async (dispatch) => {
    const product = await fetchProduct(productId);
    dispatch(setProduct(product));
  };
}

export function loadLoggedInUserSellProducts({ user }) {
  return async (dispatch) => {
    const loggedInUserSellProducts = await fetchloggedInUserSellProducts({ user });
    dispatch(setloggedInUserSellProducts(loggedInUserSellProducts));
  };
}

export function postProduct({ files, newProduct }) {
  return async (_, getState) => {
    const {
      authReducer: {
        user,
      },
    } = getState();

    const productImages = await uploadProductImages({
      uid: user.uid, files,
    });

    await postProductFireStore({
      ...newProduct,
      productImages,
      user,
      createAt: Date.now(),
    });
  };
}

export function deleteProduct({ product }) {
  return async (dispatch, getState) => {
    const {
      productReducer: {
        loggedInUserSellProducts,
      },
    } = getState();

    await deleteProductFireStore({ product });
    dispatch(setloggedInUserSellProducts(
      loggedInUserSellProducts.filter(
        (myProduct) => myProduct.id !== product.id,
      ),
    ));
  };
}

export default productReducer;
