/* ============================================================
   IC Portal — Homepage coverflow: maps scroll position inside
   #coverflow to a 3D transform on each .cf-card (coverflow-style)
   and to a Y-axis rotation on the ambient background logo.
   Scroll-scrubbed only — nothing here animates on its own.
   ============================================================ */
(function(){
  var section = document.getElementById("coverflow");
  if (!section) return;

  var cards   = Array.prototype.slice.call(section.querySelectorAll(".cf-card"));
  var logo    = document.getElementById("coverflowLogo");
  var dots    = Array.prototype.slice.call(document.querySelectorAll("#coverflowDots .cf-dot"));
  var hint    = section.querySelector(".coverflow-hint");
  var N       = cards.length;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || N === 0){
    section.classList.add("cf-static");
    return; // plain stacked-list fallback, styled in css/coverflow.css
  }

  var BEAT_VH = 0.85; // how much viewport-height of scroll each card "owns"

  function setRunway(){
    section.style.height = (N * BEAT_VH * window.innerHeight) + "px";
  }

  function spacingForWidth(){
    return window.innerWidth < 640 ? 165 : 300;
  }

  var activeIndex = -1;
  var ticking = false;

  function update(){
    ticking = false;
    var rect = section.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    var progress = total > 0 ? (-rect.top) / total : 0;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    var virtual = progress * (N - 1);
    var nearest = Math.round(virtual);
    if (nearest !== activeIndex){
      activeIndex = nearest;
      dots.forEach(function(d, i){ d.classList.toggle("is-active", i === activeIndex); });
    }

    var spacing = spacingForWidth();

    cards.forEach(function(card, i){
      var offset = i - virtual;
      var abs = Math.abs(offset);
      var clampedAbs = Math.min(abs, 3);
      var x = offset * spacing;
      var rotY = Math.max(-60, Math.min(60, offset * -34));
      var scale = Math.max(0.6, 1 - clampedAbs * 0.16);
      var z = -clampedAbs * 160;
      var opacity = Math.max(0, 1 - clampedAbs * 0.42);

      card.style.transform = "translate(-50%,-50%) translateX(" + x + "px) translateZ(" + z + "px) rotateY(" + rotY + "deg) scale(" + scale + ")";
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = String(1000 - Math.round(abs * 10));
      card.style.pointerEvents = abs < 2.4 ? "auto" : "none";
      card.classList.toggle("is-active", abs < 0.5);
    });

    if (logo){
      logo.style.transform = "translate(-50%,-50%) rotateY(" + (progress * 1080) + "deg)";
    }
    if (hint){
      hint.style.opacity = progress > 0.04 ? "0" : "1";
    }
  }

  function onScroll(){
    if (!ticking){
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("resize", function(){ setRunway(); onScroll(); });
  window.addEventListener("scroll", onScroll, { passive: true });

  // Clicking the active card navigates normally (it's a real <a href>).
  // Clicking a side card instead scrolls it into the active position.
  cards.forEach(function(card, i){
    card.addEventListener("click", function(e){
      if (!card.classList.contains("is-active")){
        e.preventDefault();
        var rect = section.getBoundingClientRect();
        var total = rect.height - window.innerHeight;
        var targetProgress = N > 1 ? i / (N - 1) : 0;
        var targetScrollY = window.scrollY + rect.top + targetProgress * total;
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    });
  });

  setRunway();
  update();
})();
