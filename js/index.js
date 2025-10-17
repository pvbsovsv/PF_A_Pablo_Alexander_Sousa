gsap.registerPlugin(ScrollTrigger);

//BASE ANIMATIONS

//Create match media to separate the animations for each breakpoint (tablet is fine with the desktop animations)

let mm = gsap.matchMedia();

//media queries

mm.add("(min-width: 601px)", () => {
  desktop();
  indexDesktop();
  weAreClosed();

  return () => {
    killAllTweens();
  };
});

mm.add("(max-width:600px)", () => {
  mobile();
  indexMobile();
  weAreClosed();

  return () => {
    killAllTweens();
  };
});

// mobile
function mobile() {
  console.log("mobile version loaded.");

  //SECTION > Nav dropdown -----------

  //Botoes e links para o menu / toggle
  const navButton = document.querySelector(".navBtn");
  const navButtonClose = document.querySelector("header button.btn");
  const nav = document.querySelector("header");
  const linksNav = document.querySelectorAll("header nav a");

  //Colocamos o nav fora de vista - "-100%"" para responsiveness
  gsap.set(nav, {
    y: "-100%",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  });

  // criamos a timeline do gsap com o menu e os links (setamos o menu fora)
  let tlNav = gsap.timeline({ paused: true });
  tlNav
    .set(linksNav, { y: "100%" })
    .to(nav, {
      y: 0,
      duration: 1.3,
      ease: "power3.out",
    })

    .to(linksNav, { y: 0, duration: 0.6 }, "-=0.6");

  //com click, play the timeline
  navButton.addEventListener("click", () => {
    tlNav.play(0);
  });

  document.querySelector("#hiddenBtnMenu").addEventListener("click", () => {
    tlNav.play(0);
  });

  //voltamos a tirar de vista ao clicar
  navButtonClose.addEventListener("click", () => {
    gsap.to(nav, { y: "-100%", duration: 0.5, ease: "power4.in" });
  });

  // outra timeline para os buttons do menu

  gsap.set("#hiddenBtnMenu", { y: "200%" });
  gsap.set("#hiddenBtnContact", { y: "200%" });
  gsap.set(".container-btns", { x: "100%" });

  //buttons do flex escondem-se com scroll / background fica

  let tlNavBtns = gsap.timeline();
  tlNavBtns
    //aparecem os buttons position absolute:
    .to(".container-btns", {
      x: 0,
      scrollTrigger: {
        trigger: "#hero-featured",
        start: "50px top",
        endTrigger: "#hero-featured",
        end: "50px top",
        scrub: 0,
      },
    })

    .to("#hiddenBtnContact", {
      y: 0,
      scrollTrigger: {
        trigger: "#hero-featured",
        start: "250px top",
        endTrigger: "#hero",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to("#hiddenBtnMenu", {
      y: 0,
      scrollTrigger: {
        trigger: "#hero-featured",
        start: "250px top",
        endTrigger: "#hero",
        end: "bottom center",
        scrub: 1,
      },
    });

  //SECTION > Contact Form --------
  const formBlur = document.querySelector("#contact-form-container");
  const formContainer = document.querySelector("#contact-form");
  const formCloseBtn = document.querySelector(".close-button-form");
  const formHOpenBtn = document.querySelector("#hiddenBtnContact");
  const formOpenBtn = document.querySelector(".contactBtn");

  //set contact menu fora do ecra

  gsap.set(formContainer, { x: "100%" });
  gsap.set(formBlur, { opacity: 0, x: "100%" });

  let tlContactForm = gsap.timeline({ paused: true });

  tlContactForm
    .to(formBlur, { opacity: 1, x: 0, duration: 0.01 })
    .to(formContainer, { x: 0, duration: 1.3, ease: "power3.out" });

  formOpenBtn.addEventListener("click", () => {
    formBlur.style.backdropFilter = "blur(4px)";
    tlContactForm.play(0);
  });
  formHOpenBtn.addEventListener("click", () => {
    formBlur.style.backdropFilter = "blur(4px)";
    tlContactForm.play(0);
  });

  formCloseBtn.addEventListener("click", () => {
    formBlur.style.backdropFilter = "none";
    gsap.to(formContainer, { x: "100%", duration: 0.7 });
    gsap.to(formBlur, { x: "100%" });
  });

  // SECTION > Footer

  //Navigation links animation

  gsap.set(".footer-a2", { y: "40%" });
}

//desktop
function desktop() {
  console.log("desktop version loaded.");

  //SECTION > Nav dropdown -----------

  //Botoes e links para o menu / toggle
  const navButton = document.querySelector(".navBtn");
  const navButtonContact = document.querySelector(".contactBtn");
  const navButtonClose = document.querySelector("header button.btn");
  const nav = document.querySelector("header");
  const linksNav = document.querySelectorAll("header nav a");

  //Colocamos o nav fora de vista - "-100%"" para responsiveness
  gsap.set(nav, {
    y: "-100%",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  });

  // criamos a timeline do gsap com o menu e os links (setamos o menu fora)
  let tlNav = gsap.timeline({ paused: true });
  tlNav
    .set(linksNav, { y: "100%" })
    .to(nav, {
      y: 0,
      duration: 1.3,
      ease: "power3.out",
    })

    .to(linksNav, { y: 0, duration: 0.6 }, "-=0.6");

  //com click, play the timeline
  navButton.addEventListener("click", () => {
    tlNav.play(0);
  });

  document.querySelector("#hiddenBtnMenu").addEventListener("click", () => {
    tlNav.play(0);
  });

  //voltamos a tirar de vista ao clicar
  navButtonClose.addEventListener("click", () => {
    gsap.to(nav, { y: "-100%", duration: 0.5, ease: "power4.in" });
  });

  //animaçao para os links do nav

  const navLinkContainer = document.querySelectorAll("#nav-links ul li");
  gsap.set(".nav-a2", { y: "20%" });

  // cada elemento li seria o "container" , o anchor dentro do container animado
  navLinkContainer.forEach((cont) => {
    //para cada container seleccionamos o anchor dentro
    const link1 = cont.querySelector(".nav-a1");
    const link2 = cont.querySelector(".nav-a2");

    //evento mouse over (animaçao)
    cont.addEventListener("mouseenter", () => {
      gsap.killTweensOf(link1); //tiramos cualquer stacked animation que tinha (limpa bugs)
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: "-100%", duration: 0.2 });
      gsap.to(link2, { y: "-100%", duration: 0.2 });
    });

    //evento mouse out com reverse
    cont.addEventListener("mouseleave", () => {
      gsap.killTweensOf(link1);
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: 0, duration: 0.1 });

      gsap.to(link2, { y: "20%", duration: 0.1 });
    });
  });

  //policy links

  const navPolicyContainer = document.querySelectorAll("#nav-policy ul li");
  gsap.set(".nav-a4", { y: "20%" });
  navPolicyContainer.forEach((cont) => {
    const link1 = cont.querySelector(".nav-a3");
    const link2 = cont.querySelector(".nav-a4");

    cont.addEventListener("mouseenter", () => {
      gsap.killTweensOf(link1); //tiramos cualquer stacked animation que tinha (limpa bugs)
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: "-100%", duration: 0.2 });
      gsap.to(link2, { y: "-100%", duration: 0.2 });
    });

    //evento mouse out com reverse
    cont.addEventListener("mouseleave", () => {
      gsap.killTweensOf(link1);
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: 0, duration: 0.2 });

      gsap.to(link2, { y: "20%", duration: 0.2 });
    });
  });

  // outra timeline para os buttons do menu

  gsap.set("#hiddenBtnMenu", { y: "200%" });
  gsap.set("#hiddenBtnContact", { y: "200%" });
  gsap.set(".container-btns", { x: "300%" });

  //buttons do flex escondem-se com scroll / background fica

  let tlNavBtns = gsap.timeline();
  tlNavBtns
    //aparecem os buttons position absolute:
    .to(".container-btns", {
      x: 0,
      scrollTrigger: {
        trigger: "#hero-featured",
        start: "50px top",
        endTrigger: "#hero-featured",
        end: "50px top",
        scrub: 0,
      },
    })

    .to("#hiddenBtnContact", {
      y: 0,
      scrollTrigger: {
        trigger: "#hero-featured",
        start: "250px top",
        endTrigger: "#hero",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to("#hiddenBtnMenu", {
      y: 0,
      scrollTrigger: {
        trigger: "#hero-featured",
        start: "250px top",
        endTrigger: "#hero",
        end: "bottom center",
        scrub: 1,
      },
    });

  //SECTION > Contact Form --------
  const formBlur = document.querySelector("#contact-form-container");
  const formContainer = document.querySelector("#contact-form");
  const formCloseBtn = document.querySelector(".close-button-form");
  const formHOpenBtn = document.querySelector("#hiddenBtnContact");
  const formOpenBtn = document.querySelector(".contactBtn");

  //set contact menu fora do ecra

  gsap.set(formContainer, { x: "100%" });
  gsap.set(formBlur, { opacity: 0, x: "100%" });

  let tlContactForm = gsap.timeline({ paused: true });

  tlContactForm
    .to(formBlur, { opacity: 1, x: 0, duration: 0.01 })
    .to(formContainer, { x: 0, duration: 1.3, ease: "power3.out" });

  formOpenBtn.addEventListener("click", () => {
    formBlur.style.backdropFilter = "blur(4px)";
    tlContactForm.play(0);
  });
  formHOpenBtn.addEventListener("click", () => {
    formBlur.style.backdropFilter = "blur(4px)";
    tlContactForm.play(0);
  });

  formCloseBtn.addEventListener("click", () => {
    formBlur.style.backdropFilter = "none";
    gsap.to(formContainer, { x: "100%", duration: 0.7 });
    gsap.to(formBlur, { x: "100%" });
  });

  // SECTION > Footer

  //Navigation links animation

  const footerLinkContainer = document.querySelectorAll(
    "#footer-navigation ul li"
  );
  gsap.set(".footer-a2", { y: "20%" });

  // cada elemento li seria o "container" , o anchor dentro do container animado
  footerLinkContainer.forEach((cont) => {
    //para cada container seleccionamos o anchor dentro
    const link1 = cont.querySelector(".footer-a1");
    const link2 = cont.querySelector(".footer-a2");

    //evento mouse over (animaçao)
    cont.addEventListener("mouseenter", () => {
      gsap.killTweensOf(link1); //tiramos cualquer stacked animation que tinha (limpa bugs)
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: "-100%", duration: 0.2 });
      gsap.to(link2, { y: "-100%", duration: 0.2 });
    });

    //evento mouse out com reverse
    cont.addEventListener("mouseleave", () => {
      gsap.killTweensOf(link1);
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: 0, duration: 0.1 });

      gsap.to(link2, { y: "20%", duration: 0.1 });
    });
  });
}

// INDEX ANIMATIONS

//Desktop
function indexDesktop() {
  //SECTION > Hero > Parallax Effect

  gsap.set("#hero", { y: "-35%" });

  gsap.to("#hero", {
    y: "35%",
    ease: "none",
    scrollTrigger: {
      trigger: "#hero-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  //SECTION > Hero >  Menu --------
  const linkContainer = document.querySelectorAll("#hero-menu ul li");
  gsap.set(".hero-a2", { y: "-20%" });
  gsap.set(".hero-a1", { y: "-28%" });

  // cada elemento li seria o "container" , o anchor dentro do container animado
  linkContainer.forEach((cont) => {
    //para cada container seleccionamos o anchor dentro
    const link1 = cont.querySelector(".hero-a1");
    const link2 = cont.querySelector(".hero-a2");

    //evento mouse over (animaçao)
    cont.addEventListener("mouseenter", () => {
      gsap.killTweensOf(link1); //tiramos cualquer stacked animation que tinha (limpa bugs)
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: "-100%", duration: 0.2 });
      gsap.to(link2, { y: "-128%", duration: 0.2 });
    });

    //evento mouse out com reverse
    cont.addEventListener("mouseleave", () => {
      gsap.killTweensOf(link1);
      gsap.killTweensOf(link2);

      gsap.to(link1, { y: 0, duration: 0.1 });
      gsap.to(link1, { y: "-28%" });

      gsap.to(link2, { y: "-20%", duration: 0.1 });
    });
  });

  //SECTION > Intro to company

  const frasesIntro = document.querySelectorAll(".frases-intro h2");
  const imgIntro = document.querySelector(".text-intro img");
  const textIntro = document.querySelector(".text-intro p");
  const btnIntro = document.querySelector("#intro-about a.btn");

  gsap.set(frasesIntro, {opacity: 0 });
  gsap.set(imgIntro, { x: "150%" });
  gsap.set(textIntro, { x: "-95%", opacity: 0 });
  gsap.set(btnIntro, { x: "-95%", opacity: 0 });

  gsap.to(frasesIntro, {
    opacity: 1,
    scrollTrigger: {
      trigger: "#company-intro",
      start: "top bottom",
      endTrigger: "#company-intro",
      end: "top center",
      scrub: 1,
    },
    stagger: 1,
  });

  gsap.to(imgIntro, {
    x: 0,
    scrollTrigger: {
      trigger: frasesIntro,
      start: "bottom bottom",
      endTrigger: "#our-method",
      end: "top bottom",
      scrub: 1,
    },
  });

  gsap.to(textIntro, {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: frasesIntro,
      start: "bottom bottom",
      endTrigger: "#our-method",
      end: "-100px bottom",
      scrub: 1,
    },
  });
  gsap.to(btnIntro, {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: frasesIntro,
      start: "bottom bottom",
      endTrigger: "#our-method",
      end: "-100px bottom",
      scrub: 1,
    },
  });

 


  //SECTION > METHOD

  const methodText = document.querySelector("#our-method p")
  const methodList = document.querySelector("#our-method div.col-md-5")

  gsap.set(methodText, {y:"-100%", opacity:0})
  gsap.set(methodList, {x:"100%", opacity:0})

  gsap.to(methodText, {
    y:0,
    opacity:1,
    scrollTrigger: {
      trigger: document.querySelector("#intro-about"),
      start: "850px center",
      endTrigger: document.querySelector("#our-method"),
      end: "350px center",
      scrub: 1,

    }
  })
  gsap.to(methodList, {
    x:0,
    opacity:1,
    scrollTrigger: {
      trigger: document.querySelector("#intro-about"),
      start: "850px center",
      endTrigger: document.querySelector("#our-method"),
      end: "350px center",
      scrub: 1,


    }
  })

  //SECTION > Featured Projects

  gsap.set(".featured-title", { opacity: 0 });
  gsap.set(".featured-img", { opacity: 0 });
  let tlFeatured = gsap.timeline();

  tlFeatured
    .to(".featured-title", {
      opacity: 1,
      scrollTrigger: {
        trigger: "#our-method",
        start: "bottom bottom",
        end: "bottom center",
        scrub: 1,
      },
    })
    .to(".featured-img", {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#featured-projects",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });

  // SECTION > TESTIMONIAL

  const testimonialTitle = document.querySelector("#testimonial h2");
  const testimonialText = document.querySelectorAll(".testimonial-text");
  const testimonialPics = document.querySelectorAll(".testimonial-img");
  gsap.set(testimonialTitle, { opacity: 0 });
  gsap.set(testimonialText, { y: "30%", opacity: 0 });
  gsap.set(testimonialPics, { y: "30%", opacity: 0 });

  gsap.to(testimonialTitle, {
    opacity: 1,
    scrollTrigger: {
      trigger: "#featured-projects",
      start: "bottom bottom",
      scrub: 1,
    },
  });
  gsap.to(testimonialText, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#testimonial",
      start: "150px center",
      end: "center center",
      scrub: 1,
    },
  });
  gsap.to(testimonialPics, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#testimonial",
      start: "50px center",
      end: "center center",
      scrub: 1,
    },
  });
}

// Mobile

function indexMobile() {
  //SECTION > Hero > Parallax Effect

  gsap.set("#hero", { y: "-35%" });

  gsap.to("#hero", {
    y: "35%",
    ease: "none",
    scrollTrigger: {
      trigger: "#hero-container",
      start: "top bottom",
      end: "bottom top",
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
//Open or closed 

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