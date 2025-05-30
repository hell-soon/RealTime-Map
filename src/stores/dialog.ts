export const useDialogStore = defineStore('dialog', () => {
  const show = ref(false)
  const component = ref<null | any>(null)
  const props = ref<Record<string, any>>({})

  function openDialog(comp: any, passedProps = {}) {
    component.value = comp
    props.value = passedProps
    show.value = true
  }

  function closeDialog() {
    show.value = false
    component.value = null
    props.value = {}
  }

  return {
    show,
    component,
    props,
    openDialog,
    closeDialog,
  }
})
