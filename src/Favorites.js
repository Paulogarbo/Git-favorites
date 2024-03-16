import * as th from './toggleHide.js'
import { GithubUser } from './GithubUser.js'

// class to organize data
export class Favorites {
  constructor(root){
    this.root = document.querySelector(root)

    this.load()
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []

    this.isEmpty()
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async isEmpty(){
    const isEmpty = this.entries.length === 0

    if(isEmpty){
      await th.removeHide()
    } else {
      th.addHide()
    }
  }

  async add(userlogin) {
    try{
      const userExists = this.entries.find( entry => entry.login == userlogin)

      if(userExists){
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(userlogin)

      if(user.login == undefined){
        throw new Error('Usuário não encontrado.')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
 
    } catch(error){
      alert(error.message)
    }
  }

  delete(user) {
    // Higher-order function (map, filter, find, reduce)
    const filteredEntries = this.entries.filter( (entry) => entry.login != user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

// class to organize and change the HTML view
export class FavoritesView extends Favorites {
  constructor(root){
    super(root)

    this.tbody = document.querySelector('table #table-full')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('header button')

    addButton.onclick = () => {
      const { value } = this.root.querySelector('header input')
      
      this.add(value)
      this.root.querySelector('header input').value = ''
    }
    
  }

  update(){
    this.removeAllTr()
    this.isEmpty()

    this.entries
      .forEach(user => {
        const row = this.createRow()

        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Image de ${user.name}`
        row.querySelector('.user a').href = `https://github.com/${user.login}`
        row.querySelector('.user p').textContent = user.name
        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.followers
        
        row.querySelector('.remove').onclick = () => {
          const isOk = confirm('Tem certeza que deseja deletar essa linha?')
          if(isOk) {
            this.delete(user)
          }
        }

        this.tbody.append(row)
      })
  }

  createRow(){
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
      <img src="https://github.com/Paulogarbo.png" alt="Imagem de Paulo Alex">
      <a href="https://github.com/Paulogarbo" target="_blank">
        <p>Paulo Alex</p>
        <span>Paulogarbo</span>
      </a>
    </td>
    <td class="repositories">
      20
    </td>
    <td class="followers">
      20
    </td>
    <td>
      <button class="remove">Remover</button>
    </td>`

    return tr
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => tr.remove())
  }
}
