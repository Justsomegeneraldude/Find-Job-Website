$('select[name="city"]').each(function() {  
var $this = $(this),
  stc = ''
c.forEach(function(i, e) {
    e += +1
  stc += '<option>' + i + '</option>'
  if (address_1 = localStorage.getItem('address_1_saved')) {
    $('select[name="city"] option').each(function() {
      if ($(this).text() == address_1) {
        $(this).attr('selected', '')
      }
    })
  }
})
$(this).append(stc)
})
