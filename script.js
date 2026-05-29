const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(function(item){
    item.addEventListener('click', function(){
        menuItems.forEach(function(i){
            i.classList.remove('active');
        });
        item.classList.add('active');   
    });
});

const newEntryBtn = document.querySelector('.new-entry-btn');
const modalOverlay = document.querySelector('.modal-overlay');


newEntryBtn.addEventListener('click', function(){
    modalOverlay.classList.add('active');
});

const cancelBtn = document.querySelector('.modal-cancel');

cancelBtn.addEventListener('click', function(){
    modalOverlay.classList.remove('active');
})

modalOverlay.addEventListener('click', function(e){
    if(e.target == modalOverlay)
        modalOverlay.classList.remove('active');
})