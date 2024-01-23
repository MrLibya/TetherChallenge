import React from 'react';
import { ws } from '../webSocket'
import { useDispatch } from 'react-redux';
import { addBookData, addSubscribe, removeSubscribe, updateStatus } from '../store/actions/webSocketActions';
import { OPENED } from '../constantes/webSocketConstantes'

const useWebSocket = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (ws) {
            ws.onopen = () => {
                console.log("Opened")
                dispatch(updateStatus(OPENED))
            };


            ws.onmessage = handleMessages

            ws.onerror = e => {
                console.error('on error', e.message);
            };

            ws.onclose = e => {
                console.log('on close', e.code, e.reason);
            };
        }

        return () => {
            // Disconnect form ws
        }
    }, [])

    const handleMessages = (e) => {
        const data = JSON.parse(e.data)
        // console.log('on message ', data);

        switch (data.event) {
            case 'subscribed':
                dispatch(addSubscribe(data))
                break
            case 'unsubscribed':
                dispatch(removeSubscribe(data.symbol))
                break
        }
        if (Array.isArray(data))
            dispatch(addBookData(data))
    }
}

export default useWebSocket;
