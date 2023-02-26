console.log('Before');

// for functions that return a promise we can use await
// to store the eventual result of the promise in a value
// whenever we use await in a function we decorate the function
// with async
async function displayCommits(){
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gethubUser);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        console.log('error', err.message);
    }
}

displayCommits();

console.log('After');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user...');
            resolve({id: id, githubUser: 'mosh'});
        }, 2000);
    });
}

 function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling DB...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}


function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting github api from ', repo);
            resolve(['commit']);
        }, 2000);
    });
};