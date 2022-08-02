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
    // Input Fields
    const getName = jQuery('#name').val();
    const getEmail = jQuery('#email').val();
    const getPhone = jQuery('#phone').val();
    const getMessage = jQuery('#message').val();

    // Form Validation
    if (!/^[a-zA-Z ]+$/.test(getName)) {
        $('#name-error').text('Enter Valid Name!');
        $('#name-error').css('display', 'inline-block');
        return null;
    } else {
        $('#name-error').text('');
        $('#name-error').css('display', 'none');
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(getPhone)) {
        $('#phone-error').text('Enter Valid Phone Number!');
        $('#phone-error').css('display', 'inline-block');
        return null;
    } else {
        $('#phone-error').text('');
        $('#phone-error').css('display', 'none');
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(getEmail)) {
        $('#email-error').text('Enter Valid Email Address!');
        $('#email-error').css('display', 'inline-block');
        return null;
    } else {
        $('#email-error').text('');
        $('#email-error').css('display', 'none');
    }

    if (!/^(?=[\S\s]{5,255}$)[\S\s]*/.test(getMessage)) {
        $('#message-error').text('Message should be min 5 to max 255 characters!');
        $('#message-error').css('display', 'inline-block');
        return null;
    } else {
        $('#message-error').text('');
        $('#message-error').css('display', 'none');
    }

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