import { LOCAL_STORAGE, TURNS } from '../constants'

export const saveGameToStorage = ({ board, turn }: { board: TURNS[]; turn: TURNS }): void => {
  window.localStorage.setItem(LOCAL_STORAGE.BOARD, JSON.stringify(board))
  window.localStorage.setItem(LOCAL_STORAGE.TURN, turn)
}

export const resetLocalStorage = (items: string[]): void => {
  items.forEach(item => localStorage.removeItem(item))
}
