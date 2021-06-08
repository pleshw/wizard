abstract class WizardComponent {
  protected _parentWizard: Wizard
  protected _element!: HTMLElement

  constructor( parentWizard: Wizard ) {
    this._parentWizard = parentWizard
    this.build()
  }

  public getElement(): HTMLElement {
    return this._element
  }

  abstract build(): void

  abstract update(): void
}