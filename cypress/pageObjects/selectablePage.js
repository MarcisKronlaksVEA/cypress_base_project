import Basepage from "./basePage";

class SelectablePage extends Basepage {
    static get url() {
        return '/selectable';
    }

    static get exampleElement() {
        return cy.get('exampleSelector');
    }
    
    static get selectableListItems() {
        return cy.get("#verticalListContainer > li");
    }

    static get gridNavigationButton(){
        return cy.get("#demo-tab-grid");
    }

    static get selectableGridItems(){
        return cy.get("#gridContainer > div > li");
    }
}

export default SelectablePage;