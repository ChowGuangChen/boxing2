let start_button=document.querySelector("div button#start_button");
let stop_button=document.querySelector("div button#stop_button");
let speed_value=document.querySelector("span#speed_value")
let min_interval_value=document.querySelector("span#min_interval_value");
let max_interval_value=document.querySelector("span#max_interval_value");
let add_combo_button=document.querySelector("div#combos button#add_combo")
let combos_div=document.querySelector("div#combos");

// let combos=["1","2","1 2","1 1 2", "1 2 3", "1 2 3 2","block","parry", "slip","1 2 slip 2"]
let combos=["1","1 2"];
let start_interval;
let speed=1;
let interval_slider_lower_value=0;
let interval_slider_upper_value=5;
let min_interval=0; 
let max_interval=5;


function outputCombo(){
    let combo=new SpeechSynthesisUtterance(combos[Math.floor(Math.random()*combos.length)]);
    combo.rate=speed;
    speechSynthesis.speak(combo);
    combo.onend=()=>{
        intervalOutputCombo();
    }
}

function intervalOutputCombo(){
    let interval=(Math.random()*1000*(max_interval-min_interval))+(min_interval*1000);
    console.log(`interval:${interval}
min:${min_interval}
max:${max_interval}`);
    start_interval=setTimeout(()=>{
        outputCombo();;
    },interval);
    
}

function updateSpeedSliderValue(slider_value){
    speed=slider_value; 
    speed_value.textContent=slider_value;
}

function updateIntervalSliderUpperValue(slider_value){
    interval_slider_upper_value=Number(slider_value);
    if (interval_slider_upper_value>interval_slider_lower_value){
        max_interval=interval_slider_upper_value;
        min_interval=interval_slider_lower_value;
    }else{
        max_interval=interval_slider_lower_value;
        min_interval=interval_slider_upper_value;
    }
    max_interval_value.textContent=max_interval;
    min_interval_value.textContent=min_interval;

}

function updateIntervalSliderLowerValue(slider_value){
    interval_slider_lower_value=Number(slider_value);
    if (interval_slider_upper_value>interval_slider_lower_value){
        max_interval=interval_slider_upper_value;
        min_interval=interval_slider_lower_value;
    }else{
        max_interval=interval_slider_lower_value;
        min_interval=interval_slider_upper_value;
    }   
    max_interval_value.textContent=max_interval;
    min_interval_value.textContent=min_interval; 
}

function createComboBox(){
    let combobox=document.createElement("div");
    combobox.classList.add("combo_box");
    combobox.innerHTML=`<input type="checkbox" class="combo_checkbox">
                        <input type="text" placeholder="type a combo" class="combo_textbox">
                        <button class="delete_combo">delete</button>`
    combos_div.insertBefore(combobox,add_combo_button);
}

start_button.addEventListener("click",()=>{
    intervalOutputCombo();
})

stop_button.addEventListener("click",()=>{
    clearTimeout(start_interval);
    speechSynthesis.cancel();
})

add_combo_button.addEventListener("click",createComboBox);

combos_div.addEventListener("click",(e)=>{
    if (e.target.matches("button.delete_combo")){
        let combobox=e.target.closest("div.combo_box");
        let textbox_value=combobox.querySelector("input.combo_textbox").value;
        combobox.remove();/**remove combo box from html page */
        combos.splice(combos.indexOf(textbox_value),1);/**remove the combo from js array */
        console.log(combos);
    }else if(e.target.matches("input.combo_checkbox")){
        let combobox=e.target.closest("div.combo_box");
        let textbox_value=combobox.querySelector("input.combo_textbox").value;
        if(e.target.checked==true){
            combos.push(textbox_value);/**add combo to array */
        }else{
            combos.splice(combos.indexOf(textbox_value),1);/**remove the combo from js array */
        }
        console.log(combos);
    }else if(e.target.matches("input.combo_textbox")){
        let combobox=e.target.closest("div.combo_box");
        let textbox_value=combobox.querySelector("input.combo_textbox").value;
        let textbox=combobox.querySelector("input.combo_textbox");
        textbox.addEventListener("change",()=>{
            let new_textbox_value=textbox.value;
            combos.splice(combos.indexOf(textbox_value),1,new_textbos_value);
        })
        console.log(combos);
    }
})