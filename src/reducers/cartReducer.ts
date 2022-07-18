const get = (name: string) => {
  const store = localStorage.getItem(name)
  if (store) {
    return JSON.parse(store).cart
  }
  return store
}

export const initialCartState = {
  cart: get('cart') || [],
}
export interface CartState {
  cart: number[]
}

enum cartActionsKind {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}

interface addToCartAction {
  type: cartActionsKind.ADD_TO_CART
  payload: number
}

interface removeFromCartAction {
  type: cartActionsKind.REMOVE_FROM_CART
  payload: number
}

export type CartAction = addToCartAction | removeFromCartAction

export function cartReducer(cartState: CartState, action: CartAction): CartState {
  const { type, payload } = action
  switch (type) {
    case cartActionsKind.ADD_TO_CART: {
      cartState.cart.push(payload)
      return { ...cartState }
    }
    case cartActionsKind.REMOVE_FROM_CART: {
      cartState.cart = cartState.cart.filter((id) => id !== payload)
      return { ...cartState }
    }
    default:
      return { ...cartState }
  }
}

export const addToCart = (payload: number): addToCartAction => {
  return {
    type: cartActionsKind.ADD_TO_CART,
    payload,
  }
}

export const removeFromCart = (payload: number): removeFromCartAction => {
  return {
    type: cartActionsKind.REMOVE_FROM_CART,
    payload,
  }
}
