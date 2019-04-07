import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';

jQuery(function() {
    jQuery('.video-wrapper__btn').click(function(e) {
       jQuery(this).parent('.video-wrapper__overlayer').fadeOut();
        jQuery('#introVideo').get(0).playVideo();
    });
});