
function drawArch(ctx,cx,cy,r,stAngle,enAngle,color){
    // console.log(ctx);
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,stAngle*Math.PI,enAngle*Math.PI);
    ctx.fillStyle=color;
    ctx.fill();
}
function drawDonut(ctx,radius,cx,cy,percentage){
    // console.log(percentage);
    drawArch(ctx,cx,cy,radius,0,2,'rgb(100%, 70%, 69%)');
    drawArch(ctx,cx,cy,radius,0,2*percentage/100,'white');
    drawArch(ctx,cx,cy,3*radius/4,0,2,'rgb(100%, 33%, 31%)');
    ctx.fillStyle='white';
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(percentage+"%", cx, cy);

}
function drawSkills(){
    var canvas=document.getElementsByTagName("canvas");
    var ctx;
    var radius=100;
    canvas.forEach=Array.prototype.forEach;
    canvas.forEach(element => {
    // console.log(element);
    element.setAttribute('width','200');
    element.setAttribute('height','200');
    ctx=element.getContext("2d");
    
    drawDonut(ctx,radius,100,100,parseInt(element.textContent));
});
}

/****************************************************************************************************************** */
//slider animation

function exit(index){
    $(`.text-slide:nth-child(${index})`).css("visibility","visible");
    $(`.text-slide:nth-child(${index}) .text-slide__item`).css("animation-name",'exit');
}
function enter(index){
    $(`.text-slide:nth-child(${index})`).css("visibility","hidden");
    $(`.text-slide:nth-child(${index}) .text-slide__item`).css("animation-name",'enter');
}
function sliderAnimation(){
    var n_slides=$(".text-slide").length;
    var slide_index=1;
    enter(slide_index);
    setInterval(()=>{
        exit(slide_index);
        slide_index++;
        if(slide_index>n_slides)
            slide_index=1;
        // console.log(slide_index);
        enter(slide_index);
    },5000);
}

/******************************************************** */
function activateItemNavbar(item){
    $("#fixedNavbar .nav-item").each((index,elm)=>{
        el=$(elm);
        el.removeClass("active");
        if(el.children("a").attr("href")=="#"+item)
            {
                el.addClass("active");
                console.log(el);
            }
    });
}
function navbarScroll(){
    var about=document.getElementById('about').offsetTop;
    var port=document.getElementById('portfolio').offsetTop;
    var exp=document.getElementById('experience').offsetTop;
    var contact=document.getElementById('contact').offsetTop;
    // console.log(about+" "+port+" "+exp+" "+contact);
    if(window.scrollY>=about)
    {
        $("#fixedNavbar").css("visibility","visible");
            if(window.scrollY>=port)
            {
                if(window.scrollY>=exp)
                {
                    if(window.scrollY>=contact)
                    {
                        activateItemNavbar("contact");
                    }
                    else
                        activateItemNavbar("experience");

                }else 
                    activateItemNavbar("portfolio");
            }
            else 
                activateItemNavbar("about");
    }
    else{
        $("#fixedNavbar").css("visibility","hidden");
    }
}

function portfolioNavbar(){
    var links=$("#portfolio .nav-link");
    var items=$("#portfolio .nav-item");
    links.each((index,element)=>{
        $(element).on("click",(event)=>{
            var item=$(event.target).parent()[0];
            items.each((ind,el)=>{
                var elm=$(el).removeClass("active");
                if(el==item){ 
                    elm.addClass("active");
                }
            });
            portfolioFilters(event.target.dataset["filter"])
        });
    })
}
function portfolioFilters(filter){
    var allImages=$(`#portfolio .col-lg-3`);
    if(filter!="all")
    {
        var filteredImages=$(`#portfolio [data-${filter}="1"]`);
        allImages.each((ind,el)=>{
            el.style.display="none";
        });
        filteredImages.each((index,el)=>{
            el.style.display="block";
        });
    }
    else{
        allImages.each((ind,el)=>{
            el.style.display="block";
        });
    }
}
/*********************************************************** */




drawSkills();
sliderAnimation();
navbarScroll();
portfolioNavbar();
window.addEventListener("scroll",navbarScroll);




