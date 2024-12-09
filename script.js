// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scroll-container"),
  smooth: true,
  lerp: 0.01,
});

// Update ScrollTrigger with Locomotive Scroll
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".scroll-container", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".scroll-container").style.transform
    ? "transform"
    : "fixed",
});

// Pin the image during scrolling
ScrollTrigger.create({
  trigger: ".scroll-container",
  scroller: ".scroll-container",
  start: "top top",
  end: "bottom bottom",
  pin: ".image-container",
});

// Animate text elements
const texts = document.querySelectorAll(".text");
const images = document.querySelectorAll(".pinned-image");
var tl1 = gsap.timeline();

images.forEach((img, index) => {
  img.style.zIndex = 8 - index;
  img.style.opacity = 0;
});

function instance(incoming, outgoing) {
  tl1.fromTo(
    texts[incoming],
    {
      opacity: 0,
      scale: 0.5,
      y: 10,
    },
    {
      opacity: 1,
      scale: 2,
      y: 0,
      scrollTrigger: {
        trigger: texts[incoming],
        scroller: ".scroll-container", // Use Locomotive Scroll's scroller
        start: "top 45%",
        end: "top 25%",
        scrub: 1,
        action: "play reverse play reverse",
      },
    }
  );
  tl1.fromTo(
    images[outgoing],
    {
      y: 100,
      opacity: 0,
    },
    {
      y: -50,
      opacity: 1,
      scrollTrigger: {
        trigger: texts[incoming],
        scroller: ".scroll-container", // Use Locomotive Scroll's scroller
        start: "top 45%",
        end: "top 20%",
        scrub: 3,
        action: "play reverse play reverse",
      },
    }
  );
  tl1.fromTo(
    images[outgoing],
    {
      opacity: 1,
    },
    {
      y: -350,
      opacity: 0,
      scrollTrigger: {
        trigger: texts[incoming],
        scroller: ".scroll-container", // Use Locomotive Scroll's scroller
        start: "top 18%",
        end: "top 5%",
        scrub: 3,
        action: "play reverse play reverse",
      },
    }
  );
  // Unfocus animation
  tl1.fromTo(
    texts[outgoing],
    {
      opacity: 1,
      scale: 2,
      y: 0,
    },
    {
      opacity: 0,
      scale: 0.5,
      y: -10,
      duration: 1,
      scrollTrigger: {
        trigger: texts[incoming],
        scroller: ".scroll-container", // Use Locomotive Scroll's scroller
        start: "top 45%",
        end: "top 10%",
        scrub: 1,
        action: "play reverse play reverse",
      },
    }
  );
}

instance(1, 0);
instance(2, 1);
instance(3, 2);
instance(4, 3);
instance(5, 4);
instance(6, 5);

// Refresh ScrollTrigger and Locomotive Scroll
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
