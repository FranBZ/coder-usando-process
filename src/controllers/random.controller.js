import { fork } from 'child_process'

export const ramdomController = (req, res) => {
    const cant = req.query.cant || 100000000
    const objRandom = fork('objRandom.js')
    objRandom.send(cant)
    objRandom.on('message', obj => {
        res.send(obj)
    })
}