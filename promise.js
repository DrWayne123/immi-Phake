function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
};

sleep(1000)
    .then(function () {
        console.log('1');
        return sleep(2000)
    })
    
    .then(() => {
        console.log('2')
    });
