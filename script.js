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

const sec5_images = []

var sec5animprogress = 24;
var sec5text = 0;

//sleep function by miliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sec5anim() {
  let animtime = 24
  let animframes = 96;

  gsap.to(`#sec5-m${sec5text}`, {
    duration: 1,
    color: "#FFFFFF",
    ease: "circ.out",
  })

  sec5text = (sec5text + 1) % 4

  gsap.to(`#sec5-m${sec5text}`, {
    duration: 1,
    color: "#F3BE00",
    ease: "circ.out",
  })

  for(let i = 0; i < 24; i++){
    sec5animprogress = (sec5animprogress + 1) % animframes;
    let element = document.querySelector("#sec5-viewer");
    element.parentNode.replaceChild(sec5_images[sec5animprogress], element)
    await sleep(24);
  }
}

for(let i = 0; i < 96; i++){
  sec5_images[i] = new Image();
  sec5_images[i].id = "sec5-viewer"
  sec5_images[i].src = `assets/b-kudlit/frame_${i}_.png`;
  //onclick of sec5viewer
  sec5_images[i].addEventListener("click", sec5anim)
}

document.addEventListener("DOMContentLoaded", function(event) {
    // you could also use addEventListener() instead
  window.onload = function() {

    let scrolls = document.querySelectorAll(".scroller");
    let offsetY = 0;
    for (let scroller of scrolls) {
      //randomize background position x 
      let dir = Math.random() < 0.5 ? -1 : 1;
      scroller.style.backgroundPositionX = `${gsap.utils.random(0, 863)}px`;
      scroller.style.top = `${offsetY}px`;
      offsetY += 90;
      gsap.to(scroller, {
        backgroundPositionX: `+=${863 * dir}px`,
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

    let sec7images = document.querySelectorAll(".sec7-image");
    console.log(window.innerWidth)

    function clamp(oldMin, oldMax, newMin, newMax, oldValue) {
      newValue = (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin
      return newValue
    }

    // for(let image of sec7images){
    //   gsap.set(image,{
    //     x: gsap.utils.random(0, 100),
    //     y: gsap.utils.random(0, 100),
    //   }

    //   )
    //   gsap.to(image, {
    //     x: `+=${window.innerWidth + image.width}`,
    //     duration: "30",
    //     modifiers: {
    //       x: gsap.utils.unitize(function(x) {
    //         return (x % (window.innerWidth + image.width)) - image.width
    //       })
    //     },
    //     repeat: -1,
    //     ease: "none"
    //   })
    // }

    let sec7image = gsap.timeline({paused:true})
    sec7image.from(".sec7-image", { 
      duration: 2, 
      "clip-path": "polygon(0% 60%, 100% 40%, 100% 40%, 0% 60%)",
      ease: "circ.out",
    });

    //test 

    intro.play();

    gsap.to(".baybayin-circle", {
      duration: 80,
      rotation: 360,
      repeat: -1,
      ease: "none",
    })


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

    let sec6info = document.getElementById("sec6-info")
    function mapAssignHelper(mapPart, langPart, mapColor, info) {
      document.querySelector(mapPart).addEventListener("mouseover", () => {
        gsap.to(mapPart,{
          duration: 1,
          fill: mapColor,
          ease: "circ.out",
        })
        gsap.to(langPart,{
          duration: 1,
          fill: mapColor,
          ease: "circ.out",
        })
        gsap.to("#sec6-info",{
          duration: 1,
          ease: "circ.out",
        })
        let infotl = gsap.timeline()
        infotl.to("#sec6-info",{
          duration: 0.5,
          opacity: 0,
          ease: "circ.inOut",
        })
        infotl.call(() =>{
          sec6info.innerText = info
        })
        infotl.to("#sec6-info",{
          duration: 0,
          y: "-20",
        }, ">")
        infotl.to("#sec6-info",{
          duration: 0.5,
          y: "0",
          opacity: 1,
          ease: "circ.inOut",
        }, ">")
      })
      document.querySelector(mapPart).addEventListener("mouseleave", () => {
        gsap.to(mapPart,{
          duration: 1,
          fill: "#ACACAC",
          ease: "circ.inOut",
        })
        gsap.to(langPart,{
          duration: 1,
          fill: "#ACACAC",
          ease: "circ.inOut",
        })
        let infotl = gsap.timeline()
        infotl.to("#sec6-info",{
          duration: 0.5,
          opacity: 0,
          ease: "circ.inOut",
        })
        infotl.call(() =>{
          sec6info.innerText = "Select a script"
        })
        infotl.to("#sec6-info",{
          duration: 0,
          y: "-20",
        }, ">")
        infotl.to("#sec6-info",{
          duration: 0.5,
          y: "0",
          opacity: 1,
          ease: "circ.inOut",
        }, ">")
      })

    }

    function mapAssign(mapPart, langPart, mapColor, info) {
      mapAssignHelper(mapPart, langPart, mapColor, info)
      mapAssignHelper(langPart, mapPart, mapColor, info)
    }

    mapAssign("#map-l11", "#map-m1", "#0D005C", "Name: Kulitan\nGroup: Kapampangan\nGeography: Central Luzon\nOther Info: Variety of baybayin")
    mapAssign("#map-l6", "#map-m9", "#0D005C", "Name: Baybayin\nGroup: Katagalugan\nGeography: Tagalog Region")
    mapAssign("#map-l12", "#map-m8", "#0D005C", "Name: Basahan\nGroup: Bicolanos\nGeography: Bicol\nOther Info: Variety of baybayin")
    mapAssign("#map-l7", "#map-m2", "#0D005C", "Name: Hanunó'o\nGroup: Mangyan\nGeography: Mindoro\nOther Info: Modern descendant of baybayin")
    mapAssign("#map-l7", "#map-m3", "#0D005C", "Name: Buhid\nGroup: Mangyan\nGeography: Mindoro\nOther Info: Modern descendant of baybayin")
    mapAssign("#map-l1", "#map-m4", "#0D005C", "Name: Tagbanwa\nGroup: Tagbanwa\nGeography: Central and Northern Palawan\nOther Info: Modern descendant of baybayin")
    mapAssign("#map-l5", "#map-m5", "#0D005C", "Name: Jawi\nGroup: Tausug\nGeography: Greater Sulu\nOther Info: Variation of Alibata, there is said to be no evidence that Baybayin reached Mindanao")
    mapAssign("#map-l8", "#map-m6", "#0D005C", "Name: Kirim\nGroup: Maguindanaon\nGeography: Maguindanao\nOther Info: Variation of Alibata, there is said to be no evidence that Baybayin reached Mindanao")
    mapAssign("#map-l4", "#map-m7", "#0D005C", "Name: Badlit\nGroup: Visayan\nGeography: Visayas\nOther Info: Variety of baybayin")
    mapAssign("#map-l9", "#map-m10", "#0D005C", "Name: Kurditan\nGroup: Ilocano\nGeography: Ilocos\nOther Info: Variety of baybayin")
    // document.querySelector("#map-l1").addEventListener("mouseover", () => {
    //   gsap.to("#map-l1",{
    //     duration: 1,
    //     fill: "#ffffff",
    //   })
    
    // })

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

    ScrollTrigger.create({
    
      trigger: ".sec7-image",
      start: "10% 50%",
      end: "90% 50%",
      //toggleActions: "play reverse play reverse",
      onEnter: () => {
        sec7image.timeScale(1.0).play();
        //console.log("e");
      },
      onLeaveBack: () => {
        sec7image.timeScale(5.0).reverse();
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