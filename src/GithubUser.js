// Class to fetch user data from the GitHub API and extract specific properties
export class GithubUser {
  static search(userlogin){
    const endpoint = `https://api.github.com/users/${userlogin}` // template literals

    return fetch(endpoint) // request Get to endpoint
      .then( data => data.json())
        .then( ({ login, name, public_repos, followers }) => ({ // Extract specific properties from JSON response
          login,
          name,
          public_repos, 
          followers
        }))
  }
}








































// export class GithubUser {
//   static search(username) {
//     const endpoint = `https://api.github.com/users/${username}`

//     return fetch(endpoint)
//       .then( data => data.json() )
//         .then( ({ login, name, public_repos, followers }) => ({
//           login,
//           name, 
//           public_repos, 
//           followers
//         }))
//   }
// }