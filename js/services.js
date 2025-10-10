 let mmServices = gsap.matchMedia();

//media queries

mmServices.add("(min-width: 819px)", () => {
  servicesDesktop();

  return () => {
    killAllTweens();
  };
});

mmServices.add("(max-width:820px)", () => {
  servicesMobile();

  return () => {
    killAllTweens();
  };
}); 


weAreClosed();


//mobile 

function servicesMobile() {

console.log("mobile version loaded.");

}

// DESKTOP 
 
 function servicesDesktop() {
  console.log("desktop version loaded.");


   //SECTION > Our services Div > Parallax Effect

  gsap.set("#parallax-services", { y: "-25%" });

  gsap.to("#parallax-services", {
    y: "25%",
    ease: "none",
    scrollTrigger: {
      trigger: "#parallax-services-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });


  // SECTION > Areas Services

  const areaTitles = document.getElementsByClassName("areaTitle")
  const areaTexts = document.getElementsByClassName("text-body-secondary")
  const areaImages = document.getElementsByClassName("area-image")

  gsap.set(areaTitles, {y:"-100%", opacity:0})
  gsap.set(areaTexts, {y:"100%", opacity:0})
  gsap.set(areaImages, {y:"100%", opacity:0})




  gsap.to(areaTitles,  {y:0, opacity:1, 
    scrollTrigger: {
      trigger: "#parallax-services-container",
      start:"center center",
      scrub:2,
    }})
  gsap.to(areaTexts,  {y:0, opacity:1, 
    scrollTrigger: {
      trigger: "#parallax-services-container",
      start:"center center",
      scrub:2,
    }})
  gsap.to(areaImages,  {y:0, opacity:1, 
    scrollTrigger: {
      trigger: "#parallax-services-container",
      start:"center center",
      scrub:2,
    }})







 }
  
function killAllTweens() {
  // Kill all tweens on all targets
  gsap.killTweensOf("*");

  // Kill all ScrollTriggers (if you are using ScrollTrigger)
  if (gsap.plugins.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // Optionally reset all inline styles added by GSAP
  gsap.set("*", { clearProps: "all" });
}

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
