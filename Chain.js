const Block = require('./Block')

class Chain {
    constructor(io){
        this.chain = [this.startGenesisBlock()]
        this.nodes =[]
        this.difficulty = 3
        this.io = io
    }

    startGenesisBlock(){
        return new Block(0,Date.now(), {sender:'', receiver:'', qty: 0}, "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addNewBlock(newBlock){
        newBlock.precedingHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index + 1
        newBlock.proofOfWork(this.difficulty);
        if (this.checkChainValidity(this.chain) == true){
            this.chain.push(newBlock);
            console.log("good")
        }
        console.log(this.chain)
        this.io.emit('done', this.chain)
    }

    checkChainValidity(chain) {
        for (let i = 1; i < chain.length; i++) {
            const currentBlock = chain[i];
            const precedingBlock = chain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) return false;
            if (currentBlock.precedingHash !== precedingBlock.hash) return false;
        }
        return true;
    }

    addNewNode(node){
        this.nodes.push(node)
    }
}

module.exports = Chain;