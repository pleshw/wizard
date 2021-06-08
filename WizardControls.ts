class WizardControls extends WizardComponent {
  constructor( wizardParent: Wizard ) {
    super( wizardParent )
  }

  build(): void {
    this._element = document.createElement( "div" )
    this._element.id = this._parentWizard.id + 'ControlsContainer'

    this._element.classList.add( 'wizard-controls-container' )
    this._element.style.position = "relative"

    this._parentWizard
      .pages
      .forEach( this.createControlFor )
  }

  update(): void {
    // limpa o elemento
    while ( this._element.firstChild ) this._element.removeChild( this._element.firstChild )
    this.build()
  }

  private createControlFor( page: WizardPage ) {
    const radio = this.createRadio( page.title );
    const label = this.createLabel( page.title, radio.id );

    this._element.append( this.createContainer( label, radio ) )
  }

  private createContainer( label: HTMLElement, radio: HTMLElement ) {
    const container = document.createElement( "div" )

    container.classList.add( 'wizard-controls-radioContainer' )
    container.style.position = "relative"

    container.append( label, radio )

    return container;
  }

  private createRadio( pageTitle: string ) {
    const radio = document.createElement( "input" )
    radio.type = 'radio'
    radio.hidden = true
    radio.name = this._parentWizard.id + 'Control'
    radio.id = this._parentWizard.id + pageTitle

    radio.classList.add( 'wizard-controls-radio' )
    radio.style.position = "absolute"
    radio.style.left = "0"
    radio.style.top = "0"

    return radio
  }


  private createLabel( title: string, radioId: string ): HTMLElement {
    const label = document.createElement( "label" )
    label.htmlFor = radioId
    label.appendChild( document.createTextNode( title ) )

    label.classList.add( 'wizard-controls-label' )
    label.style.position = "absolute"
    label.style.left = "0"
    label.style.top = "0"

    return label
  }
}