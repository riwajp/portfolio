window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".animated-nav");
  setTimeout(() => {
    console.log("Adding class");
    nav.classList.add("show");
  }, 200); // slight delay to trigger transition

  fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const worksList = document.querySelector(".latest-works-list");

      projects.forEach((project) => {
        const work = document.createElement("div");
        work.classList.add("latest-work");
        work.innerHTML = `
  <img src="${project.image}" alt="${project.title}" />
  ${
    project.tags
      ? `<div class="latest-work-tags">
          ${project.tags
            .map(
              (tag) =>
                `<span class="work-tag">
                  <i class="${tag.icon}"></i> ${tag.name}
                </span>`
            )
            .join("")}
        </div>`
      : ""
  }
  <div class="latest-work-title">${project.title}</div>
  <div class="latest-work-desc">${project.description}</div>
  ${
    project.links
      ? `<div class="latest-work-links">
          ${project.links
            .map(
              (link) =>
                `<a href="${link.url}" target="_blank" class="work-link">
                   <i class="${link.icon}"></i> ${link.label}
                 </a>`
            )
            .join("")}
        </div>`
      : ""
  }
`;

        worksList.appendChild(work);
      });
    })
    .catch((error) => console.error("Failed to load projects:", error));

  fetch("technologies.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".technologies-list");

      Object.entries(data).forEach(([category, items]) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "technology-category";

        const title = document.createElement("div");
        title.className = "technology-category-title";
        title.textContent = category;

        const list = document.createElement("div");
        list.className = "technology-category-list";

        items.forEach((tech) => {
          const techDiv = document.createElement("div");
          techDiv.className = "technology";

          const icon = document.createElement("i");
          icon.className = tech.icon + " technology-icon";

          const name = document.createElement("div");
          name.className = "technology-name";
          name.textContent = tech.name;

          techDiv.appendChild(icon);
          techDiv.appendChild(name);
          list.appendChild(techDiv);
        });

        categoryDiv.appendChild(title);
        categoryDiv.appendChild(list);
        container.appendChild(categoryDiv);
      });
    })
    .catch((err) => console.error("Failed to load technologies:", err));
});
