function convertTimeUnix(dateString){
    const date = new Date(dateString);
    // Get the Unix timestamp (in seconds)
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
}

module.exports = function convertData(data){
    data.quotes.map((item)=>{
        item.date = convertTimeUnix(item.date);
    })
}