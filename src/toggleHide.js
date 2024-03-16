const tableEmpty = document.getElementById('table-empty')

const emptyMessage = document.getElementById('empty-message') 


export function removeHide() {
  tableEmpty.classList.remove('hide')
  emptyMessage.classList.remove('hide')
}

export function addHide() {
  tableEmpty.classList.add('hide')
  emptyMessage.classList.add('hide')
}
