import type { AllowedComponentProps, ShallowRef, VNodeProps } from 'vue'

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

export const useDialogStore = defineStore('dialog', () => {
  const show = ref(false)
  const title = ref('')
  const component: ShallowRef<Component | null> = shallowRef(null)
  const props: Ref<Record<string, unknown> | undefined> = ref(undefined)

  function openDialog<C extends Component>(
    comp: C,
    passedProps?: ComponentProps<C>,
    dialogTitle = '',
  ): void {
    component.value = comp
    props.value = passedProps as Record<string, unknown> | undefined
    title.value = dialogTitle
    show.value = true
  }

  function closeDialog() {
    show.value = false
    setTimeout(() => {
      component.value = null
      props.value = undefined
      title.value = ''
    }, 300)
  }

  return {
    show,
    component,
    props,
    title,
    openDialog,
    closeDialog,
  }
})
