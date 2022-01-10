
function ctPointLabels(options) {
  return function ctPointLabels(chart) {
    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -15
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);

    if (chart instanceof Chartist.Line) {
      chart.on('draw', function (data) {
        if (data.type === 'point') {
          data.group.elem('text', {
            x: data.x + options.labelOffset.x,
            y: data.index % 2 == 1 ? data.y + options.labelOffset.y : data.y - (options.labelOffset.y - 15),
            style: 'text-anchor: ' + options.textAnchor
          }, options.labelClass).text(data.value.y);
        }
      });
    }
  }
}

$(function () {

  $('.icon-btn').click(function () {
    var main = $('.main');
    var nav = $('nav');

    main.toggleClass('full');
    nav.toggleClass('hidden');
  });


  $('.table-link-js tr[data-href]').on("mousedown", function (e) {
    var timer = false;
    setTimeout(() => timer = true, 500)

    $(this).on('mouseup', () => {
      if (!timer && $(this).data('href') && !edit) {
        document.location = $(this).data('href');
      }
    })
  });

  $('ul[data-active]').each(function () {
    var a = $(this).data('active');

    $(this).find('li:nth-child(' + a + ')').addClass('active');
  });


  function readURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#img-preview').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#img-input").change(function () {
    readURL(this);
  });


  $('.select-tag').selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    create: function (input) {
      return {
        value: input,
        text: input
      }
    }
  });

 $('.select').selectize({
    create: false,
    sortField: 'text'
  });



  $('.modal-filter__close, .search-filter-icon, .modal-filter .btn-confirm__cancel').click(function (e) {
    $(e.target).closest(".search").find('.modal-filter').slideToggle('100');
    
    // $('.modal-filter').slideToggle('100');
  });

  $('.search-filter-remove').click(function(e){
    var m = $(e.target).closest(".search");
      m.find('.modal-filter form select').each(function(index, element){
      element.selectize && element.selectize.clear()
    });
    m.find('.modal-filter .form')[0].reset();
  
    m.find('.search-filter-icon').removeClass('active');
    m.find('.search-filter-remove').removeClass('active');
  
  });



  // Акордеон
  $('.accordion-header__btn').click(function(){
    $this = $(this);
    $this.toggleClass('hide');
    $this.parent().parent().toggleClass('hide');

  });






});