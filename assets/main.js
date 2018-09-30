$(document).ready(todoAppLoaded);

function todoAppLoaded(){
    console.log('ToDo App Ready');
    $('#submitButton').click(addItem);

}

function addItem(){
    console.log('Add item button clicked')
    let todoInput = $('#todoInput');
    let listItem = todoInput.val();
    let listcontainer = $('.list-container');
    let listCard = $('<div>').addClass('list-card');
    let listDragIcon = $('<i class="fas fa-ellipsis-v"></i>')
    let listText = $('<p>').addClass('list_text');
    let listEditIcon = $('<i class="fas fa-edit"></i>');
    let listDeleteIcon = $('<i class="fas fa-ban"></i>').attr('onclick', 'deleteItem(this)');

    listcontainer.append(listCard);
    listCard.append(listText);
    listText.append(listDragIcon, listItem, listEditIcon, listDeleteIcon);
    todoInput.val("");
}

function deleteItem(card){
    console.log('Item to delete Card');
    $(card).closest('.list-card').remove();
}