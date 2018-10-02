$(document).ready(todoAppLoaded);

let listArray = [];
let listID = 0;


function todoAppLoaded(){
    console.log('ToDo App Ready');
    $('#submitButton').click(addItem);

}

function addItem(){
    let todoInput = $('#todoInput');
    let listItem = todoInput.val();
    let listcontainer = $('.list-container');
    let listCard = $('<div>').addClass('list-card');
    let listDragIcon = $('<i class="fas fa-ellipsis-v"></i>')
    let listText = $('<p>').addClass('list_text');
    let listEditIcon = $('<i class="fas fa-edit"></i>');
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

function deleteItem(card, cardID){
    $(card).closest('.list-card').remove();
    console.log("THIS: " + cardID);
    listArray = listArray.filter(function(item) {
        return item.id != cardID;
    })
}