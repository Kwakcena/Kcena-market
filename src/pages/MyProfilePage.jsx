import React, { useState } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import MyProductsContainer from '../components/container/MyProductsContainer';

import { loadItem } from '../services/storage';

import useStyles from '../styles/styles';

export default function MyProfilePage() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  const user = loadItem('user');
  if (user === null) {
    return <Redirect to="/login" />;
  }

  return (
    <Container
      component="section"
      maxWidth="md"
      className={classes.page}
    >
      <Typography
        component="h2"
        variant="h4"
        align="center"
      >
        내 정보
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab label="판매중인 상품" />
        <Tab label="찜한 상품" />
      </Tabs>
      {selectedTab === 0 && <MyProductsContainer user={user} />}
      {/* TODO : 찜한 상품 리스트 추가 {selectedTab === 1 && <MyWishListContainer />} */}
    </Container>
  );
}