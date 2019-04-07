$(function(){

    function AjaxFormRequest() {
        var data = $('#reserve-form').serialize(),
            $responseWrap = $('#section-reserve .j-response'),
            url = 'index.php';

        console.log(data);
        jQuery.ajax({
            url:      url, 
            type:     "POST", 
            dataType: "json", 
            data: data, 
            success: function(response) {
                if (response.result == 1) {
                    $responseWrap.text('Письмо отправлено!');                    
                } 
                else {                    
                    $responseWrap.text('Ошибка! Письмо не отправлено. Попробуйте позже.'); 
                }

            },
            error: function(response) {                
                $responseWrap.text('Ошибка! Письмо не отправлено. Попробуйте позже.'); 
            }
        });
    }

    //Отправка формы
    $('#section-reserve .j-submit-form').off('click.submitReserveForm').on('click.submitReserveForm', function(){
        AjaxFormRequest();
    });

    // Слайдер
    $('.j-flexslider').flexslider({
        animation: "fade",
        start: function(slider){
            $('body').removeClass('loading');
        },
        controlNav: false,
        slideshow: false
    });

    var $magicLine = $("#magic-line");
    // Устанавливает линию под активный элемент меню
    var magicLineReplaceToActive = function(){
        $activeLink = $(".j-nav .active");

        $magicLine
            .width($activeLink.width())
            .css("left", $activeLink.position().left)
    };
    // Сохраняет позицию линий
    var magicLineSavePosition = function(){
        $activeLink = $(".j-nav .active");

        $magicLine
            .data("origLeft", $activeLink.position().left)
            .data("origWidth", $activeLink.width());
    };
    // Двигает линию за курсором под элементы меню
    var magicLineAnimate = function(el){
        var $el = el,
            leftPos = $el.position().left,
            newWidth = $el.width();

        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    };
    // Возвращает линию после анимации под активный элемент меню
    var magicLineStopAnimation = function(){
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });
    };

    var scrollMenu = function(){
        // Добавляет тень меню при скроллировании вниз
        var pageOffset = $(window).scrollTop(),
            $menu = $(".j-menu");

        if (pageOffset > 0) {
            $menu.addClass('shadow-bottom');
        } else {
            $menu.removeClass('shadow-bottom');
        }
    };

    var scrollPage = function(){
        // Переключает элементы меню при скролле страницы
        var pageOffset = $(window).scrollTop(),
            SPACE = 200,
            sec1 = $('#section-head').offset().top - SPACE,
            sec2 = $('#section-gallery').offset().top - SPACE,
            sec3 = $('#section-info').offset().top - SPACE,
            sec4 = $('#section-reserve').offset().top - SPACE,
            sec5 = $('#section-contacts').offset().top - SPACE;

        // Анимация меню
        if (pageOffset >= sec1 && pageOffset < sec2) {
            if (!$('.j-nav a[href="#section-head"]').hasClass('active')){
                UpdateNavLink('#section-head');
            }
        }
        else if (pageOffset >= sec2 && pageOffset < sec3) {
            if (!$('.j-nav a[href="#section-gallery"]').hasClass('active')) {
                UpdateNavLink('#section-gallery');
            }
        }
        else if (pageOffset >= sec3 && pageOffset < sec4) {
            if (!$('.j-nav a[href="#section-info"]').hasClass('active')) {
                UpdateNavLink('#section-info');
            }
        }
        else if (pageOffset >= sec4 && pageOffset < sec5) {
            if (!$('.j-nav a[href="#section-reserve"]').hasClass('active')) {
                UpdateNavLink('#section-reserve');
            }
        }
        else if (pageOffset >= sec5) {
            if (!$('.j-nav a[href="#section-contacts"]').hasClass('active')){
                UpdateNavLink('#section-contacts');
            }
        }

        return false;
    };

    // Обновление состояния элементов меню
    var UpdateNavLink = function(sectionId){
        var $navLink = $('.nav_fixed a'),
            $currLink = $navLink.filter('[href='+sectionId+']');

        $navLink.removeClass('active');
        $currLink.addClass('active');
        
        magicLineAnimate($currLink);
        magicLineSavePosition();

        return false;
    };

    // Промотка страницы до секции с указанным id
    var ScrollToSection = function(sectionId){
        var SPACE = 65,
            top = $(sectionId).offset().top;

        UpdateNavLink(sectionId);
        $('body,html').animate({scrollTop: top - SPACE}, 1000, function(){            
            $(window).bind('scroll', scrollPage);
            $(window).trigger('scroll');
        });
    };

    // Навигация по странице по клику на элементы меню
    $(".j-nav").off('click.navItemClick').on("click.navItemClick","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href');

        $(window).unbind('scroll', scrollPage);
        ScrollToSection(id);
    });

    // Переход к секции "Бронирование" по кнопке
    $(".j-btn").off('click.btnClick').on("click.btnClick", function () {
        ScrollToSection('#section-reserve');
    });

    $(window).on('scroll', scrollPage, scrollMenu);

    $(window).trigger('scroll');
    $(window).resize(function(){
        $(window).trigger('scroll');
        magicLineReplaceToActive();
    })

    magicLineReplaceToActive();
    $magicLine.fadeIn(200);
    magicLineSavePosition();    

    // Анимирует magicLIne при наведении на элементы меню
    $(".nav-item").hover(function() {
        $el = $(this).find("a");
        magicLineAnimate($el);
    }, function() {
        magicLineStopAnimation();
    });
});