import { addSubscribeAction, removeSubscribeAction, addBookDataAction, updateStatusAction } from "../slice/WebSocketSlice"

export const addSubscribe = data => dispatch => {
  dispatch(addSubscribeAction(data))
}

export const removeSubscribe = symbol => dispatch => {
  dispatch(removeSubscribeAction({ symbol }))
}

export const addBookData = book => dispatch => {
  dispatch(addBookDataAction({ book }))
}

export const updateStatus = status => dispatch => {
  dispatch(updateStatusAction(status))
}
