/*==================================================
            MOBILE MENU
==================================================*/

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

    menuBtn.innerHTML = navbar.classList.contains("active")
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-3-line"></i>';
});


/*==================================================
            TYPING ANIMATION
==================================================*/

const typingElement = document.querySelector(".typing-text");

const words = [
    "Computer Science Graduate",
    "Aspiring Software Developer",
    "Frontend Developer",
    "Python Enthusiast",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;
        }

    }

    else{

        typingElement.textContent =
            currentWord.substring(0,charIndex-1);

        charIndex--;

        if(charIndex===0){

            deleting=false;

            wordIndex++;

            if(wordIndex>=words.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(typeEffect,deleting?45:90);

}

typeEffect();


/*==================================================
            STICKY NAVBAR
==================================================*/

window.addEventListener("scroll",()=>{

    const header=document.querySelector(".header");

    header.classList.toggle("sticky",window.scrollY>80);

});


/*==================================================
            SCROLL REVEAL
==================================================*/

const reveals=document.querySelectorAll(
".about,.skills,.projects,.education,.contact,.project-card,.skill-card,.education-card"
);

function revealElements(){

    const trigger=window.innerHeight-120;

    reveals.forEach((element)=>{

        const top=element.getBoundingClientRect().top;

        if(top<trigger){

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealElements);

revealElements();


/*==================================================
        STAGGER SKILL ANIMATION
==================================================*/

const skillCards=document.querySelectorAll(".skill-card");

const skillObserver=new IntersectionObserver(

(entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

skillCards.forEach((card,index)=>{

setTimeout(()=>{

card.style.opacity="1";

card.style.transform="translateY(0)";

},index*120);

});

}

});

},

{

threshold:.35

}

);

const skillsSection = document.querySelector(".skills");

if (skillsSection) {
    skillObserver.observe(skillsSection);
}



/*==================================================
        ACTIVE NAVIGATION
==================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

const sectionHeight=section.offsetHeight;

if(window.scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*==================================================
        CLOSE MOBILE MENU
==================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

navbar.classList.remove("active");

menuBtn.innerHTML='<i class="ri-menu-3-line"></i>';

});

});
/*==================================================
            SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    });

});


/*==================================================
            HERO IMAGE TILT EFFECT
==================================================*/

const heroImage = document.querySelector(".hero-image");

if(heroImage){

heroImage.addEventListener("mousemove",(e)=>{

const rect = heroImage.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateY = (x - rect.width/2)/30;

const rotateX = -(y - rect.height/2)/30;

heroImage.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
`;

});

heroImage.addEventListener("mouseleave",()=>{

heroImage.style.transform="perspective(1000px) rotateX(0) rotateY(0)";

});

}


/*==================================================
            PARALLAX GLOW
==================================================*/

window.addEventListener("mousemove",(e)=>{

const glow=document.querySelector(".circle-glow");

if(!glow) return;

const x=(window.innerWidth/2-e.clientX)/60;

const y=(window.innerHeight/2-e.clientY)/60;

glow.style.transform=`translate(${x}px,${y}px)`;

});


/*==================================================
            PROJECT CARD HOVER
==================================================*/

const projectCards=document.querySelectorAll(".project-card");

projectCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-15px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});


/*==================================================
            BUTTON RIPPLE EFFECT
==================================================*/

/*document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";
ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.classList.add("ripple");

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

let ripple=document.createElement("span");

ripple.classList.add("ripple");

this.appendChild(ripple);

let x=e.clientX-this.offsetLeft;

let y=e.clientY-this.offsetTop;

ripple.style.left=x+"px";

ripple.style.top=y+"px";

setTimeout(()=>{

ripple.remove();

},600);

});

});


const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_b7s3usv",
        "template_flwugvi",
        this
    )
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch((error) => {
        alert("Failed to send message.");
        console.log(error);
    });
});