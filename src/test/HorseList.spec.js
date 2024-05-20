import { mount } from '@vue/test-utils'
import HorseList from '../components/HorseList.vue'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'

// test example.
const store = createStore({
  state: {
    racing: {
      horses: [
        { id: 1, name: 'Thunder', condition: 'Good', color: '#FF5733' },
        { id: 2, name: 'Lightning', condition: 'Excellent', color: '#33FF57' },
        { id: 3, name: 'Storm', condition: 'Good', color: '#3375FF' },
        { id: 4, name: 'Blaze', condition: 'Fair', color: '#FF33FF' },
        { id: 5, name: 'Whirlwind', condition: 'Poor', color: '#FFFF33' },
        { id: 6, name: 'Comet', condition: 'Excellent', color: '#33FFFF' },
        { id: 7, name: 'Meteor', condition: 'Good', color: '#FF3380' },
        { id: 8, name: 'Hurricane', condition: 'Fair', color: '#8033FF' },
        { id: 9, name: 'Tornado', condition: 'Poor', color: '#3380FF' },
        { id: 10, name: 'Twister', condition: 'Excellent', color: '#FF8033' },
        { id: 11, name: 'Cyclone', condition: 'Good', color: '#FF3375' },
        { id: 12, name: 'Typhoon', condition: 'Fair', color: '#33FF80' },
        { id: 13, name: 'Gale', condition: 'Poor', color: '#80FF33' },
        { id: 14, name: 'Squall', condition: 'Excellent', color: '#803380' },
        { id: 15, name: 'Breeze', condition: 'Good', color: '#338033' },
        { id: 16, name: 'Zephyr', condition: 'Fair', color: '#803333' },
        { id: 17, name: 'Sirocco', condition: 'Poor', color: '#FF3380' },
        { id: 18, name: 'Mistral', condition: 'Excellent', color: '#8033FF' },
        { id: 19, name: 'Chinook', condition: 'Good', color: '#3380FF' },
        { id: 20, name: 'Blizzard', condition: 'Fair', color: '#FF8033' }
      ]
    }
  }
})

describe('HorseList.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    })
  })

  it('renders a list of horses', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(20)
  })

  it('renders horse names correctly', () => {
    const firstHorseName = wrapper.find('tbody tr:first-child td:first-child').text()
    expect(firstHorseName).toBe('Thunder')
  })

  it('renders horse colors correctly', () => {
    const firstHorseColor = wrapper.find('tbody tr:first-child .horse-color').element.style.backgroundColor
    expect(firstHorseColor).toBe('rgb(255, 87, 51)')
  })
})
