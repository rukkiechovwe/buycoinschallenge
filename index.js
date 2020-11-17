const openBtn = document.querySelector(".fa-bars");
const nav = document.querySelector(".h-one");
const wrapper = document.querySelector(".wrapper");
openBtn.addEventListener("click", () => {
  navToggledisplay(nav, wrapper);
})
const navToggledisplay = (elem, wrapper) => {
  elem.style.visibility = elem.style.visibility === 'visible' ? 'hidden' : 'visible';
  wrapper.style.marginTop = wrapper.style.marginTop === "220px" ? "0" : "220px"
}



const query = `
	query{
  viewer {
    repositories(first: 20) {
      totalCount
      nodes {
        name
        id
        updatedAt
        description
        url
        viewerHasStarred
        forks {
          totalCount
        }
        owner {
          login
        }
        stargazerCount
        languages(first: 3) {
          nodes {
            color
            id
            name
          }
        }
      }
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
    starredRepositories {
      totalCount
    }
  }
  user(login: "rukkiechovwe") {
    bio
    email
    id
    name
    location
    login
   avatarUrl(size: 200)
  }
}
`;
const gitToken = "d46cdf0dc0beaf8787ff28cfadd416160028cfd4"
const url = "https://api.github.com/graphql"; // this is base graphql endpoint
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${gitToken}` },
  body: JSON.stringify({ query })
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
    document.querySelector("#bio").innerText = json.data.user.bio
    document.querySelector("#email").innerText = json.data.user.email;
    document.querySelector("#location").innerText = json.data.user.location;
    document.querySelector("#followers").innerText = `${json.data.viewer.followers.totalCount} follower`;
    document.querySelector("#following").innerText = `${json.data.viewer.following.totalCount} following`;
    document.querySelector("#starredRepos").innerText = `${json.data.viewer.starredRepositories.totalCount}`;
    document.querySelector("#repoCount").innerText = `${json.data.viewer.repositories.totalCount}`;


    // render list of repos
    let reposParent = document.querySelector("#repo");
    const repoNodes = json.data.viewer.repositories.nodes;
    for (let i = 0; i < repoNodes.length; i++) {
      let repo = repoNodes[i];
      // do not display repo description with null value
      if (repo.description === null) {
        repo.description = "";
      }
      // do not display language with null value
      let lang = {};
      if (repo.languages.nodes.length === 0) {
        lang.name = '';
      } else {
        lang.name = repo.languages.nodes[0].name;
        lang.color = repo.languages.nodes[0].color;
      }

      // ropsitory list
      let child = document.createElement('li');
      child.innerHTML = `
        <div class="row-vm jc-sb">
            <div class="rc-bt-rr">
              <h3><a href="#">${repo.name}</a></h3>
              <div>
                ${repo.description}   
              </div >
              <div class="s-info row-vm">
                <span class="row-vm">
                  <span class="lang-color" style="background-color:${lang.color};"></span>
                  ${lang.name}
                </span>
                <span><i class="far fa-star"></i>${repo.stargazerCount}</span>
                <span><i class="fas fa-code-branch"></i>${repo.forks.totalCount}</span>
                <span>Updated ${new Date(repo.updatedAt).toDateString()}</span>
              </div>
            </div >
            <div class="rc-bt-ll">
              <div class="btn hm-right"><i class="far fa-star"></i>Star</div>
            </div>
          </div > 
        `
      reposParent.appendChild(child);
    }
  } catch (e) {
    console.log(e)
  }

}
