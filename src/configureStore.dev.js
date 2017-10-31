import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function (initialState = {}) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(rootReducer)
    );
  }

  /*const store = (
   window.devToolsExtension
   ? window.devToolsExtension()(createStore)
   : createStore)(reducer);
   */

  return store;
}
