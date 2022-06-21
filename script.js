gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

(function() {
  const blurProperty = gsap.utils.checkPrefix("filter"),
        blurExp = /blur\((.+)?px\)/,
        getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

  gsap.registerPlugin({
    name: "blur",
    get(target) {
      return +(getBlurMatch(target)[1]) || 0;
    },
    init(target, endValue) {
      let data = this,
          filter = gsap.getProperty(target, blurProperty),
          endBlur = "blur(" + endValue + "px)",
          match = getBlurMatch(target)[0],
          index;
      if (filter === "none") {
        filter = "";
      }
      if (match) {
        index = filter.indexOf(match);
        endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
      } else {
        endValue = filter + endBlur;
        filter += filter ? " blur(0px)" : "blur(0px)";
      }
      data.target = target; 
      data.interp = gsap.utils.interpolate(filter, endValue); 
    },
    render(progress, data) {
      data.target.style[blurProperty] = data.interp(progress);
    }
  });
})();

//preload images from assets/anitypo

const images = []

for(let i = 0; i < 48; i++){
  images[i] = new Image();
  images[i].id = "sec4-viewer"
  images[i].src = `assets/glyphs/glyphs_${i}_.png`;
  // images.push(`assets/glyphs/glyphs_${i}_.png`)
}

document.addEventListener("DOMContentLoaded", function(event) {
    // you could also use addEventListener() instead
  window.onload = function() {

    let scrolls = document.querySelectorAll(".scroller");
    let offsetY = 0;
    for (let scroller of scrolls) {
      //randomize background position x 
      let dir = Math.random() < 0.5 ? -1 : 1;
      scroller.style.backgroundPositionX = `${gsap.utils.random(0, 853)}px`;
      scroller.style.top = `${offsetY}px`;
      offsetY += 90;
      gsap.to(scroller, {
        backgroundPositionX: `+=${853 * dir}px`,
        duration: gsap.utils.random(40, 80),
        ease:Linear.easeNone,
        repeat: -1,
      });
    }

    let intro = gsap.timeline({paused: true});
    intro.from("#sec1-box", {
      scale: 1.5, 
      opacity: 0,
      blur: 8,
      duration: 2, 
      ease: "circ.out"
    });
    intro.from("#sec1-title", {
      text: "", 
      duration: 2,
      ease: "circ.out"
    }, ">");
    intro.from("#sec1-subtitle", {
      scale: 1.5, 
      opacity: 0,
      blur: 8,
      duration: 2, 
      ease: "circ.out"
    }, "<50%");

    intro.play();

    let scrollers = document.querySelectorAll(".scrollerbody");
    for (let scroller of scrollers) {
      //randomize background position x 
      scroller.style.backgroundPositionX = `${gsap.utils.random(0, 853)}px`;
      gsap.to(scroller, {
        backgroundPositionX: "+=853px",
        duration: gsap.utils.random(40, 80),
        ease:Linear.easeNone,
        repeat: -1,
      });
    }

    let sec2hand = gsap.timeline({paused: true});
    sec2hand.from("#sec2-hand", {
      scale: 1.5,
      y: "+=300",
      x: "-=300",
      opacity: 0,
      blur: 8,
      duration: 1, 
      ease: "circ.inOut"
    });
    sec2hand.to("#sec2-hand", {
      x: "+=203",
      duration: 1, 
      ease: "circ.inOut"
    }, ">");
    sec2hand.from("#sec2-line", {
      width:0,
      duration: 1, 
      ease: "circ.inOut"
    }, "<");
    sec2hand.to("#sec2-hand", {
      scale: 1.5,
      y: "+=300",
      x: "+=300",
      opacity: 0,
      blur: 8,
      duration: 1, 
      ease: "circ.inOut"
    }, ">");

    let sec3cross = gsap.timeline({paused: true});
    sec3cross.from("#sec3-cross", {
      scale: 1.5,
      opacity: 0,
      blur: 8,
      stagger: 0.15,
    })

    let titles = gsap.utils.toArray('.title');
    
    titles.forEach(title => {
      let tl = gsap.timeline({paused: true});
      tl.from(title, {
        x: "-=300",
        opacity: 0,
        blur: 8,
        duration: 1,
        ease: "circ.out"
      });
      console.log(title.querySelectorAll(".title-baybayin")[0]);
      tl.from(title.querySelectorAll(".title-baybayin")[0], {
        text: "", 
        ease: "circ.out",
        duration: 1,
      },">");

      ScrollTrigger.create({
    
        trigger: title,
        start: "10% 50%",
        end: "90% 50%",
        //toggleActions: "play reverse play reverse",
        onEnter: () => {
          tl.timeScale(1.0).play();
          //console.log("e");
        },
        onLeaveBack: () => {
          tl.timeScale(5.0).reverse();
          //console.log("lb");
        },
        markers: false
      })
    })

    

    var frame_count = 47,
    offset_value = 1000;

    console.log(images)

    // gsap.to("#sec4-viewer", {
    //   num: frame_count,
    //   backgroundPosition: (-offset_value * frame_count) + "px 0px",
    //   ease: "steps(" + frame_count + ")",
    //   duration: 3,
    //   scrollTrigger: {
    //     trigger: ".sec4",
    //     start: "top 50%",
    //     end: "50% 50%",
    //     scrub: true,
    //     markers: true,
    //   }
    // });

    // gsap.to("#sec4-viewer", {
      
    //   ease: "steps(" + frame_count + ")",
    //   attr: {
    //     src: `assets/glyphs/glyphs_${frame_count}_.png`,
    //   },
    //   duration: 3,
    //   scrollTrigger: {
    //     trigger: ".sec4",
    //     start: "-20% 50%",
    //     end: "50% 50%",
    //     scrub: true,
    //     // markers: true,
    //   }
    // });

    // gsap.to("#sec4-viewer", {
      
    //   ease: "steps(" + frame_count + ")",
    //   // attr: {
    //   //   src: `assets/glyphs/glyphs_${frame_count}_.png`,
    //   // },
    //   onUpdate: function() {
    //     console.log(this.progress())
    //   },
    //   duration: 3,
    // });

    gsap.to("#sec4-viewer", {
      
      ease: "steps(" + frame_count + ")",
      duration: 3,
    });

    ScrollTrigger.create({
      trigger: ".sec4",
      start: "-20% 50%",
      end: "50% 50%",
      scrub: true,
      onUpdate: self => {
        let sec4viewer = document.querySelector("#sec4-viewer");
        let frame = Math.floor(self.progress * frame_count);
        sec4viewer.parentNode.replaceChild(images[frame], sec4viewer)
        //convert self.progress to frame number
        
      },
    })

    gsap.to(".scroller-footer", {
      backgroundPositionX: "+=853px",
      duration: 40,
      ease:Linear.easeNone,
      repeat: -1,
    });

    //SCROLL TRIGGERS
    
    ScrollTrigger.create({
    
      trigger: ".sec2",
      start: "10% 50%",
      end: "90% 50%",
      //toggleActions: "play reverse play reverse",
      onEnter: () => {
        sec2hand.timeScale(1.0).play();
        //console.log("e");
      },
      onLeaveBack: () => {
        sec2hand.timeScale(5.0).reverse();
        console.log("lb");
      },
      markers: false
    
    })

    ScrollTrigger.create({
    
      trigger: ".sec3",
      start: "10% 50%",
      end: "90% 50%",
      //toggleActions: "play reverse play reverse",
      onEnter: () => {
        sec3cross.timeScale(1.0).play();
        //console.log("e");
      },
      onLeaveBack: () => {
        sec3cross.timeScale(5.0).reverse();
        //console.log("lb");
      },
      markers: false
    
    })
    
  };

});


// var frame_count = 47,
// offset_value = 1000;

// gsap.to("#sec4-viewer", {
//   num: frame_count,
//   backgroundPosition: (-offset_value * frame_count) + "px 0px",
//   ease: "steps(" + frame_count + ")",
//   duration: 3,
//   scrollTrigger: {
//     trigger: ".sec4",
//     start: "top 50%",
//     end: "50% 50%",
//     scrub: true,
//     markers: true,
//   }
// });