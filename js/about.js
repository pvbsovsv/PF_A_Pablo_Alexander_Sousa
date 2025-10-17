 let mmAbout = gsap.matchMedia();

//media queries

mmAbout.add("(min-width: 601px)", () => {
  aboutDesktop();

  return () => {
    killAllTweens();
  };
});

mmAbout.add("(max-width: 600px)", () => {
  aboutMobile();

  return () => {
    killAllTweens();
  };
}); 


weAreClosed();


//MOBILE

function aboutMobile() {
  console.log("mobile version loaded.");
    
}



//DESKTOP

function aboutDesktop() {
  console.log("desktop version loaded.");
  
//SECTION >  Our Team

gsap.set("#our-people h2", {opacity:0})
gsap.set("#our-people .row", {opacity:0})

  gsap.to("#our-people h2", {opacity:1, scrollTrigger:{
    trigger:"#about-hero", 
    start: "center center",
    scrub:1,
  }});

  gsap.to("#our-people .row", {opacity:1, scrollTrigger:{
    trigger:"#about-hero", 
    start: "bottom bottom",
    scrub:1,
    stagger:1,
  }})






  //SECTION > 5 pillars 
  const pillarSectionTitle = document.querySelector("#our-philo h2")
  gsap.set(pillarSectionTitle, {opacity:0})
  gsap.set(".pillar-text", { y: "130%", opacity: 0 });


  gsap.to(pillarSectionTitle, {opacity:1, scrollTrigger:{
    trigger:"#our-people", 
    start: "center center",
    scrub:1
  }})


  gsap.to(".pillar-text", {
    y: 0,
    opacity: 1,
    stagger: 0.6,
    scrollTrigger: {
      trigger: "#our-philo",
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
    },
  }); 

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


