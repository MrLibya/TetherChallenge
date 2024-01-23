import { createSlice } from '@reduxjs/toolkit'
import { CLOSED } from '../../constantes/webSocketConstantes'

const parseBook = (ele) => {
  const data = { price: ele[0], count: ele[1], amount: ele[2] }
  const side = data.amount >= 0 ? 'bids' : 'asks'
  data.amount = Math.abs(data.amount)

  return { side, data }
}

export const authSlice = createSlice({
  name: 'webSocket',
  initialState: {
    status: CLOSED,
    subscribes: {},
    book: {
      bids: {},
      asks: {},
    },
    psnap: {
      bids: [],
      asks: [],
    }
  },
  reducers: {
    updateStatusAction: (state, action) => {
      const status = action.payload
      state.status = status
    },
    addSubscribeAction: (state, action) => {
      // I didn't add channel part because I only imeplement book channel

      // action payload contain: prec, freq, len, pair, chanId
      const { symbol, channel } = action.payload
      state.subscribes[symbol] = action.payload
      console.info("Subscribed to ", channel, " symbol ", symbol)
    },
    removeSubscribeAction: (state, action) => {
      const { symbol } = action.payload
      console.info("UnSubscribed from symbol ", symbol)
      state.subscribes[symbol] = false
    },
    addBookDataAction: (state, action) => {
      const { book } = action.payload
      const [CHANNEL_ID, bookData] = book
      if (Array.isArray(bookData[0][0])) {
        bookData[1].forEach((ele) => {
          const { data, side } = parseBook(ele)
          state.book[side][data.price] = data
        })
      } else {
        const data = { price: bookData[0], count: bookData[1], amount: bookData[2] }
        if (!data.count) {
          // const deepClone = JSON.parse(JSON.stringify(state.book))
          const deepClone = state.book
          if (data.amount > 0 && state.book['bids'][data.price]) {
            delete deepClone['bids'][data.price]
            state.book = deepClone
          } else if (data.amount < 0 && state.book['asks'][data.price]) {
            delete deepClone['asks'][data.price]
            state.book = deepClone
          }
        } else {
          const { data, side } = parseBook(bookData)
          state.book[side][data.price] = data
        }
      }

      ['bids', 'asks'].forEach((side) => {
        const sbook = state.book[side]
        const bprices = Object.keys(sbook)

        const prices = bprices.sort(function (a, b) {
          if (side === 'bids') {
            return +a >= +b ? -1 : 1
          } else {
            return +a <= +b ? -1 : 1
          }
        })

        state.psnap[side] = prices
        // console.log('side ', prices)
      })
    },
  },
})

export const { updateStatusAction, addSubscribeAction, removeSubscribeAction, addBookDataAction } = authSlice.actions

export default authSlice.reducer