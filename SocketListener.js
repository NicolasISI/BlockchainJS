const Block = require('./Block')

const socketListener = (socket, chain) => {
    socket.on('mine', (sender, receiver, qty, timestamp) => {
        process.env.MINING_DONE = false
        let block = new Block(null, timestamp, {sender, receiver, qty})
        chain.addNewBlock(block)
        console.log(block)
        console.info(`Block number ${block.index} just mined`)
    })
    socket.on('done', (blockchain)=>{
        process.env.MINING_DONE = true
        chain=blockchain
    })
    return socket
}

module.exports = socketListener