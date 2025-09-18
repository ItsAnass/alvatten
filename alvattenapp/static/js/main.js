(function () {
    document.addEventListener('DOMContentLoaded', function() {
        var addBtn = document.getElementById('add-image-input');
        var imageInputsDiv = document.getElementById('image-inputs');
        if (addBtn && imageInputsDiv) {
            addBtn.addEventListener('click', function() {
                var newInputGroup = document.createElement('div');
                newInputGroup.className = 'input-group mb-3';
                newInputGroup.innerHTML = `
                    <span class="input-group-text" id="inputGroupFileAddon01"><i class="bi bi-image"></i></span>
                    <input type="file" name="images[]" class="form-control mb-1" accept="image/*" placeholder="Choose image" title="Choose image">
                    <label class="form-label ms-2">Upload Image (optional)</label>
                `;
                imageInputsDiv.appendChild(newInputGroup);
            });
        }
    });
})();
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-white shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-white shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: true,
        loop: true,
        nav: false
    });
    
})(jQuery);

