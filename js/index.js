var params = new URLSearchParams(window.location.search),
  username = params.get("username");

const query = `query MyQuery {
  user(login: "${username}") {
    avatarUrl(size: 200)
    bio
    email
    location
    login
    name
    repositories(last: 20) {
      totalCount
      nodes {
        description
        name
        updatedAt
        id

        repositoryTopics(first: 4) {
          edges {
            node {
              id
            }
          }
        }
        
        forks {
          totalCount
        }

        languages(first: 3) {
          nodes {
            color
            name
          }
        }
        
        stargazers {
          totalCount
        }
      }
    }
    starredRepositories {
      totalCount
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
  }
}
`;

const url = "https://api.github.com/graphql";
const opts = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${gitToken}`,
  },
  body: JSON.stringify({ query }),
};
window.onload = async () => {
  try {
    var res = await fetch(url, opts);
    var json = await res.json();
    console.log(json);
    // set user personal info
    document.querySelector("#firstName").innerText = json.data.user.name;
    document.querySelector("#profile-img").src = json.data.user.avatarUrl;
    document.querySelector(".h-two-img").src = json.data.user.avatarUrl;
    document.querySelector("#login").innerText = json.data.user.login;
    document.querySelector("#bio").innerText = json.data.user.bio;
    document.querySelector("#email").innerText = json.data.user.email;
    document.querySelector("#location").innerText = json.data.user.location;
    document.querySelector(
      "#followers"
    ).innerText = `${json.data.user.followers.totalCount} follower`;
    document.querySelector(
      "#following"
    ).innerText = `${json.data.user.following.totalCount} following`;
    document.querySelector(
      "#starredRepos"
    ).innerText = `${json.data.user.starredRepositories.totalCount}`;
    document.querySelector(
      "#repoCount"
    ).innerText = `${json.data.user.repositories.totalCount}`;

    // render list of repos
    let reposParent = document.querySelector("#repo");
    const repoNodes = json.data.user.repositories.nodes.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    for (let i = 0; i < repoNodes.length; i++) {
      let repo = repoNodes[i];
      // do not display repo description with null value
      if (repo.description === null) {
        repo.description = "";
      }

      const starDisplay = (starNum) => {
        if (starNum === 0) {
          return `<i class="far fa-star"></i>Unstar`;
        } else {
          return `<i class="far fa-star"></i>Star`;
        }
      };

      const languageDisplay = () => {
        // do not display language with null value
        const lang = {};
        let l = repo.languages.nodes.length;
        if (l !== 0) {
          lang.name = repo.languages.nodes[l - 1].name;
          lang.color = repo.languages.nodes[l - 1].color;
        }
        return l !== 0
          ? `<span class="row-vm">
          <span
            class="lang-color"
            style="background-color:${lang.color};"
          ></span>
          ${lang.name}
        </span>`
          : `<span style="display:none"></span>`;
      };

      // ropsitory list
      let child = document.createElement("li");
      child.innerHTML = `
        <div class="row-vm jc-sb">
            <div class="rc-bt-rr">
              <h3><a href="#">${repo.name}</a></h3>
              <div>
                ${repo.description}   
              </div >
              <div class="s-info row-vm">
                ${languageDisplay()}
                ${displayStar(repo.stargazers.totalCount)}
                ${displayFork(repo.forks.totalCount)}
                <span>${timeAgo(repo.updatedAt)}</span>
              </div>
            </div >
            <div class="rc-bt-ll">
              <div class="btn hm-right">${starDisplay(
                repo.stargazerCount
              )}</div>
            </div>
          </div > 
        `;
      reposParent.appendChild(child);
    }
  } catch (e) {
    console.log(e);
  }
};
