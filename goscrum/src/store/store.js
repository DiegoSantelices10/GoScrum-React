
//import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'


import rootReducer from './reducer/rootReducer'


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))