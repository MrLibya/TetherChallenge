import { BITFINEX_WS } from '../constantes/apiConstantes';

export let ws
if (!ws) {
    ws = new WebSocket(BITFINEX_WS)
}
