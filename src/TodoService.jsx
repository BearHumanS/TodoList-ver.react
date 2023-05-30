import axios from 'axios'

const HEADERS = {
  APIKEY: 'KDT5_nREmPe9B',
  USERNAME: 'KDT5_NamKiHu'
}
const URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'

const todoService = {
  async getTodos() {
    try {
      const response = await axios.get(`${URL}`, {
        headers: HEADERS
      })
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },

  async createTodo(title) {
    try {
      const response = await axios.post(
        `${URL}`,
        {
          title: title
        },
        {
          headers: HEADERS
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  },

  async updateTodo(id, updatedTodo) {
    try {
      const response = await axios.put(`${URL}/${id}`, updatedTodo, {
        headers: HEADERS
      })
      return response.data
    } catch (error) {
      alert(error)
      return console.error(error)
    }
  },

  async deleteTodo(id) {
    try {
      await axios.delete(`${URL}/${id}`, {
        headers: HEADERS
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default todoService
