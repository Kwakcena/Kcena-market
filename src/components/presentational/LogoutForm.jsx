import React from 'react';

import { Button } from '@material-ui/core';

export default function LogoutForm({ onClick }) {
  return (
    <>
      <Button
        color="inherit"
        onClick={onClick}
      >
        Log out
      </Button>
    </>
  );
}
