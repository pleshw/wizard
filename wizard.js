"use strict";
class Wizard {
    constructor(wizardId, parent) {
        this.currentIndex = 1;
        this.container = document.createElement("div");
        this.header = document.createElement("div");
        this.body = document.createElement("div");
        this.footer = document.createElement("div");
        this.pages = [];
        this.id = wizardId || "wizard";
        this.createContainer(parent || document.body);
        this.controls = new WizardControls(this);
        this.setup();
    }
    setup() {
        this.createHeader();
        this.createBody();
        this.createFooter();
    }
    update() {
        for (const page of this.pages) {
            page.update();
        }
        this.controls.update();
    }
    createContainer(parent) {
        this.container.classList.add('wizard-container');
        this.container.id = this.id;
        parent.append(this.container);
    }
    createHeader() {
        this.header.id = this.id + 'Header';
        this.container.append(this.header);
    }
    createBody() {
        this.body.id = this.id + 'Body';
        this.container.append(this.body);
    }
    createFooter() {
        this.footer.id = this.id + 'Footer';
        this.footer.append(this.controls.getElement());
        this.container.append(this.footer);
    }
    getInfo() {
        let result = {};
        for (const page of this.pages) {
            result = Object.assign(Object.assign({}, result), page.getInfo());
        }
        return result;
    }
}
class WizardComponent {
    constructor(parentWizard) {
        this._parentWizard = parentWizard;
        this.build();
    }
    getElement() {
        return this._element;
    }
}
class WizardControls extends WizardComponent {
    constructor(wizardParent) {
        super(wizardParent);
    }
    build() {
        this._element = document.createElement("div");
        this._element.id = this._parentWizard.id + 'ControlsContainer';
        this._element.classList.add('wizard-controls-container');
        this._element.style.position = "relative";
        this._parentWizard
            .pages
            .forEach(this.createControlFor);
    }
    update() {
        // limpa o elemento
        while (this._element.firstChild)
            this._element.removeChild(this._element.firstChild);
        this.build();
    }
    createControlFor(page) {
        const radio = this.createRadio(page.title);
        const label = this.createLabel(page.title, radio.id);
        this._element.append(this.createContainer(label, radio));
    }
    createContainer(label, radio) {
        const container = document.createElement("div");
        container.classList.add('wizard-controls-radioContainer');
        container.style.position = "relative";
        container.append(label, radio);
        return container;
    }
    createRadio(pageTitle) {
        const radio = document.createElement("input");
        radio.type = 'radio';
        radio.hidden = true;
        radio.name = this._parentWizard.id + 'Control';
        radio.id = this._parentWizard.id + pageTitle;
        radio.classList.add('wizard-controls-radio');
        radio.style.position = "absolute";
        radio.style.left = "0";
        radio.style.top = "0";
        return radio;
    }
    createLabel(title, radioId) {
        const label = document.createElement("label");
        label.htmlFor = radioId;
        label.appendChild(document.createTextNode(title));
        label.classList.add('wizard-controls-label');
        label.style.position = "absolute";
        label.style.left = "0";
        label.style.top = "0";
        return label;
    }
}
class WizardPage extends WizardComponent {
    constructor(wizardParent, title) {
        super(wizardParent);
        this.components = [];
        this.title = title;
    }
    build() {
        for (const component of this.components) {
            component.build();
            this._element.append(component.getElement());
        }
    }
    update() {
        for (const component of this.components)
            component.update();
    }
    getInfo() {
        return {};
    }
}
