(function () {
    document.addEventListener('DOMContentLoaded', function() {
        var imageInputsDiv = document.getElementById('image-inputs');

        // Create a single file input
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'images[]';
        fileInput.className = 'form-control mb-1';
        fileInput.accept = 'image/*';
        fileInput.placeholder = 'Choose image';
        fileInput.title = 'Choose image';
        fileInput.autocomplete = 'off';
        fileInput.ariaLabel = 'Upload Image (optional)';
        fileInput.multiple = true;
        // Remove all children and add the single input
        imageInputsDiv.innerHTML = '';
        imageInputsDiv.appendChild(fileInput);

        // Create the file list display
        var fileListDiv = document.createElement('div');
        fileListDiv.id = 'uploaded-files-list';
        fileListDiv.className = 'mt-2';
        imageInputsDiv.appendChild(fileListDiv);

        function renderFileList() {
            fileListDiv.innerHTML = '';
            var files = fileInput.files;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let fileDiv = document.createElement('div');
                fileDiv.className = 'uploaded-file d-flex align-items-center mb-1';
                fileDiv.style.fontSize = '0.95em';
                fileDiv.style.gap = '0.5em';
                fileDiv.style.wordBreak = 'break-all';
                fileDiv.style.color = '#333';
                fileDiv.innerHTML = `
                    <span class="file-name">${file.name}</span>
                    <button type="button" class="btn btn-link btn-sm text-danger p-0 ms-2 delete-uploaded-file" title="Remove file">
                        <i class="bi bi-trash"></i>
                    </button>
                `;
                fileDiv.querySelector('.delete-uploaded-file').onclick = function() {
                    removeFile(i);
                };
                fileListDiv.appendChild(fileDiv);
            }
        }

        function removeFile(index) {
            // Create a new DataTransfer to manipulate the FileList
            var dt = new DataTransfer();
            var files = fileInput.files;
            for (let i = 0; i < files.length; i++) {
                if (i !== index) {
                    dt.items.add(files[i]);
                }
            }
            fileInput.files = dt.files;
            renderFileList();
        }

        fileInput.addEventListener('change', function() {
            renderFileList();
        });

        // Initial render
        renderFileList();
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

