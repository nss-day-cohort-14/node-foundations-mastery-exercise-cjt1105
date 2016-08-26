const transform = require('stream').Transform,
tStream = new transform();
counter=0;
tStream._transform = (data,_,cb)=>{
	counter ++;
	if(counter <= 10){
		cb(null, `${data}\n`)
	} else {
		cb()
	}
}

module.exports = { tStream }