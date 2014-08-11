var validate = validate || {};

validate.methods = (function() {
  'use strict';

  function init(){
    formValidate();
  }

  function genericValidate(selector) {
    $(selector).validate({
      errorClass: 'help-block',
      errorElement: 'p',
      submitHandler: function(elem){
        formSuccess(elem);
      },
      errorPlacement: function(error, element) {
        element.parents('.form-group').append(error);
        var msg = $(element).next('.help-block').text();
        $(element).attr('aria-label', msg );
      },
      highlight: function(element, errorClass){
        $(element).attr('aria-invalid', true).parents('.form-group').addClass('has-error');
      },
      unhighlight: function(element, errorClass){
        $(element).removeAttr('aria-invalid').removeAttr('aria-label').parents('.form-group').removeClass('has-error');
      }
    });
    translateValidate();
  }

  function formValidate() {
    $('.validate').each(function(){
      var elem = $(this).attr('id');
      genericValidate('#'+ elem);
    })
  }

  function hideAlert(){
    $('.validate').on('submit',function(){
      $('.alert').fadeOut();
    })
  }

  function translateValidate() {
    $.extend($.validator.messages, {
      required: "N&atilde;o pode ficar em branco",
      remote: "Por favor, corrija este campo",
      email: "Preencha com um e-mail v&aacute;lido",
      url: "O campo deve ser uma url v&aacute;lida",
      complete_url: "O campo deve ser uma url v&aacute;lida",
      date: "O campo deve ser uma data v&aacute;lida",
      datePT: "O campo deve ser uma data v&aacute;lida",
      dateISO: "O campo deve ser uma data v&aacute;lida (ISO)",
      number: "O campo deve ser um n&uacute;mero v&aacute;lido",
      digits: "O campo deve ser somente d&iacute;gitos",
      creditcard: "O campo deve ser um cart&atilde;o de cr&eacute;dito v&aacute;lido",
      equalTo: "O campo est&aacute; diferente da senha informada",
      accept: "O campo Por favor, forne&ccedil;a um arquivo com uma extens&atilde;o v&aacute;lida",
      maxlength: $.validator.format("O campo deve ser menor que {0} caracteres"),
      minlength: $.validator.format("O campo deve ser maior que {0} caracteres"),
      rangelength: $.validator.format("O campo deve ter entre {0} e {1} caracteres"),
      range: $.validator.format("Use um valor entre {0} e {1}"),
      max: $.format("O campo deve ser menor do que {0}"),
      min: $.format("O campo deve ser maior do que {0}"),
      maxValue: $.format("O campo deve ser menor ou igual a {0}"),
      minValue: $.format("O campo deve ser maior ou igual a {0}")
    });
  }


  function formSuccess(elem){
    $('.form-control').val('');
    $('.alert').fadeOut();
    $(elem).find('.alert').removeClass('hide').focus();
  }

  return {
    init: init
  };

}());

$(document).ready(function () {
  validate.methods.init();
})
