$(document).ready(todoAppLoaded);

let listArray = [];
let listID = 0;
let editID = 0;


function todoAppLoaded() {
    console.log('ToDo App Ready');
    //  $('#submitButton').click(addItem);
    $('#submitButton').click(inputValidation);
    keyValidation();
    $(function() {
        $( ".main-container" ).sortable();
    });

    deleteListItem();
    editListItem();
}

function keyValidation(){
    $('#todoInput').keypress(function (e) {
        if (e.which == 13) {
            console.log('Event: ' + e);
            inputValidation();
          return false;    //<---- Add this line
        }
      });
}

function inputValidation() {
    var empty = true;
    $('#todoInput[type="text"]').each(function () {
        if ($(this).val() == "") {
            console.log('Please enter input');
            empty = false;
            return false;
        } else {
            addItem();
            empty = true
            return true;
        }
    });

}

function addItem() {
    let todoInput = $('#todoInput');
    let listItem = todoInput.val();
    let mainContainer = $('.main-container')

    let listCard = $('<div>').addClass('list-card sortable').attr('id', listID++);

    let listContainer = $('<div>').addClass('list-container');
    let listDragIcon = $('<i class="fas fa-ellipsis-v"></i>');
    let listText = $('<p>').addClass('list-text').append(listItem);
    let listEditIcon = $('<i class="fas fa-edit"></i>');
    let listDeleteIcon = $('<i class="fas fa-ban"></i>');

    let editContainer = $('<div>').addClass('edit-container hiddenInput');
    let editSpan = $('<span>').addClass('editInput');
    let editInput = $('<input>').addClass('edit-input');
    let editButton = $('<button>').addClass('editBtn').attr('type', 'button')
    let editFontIcon = $('<i class="far fa-hand-pointer"></i>')
    editButton.append(editFontIcon);

    mainContainer.append(listCard);
    listCard.append(listContainer, editContainer);
    listContainer.append(listDragIcon, listText, listEditIcon, listDeleteIcon);
    editContainer.append(editSpan, editInput, editButton);
    
    todoInput.val("");

    listArray.push({
        id: listArray.length,
        item: listItem
    });
    console.log(listArray);
}

function deleteListItem(){
$('body').on('click', '.list-card .fa-ban', function () {
    let listCardID = $(this).closest(".list-card").prop("id");
    //let listCardText = $(this).parent().parent().text();

    //Loop through array and use this id to slice out this index
    for(let i = 0; i < listArray.length; i++) {
    if(listArray[i].id == listCardID) {
        $(this).parent().parent().remove()
        listArray.splice(i, 1);
        console.log(listArray); 
        break;
    }
}
    
});
}

function editListItem(){
    $('body').on('click', '.list-card .fa-edit', function () {
        //let listCardID = $(this).closest(".list-card").prop("id");
        let listContainer = $(this).closest(".list-container");

        $(this).parent().parent().find('.edit-container').removeClass('hiddenInput');
        listContainer.addClass('hiddenInput');
        
        editSubmitButton(listContainer);
    });
}

function editSubmitButton(listContainer){
    $('body').on('click', '.list-card .editBtn', function () {
    console.log('Submit button clicked');
    let listCardID = $(this).closest(".list-card").prop("id");
    let inputText = $(this).parent().find('.edit-input').val();
    let updatedText = $(this).parent().parent().find('.list-text');

    // console.log($(this).parent().find('.edit-input').val());
    console.log('ID: ' + listCardID);
    console.log('Updated Text: ' + inputText);
    updatedText.text(inputText);
    //finds the index through this id and updates the array object
    objIndex = listArray.findIndex((obj => obj.id == listCardID));
    listArray[objIndex].item = inputText;

    
    


    listContainer.removeClass('hiddenInput');
    $(this).parent().parent().find('.edit-container').addClass('hiddenInput');
    $(inputText).val('');
    });
}