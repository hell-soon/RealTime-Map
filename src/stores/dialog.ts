import type { AllowedComponentProps, ShallowRef, VNodeProps } from 'vue'

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

export const useDialogStore = defineStore('dialog', () => {
  const show = ref(false)
  const component: ShallowRef<Component | null> = shallowRef(null)
  const props: Ref<Record<string, unknown> | undefined> = ref(undefined)

  function openDialog<C extends Component>(
    comp: C,
    passedProps?: ComponentProps<C>,
  ): void {
    component.value = comp
    props.value = passedProps as Record<string, unknown> | undefined
    show.value = true
  }

  function closeDialog() {
    show.value = false
    component.value = null
    props.value = undefined
  }

  return {
    show,
    component,
    props,
    openDialog,
    closeDialog,
  }
})
