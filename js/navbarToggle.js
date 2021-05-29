// toogle navbar
const openBtn = document.querySelector(".fa-bars");
const nav = document.querySelector(".h-one");
const wrapper = document.querySelector(".wrapper");
openBtn.addEventListener("click", () => {
  navToggledisplay(nav, wrapper);
});
const navToggledisplay = (elem, wrapper) => {
  elem.style.visibility =
    elem.style.visibility === "visible" ? "hidden" : "visible";
  elem.style.height = elem.style.height === "auto" ? "0" : "auto";
  elem.style.opacity = elem.style.opacity === "1" ? "0" : "1";
  wrapper.style.marginTop = wrapper.style.marginTop === "335px" ? "0" : "335px";
};
