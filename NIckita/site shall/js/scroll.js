const animItem = document.querySelector('._animItems');

if(upper != null){
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(params){
        const animItemHeight = animItem.offsetHieght;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if(animItemHeight > window.innerHeight){
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)){
            animItem.classList.add('anim');
        } else {
            animItem.classList.remove('anim');
        }

    }
    function offset(e1) {
        const rect = e1.getBoundingClientREct(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    
    animOnScroll();
}