import { projects } from "./data.js";

function createTag(text){
    const el = document.createElement("span");
    el.className = "rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-white";
    el.textContent = text;
    return el;
}

function renderProjects(list, projects){
    const template = document.getElementById("project-card-template");
    if (!template) throw new Error("Missing  <template id='project-card-template'>");

    const frag = document.createDocumentFragment();


    projects.forEach(project => {
        if (
            project.categories.includes("AI")
        ){
        const node = template.content.firstElementChild.cloneNode(true);
        node.querySelector("[data-title]").textContent = project.title ?? "";
        node.querySelector("[data-description]").textContent = project.description ?? "";
        const tagsEl = node.querySelector("[data-tags]");
        tagsEl.innerHTML = "";
        (project.tags ?? []).forEach((t) => tagsEl.appendChild(createTag(t)));
        node.querySelectorAll("[data-link]").forEach((el) => {
        el.href = project.url ?? "#";
        });

        frag.appendChild(node);
        }

    });
     list.appendChild(frag);
}


document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("projects-list");
  if (!list) throw new Error("Missing #projects-list container");
  renderProjects(list, projects);
});