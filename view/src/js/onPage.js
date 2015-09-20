$(function(){//on ready
    //menu pills
    var menuPills = function () {
        var menuItems = $('.menu ul:first li');

        menuItems.each(function (index, el) {
            $(el).on('click', function (event) {
                event.preventDefault();
                $(el).focus();

                $(el).siblings().each(function (index, sibling) {
                    $(sibling).removeClass('active');
                    $(sibling).removeClass('open');
                });

                if ($(el).hasClass('dropdown')) {
                    $(el).toggleClass('.open');
                }
                else {
                    $(el).addClass('active');
                }
            });

            $(el).on("blur", function (event) {
                $(el).removeClass('active');
                $(el).removeClass('open');
            });
        });
    };
    menuPills();

    var login = function(){
        var logIn = $(".menu .navbar-right #logInBtn");
        var logInForm = $('#logInForm', logIn);

        logIn.on('click', function (event) {
            event.preventDefault();

            logInForm.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });

            if (logIn.hasClass('active')) {
                logIn.removeClass('active');
                logInForm.hide('fast');
            } else {
                logIn.addClass('active');
                logInForm.show('fast');
            }
        });

        $(document).mouseup(function (e) {
            if (logIn.has(e.target).length === 0) {
                logIn.removeClass('active');
                logInForm.hide('fast');
            }
        });

        $("input[type='submit']", logInForm).on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(".invalidField", logInForm).each(function (index, element){
                $(element).removeClass("invalidField");
            });
            var validation = formValidator.formValid(logInForm);
            if (validation === true) {
                $('.no-authorized').hide();
                $('.authorized').show('fast');
            } else {
                validation.elem.parent().addClass("invalidField");
            }
        });
    };
    login();

    var logout = function() {
        var logOut = $(".menu .navbar-right #logOutBtn");

        logOut.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $('.authorized').hide();
            $('.no-authorized').show('fast');
        });
    };
    logout();

    var registration = function() {
        var startReg = $('.menu #regBtn>a');
        var regForm = $('.regWrapper #regForm form');
        var success = $('.regWrapper #regForm .success');
        var loader = $('.photo input[type="file"]', regForm);

        startReg.on('click', function(){
            $('.regWrapper').show();
            $('body').css('overflow', "hidden");
        });

        $('.photo .btn', regForm).on('click', function(event){
            loader.trigger('click');
        });


        (function() {//set max && min date
            var d = new Date();
            var day = String(d.getDate()).length == 1 ? "0" + d.getDate() : d.getDate();
            var month = String(d.getMonth() + 1).length == 1 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
            var year = d.getFullYear();
            $("#date input", regForm).attr('max', year + "-" + month + "-" + day);
            $("#date input", regForm).attr('min', year - 100 + "-" + month + "-" + day);
        })();

        $("input[type='submit']", regForm).on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(".invalidField", regForm).each(function (index, element){
                $(element).removeClass("invalidField");
            });
            var validation = formValidator.formValid(regForm);
            if (validation === true ) {
                regForm.hide();
                success.trigger('show');
            } else {
                validation.elem.parent().addClass("invalidField");
            }
        });

        success.on('show', function(){
            $(this).show();
            setTimeout(function(){
                $('.regWrapper').hide();
                $('body').css('overflow', "auto");
            }, 10000);
        });
    };
    registration();
});

$(document).on('scroll', function(event) {
    event.preventDefault();
    if($(window).scrollTop() >= 300) {
        $('.menu').css({
            'position': 'fixed',
            'top': '0',
            'z-index': '100',
            'width': '100%'
        });
    } else {
        $('.menu').css({
            'position': 'relative',
            'top': '',
            'z-index': ''
        });
    }

});