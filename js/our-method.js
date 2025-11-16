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


  /* method steps */

const methodSectionTitle = document.querySelector("#our-method-steps h2")
  gsap.set(methodSectionTitle, {opacity:0})
  gsap.set(".method-text-1", { x: "150%", opacity: 0 });
  gsap.set(".method-text-2", { x: "-150%", opacity: 0 });


  gsap.to(methodSectionTitle, {x:"0", opacity:1, scrollTrigger:{
    trigger:"#our-method-hero", 
    start: "center center",
    scrub:1
  }})


  gsap.to(".method-text-1", {
    x: 0,
    opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: "#our-method-steps",
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
    },
  }); 
  gsap.to(".method-text-2", {
    x: 0,
    opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: "#our-method-steps",
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
    },
  }); 







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
