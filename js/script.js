// Profile Info //
const overview = document.querySelector(".overview");
const username = "dreanna-sw";
const repoList = document.querySelector(".repo-list");

const getProfile = async function () {
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const data = await profile.json();
    displayUserInfo(data);
};

getProfile();

const displayUserInfo = function (data) {
    const divElement = document.createElement("div");
    divElement.classList.add("user-info");
    divElement.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(divElement);
  getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    repoInfo(repoData);
};

const repoInfo = function (repos) {
    for (const repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }
};