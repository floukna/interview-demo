import { combineReducers } from 'redux'
import counter from './counter'
import books from './book'

export default combineReducers({
  counter,
  books
})
