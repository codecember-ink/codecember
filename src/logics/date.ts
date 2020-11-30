import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const _now = dayjs()

const DEC = 11

export const start_year = 2020
export const this_year = _now.month() >= DEC ? _now.year() : (_now.year() - 1)

export const event_active = _now.month() === DEC
export const today = event_active ? _now.date() : 32

export const years = new Array(this_year - start_year + 1).fill(0).map((_, i) => start_year + i)
export const years_reverse = [...years].reverse()

export function useDate() {
  const year = ref(this_year)
  const day = ref(0)

  const route = useRoute()

  watch(
    () => route.path,
    (path) => {
      const [, _year, _day] = path.split('/')
      year.value = +_year || this_year
      day.value = +_day
    },
    { immediate: true },
  )

  return { year, day }
}
