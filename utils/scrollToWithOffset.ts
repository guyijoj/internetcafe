export function scrollToWithOffset(id: number, offset = 0) {
  const el = document.getElementById(id.toString());
  if (!el) {
    console.log("NO"+ id);
    console.log('Существующие id:', document.querySelectorAll('id'));
    return;
  }
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
