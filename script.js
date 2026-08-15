let start_button=document.querySelector("div button#start_button");
let stop_button=document.querySelector("div button#stop_button");
let combos=["1","2","1 2","1 1 2", "1 2 3", "1 2 3 2","block","parry", "slip","1 2 slip 2"]


function output_combo(){
    let combo=new SpeechSynthesisUtterance(combos[Math.floor(Math.random()*10)]);
    combo.rate=4;
    speechSynthesis.speak(combo);
}

function interval_output_combo(){
    let interval=Math.random()*3000;
    start_interval=setTimeout(()=>{
        console.log(interval);
        output_combo();
        interval_output_combo();
    },interval);
    
}

start_button.addEventListener("click",()=>{
    interval_output_combo();
})

stop_button.addEventListener("click",()=>{
    clearTimeout(start_interval);
})