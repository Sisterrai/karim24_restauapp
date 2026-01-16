import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),

  getters: {
    totalPrice(state) {
      return state.items.reduce(
        (total, item) => total + item.price * item.qty,
        0
      )
    },

    totalItems(state) {
      return state.items.reduce(
        (total, item) => total + item.qty,
        0
      )
    }
  },

  actions: {
    add(newItem) {
      const existingItem = this.items.find(
        item => item.id === newItem.id
      )

      if (existingItem) {
        existingItem.qty++
      } else {
        this.items.push({
          ...newItem,
          qty: 1
        })
      }
    },

    remove(itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
    },

    clear() {
      this.items = []
    }
  }
})


