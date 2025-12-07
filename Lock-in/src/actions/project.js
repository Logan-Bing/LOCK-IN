import { getApi} from "../services/api.js"

import { createCalendar, createViewMonthGrid, viewWeek } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'
 
const calendar = createCalendar({
  views: [viewWeek],
  events: [
    {
      id: 1,
      title: 'Coffee with John',
      start: Temporal.ZonedDateTime.from('2025-12-04T10:05:00+01:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2025-12-04T10:35:00+01:00[Europe/Berlin]'),
    },
  ],
})

export async function ListProjects() {
    const projectList = await getApi('projects')
    console.log(projectList)
    const section = document.createElement('section')
    section.innerHTML=`
        <h1>Hello</h1>
        <ul class="test">
            ${projectList.data.map(p => `<li>${p.title}</li>`).join('')}
        </ul>
    `
    const calendar_div = document.createElement('div')
    section.appendChild(calendar_div)
    calendar.render(calendar_div)
    return section
}
