(function() {
    // This is all in one file because it takes less time and files to maintain. Lower barrier to entry.

    // Constants
    var kImageBackground = '#fff1e0';
    var kJPEGCompression = 0.8;

    var kCarouselImageDimensions = {
        Retina: {
            Width: 1170 * 2,
            Height: 325 * 2
        }
    };
    kCarouselImageDimensions.Standard = {
        Width: kCarouselImageDimensions.Retina.Width / 2,
        Height: kCarouselImageDimensions.Retina.Height / 2
    };

    var kClassname = {
        Inactive: 'step__inactive'
    };

    var kLocation = window.location.href;

    // Steps, numbers are same as index
    var steps = [
        $(document.getElementById('step-0')),
        $(document.getElementById('step-1')),
        $(document.getElementById('step-2')),
        $(document.getElementById('step-3')),
        $(document.getElementById('step-4'))
    ];

    var $imageProcessButtons = $(document.getElementsByClassName('js-commence'));

    // Retina step
    var $retinaStep = $(document.getElementById('step-4-retina'));

    // Loading process
    var $imageFileInput = $(document.getElementById('imageFile'));

    // Image sources
    var $srcImage = $(document.getElementById('srcImage'));
    var $destImage = $(document.getElementById('destImage'));
    var $destRetina = $(document.getElementById('destRetina'));

    // Retina process
    var $showRetinaCheckbox = $(document.getElementById('showRetina'));

    // Prepare my canvases
    var retinaCanvas = document.createElement('canvas');
    retinaCanvas.width = kCarouselImageDimensions.Retina.Width;
    retinaCanvas.height = kCarouselImageDimensions.Retina.Height;

    var destCanvas = document.createElement('canvas');
    destCanvas.width = kCarouselImageDimensions.Standard.Width;
    destCanvas.height = kCarouselImageDimensions.Standard.Height;

    // see: http://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
    function scrollToSection(id) {
        window.location = kLocation + '#' + id;
    }

    function toggleRetina() {
        $retinaStep.toggleClass(kClassname.Inactive);
    }

    // Updates the image with the JPEG compression version of the image
    function compressAndPresentJPEG(canvas, $image) {
        $image.attr('src', canvas.toDataURL('image/jpeg', kJPEGCompression));
    }

    // Renders out the image to fill the canvas, maintaining the aspect ratio
    function renderImageToCanvas(canvas, image, aspectRatio) {
        var context = canvas.getContext('2d');

        context.save();

        context.fillStyle = kImageBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var canvasAspectRatio = canvas.width / canvas.height;

        var destX = 0;
        var destY = 0;
        var destWidth = canvas.width;
        var destHeight = canvas.height;

        if (canvasAspectRatio < aspectRatio) {
            destHeight = Math.round(canvas.width / aspectRatio);
            destY = Math.round((canvas.height - destHeight) / 2);
        }

        if (canvasAspectRatio > aspectRatio) {
            destWidth = Math.round(canvas.height * aspectRatio);
            destX = Math.round((canvas.width - destWidth) / 2);
        }

        context.drawImage(image, destX, destY, destWidth, destHeight);

        context.restore();
    }

    function onProcessImages() {
        var imageAspectRatio = parseInt($srcImage.prop('width'), 10) / parseInt($srcImage.prop('height'), 10);
        var image = $srcImage.get(0);

        renderImageToCanvas(destCanvas, image, imageAspectRatio);
        renderImageToCanvas(retinaCanvas, image, imageAspectRatio);

        compressAndPresentJPEG(destCanvas, $destImage);
        compressAndPresentJPEG(retinaCanvas, $destRetina);

        steps[3].addClass(kClassname.Inactive);
        steps[4].removeClass(kClassname.Inactive);
        scrollToSection(steps[4].attr('id'));
    }

    function onCommenceProcessImages() {
        steps[3].removeClass(kClassname.Inactive);
        scrollToSection(steps[3].attr('id'));

        // Make sure we render before we process, otherwise it may take a bit
        setTimeout(onProcessImages, 0);
    }

    // Image is ready, show the next step
    function onImageReady() {
        steps[2].removeClass(kClassname.Inactive);
        steps[4].addClass(kClassname.Inactive);
        scrollToSection(steps[2].attr('id'));
    }
    
    // see: http://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
    function onFileInputChange(event) {
        var reader = new FileReader();
        reader.onload = function(event) {
            $srcImage.on('load', onImageReady);
            $srcImage.attr('src', event.target.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    // Post-load
    function onReady() {
        $showRetinaCheckbox.on('change', toggleRetina);
        $imageFileInput.on('change', onFileInputChange);
        $imageProcessButtons.on('click', onCommenceProcessImages);

        // Get interface ready
        steps[0].addClass(kClassname.Inactive);
        steps[1].removeClass(kClassname.Inactive);
    }

    $(document).ready(onReady);
})();
