import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductDetail from '../presentational/ProductDetail';

import { loadProduct } from '../../slice';

import { get } from '../../utils';

export default function ProductContainer({ productId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct({ productId }));
  }, []);

  const { product } = useSelector(get('reducer'));

  if (!product) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <ProductDetail product={product} />
  );
}
