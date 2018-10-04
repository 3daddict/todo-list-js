$(document).ready(todoAppLoaded);

let listArray = [];
let listID = 0;
let editID = 0;


function todoAppLoaded() {
    console.log('ToDo App Ready');
    //  $('#submitButton').click(addItem);
    $('#submitButton').click(inputValidation);
    keyValidation();
    $( function() {
        $( ".list-container" ).sortable();
      } );
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
    let listEditIcon = $('<i class="fas fa-edit"></i>').attr('id', "E" + editID).attr('onclick', 'editItem(this,' + editID++ + ')');
    let listDeleteIcon = $('<i class="fas fa-ban"></i>').attr('id', listID++).attr('onclick', 'deleteItem(this, this.id)');

    listcontainer.append(listCard);
    listCard.append(listText);
    listText.append(listDragIcon, listItem, listEditIcon, listDeleteIcon);
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

function editItem(card, dataeditID) {
    // $(card).closest('.list-card').text("Laila");

    objIndex = listArray.findIndex((obj => obj.id == dataeditID));
    listArray[objIndex].item = "Laila"
//https://stackoverflow.com/questions/33267797/turn-text-element-into-input-field-type-text-when-clicked-and-change-back-to-tex
}
