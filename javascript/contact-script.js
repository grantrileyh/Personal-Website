console.log("it works!")

$(document).ready(function () {
  $('.contact-submit').click(function (event) {
    console.log("clicked button!")

    var email = $('.contact-email').val()
    var subject = $('.contact-subject').val()
    var message = $('.contact-message').val()
    // hold status element to give info to user
    $( ".contact-email-msg" ).empty()
    $( ".contact-subject-msg" ).empty()
    $( ".contact-message-msg" ).empty()


    //validate data
    if(email.length > 5 && email.includes('@') && email.includes('.') ) {
      console.log('email is valid')
    } else {
      $( ".contact-email-msg" ).append('<div> * Please enter a valid email.</div>')
      event.preventDefault()
      console.log('email is NOT valid')
    }

    if(subject.length > 2) {
      console.log('subject is valid')
    } else {
      $( ".contact-subject-msg" ).append("<div>* Please enter a longer subject.</div>")
      event.preventDefault()
      console.log('subject is NOT valid')
    }

    if(message.length > 10) {
      console.log('message is valid')
    } else {
      $( ".contact-message-msg" ).append('<div>* Please enter a longer message.</div>')
      event.preventDefault()
      console.log('message is NOT valid')
    }

  })
})
