const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    return;
  }
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  
  item.innerHTML = `
    <span>${value}</span>
    <div class="d-flex gap-2">
      <button class="btn btn-sm btn-outline-success" data-action="complete">完成</button>
      <button class="btn btn-sm btn-outline-danger" data-action="remove">刪除</button>
    </div>
  `;
  
  list.appendChild(item);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const target = event.target; 
  const item = target.closest('li'); 

 
  if (!item) {
    return;
  }

  
  const action = target.dataset.action;

  if (action === 'complete') {
    
    item.classList.toggle('list-group-item-success'); 

  } else if (action === 'remove') {
    
    item.remove();
  }
});


input.addEventListener('keyup', (event) => {
 
  if (event.key === 'Enter') {

    form.requestSubmit();
  }
});