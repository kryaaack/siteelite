$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        dotsSpeed: 1500
    });
});

$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks').fadeOut();
  });
  
  function validateForms(form) {
    $(form).validate({
      rules: {
        phone: "required",
        message: {
          required: false,
          maxlength: 250
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        phone: "Пожалуйста, введите свой номер",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Почта введена неправильно"
        }
      }
    });
  }
  
  validateForms('#consultation-form');
  
  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation').fadeOut();
      $('.overlay, #thanks').fadeIn();
  
      $('form').trigger('reset');
    });
    return false;
  });
  