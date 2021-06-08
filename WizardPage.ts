class WizardPage extends WizardComponent {
  public title: string
  public readonly components: WizardComponent[] = []

  constructor( wizardParent: Wizard, title: string ) {
    super( wizardParent )
    this.title = title
  }

  build(): void {
    for ( const component of this.components ) {
      component.build()
      this._element.append( component.getElement() )
    }
  }

  update(): void {
    for ( const component of this.components ) component.update()
  }

  getInfo(): Object {
    return {}
  }
}