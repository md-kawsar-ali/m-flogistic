/*=========================================
                Smooth Scroll
===========================================*/
jQuery(function () {
    jQuery('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - 50
                }, 1000);
                return false;
            }
        }
    });
});

/*=========================================
                Contact Form
===========================================*/
const sendMail = () => {
    const getName = jQuery('#name').val();
    const getEmail = jQuery('#email').val();
    const getPhone = jQuery('#phone').val();
    const getMessage = jQuery('#message').val();

    if (getName !== '' && getEmail !== '' && getPhone !== '' && getMessage !== '') {
        jQuery('#emailSendResult').html('Loading...');
        $.ajax({
            url: 'submitForm.php',
            data: { name: getName, email: getEmail, phone: getPhone, message: getMessage },
            method: 'POST',
            success: function (data) {
                jQuery('#emailSendResult').html(`<span class="text-success">${data}</span>`);
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('message').value = '';
            },
            error: function () {
                jQuery('#emailSendResult').html(`<span class="text-danger">Something went wrong!</span>`);
            }
        });
    } else {
        jQuery('#emailSendResult').html(`<span class="text-danger">Please, enter required fields!</span>`);
    }
}