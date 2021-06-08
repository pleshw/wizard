class Wizard {
  public currentIndex: number = 1
  public id: string

  public controls: WizardControls
  public readonly container: HTMLElement = document.createElement( "div" )
  public readonly header: HTMLElement = document.createElement( "div" )
  public readonly body: HTMLElement = document.createElement( "div" )
  public readonly footer: HTMLElement = document.createElement( "div" )

  public pages: WizardPage[] = []


  constructor( wizardId?: string, parent?: HTMLElement ) {
    this.id = wizardId || "wizard"
    this.createContainer( parent || document.body )
    this.controls = new WizardControls( this )
    this.setup()
  }

  private setup() {
    this.createHeader()
    this.createBody()
    this.createFooter()
  }


  public update() {
    for ( const page of this.pages ) {
      page.update()
    }

    this.controls.update()
  }

  private createContainer( parent: HTMLElement ) {
    this.container.classList.add( 'wizard-container' )

    this.container.id = this.id

    parent.append( this.container )
  }

  private createHeader() {
    this.header.id = this.id + 'Header'

    this.container.append( this.header )
  }

  private createBody() {
    this.body.id = this.id + 'Body'

    this.container.append( this.body )
  }

  private createFooter() {
    this.footer.id = this.id + 'Footer'
    this.footer.append( this.controls.getElement() )

    this.container.append( this.footer )
  }

  getInfo(): Object {
    let result = {}

    for ( const page of this.pages ) {
      result = { ...result, ...page.getInfo() }
    }

    return result
  }
}