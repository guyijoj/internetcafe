export function scrollToWithOffset(id: number, offset = 0) {
  const el = document.getElementById(id.toString());
  if (!el) {
    console.log("NO");
    return;
  }
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
