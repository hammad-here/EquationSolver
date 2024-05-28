let state = "";//indicates which form is opened

//html tags for linear form
const linear = `<input type="number" name="a" placeholder="a" autofocus><label for="a">X+</label>
<input type="number" name="b" placeholder="b"><label for="b">=0</label>`

//html tags for quadratics form
const quad=`<input type="number" name="a" placeholder="a" autofocus><label for="a">X<sup>2</sup>+</label>
<input type="number" name="b" placeholder="b"><label for="b">X+</label>
<input type="number" name="c" placeholder="c"><label for="c">=0</label>`

//html tags for cubic form
const cubic=`  <input type="number" name="a" placeholder="a" autofocus><label for="a">X<sup>3</sup>+</label>
<input type="number" name="b" placeholder="b"><label for="b">X<sup>2</sup>+</label>
<input type="number" name="c" placeholder="c"><label for="c">X+</label>
<input type="number" name="d" placeholder="d"><label for="d">=0</label>`

//making navigation button usuable
Array.from(document.getElementsByClassName("eqt")).forEach(e=> {
   e.addEventListener("click",(val)=>{
     try {
     document.getElementsByTagName("form")[0].remove()
      }catch (err) {
     }
     //ubdating state
    let eqt = (()=>{
    if(val.srcElement.id=="linear"){
        state="linear"
        return linear
    }else if(val.srcElement.id=="quad"){
        state="quadratic"
        return quad
    }else{
        state="cubic"
        return cubic
    }
    })()
    //creating form
    const form = document.createElement("form")
    document.getElementsByTagName("body")[0].append(form)
        form.innerHTML=
        `<h5>WRITE  ${state.toLocaleUpperCase()}  EQUATION </h5>
        ${eqt} 
        <div id="answer">X=${""}</div>
        <button id="solve" type="button">solve</button>`;
     document.getElementById("solve").addEventListener("click",(e)=>{
          document.getElementById("answer").innerText= "X = "+(calculate())
        })
    })
});

//calculations
function calculate(){
    let a,b,c,d;
    try{    
        a = Number(document.getElementsByName("a")[0].value)
        b = Number(document.getElementsByName("b")[0].value)
        c = Number (document.getElementsByName("c")[0].value)
        d = Number (document.getElementsByName("d")[0].value)
    }catch(err){     
    }
    //selecting calculation function based on state
   if(state=="linear"){
    return (-b/a).toFixed(2);
   }else if(state=="quadratic"){
     return quad(a,b,c)
   }else{
    return cubic() 
   }
   // fucntion solving quadratics equation
    function quad(a,b,c){
       let diff = (b**2)-(4*a*c);
       let second = (Math.sqrt(Math.abs(diff))/(2*a))
       let real = (-b/(2*a));
        if(diff>=0){   
           return `${(real +second).toFixed(2)} , ${(real-second).toFixed(2)}`
        }else{
            return `${real==0?"":real.toFixed()}+${second.toFixed(2)}i , ${real==0?"":real.toFixed(2)}-${second.toFixed(2)}i`
        }
    }
    //function solving cubic equation
    function cubic(){
        // the fucntion which check if the number is a root
        function checking(num){
            return !(a*(num**3)+b*(num**2)+c*num + +d)
        }
    // guessing random number  
    let root=0;
    let i=0
        while(!root && i<=9999){
            if(checking(i)){
                root=i
            }else if(checking(-i)){
                root=-i   
            }else if(i==9999){
                root="doesn't exist"
            }
            i++
        } 
    //changing cubic to quadratic equation if 1 root is found
        if(root!="doesn't exist"&&(root*((root*((root*a)+b))+c)+d)==0){
            b=a*root+b
            c=b*root+c
            return `${quad(a,b,c)} , ${root}`
            }
        else{
            return root
        }
  }
}

//array of different themes
let themes = [
    "linear-gradient(to right,rgb(0, 229, 255),rgb(255, 63, 95))",
    "rgb(193, 206, 219)",
    "linear-gradient(to right,#C6EA8D, #FE90AF)",
    "linear-gradient(to right,#18A5A7,#BFFFC7)"
]

let btn=1;//theme of the theme btn
let body=0;//theme of the background

//changing theme whenever theme button is pressed
document.getElementById("theme").addEventListener("click",()=>{
    document.body.style.background = themes[body]
    document.getElementById("theme").style.background = themes[btn];
   btn = btn==themes.length-1?0:btn+1
   body = body==themes.length-1?0:body+1
})