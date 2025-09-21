(function() {
    // Patch addEventListener to set passive: false for touch events by default
    var origAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if ((type === 'touchstart' || type === 'touchmove') && (options === undefined || options === true || (typeof options === 'object' && options.passive === undefined))) {
            if (typeof options === 'object') {
                options = Object.assign({}, options, { passive: false });
            } else {
                options = { passive: false };
            }
        }
        return origAddEventListener.call(this, type, listener, options);
    };
})();
(function() {
    // Suppress 'Unable to preventDefault inside passive event listener' warnings
    var origWarn = console.warn;
    console.warn = function() {
        if (arguments.length > 0 && typeof arguments[0] === 'string' && arguments[0].includes('Unable to preventDefault inside passive event listener')) {
            return;
        }
        origWarn.apply(console, arguments);
    };
})();
(function () {
    document.addEventListener('DOMContentLoaded', function() {
        var imageInputsDiv = document.getElementById('image-inputs');
        if (!imageInputsDiv) {
            // Prevent JS errors if the element is missing
            return;
        }

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
    

        // Project gallery modal with per-project images and Bootstrap 5 (no jQuery)
        document.addEventListener('DOMContentLoaded', function () {
                var gallery = document.getElementById('project-gallery');
                var modal = document.getElementById('projectModal');
                if (gallery && modal) {
                        gallery.addEventListener('click', function (e) {
                                var projectItem = e.target.closest('.project-item');
                                if (!projectItem) return;
                                e.preventDefault();
                                var imagesDiv = projectItem.querySelector('.project-images');
                                if (!imagesDiv) return;
                                var images = imagesDiv.dataset.images.split(',');
                                var itemsHtml = '';
                                var indicatorsHtml = '';
                                images.forEach(function (src, i) {
                                    var active = i === 0 ? 'active' : '';
                                    itemsHtml += '<div class="carousel-item ' + active + '">' +
                                        '<img src="' + src + '" class="d-block w-100" alt="Project image ' + (i+1) + '">' +
                                        '</div>';
                                    indicatorsHtml += '<button type="button" data-bs-target="#modalGalleryCarousel" data-bs-slide-to="' + i + '"' + (active ? ' class="active" aria-current="true"' : '') + ' aria-label="Slide ' + (i+1) + '"></button>';
                                });
                                // Get project name for modal title
                                var projectTitleElem = projectItem.querySelector('.project-overlay h4');
                                var projectTitle = projectTitleElem ? projectTitleElem.textContent.trim() : 'Project Gallery';
                                var modalTitleElem = modal.querySelector('.modal-title');
                                if (modalTitleElem) {
                                    modalTitleElem.textContent = projectTitle;
                                }
                                var carouselHtml = `
<div id="modalGalleryCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators" id="modal-gallery-indicators">
        ${indicatorsHtml}
    </div>
    <div class="carousel-inner" id="modal-gallery-inner">
        ${itemsHtml}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#modalGalleryCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#modalGalleryCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>`;
                                modal.querySelector('.modal-body').innerHTML = carouselHtml;
                                // Show modal using Bootstrap 5 Modal API
                                var bsModal = new bootstrap.Modal(modal);

                                bsModal.show();
                                // Reset carousel to first image
                                var carouselElem = document.getElementById('modalGalleryCarousel');
                                if (carouselElem) {
                                    var bsCarousel = new bootstrap.Carousel(carouselElem, { interval: false });
                                    bsCarousel.to(0);
                                }

                        });
                    }
                });
        // End Bootstrap 5 gallery modal

})(jQuery);


