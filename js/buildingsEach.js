 let mmBuildingsEach = gsap.matchMedia();

//media queries

mmBuildingsEach.add("(min-width: 601px)", () => {
  buildingsEachDesktop();

  return () => {
    killAllTweens();
  };
});

mmBuildingsEach.add("(max-width: 600px)", () => {
  buildingsEachMobile();

  return () => {
    killAllTweens();
  };
}); 


weAreClosed();


//MOBILE

function buildingsEachMobile() {
  console.log("mobile version loaded.");

  gsap.to("#building-intro", {y:0})  
    
}



//DESKTOP

function buildingsEachDesktop() {
  console.log("desktop version loaded.");


//Section >> EACH BUILDING INTRO >  Parallax intro




gsap.to("#building-intro", {y:"30%",
 scrollTrigger:{
   trigger: "#building-intro",
   start: "top top",
   endTrigger: "building-gallery",
   end: "center center", 
   scrub: 2,
   ease: "none",
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
