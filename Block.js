const sha256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, precedingHash = ""){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.precedingHash = precedingHash
        this.hash = this.computeHash()
        this.nonce = 0
    }

    computeHash(){
        return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.precedingHash + this.nonce).toString()
    }

    proofOfWork(difficulty){
        while ((this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) && (process.env.MINING_DONE != true)) {
            this.nonce++;
            this.hash = this.computeHash();
            console.log(this.hash);
            console.log(process.env.MINING_DONE)
        }
        console.log(this.nonce)
    }
}

module.exports = Block;