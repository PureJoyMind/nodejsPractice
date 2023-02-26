 console.log('Before');
 
//  getUser(1, (user) => {
//     getRepositories(user.githubUser, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//     })
//  })
// });

getUser(1)
.then(user => getRepositories(user.githubUser))
.then(repos => getCommits(repos[0]))
.then(commits => console.log('commits', commits))
.catch(err => console.log('Error', err.message));

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