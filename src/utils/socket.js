import io from 'socket.io-client'
import { store } from '../redux/store'
// import { a_setDialogs, a_addMessage, a_setSelectedDialog } from '../redux/actions'

const { REACT_APP_SOCKET_SERVER, REACT_APP_SOCKET_PATH } = process.env

export var socket = null

export const connectToSocket = () => {
    socket = io(REACT_APP_SOCKET_SERVER, {
        path: REACT_APP_SOCKET_PATH,
        transports: ['polling'],
        secure: true,
        query: {
            token: 'Bearer ' + localStorage.getItem('auth')
        }
    })
    if (socket) {
        socket.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') {
                socket.connect()
            }
        })
        socket.on('connect', () => {
            console.log('connect')
        })
        socket.on('disconnect', (data) => {
            console.log('disconnect')
        })
        socket.on('reconnect_attempt', () => {
            socket.io.opts.transports = ['polling']
        })
    }
}

export const disconnectFromSocket = () => {
    socket.disconnect()
}

// export const addListener = (listener) => {
//     if (socket) {
//         let f = Object.keys(listener)
//         listeners.push(f)
//         socket.on(f[0], message => {
//             listener[f](message)
//         })
//     }
// }
