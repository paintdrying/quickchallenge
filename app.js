let popUp=document.querySelector('.popBox');
    popUp.style.display="none";
//----------------------------------clock feature
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
let time=document.querySelector(".time");

let clockSpan=document.createElement("div");
clockSpan.classList.add("clockArea");
time.appendChild(clockSpan);

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector(".clockArea").innerHTML=h + ":" + m + ":" + s;
    let t = setTimeout(startTime, 500);
  }
startTime() 
 let dateHolder=document.createElement("div");
 dateHolder.classList.add("dateBox");
 let date=new Date(Date.now()).toDateString();
 dateHolder.innerText=date;
 time.appendChild(dateHolder);

 //----------------------------------submitPopUp
 let submitInfoPopup=document.querySelector(".submitPopUp");
 submitInfoPopup.addEventListener('click',function(){
    let popUp=document.querySelector('.popBox');
    popUp.style.display="none"
 })


//=================== ORIGINAL STATE
const origObj={
    id:"123FreddyB",
    firstName:"Bobby",
    lastName:"Bobbson",
    birthday:"03/29/2000",
    email:"bobbyB@gmail",
    jobTitle:"IT"
}
//================= USED ON PUT REQUEST TO GATHER FROM FORM INPUTS

////                     RENDER USER INFO OBJECT TO DOM
document.addEventListener("DOMContentLoaded", function(event) {
   
   
   document.querySelector('.fname').innerText=origObj.firstName;
   document.querySelector('.lname').innerText=origObj.lastName;
   document.querySelector('.email').innerText=origObj.email;
   document.querySelector('.birthdate').innerText=origObj.birthday;
   document.querySelector('.jobtitle').innerText=origObj.jobTitle;

   document.querySelector('.ibirthdate').value=origObj.birthday;  
   document.querySelector('.ifname').value=origObj.firstName; 
   document.querySelector('.ilname').value=origObj.lastName; 
   document.querySelector('.iemail').value=origObj.email; 
   document.querySelector('.ititle').value=origObj.jobTitle; 
  
    });
///                       "OLD WAY" OF DOING THINGS
//----------------------------------------------------------------------------------------------
// const quickHTTP=function(){
//     this.http=new XMLHttpRequest();
//     this.name="original";
// }
// quickHTTP.prototype.put=function(url,data,callback){
//     this.http.open("PUT",url,true);
//     this.http.setRequestHeader("Content-type","application/json");
//     this.http.send(JSON.stringify(data));
//     let self=this;
        //     this.http.onload=function(){
        //         callback(null,self.http.responseText);
        //     }
// }
// let http=new quickHTTP();
// function loadData(){
// http.put("https://jsonplaceholder.typicode.com/posts/1",updateIt(),function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });
// }
//----------------------------------------------------------------------------------------------

//                             NEW
// adding async to function beggining returns Promise  

//can anything that returns promise should be good for .then argument
// async let put function=()=> 
    
let put= async()=>{
    //-------------------------------remove previous validation errors per each requet/refresh

    document.querySelector(".ibirthDate").removeAttribute('style');
    document.querySelector(".iEmail").removeAttribute('style');
    document.querySelector(".ifname").removeAttribute('style');
    document.querySelector('.ititle').removeAttribute('style');
    document.querySelector(".fname").removeAttribute('style');
    let bdayLabel=document.querySelector(".birthdateLableErr")
    bdayLabel.removeAttribute('style');
    bdayLabel.innerText="Birthdate";
    let emailLable= document.querySelector(".emailLableErr");
    emailLable.removeAttribute('style');
    emailLable.innerText="Email";
    let fnameLable=document.querySelector(".fnameLableErr");
    fnameLable.removeAttribute('style');
    fnameLable.innerText="First Name";
    let lnameLabel=document.querySelector(".lnameLableErr");
    lnameLabel.removeAttribute('style');
    lnameLabel.innerText="Last Name";
    let jobTitleLable= document.querySelector(".jobTitleLableErr");
    jobTitleLable.removeAttribute('style');
    jobTitleLable.innerText="Job Title";
  // --------------------------------Name and JobTitle Validation---------------------------------
  //ifname ilname .ititle
       var potentiallyEmptyFields=document.querySelectorAll(".mustfill");
       potentiallyEmptyFields.forEach(function(item,iter,array){
           if(array[iter].value===""){
                 array[iter].style="border:3px solid red";
                 array[iter].previousElementSibling.style="color:red"; 
                 array[iter].previousElementSibling.innerText="Please fill out this field";
           }
       })
       if(document.querySelector(".ifname").value===""){
            return "FIRSTNAME"
       }
       else if(document.querySelector(".ilname").value===""){
        return "LASTNAME"
       }
       else if(document.querySelector(".ititle").value===""){
           return "TITLE"
       }
  //---------------------------------Birthday Validation------------------------------------------------------
    let birthDate=new Date(document.querySelector(".ibirthdate").value); 
    let calculateAge=function(birthday) {                  // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);                  // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    if (calculateAge(birthDate) <=18){
      return "YOUNG";
    }
  //---------------------------------Email Validation-------------------------------------------------
  
    let emailValue=document.querySelector(".iemail").value;
    function validateEmail(emailValue) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailValue).toLowerCase());
    }
    if(validateEmail(emailValue)===false||""){
        console.log("email was false")
        return "EMAIL";    
    }
//---------------------------------------------------------------------------------------------
    let updateIt= {
        id: origObj.id,
        email: document.querySelector('.iemail').value,
        firstName: document.querySelector('.ifname').value,
        lastName: document.querySelector('.ilname').value,
        jobTitle: document.querySelector('.ititle').value,
        birthday: document.querySelector('.ibirthdate').value
     }
      //----could call a return before getting to final piece here 
      const response=await fetch("https://hookb.in/9X8EqV7bpNtENEeQnZpq",{
          method:'PUT',
          headers:{
              "Content-type":"application/json"     //no-cors
                 },
          body:JSON.stringify(updateIt)
      });
      const resDataJson=await response.json();

      return [resDataJson,JSON.stringify(updateIt)];   // I think that async calls the resolve from new 
                            //Promise here,when ever there is an returned value
    }
    //---------------------------------------------------------------------
 
    document.querySelector('.button').addEventListener('click',()=>{put().then(function(data){
        if(data==="YOUNG"){
            let bDayBox=document.querySelector(".ibirthDate");            //BOX BORDER
                bDayBox.style="border:3px solid red";
            let bDayMsg=document.querySelector(".birthdateLableErr");     //TEXT ERROR
                bDayMsg.style="color:red;font-weight:bold;";
                bDayMsg.innerText="Must be at least 18 years old to submit this form...";
        }else if(data==="EMAIL"){
            let emailBox =document.querySelector(".iEmail");
                emailBox.style="border:3px solid red";
            let emailMsg=document.querySelector(".emailLableErr");
                emailMsg.style="color:red;font-weight:bold;";
                emailMsg.innerText="Invalid Email format... Please correct";
        }else if(data==="FIRSTNAME"){
            let fnameBox= document.querySelector(".ifname");
                fnameBox.style="border:3px solid red";
            let fnameMsg=document.querySelector(".fnameLableErr");
                fnameMsg.style="color:red;font-weight:bold;";
                fnameMsg.innerText="Please fill out the first name field";
        }else if(data==="LASTNAME"){
            let  lnameBox=document.querySelector(".ilname");
                lnameBox.style="border:3px solid red";
            let lnameMsg=document.querySelector(".lnameLableErr");
                lnameMsg.style="color:red;font-weight:bold;";
                lnameMsg.innerText="Please fill out the last name field";
        }else if(data==="TITLE"){
            let titleBox=document.querySelector(".ititle");
                titleBox.style="border:3px solid red";
            let titleMsg=document.querySelector(".jobTitleLableErr");
                titleMsg.style="color:red;font-weight:bold;";
                titleMsg.innerText="Please fill out the Job Title field";
        }else{
            let dataParsed=JSON.parse(data[1]);
            console.log(dataParsed)
            // data passed is array promise returned contains succesfull response object from fetch as well as obj of items passed to fake API


            function finalizeData(pb,cb){
                pb();
              let submitPopUp=document.querySelector('.submitPopUp');
              submitPopUp.addEventListener('click',function(){
                cb();
              })
            }
            function pobUpBoxSetUp(){
                let popUp=document.querySelector('.popBox');
                document.querySelector(".popupFname").innerText=dataParsed.firstName;            ///popupLname    popupEmail  jobTitle   birthdate
                document.querySelector(".popupLname").innerText=dataParsed.lastName;
                document.querySelector(".popupEmail").innerText=dataParsed.email;
                document.querySelector(".popupJobTitle").innerText=dataParsed.jobTitle;
                document.querySelector(".popupBirthdate").innerText=dataParsed.birthday;
                popUp.style.display="flex";
                
            }
            function updateUser(){
              document.querySelector(".fname").innerText=dataParsed.firstName;
              document.querySelector(".lname").innerText=dataParsed.lastName; 
              document.querySelector(".email").innerText=dataParsed.email; 
              document.querySelector(".jobtitle").innerText=dataParsed.jobTitle;
              document.querySelector(".birthdate").innerText=dataParsed.birthday;
            }

            finalizeData(pobUpBoxSetUp,updateUser);
        }
    },function(error){ console.log(put()); console.log("this is err" + error)}  //  not quite sure how the "reject" could be called in the async function which fires the 2nd function of .then      
    )                                                                            //....seems to fire if any error is found in the asyn fn() and wrap it in promise
});
    