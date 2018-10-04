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
        $( ".list-container" ).sortable();
    });
    
    editBtnClickHandler(this.id);
    editBtnOperation(this)
    
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
    let listcontainer = $('.list-container')
    let listCard = $('<div>').addClass('list-card sortable');
    let listDragIcon = $('<i class="fas fa-ellipsis-v"></i>')
    let listText = $('<p>').addClass('list_text');
    let editSpan = $('<span>').addClass('editInput');
    let editInput = $('<input>').addClass('edit-input hiddenInput');
    let editButton = $('<button>').addClass('editBtn hiddenInput').text('X').attr('type', 'button')
    let listEditIcon = $('<i class="fas fa-edit"></i>').attr('id', "E" + editID++);
    let listDeleteIcon = $('<i class="fas fa-ban"></i>').attr('id', listID++).attr('onclick', 'deleteItem(this, this.id)');

    listcontainer.append(listCard);
    listCard.append(listText);
    editSpan.append(editInput, editButton)
    listText.append(listDragIcon, listItem, editSpan, listEditIcon, listDeleteIcon);
    todoInput.val("");

    listArray.push({
        id: listArray.length,
        edit: listArray.length,
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

function editBtnClickHandler(){
    $('body').on('click', '.fa-edit', function () {
        var editID = this.id;
        console.log('ClickedID: ' + editID);
        $('.edit-input').removeClass('hiddenInput');
        $('.editBtn').removeClass('hiddenInput');
        $('.edit-input').val('');
    });
}

function editBtnOperation(){
    $('body').on('click', '.editBtn', function () {
    console.log('Edit Value: ' + $('.edit-input').val());
    $('.edit-input').addClass('hiddenInput');
    $('.editBtn').addClass('hiddenInput');

    });
}

