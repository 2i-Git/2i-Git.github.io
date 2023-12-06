
var formURL = "https://1d7z7cou98o.typeform.com/to/m0NHw2cb"
    
addIconListeners();

/**
 * For each chapter add mouse'click' listeners
 * When clicked toggle the class with 'active' name
 * If the chapter is active populate the title and detail text
 * and toggle the icon on/off accordingly
 */
function addIconListeners(){
    //Get all chapter links
    var allChapters = document.querySelectorAll("[chapter]");
    for (var i = 0; i < allChapters.length; i++) {
        //Add event listener too toggle element
        allChapters[i].addEventListener("click", function(e) {
            var current = e.currentTarget;
            //Toggle the css class to hold active
            current.classList.toggle('active');
            //console.log("CLICKED..." + current.id + " data " + current.getAttribute("data") + " class " + current.getAttribute("class"));
            if(current.getAttribute("class").includes('active')){
                populateTitles(e);
            }else{
                clearTitles();
            }
            toggleImage(current);
        });
    
    }
}

/**
* Toggle icon on/off
* Toggle the style to "display: none"/"display: block"
* @param current - selected element
*/
function toggleImage(current){
   let childImages =  current.children;
   for (var i = 0; i < childImages.length; i++) {
    let styleString = childImages[i].getAttribute("style");
    if(styleString.includes("block")){
        childImages[i].setAttribute("style","display: none");
    }else{
        childImages[i].setAttribute("style","display: block");
    }
   }
}
/**
* Get the survey url and link out to Tyepform URL
*/
function startSurvey(){
    let url = getSurveyURL();
    alert("Go TO URL " + url);
    //window.location.href = url;
 }

/**
* Build the survey url
* Add a GET param for each chapter selected
* If no icon selected assess all chapters 
* For each selected chapter add GET param (eg chp_sg=1) to indicate it is selected
* else add a 0 to indicate not selected
* @return the resulting URL
*/
function getSurveyURL(){
    
    let selected = document.querySelectorAll('a.active');
    let allitems = document.querySelectorAll("[chapter]");
    let urlArgs = formURL+"#";
    if(selected.length == 0){
        //Seperate logic for case where everything is 0 - switch to 1
        allitems.forEach(function(el,i){
            let id = el.getAttribute('chapter');
            urlArgs = urlArgs + id + "=1&";
        });

    }else{
        //Create the url as required from selected list
        allitems.forEach(function(el,i){
             let id = el.getAttribute('chapter');
             if(document.querySelector('[chapter='+id+'].active') !== null){
                 urlArgs = urlArgs + id + "=1&";
             }else{
                 urlArgs = urlArgs + id + "=0&";
             }
        })
    }
    urlArgs = urlArgs.replace(/\&$/, "");
    return urlArgs;
}

/**
* Populate the info titles
* Get the data from the attributes
* Set the title and detail
* Toggle display to on
* @param - event 
*/
function populateTitles(evt){
    const source = evt.target || evt.srcElement;
    let title = source.parentElement.getAttribute("data-title");
    let tip = source.parentElement.getAttribute("data-tooltip");
    document.getElementById('text-title').innerHTML = title;
    document.getElementById('text-detail').innerHTML = tip;
    document.querySelector('[class="explainer"]').setAttribute("style","display: block");
}

/**
* Clear the info titles
* Empty out the title and detail
* Toggle display to off
* @param - event 
*/
function clearTitles(){
    document.getElementById('text-title').innerHTML = "";
    document.getElementById('text-detail').innerHTML = "";
    document.querySelector('[class="explainer"]').setAttribute("style","display: none");
}