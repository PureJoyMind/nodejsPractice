let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p1 done');
        reject(new Error('p1 failed'));
    }, 2000);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p2 done');
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('err => ', err.message));

