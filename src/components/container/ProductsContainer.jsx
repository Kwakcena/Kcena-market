import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Products from '../presentational/Products';
import Loading from '../presentational/Loading';

import { get } from '../../utils';

import {
  loadInitProducts,
} from '../../productSlice';

export default function ProductsContainer({ onClickProduct }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitProducts());
  }, []);

  const { products, isLoading } = useSelector(get('productReducer'));

  return isLoading ? (
    <Loading isLoading />
  ) : (
    <Products
      products={products}
      onClickProduct={onClickProduct}
    />
  );
}
