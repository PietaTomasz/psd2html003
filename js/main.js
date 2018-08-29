var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

jQuery(function($)
{
    // Scroll buttons

    var SCROLL_TIME = 1000;

    var $html   = $('html, body'),
        $quotes = $('.quotes');

    $('.scroll-btn.-down').click(function(evt)
    {
        evt.preventDefault();

        $html.animate({ scrollTop : $quotes.offset().top }, SCROLL_TIME);
    });

    $('.scroll-btn.-up').click(function(evt)
    {
        evt.preventDefault();

        $html.animate({ scrollTop : 0 }, SCROLL_TIME);
    });

    if(!isMobile)
    {
        // Header flying images

        var MAX_MOVE = 40;

        var $images = $('[ui-zoom]');

        var factors = $images.map(function()
        {
            return parseFloat($(this).attr('ui-zoom'));
        });

        $images.css({ position : 'relative' });

        $html.mousemove(function(evt)
        {
            var centerX  = $html.outerWidth()  / 2,
                centerY  = $html.outerHeight() / 2,
                percentX = (evt.pageX - centerX) / centerX,
                percentY = (evt.pageY - centerY) / centerY;

            // -----

            $images.each(function(i)
            {
                var moveX = factors[i] * MAX_MOVE * 0.5 * -percentX,
                    moveY = factors[i] * MAX_MOVE * 0.5 * -percentY;

                $(this).css({

                    left : moveX,
                    top  : moveY
                });
            });
        });
    }

    // Video pop-up

    var $popup       = $('.video-popup'),
        $popupText   = $popup.find('.text'),
        $popupVideo  = $popup.find('.video iframe'),
        $popupAlter  = $popup.find('.video .alternative-text'),
        $popupClose  = $popup.find('.close'),
        $popupPrev   = $popup.find('.prev'),
        $popupNext   = $popup.find('.next'),
        $popupLinks  = $('[data-popup]'),
        popupCurrent = 0;

    $popupLinks.each(function(i, el)
    {
        var $el = $(el);

        $el.click(function(evt)
        {
            evt.preventDefault();

            popupShow(i);
        });
    });

    $popupClose.click(popupHide);

    $popup.click(function(evt)
    {
        if(evt.currentTarget === evt.target)
        {
            popupHide(evt);
        }
    });

    $(window).keydown(function(evt)
    {
        switch(evt.which)
        {
            case 27: popupHide(evt);              break;
            case 37: popupShow(popupCurrent - 1); break;
            case 39: popupShow(popupCurrent + 1); break;
        }
    });

    $popupPrev.click(function(evt)
    {
        evt.preventDefault();

        popupShow(popupCurrent - 1);
    });

    $popupNext.click(function(evt)
    {
        evt.preventDefault();

        popupShow(popupCurrent + 1);
    });

    function popupShow(i)
    {
        if(i < 0)
        {
            i = $popupLinks.length - 1;
        }
        else if(i >= $popupLinks.length)
        {
            i = 0;
        }

        popupCurrent = i;

        var $el = $popupLinks.eq(i);

        $popup.removeClass('-alternative');

        if($el.data('popup-alternative-text'))
        {
            $popupVideo.removeAttr('src');
            $popupAlter.text($el.data('popup-alternative-text'));
            $popup.addClass('-alternative');
        }
        else
        {
            $popupVideo.attr('src', $el.data('popup'));
        }

        $popupText.text($el.data('popup-text'));

        $html.addClass('popup-visible');

        $popup.show();
    }

    function popupHide(evt)
    {
        evt.preventDefault();

        $popupVideo.attr('src', '');
        $popup.hide();

        $html.removeClass('popup-visible');
    }

    // Navigation toggle button

    var $nav       = $('.nav-list'),
        $navToggle = $('.toggle-nav');

    $navToggle.click(function()
    {
        $nav.toggleClass('active');
    });
});
