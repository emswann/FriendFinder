/**
 * @file Client side functionality. 
 * @author Elaina Swann
 * @version 1.0 
*/

$(document).ready(() => {
  var questions = [
    'How likely are you to own a pet with fur?',
    'Your close friend has surgery, how likely are you to be the first one to visit?',
    'After a long week of work, how likely are you to party on Friday night?',
    'Someone is driving slowly in a passing lane, how likely are you to ride his tailgate?',
    'How likely are you to daydream about the beach?',
    'If someone is gossiping about a friend, how likely are you to tell the person to stop?',
    'You are hosting a party, how likely will the main event be pizza and beer?',
    'You have to choose between The Sixth Sense and Kung Foo Panda, how likely are you to watch Kung Foo Panda?',
    'How likely are you to order dessert in a restaurant after a full meal?',
    'Someone is playing country music, how likely are you to request a genre change?'
  ];
    
  var options = [
    'Select an option',
    '1 (Least Likely)',
    '2',
    '3',
    '4',
    '5 (Most Likely)'
  ];

  /* Dynamic rendering of questions. */
  var renderQuestions = (() => {
    questions.forEach((question, index) => {
      var questionRow = $('<div>').addClass('row');
      $('#questions').append(questionRow);

      var questionCol = $('<div>').addClass('col-xs-12 col-sm-12 col-md-12');
      $(questionRow).append(questionCol);

      var questionDiv = $('<div>');
      questionCol.append(questionDiv);

      var label = $('<h3>').addClass('question-label')
                           .attr({
                             'id': 'label-' + index,
                             'data-index': index
                           })
                           .text('Question ' + (index + 1));
      var question = $('<h4>').addClass('question')
                              .attr({
                                'id': 'question-' + index,
                                'data-index': index
                              })
                              .text(question);
      questionDiv.append($(label)).append($(question));

      var selectDiv = $('<select>').addClass('form-control question-select')
                                   .attr({
                                     'id': 'select-' + index
                                   });
      questionCol.append(selectDiv);

      options.forEach((option, index) => {
        var optionDiv = $('<option>')
                        .attr({
                          'data-value': index
                        })
                        .text(option);
        selectDiv.append(optionDiv);
      })
    });
  })();

  /* Get the selected answer for each question. */
  var getAnswers = () => 
    questions.map((question, index) => 
      parseInt($('#select-' + index + ' option:selected').data('value')));

  /* Determines if everything on the form has been filled in or selected. */
  var validateInfo = friend => 
    (friend.name 
    && friend.photo 
    && (friend.scores.filter(score => score !== 0).length 
        === friend.scores.length)) 
    || false;

  /* Handles server side post for submitting survey. */
  $(document).on("click", "#submit-survey", () => {
    var newFriend = {
      name: $('#name').val().trim(),
      photo: $('#photo').val().trim(),
      scores: getAnswers() 
    };

    if (validateInfo(newFriend)) {
      $.post({url: '/api/friends', 
              data: newFriend,
              traditional: true})
      .then(data => {
        /* Matched friend. */
        $('#friend-name').text(data.name);
        $('#friend-img').attr("src", data.photo);
        $('#friend-modal').modal('show');

        /* If successful, clear data on survey page. */
        $('#name').val('');
        $('#photo').val('');
        $('.question-select').val(options[0]);
      })
      .fail(error => console.log(error))
    }
    else {
      $('#error-modal').modal('show');
    }    
  });
});