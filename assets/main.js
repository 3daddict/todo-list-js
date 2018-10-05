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

    let editContainer = $('<div>').addClass('edit-container');
    let editSpan = $('<span>').addClass('editInput');
    let editInput = $('<input>').addClass('edit-input hiddenInput');
    let editButton = $('<button>').addClass('editBtn hiddenInput').attr('type', 'button')
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

function deleteItem(card, cardID) {
    $(card).closest('.list-card').remove();
    console.log("THIS: " + cardID);
    listArray = listArray.filter(function (item) {
        return item.id != cardID;
    })
}

function deleteListItem(){
$('body').on('click', '.list-card .fa-ban', function () {
    let listCardID = $(this).closest(".list-card").prop("id");
    let listCardText = $(this).parent().parent().text();

    console.log('Ban list-card ID: ' + listCardID);// list-card ID Value
    console.log('Ban list-text: ' + listCardText); //list card original text value

    
    //Loop through array and use this id to slice out this index
    for(let i = 0; i < listArray.length; i++) {
    if(listArray[i].id == listCardID) {
        $(this).parent().parent().remove()
        listArray.splice(i, 1);
        break;
    }
    console.log(listArray); 
}
    
});
}

// function editBtnClickHandler(){
//     $('body').on('click', '.fa-edit', function () {
//         var editID = this.id;
//         console.log('ClickedID: ' + editID);
//         $('.edit-input').removeClass('hiddenInput');
//         $('.editBtn').removeClass('hiddenInput');
//         $('.edit-input').val('');
//     });
// }

// function editBtnOperation(){
//     $('body').on('click', '.editBtn', function () {
//     console.log('Edit Value: ' + $('.edit-input').val());
//     $('.edit-input').addClass('hiddenInput');
//     $('.editBtn').addClass('hiddenInput');

//     });
// }

function editListItem(){
    $('body').on('click', '.list-card .fa-edit', function () {
        let listCardID = $(this).closest(".list-card").prop("id");
        let listCardText = $(this).parent().parent().text();

        console.log('Edit list-card ID: ' + listCardID);// list-card ID Value
        console.log('Edit list-text: ' + listCardText); //list card original text value
        
    });
}
