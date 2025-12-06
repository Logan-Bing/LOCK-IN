import { getProjects } from "../services/api.js"

import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'
 
const calendar = createCalendar({
  views: [createViewMonthGrid()],
  events: [
    {
      id: 1,
      title: 'Coffee with John',
      start: Temporal.ZonedDateTime.from('2023-12-04T10:05:00+01:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2023-12-04T10:35:00+01:00[Europe/Berlin]'),
    },
  ],
})

const test = document.getElementById('calendar')
console.log(test)
 
calendar.render(document.getElementById('calendar'))

export async function listProjects() {
    const projectList = await getProjects()
    const section = document.createElement('section')
    section.innerHTML=`
        <h1>Hello</h1>
        <ul>
            ${projectList.map(p => `<li>${p.title}</li>`).join('')}
        </ul>
    `
    return section
}
