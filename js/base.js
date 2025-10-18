gsap.registerPlugin(ScrollTrigger);

//BASE ANIMATIONS

//Create match media to separate the animations for each breakpoint (tablet is fine with the desktop animations)

let mm = gsap.matchMedia();

//media queries

mm.add("(min-width: 601px)", () => {
  desktop();

  return () => {
    killAllTweens();
  };
});

mm.add("(max-width:600px)", () => {
  mobile();

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
  const navButtonClose = document.querySelector("#navbar button.btn");
  const nav = document.querySelector("#navbar");
  const linksNav = document.querySelectorAll("#navbar nav a");

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
        trigger: "#top-nav",
        start: "50px top",
        scrub: 0,
      },
    })

    .to("#hiddenBtnContact", {
      y: 0,
      scrollTrigger: {
        trigger: "#top-nav",
        start: "50px top",
        scrub: 1,
      },
    })
    .to("#hiddenBtnMenu", {
      y: 0,
      scrollTrigger: {
        trigger: "#top-nav",
        start: "50px top",
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



  //SECTION > Top Menu -----------

  const linkContainer = document.querySelectorAll("#top-menu ul li");
  gsap.set(".top-a2", { y: "-20%" });
  gsap.set(".top-a1", { y: "-28%" });

  // cada elemento li seria o "container" , o anchor dentro do container animado
  linkContainer.forEach((cont) => {
    //para cada container seleccionamos o anchor dentro
    const link1 = cont.querySelector(".top-a1");
    const link2 = cont.querySelector(".top-a2");

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

  //SECTION > Nav dropdown -----------

  //Botoes e links para o menu / toggle
  const navButton = document.querySelector(".navBtn");
  const navButtonContact = document.querySelector(".contactBtn");
  const navButtonClose = document.querySelector("#navbar button.btn");
  const nav = document.querySelector("#navbar");
  const linksNav = document.querySelectorAll("#navbar nav a");

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
        trigger: "#top-nav",
        start: "50px top",
        scrub: 0,
      },
    })

    .to("#hiddenBtnContact", {
      y: 0,
      scrollTrigger: {
        trigger: "#top-nav",
        start: "50px top",
        scrub: 1,
      },
    })
    .to("#hiddenBtnMenu", {
      y: 0,
      scrollTrigger: {
        trigger: "#top-nav",
        start: "50px top",
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




