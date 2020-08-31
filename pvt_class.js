class Pvt {
    constructor(dictionary) {
        this.dictionary = dictionary;
        this.k = 10;
        this.f = 0;
        var mi_indexer = 1
        this.mi = ['x', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gen_mi_list();
        this.mi2 = ['x']
        this.mi2 = this.mi2.concat(this.mi.slice(1).map(this.squared))
        // console.log(this.mi)
        // console.log(this.sum_mi())
        // console.log(this.mi.slice(1).length)
        this.mi_mul = this.mi_mul.bind(this)
        
    }
}

Pvt.prototype.sum_ai = function (candidate) {
    return this.dictionary[candidate].slice(1).reduce(this.summation)
}

Pvt.prototype.sum_mi = function () {
    return this.mi.slice(1).reduce(this.summation)
}

Pvt.prototype.summation = function (a, b) {
    return a+b
}

Pvt.prototype.gen_mi_list = function () {

    for (const candidate in this.dictionary) {
        if (this.dictionary.hasOwnProperty(candidate) && this.mi.length == this.dictionary[candidate].length) {
            for (let i = 1; i < this.dictionary[candidate].length; i++) {
                this.mi[i]  += this.dictionary[candidate][i];
                
            }
            
        } else {
            console.log('the length of mi '+this.mi.slice( 1, this.mi.length) + ' does not match with the length of the candidate, '+ candidate  +', being ' + this.dictionary[candidate].slice(1, this.dictionary[candidate].length))
        }
    }
    
}

Pvt.prototype.squared = function (mi){
    return Math.pow(mi, 2)
}

Pvt.prototype.point_est_p = function (candidate) {
    let total_ai = this.sum_ai(candidate)
    let total_mi = this.sum_mi()
    return total_ai/total_mi
    
}

Pvt.prototype.m_prime = function () {
    return this.sum_mi()/this.mi.slice(1).length
}

Pvt.prototype.mi_mul = function (ai) {
    let miai = this.mi[mi_indexer] * ai
    mi_indexer += 1
    return miai
}

Pvt.prototype.margin_error = function (candidate) {
    mi_indexer = 1
    let p = this.point_est_p(candidate)
    let p2 = Math.pow(p, 2)
    let m_p = this.m_prime()
    let m_p2 = Math.pow(m_p, 2)
    let k = this.k
    let f = this.f

    let p2Emi2 = p2 * this.mi2.slice(1).reduce(this.summation)
    let miai = this.dictionary[candidate].slice(1).map(this.mi_mul)
    let pEaimi = p * miai.reduce(this.summation)

    let ai2 = this.dictionary[candidate].slice(1).map(this.squared)
    let Eai2 = ai2.reduce(this.summation)

    let comp1 = ((1-f)*(Eai2 - (2 * pEaimi) + (p2Emi2))) / (k * m_p2 * (k -1))

    error = Math.sqrt(comp1) * 1.96 * 100
    
    return error
    
}

Pvt.prototype.vote_share = function (candidate) {
    let total_poll = this.sum_mi()
    let cand_poll = this.sum_ai(candidate)
    return cand_poll/total_poll * 100
}


module.exports = Pvt;