import configureStore from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer, {
  loadInitProducts,
  loadProduct,
  setProduct,
  setProducts,
  changeLoginField,
  setUser,
  requestLogin,
  logout,
  requestLogout,
} from './slice';

import products from '../fixtures/products';

const middlewares = [...getDefaultMiddleware()];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      product: null,
      products: [],
      loginFields: {
        email: '',
        password: '',
      },
      user: {
        displayName: '',
        uid: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setProducts', () => {
    const initialState = {
      products: [],
    };

    it('changes products', () => {
      const state = reducer(initialState, setProducts(products));

      expect(state.products).toEqual(products);
    });
  });

  describe('setProduct', () => {
    const initialState = {
      product: null,
    };

    const product = products[0];

    const state = reducer(initialState, setProduct(product));

    expect(state.product.id).toBe(1);
    expect(state.product.title).toBe('크리넥스 KF-AD 소형 마스크 팝니다.');
  });

  describe('changeLoginField', () => {
    context('when email is changed', () => {
      const initialState = {
        loginFields: {
          email: 'email',
          password: 'password',
        },
      };

      const state = reducer(initialState, changeLoginField({
        name: 'email',
        value: 'test',
      }));

      expect(state.loginFields.email).toBe('test');
      expect(state.loginFields.password).toBe('password');
    });

    context('when password is changed', () => {
      const initialState = {
        loginFields: {
          email: 'email',
          password: 'password',
        },
      };

      const state = reducer(initialState, changeLoginField({
        name: 'password',
        value: 'test',
      }));

      expect(state.loginFields.email).toBe('email');
      expect(state.loginFields.password).toBe('test');
    });
  });

  describe('setUser', () => {
    const initialState = {
      user: {
        displayName: '',
        uid: '',
      },
    };

    const state = reducer(initialState, setUser({
      displayName: 'tester',
      uid: 'testuid12345',
    }));

    expect(state.user.displayName).toBe('tester');
    expect(state.user.uid).toBe('testuid12345');
  });

  describe('logout', () => {
    it('clears user', () => {
      const initialState = {
        user: {
          displayName: 'tester',
          uid: '123456',
        },
      };

      const state = reducer(initialState, logout());

      expect(state.user.displayName).toBe('');
      expect(state.user.uid).toBe('');
    });
  });
});

describe('actions', () => {
  let store;

  describe('loadInitProducts', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setProducts', async () => {
      await store.dispatch(loadInitProducts());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProducts([]));
    });
  });

  describe('loadProduct', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setProduct', async () => {
      await store.dispatch(loadProduct({ productId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProduct({}));
    });
  });

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        loginFields: {
          email: '',
          password: '',
        },
      });
    });

    it('dispatchs setUser', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setUser({}));
    });
  });

  describe('requestLogout', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          displayName: 'tester',
          uid: '123456',
        },
      });
    });

    it('dispatchs logout', async () => {
      await store.dispatch(requestLogout());

      const actions = store.getActions();

      expect(actions[0]).toEqual(logout());
    });
  });
});