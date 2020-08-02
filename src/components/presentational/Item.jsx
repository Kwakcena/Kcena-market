import React from 'react';

import {
  CardItem,
  CardLink,
  CardArticle,
  CardImage,
  CardDescription,
} from '../../styles/Card';

export default function Item({ item }) {
  const {
    title, thumbnailUrl, url, region, price,
  } = item;

  return (
    <CardItem>
      <CardArticle>
        <CardLink href={url}>
          <CardImage url={thumbnailUrl}>
            <img src={thumbnailUrl} alt={title} />
          </CardImage>
          <CardDescription>
            <CardDescription.Title>{title}</CardDescription.Title>
            <CardDescription.Region>{region}</CardDescription.Region>
            <CardDescription.Price>{`${price}원`}</CardDescription.Price>
          </CardDescription>
        </CardLink>
      </CardArticle>
    </CardItem>
  );
}
