 let mmBuildings = gsap.matchMedia();

//media queries

mmBuildings.add("(min-width: 601px)", () => {
  buildingsDesktop();

  return () => {
    killAllTweens();
  };
});

mmBuildings.add("(max-width: 600px)", () => {
  buildingsMobile();

  return () => {
    killAllTweens();
  };
}); 


weAreClosed();


//MOBILE

function buildingsMobile() {
  console.log("mobile version loaded.");
    
}



//DESKTOP

function buildingsDesktop() {
  console.log("desktop version loaded.");



//Section >> BUILDINGS INTRO >  Parallax intro

gsap.set("#buildings-hero", {y:"-25%"})

gsap.to("#buildings-hero",  {
  y:"35%",
  ease:"none",
  scrollTrigger:{
    trigger:"#buildings-intro",
    start: "top bottom",
    end:"bottom top",
    scrub:1
  }
})



//Section >> BUILDINGS GALLERY> animation

const galleryProject = document.querySelectorAll(".project-pack")


gsap.set(galleryProject, {opacity:0.5, y:"-10%"})

gsap.to(galleryProject, {opacity:1,y:0,
  scrollTrigger:{
    trigger:"#buildings-intro",
    start: "center 200px",
    endTrigger:"buildings-gallery",
    end: "center bottom",
    scrub:2,
    stagger:1,
  }
})




}







//Kill animations 
function killAllTweens() {
  // Kill all tweens on all targets
  gsap.killTweensOf("*");

  // Kill all ScrollTriggers (if you are using ScrollTrigger)
  if (gsap.plugins.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // reset all inline styles added by GSAP
  gsap.set("*", { clearProps: "all" });
}



// we are open we are closed 
function weAreClosed() {
  //data
  const dateNow = new Date();
  const optionsDate = {
    weekday: "long",
  };

  //hora
  const timeNow = {
    hours: dateNow.getHours(),
    minutes: dateNow.getMinutes(),
    seconds: dateNow.getSeconds(),
  };

  let day = dateNow.getDay();
  let hours = timeNow.hours;
  let minutes = timeNow.minutes;
  if (hours < 1) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const isWeekend = day === 0 || day === 6;

  const target = document.getElementById("dateTime");

  if (!isWeekend && hours >= 9 && hours <= 18) {
    target.innerHTML = `${hours}:${minutes}  ${dateNow.toLocaleString(
      "en-EN",
      optionsDate
    )}, we are open `;
  } else {
    target.innerHTML = `${hours}:${minutes}  ${dateNow.toLocaleString(
      "en-EN",
      optionsDate
    )}, we are closed `;
  }
}
