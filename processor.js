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

    // Steps, numbers are same as index
    var steps = [
        $(document.getElementById('step-0')),
        $(document.getElementById('step-1')),
        $(document.getElementById('step-2')),
        $(document.getElementById('step-3')),
        $(document.getElementById('step-4'))
    ];

    // Retina step
    var $retinaStep = $(document.getElementById('step-4-retina'));

    // Loading process
    var $imageFileInput = $(document.getElementById('imageFile'));

    // Image sources
    var $srcImage = $(document.getElementById('srcImage'));
    var $destImage = $(document.getElementById('destImage'));
    var $destRetina = $(document.getElementById('destRetina'));

    // Retina process
    var showRetinaCheckbox = $(document.getElementById('showRetina'));

    // Prepare my canvases
    var retinaCanvas = document.createElement('canvas');
    retinaCanvas.width = kCarouselImageDimensions.Retina.Width;
    retinaCanvas.height = kCarouselImageDimensions.Retina.Height;

    var destCanvas = document.createElement('canvas');
    retinaCanvas.width = kCarouselImageDimensions.Standard.Width;
    retinaCanvas.height = kCarouselImageDimensions.Standard.Height;

    
    function onFileInputChange(event) {
        console.log('Got it');
    }

    // Post-load
    function onReady() {
        $imageFileInput.on('change', onFileInputChange);

        // Get interface ready
        steps[0].addClass(kClassname.Inactive);
        steps[1].removeClass(kClassname.Inactive);
    }

    $(document).ready(onReady);
})();
