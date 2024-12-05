 // Register ScrollTrigger plugin
 gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

 // Select all text elements
 const texts = document.querySelectorAll(".text");

 // Loop through each text element
 texts.forEach((text, index) => {
   // Focus Animation
   gsap.fromTo(
     text,
     {
       opacity: 0.7,
       scale: 0.5,
       ease: "power2.out", // Smooth focus animation
       y: 10, // Start slightly below
     },
     {
       opacity: 1,
       scale: 1.7,
       y: 0,
       duration: 1,
       ease: "power2.out", // Smooth focus animation
       scrollTrigger: {
         trigger: text, // Trigger animation when this element enters the viewport
         start: "top 55%", // Animation starts when the top of the element is 85% of the viewport height
         end: "top 33%", // Animation ends when the top of the element is 55% of the viewport height
         scrub: 1, // Smooth animation tied to scroll position
       },
     }
   );
     // Unfocus Animation
   gsap.fromTo(
     text,
     {
       opacity: 0.7,
       scale: 1.4,
       ease: "power2.out", // Smooth unfocus animation
       y: 0, // Start from its current position
     },
     {
       opacity: 0,
       scale: 0,
       y: -10, // Move slightly upward
       duration: 1,
       ease: "power2.out", // Smooth unfocus animation
       scrollTrigger: {
         trigger: text, // Trigger animation when this element leaves the viewport
         start: "top 33%", // Animation starts when the top of the element is 55% of the viewport height
         end: "top 0%", // Animation ends when the top of the element is 10% of the viewport height
         scrub: 1, // Smooth animation tied to scroll position
       },
     }
   );
 });

 // Pin the image during scrolling
 ScrollTrigger.create({
   trigger: ".container", // Trigger when the container starts scrolling
   start: "top 20%", // Pin image when it reaches the top of the viewport
   end: "bottom top", // Unpin image when the container's bottom reaches the top of the viewport
   pin: ".image-container", // Pin the image container
   pinSpacing: false, // Prevent extra space when unpinning
   scrub: false, // No scrub for pinning
 });

 gsap.to(window, {
   duration: 1,
   scrollTo: "top", // Scroll to top with custom speed
   ease: "power2.out", // Ease function for smooth scroll
   delay: 0.5, // Optional delay before scroll
 });