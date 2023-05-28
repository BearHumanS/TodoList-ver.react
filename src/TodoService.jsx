import axios from 'axios'

const headers = {
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_NamKiHu'
}

const TodoService = {
  getTodos: async () => {
    try {
      const response = await axios.get(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          headers
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },

  createTodo: async title => {
    try {
      const response = await axios.post(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          title: title
        },
        {
          headers
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  },

  updateTodo: async (id, updatedTodo) => {
    try {
      const response = await axios.put(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        updatedTodo,
        {
          headers
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  },

  deleteTodo: async id => {
    try {
      await axios.delete(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        {
          headers
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
}

export default TodoService
