const roles = [

"Data Analyst",

"SQL Enthusiast",

"Power BI Developer"

];

let roleIndex = 0;

let charIndex = 0;

let typing = document.querySelector(".typing");

function type(){

    if(charIndex < roles[roleIndex].length){

        typing.innerHTML += roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(type,120);

    }

    else{

        setTimeout(erase,1500);

    }

}

function erase(){

    if(charIndex>0){

        typing.innerHTML=roles[roleIndex].substring(0,charIndex-1);

        charIndex--;

        setTimeout(erase,60);

    }

    else{

        roleIndex++;

        if(roleIndex>=roles.length){

            roleIndex=0;
        }

        setTimeout(type,300);

    }

}
function openCertificate(src){

    document.getElementById("popup-image").src = src;

    document.getElementById("certificate-popup").style.display = "flex";

}

function closeCertificate(){

    document.getElementById("certificate-popup").style.display = "none";

}
window.onclick = function(event){

    const popup = document.getElementById("certificate-popup");

    if(event.target === popup){

        popup.style.display = "none";

    }

}
type();

window.addEventListener("scroll",()=>{

let scrollTop=document.documentElement.scrollTop;

let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

let progress=(scrollTop/height)*100;

document.getElementById("progress-bar").style.width=progress+"%";

});
