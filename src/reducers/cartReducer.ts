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
  RESET_CART = 'RESET_CART',
}

interface addToCartAction {
  type: cartActionsKind.ADD_TO_CART
  payload: number
}

interface removeFromCartAction {
  type: cartActionsKind.REMOVE_FROM_CART
  payload: number
}

interface resetAction {
  type: cartActionsKind.RESET_CART
}

export type CartAction = addToCartAction | removeFromCartAction | resetAction

export function cartReducer(cartState: CartState, action: CartAction): CartState {
  const { type } = action
  switch (type) {
    case cartActionsKind.ADD_TO_CART: {
      const { payload } = action
      cartState.cart.push(payload)
      return { ...cartState }
    }
    case cartActionsKind.REMOVE_FROM_CART: {
      const { payload } = action
      cartState.cart = cartState.cart.filter((id) => id !== payload)
      return { ...cartState }
    }
    case cartActionsKind.RESET_CART: {
      cartState.cart = []
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

export const resetCart = (): resetAction => {
  return {
    type: cartActionsKind.RESET_CART,
  }
}
