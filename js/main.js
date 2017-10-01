window.onload = function(){
    //при загрузке страницы рассчитываем ширину "прилипающего" заголовка
    createWidth();
    //получаем массив всех элементов, которые должны "прилипать"
    var stickyContainers = document.getElementsByClassName("sticky-container");
    //воспомагательный массив булевых значений
    //в котором хранится инвормация создан ли "прилипающий" заголовок в текущей секции
    var isCreatedCloneArray = [stickyContainers.length];
    for (var i = 0; i < isCreatedCloneArray.length; i++) {
        isCreatedCloneArray[i] = false;
    }
    //функция создания 
    function createSticky(){
        for(var i = 0; i < stickyContainers.length; i++){
            var stickyContainer = stickyContainers[i];

            //создаем клон текущего элемента
            var clone = stickyContainer.cloneNode(true);

            //узнаем значение координаты верхней границы элемента
            var containerTopYCoord = stickyContainer.getBoundingClientRect().top + window.pageYOffset;

            //узнаем координаты верхней точки окна относительно всей страницы
            var scrolled = window.pageYOffset;
            
            //если элемент находится вне текущей видимости страницы 
            if (window.pageYOffset > containerTopYCoord) {
                //и еще не создан HTML клон
                if(!isCreatedCloneArray[i]){
                    //дополняем DOM дерево новым элементом с фиксированным позиционированнием, присваиваем ему Id, отмечаем что элемент создан
                    clone.classList.add('fixed');
                    clone.id = "sticky" + i;
                    document.body.appendChild(clone);
                    isCreatedCloneArray[i] = true;
                }
            //иначе если элемент в зоне видимости
            } else if (window.pageYOffset <= containerTopYCoord) {
                //и в DOM дереве присутствует его "прилипшая" копия
                if (isCreatedCloneArray[i]) {
                    //удаляем копию из DOM дерева
                    var toDelete = document.getElementById("sticky"+i);
                    toDelete.remove();
                    isCreatedCloneArray[i] = false;
                }
            }
        }
    };
    //подписка на события скроллинга страницы, изменения размера, а так же поворота экрана
    window.addEventListener('scroll', createSticky);
    window.addEventListener('resize', createWidth);
    window.addEventListener('resize', createSticky);
    window.addEventListener('orientationchange', createWidth);
    window.addEventListener('orientationchange', createSticky);
};

//функция расчета ширины "прилипающего" заголовка
function createWidth(){
    var boxWidth = document.getElementById("last-sticky-container").offsetWidth;
    var stickyBoxes = document.querySelectorAll(".sticky-box");
    for (var i = 0; i < stickyBoxes.length; i++) {
        stickyBoxes[i].setAttribute("style","width:"+boxWidth+"px;");
    }
};
