
var edit = false;


  // отправка формы кнопки "сохранить изменения"

  $('.btn-confirm__ok').click(function (e) {
    e.preventDefault();

    var a = $(this).data('form');

    if (a != '') {


      $(a).submit(); // отправка выбранной формы указанна в параметре data-form теге <a>

    }
  });


  $('.auth-form input[type=email]').blur(function(e){
    if(e.target.value == 'example'){
      if($(this).hasClass('error')) return;
      $(this).addClass('error');
      $(this).parent().append('<span class="input-error">Такого аккаунта не зарегистрировано</span>')
    }else{
      $(this).removeClass('error');
      $(this).siblings('.input-error').remove();

    }
  });


  // клик по кнопке Отфилтровать \/
  $('.modal-filter .btn-confirm__ok').click(function (e) {

    var m = $(e.target).closest(".search");
    var CHECK = false;
    m.find('.modal-filter').slideToggle('100');
    m.find('.modal-filter form select').each(function () {
      if ($(this).val().length) {
        CHECK = true;
      }
    });

    if (CHECK) {
      m.find('.search-filter-icon').addClass('active');
      m.find('.search-filter-remove').addClass('active');

    }


  });
      function trCount(i, tr){
        var a = $('[data-tr-count-'+i+']');
        var arr = a.data("tr-count-"+i).split(' ');
        
        if(tr.length == 0 || tr.length > 4){
          a.html(tr.length + " " +arr[0])
        }
        else if(tr.length == 1){
          a.html(tr.length + " " +arr[1])
        }
        else if(tr.length > 1 ){
          a.html(tr.length + " " +arr[2])
        }
      };



  // выбрать/удалить в таблице news-source.html
  $('.table-edit-js tbody tr').click(function(e){

    if(e.target.className != "label-input-radio"){
      if($(this).closest('.table-edit-js').hasClass('table-edit-js--edit')){
        $(this).find('input.table-check').each(function(){
          this.checked = !this.checked;
        });
      }
    }
  });

  function editBtn(event){
    $.Event(event).preventDefault();
    $(event.target).closest('.table-edit-js').addClass('table-edit-js--edit');
    edit = true;    
  }
  // $('.table-edit-js .edit-btn').click(function (e) {
  // });
  function cancelBtn(event){
    $.Event(event).preventDefault();
    var t = $(event.target).closest('.table-edit-js');
    t.removeClass('table-edit-js--edit');
    t.find('input.table-check').each(function(){
      this.checked = false;
    });

    edit = false;

  };

  function deleteBtn(e) {
    $.Event(e).preventDefault();
    $this = $(e.target);
    var $c = $this.closest('.table-edit-js').find('.table-choose-js input[type="checkbox"]:checked');
    var values = []; // value в чекбокса(ID) в виде масива
    $c.each(function(i, item){
      values.push(item.value);

    });
    $c.closest('tr').remove();
    trCount(1, $this.closest('.table-edit-js').find('.table-choose-js tbody tr'));
    
  };



