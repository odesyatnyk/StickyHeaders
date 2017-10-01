window.onscroll = function(){
    var stickyContainers = document.getElementsByClassName("sticky-container");
    
    for(var i = 0; i < stickyContainers.length; i++){
        var stickyContainer = stickyContainers[i];
        var clone = stickyContainer.cloneNode(true);

        var containerTopYCoord = (i == 0) ? stickyContainer.getBoundingClientRect().bottom + window.pageYOffset : stickyContainer.getBoundingClientRect().top + window.pageYOffset;
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if (window.pageYOffset > containerTopYCoord) {
            clone.classList.add('fixed');
            document.body.appendChild(clone);
        } else if (window.pageYOffset < containerTopYCoord) {
            clone.remove();
        }
    }
};
window.onload = function(){
    createWidth();
};
window.onresize = function(){
    createWidth();
};
function createWidth(){
    var boxWidth = document.getElementById("last-sticky-container").offsetWidth;
    var stickyBoxes = document.querySelectorAll(".sticky-box");
    for (var i = 0; i < stickyBoxes.length; i++) {
        stickyBoxes[i].setAttribute("style","width:"+boxWidth+"px;");
    }
};