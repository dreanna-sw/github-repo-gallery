const overview = document.querySelector(".overview");
const username = "dreanna-sw";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");
const backToRepoGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificRepo(repoName);
    }
});

const getSpecificRepo = async function (repoName) {
    const specificRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displaySpecificRepo(repoInfo, languages);
};

const displaySpecificRepo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    const divElement = document.createElement("div");
    divElement.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    individualRepoData.append(divElement);
    individualRepoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backToRepoGallery.classList.remove("hide");
};

backToRepoGallery.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    individualRepoData.classList.add("hide");
    backToRepoGallery.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const captureSearchText = e.target.value;
    //console.log(captureSearchText);
    const repos = document.querySelectorAll(".repo");
    const lowercaseSearchText = captureSearchText.toLowerCase();

    for (const repo of repos) {
        const lowercaseRepoText = repo.innerText.toLowerCase();
        if (lowercaseRepoText.includes(lowercaseSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});





