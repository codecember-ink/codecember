import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const _now = dayjs()

const DEC = 10 // TODO: 11

export const start_year = 2018 // TODO: 2020
export const this_year = _now.month() >= DEC ? _now.year() : (_now.year() - 1)

export const event_active = _now.month() === DEC
export const today = event_active ? _now.date() : 32

export const years = new Array(this_year - start_year + 1).fill(0).map((_, i) => start_year + i)
export const years_reverse = [...years].reverse()

export function useDate() {
  const year = ref(this_year)
  const day = ref(event_active ? today : '1')

  const route = useRoute()
  const router = useRouter()

  watch(
    () => route.path,
    (path) => {
      if (path !== '/') {
        const [, _year, _day] = route.path.split('/')
        year.value = +_year ?? year.value
        day.value = +_day ?? day.value
      }
    },
    { immediate: true },
  )

  watch([year, day], () => {
    const path = `/${year.value}/${day.value}`
    if (route.path !== path)
      router.push(path)
  })

  return { year, day }
}
