(function () {
  document.documentElement.classList.add("js");

  document.querySelectorAll(".nav-menu").forEach(function (menu) {
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.removeAttribute("open");
      });
    });
  });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var previews = document.querySelectorAll(".work-media video");
  if (reduce) {
    previews.forEach(function (video) {
      video.removeAttribute("autoplay");
      video.pause();
    });
  } else {
    document.querySelectorAll(".wf-input").forEach(function (input) {
      input.addEventListener("change", function () {
        previews.forEach(function (video) {
          var card = video.closest(".work");
          if (!card || window.getComputedStyle(card).display === "none") {
            video.pause();
            return;
          }
          var play = video.play();
          if (play && play.catch) play.catch(function () {});
        });
      });
    });
  }

  var nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  nodes.forEach(function (el) { io.observe(el); });
})();
