import { ACTION_KEYS } from '../../config/key'

export interface IActionReducer {
  type: string
  payload: unknown
}

const todoReducer = (state: any, action: IActionReducer) => {
  switch (action.type) {
    case ACTION_KEYS.UPDATE_GENRES:
      return {
        ...state,
        genres: action.payload
      }
    case ACTION_KEYS.UPDATE_GRADE:
      return {
        ...state,
        grade: action.payload
      }
    default:
      return state
  }
}

export default todoReducer
