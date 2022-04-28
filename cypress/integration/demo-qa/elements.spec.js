import TextBoxPage from "../../pageObjects/textBoxPage";
import CheckBoxPage from "../../pageObjects/checkBoxPage";
import RadioButtonsPage from "../../pageObjects/radioButtonsPage";
import WebTablesPage from "../../pageObjects/webTablesPage";
import ButtonsPage from "../../pageObjects/buttonsPage";
import LinksPage from '../../pageObjects/linksPage';
import SelectablePage from '../../pageObjects/selectablePage';

context("Elements Page", () => {
    context("Text box scenarios", () => {
        beforeEach(() => {
            TextBoxPage.visit();
        });

        it("Filling in Text Boxes", () => {
            // Add scenario stuff here
            TextBoxPage.fullNameInput.type("George");
            TextBoxPage.userEmailInput.type("randomemail@randomdomain.com");
            TextBoxPage.currentAddressInput.type("Some random Current Address 1234");
            TextBoxPage.permanentAddressInput.type("Some random Permanent Address 1234");

            TextBoxPage.submitButton.click();

            TextBoxPage.nameParagraph
                .should("be.visible")
                .should("contain", "George");

            TextBoxPage.emailParagraph
                .should("be.visible")
                .should("contain", "randomemail@randomdomain.com");

            TextBoxPage.currentAddressParagraph
                .should("be.visible")
                .should("contain", "Some random Current Address 1234");

            TextBoxPage.permanentAddressParagraph
                .should("be.visible")
                .should("contain", "Some random Permanent Address 1234");



        });
    });

    context("Checkbox scenarios", () => {
        beforeEach(() => {
            // Preconditions
            CheckBoxPage.visit();
        });

        it("Clicking checkbox - notes", () => {
            // Scenario stuff
            CheckBoxPage.expandAllButton.click();
            CheckBoxPage.checkboxListItems.contains("Notes").click()
            CheckBoxPage.checkboxListItems.contains("General").click()
            CheckBoxPage.selectedItemsArea
                .should("contain", "notes")
                .should("contain", "general");
        });

        it("Clicking checkbox - notes", () => {
            // Click office
            CheckBoxPage.expandAllButton.click();
            CheckBoxPage.checkboxListItems.contains("Office").click()
            CheckBoxPage.selectedItemsArea
                .should("contain", "office")
                .should("contain", "public")
                .should("contain", "private")
                .should("contain", "classified")
                .should("contain", "general");
            // Validate - office public private classified general
        });
    });

    context("Radio buttons scenarios", () => {
        beforeEach(() => {
            // Preconditons
            RadioButtonsPage.visit();
        });

        it("Click Radio buttons scenario", () => {
            RadioButtonsPage.yesRadioButton.click();
            RadioButtonsPage.resultsText.should("contain", "Yes");

            RadioButtonsPage.impressiveRadioButton.click();
            RadioButtonsPage.resultsText.should("contain", "Impressive");

            RadioButtonsPage.noRadioButton.should("be.disabled");

        });
    });

    context("web Tables scenarios", () => {
        beforeEach(() => {
            // Preconditons
            WebTablesPage.visit();
        });

        it("web table scenario", () => {
            // 1. Click "Add" button
            WebTablesPage.addButton.click();
            // 2. Input all the necessary text fields
            // first name, last name, email, age, salary, department
            WebTablesPage.firstName.type('XXXXX');
            WebTablesPage.lastName.type('ZZZZZ');
            WebTablesPage.userEmail.type('xyxyxy@xzxz.com');
            WebTablesPage.userAge.type('45');
            WebTablesPage.salary.type('2400');
            WebTablesPage.department.type('Life');
            // 3. click "Submit" button
            WebTablesPage.submitButton.click();
            // 4. Validate that user has been added.
            WebTablesPage.allTable.should('contain', 'xyxyxy@xzxz.com');
            WebTablesPage.allTableRows.should('contain', 'xyxyxy@xzxz.com');

        });

        it("Delete all record", () => {
            // 5. delete user with email:
            WebTablesPage.deleteRow("alden@example.com");
            WebTablesPage.deleteRow("cierra@example.com");
            WebTablesPage.deleteRow("kierra@example.com");
        });
    });

    context("Buttons page scenarios", () => {
        beforeEach(() => {
            // Preconditons
            ButtonsPage.visit();
        });

        it("Click buttons", () => {
            // 1. do a double click
            ButtonsPage.doubleClickButton.dblclick();
            ButtonsPage.doubleClickButtonSuccessMsg.should(
                'contain',
                "You have done a double click")
            // 2. do a right click
            ButtonsPage.rightClickButton.rightclick();
            ButtonsPage.rightClickButtonSuccessMsg.should(
                'contain',
                "You have done a right click");
            // 3. do a dynamic click
            ButtonsPage.dynamicClickButton.click();
            ButtonsPage.dynamicClickSuccessMsg.should(
                'contain',
                "You have done a dynamic click"
            );
        });
    });

    context("Links scenarios", () => {
        beforeEach(() => {
            // Preconditons
            LinksPage.visit();
        });

        it("Click Links buttons", () => {
            cy.intercept('GET', 'created',{statusCode: 201}).as('getCreated');
            LinksPage.createdLink.click();
            cy.wait('@getCreated').then((data) => {
                cy.log(data.response.statusCode)
                expect(data.response.statusCode).to.eq(201)
            });
        });     
    });

    context("Selectable scenarios", () => {
        beforeEach(() => {
            // Preconditons
            SelectablePage.visit();
        });
            // 1. Click on items in the list
        it("Click Selectable", () => {
            SelectablePage.selectableListItems.contains("Cras justo odio").click();
            SelectablePage.selectableListItems.contains("Morbi leo risus").click();
            // 2. Validate that fields are active
            SelectablePage.selectableListItems.contains("Cras justo odio").should('have.class', 'active');
            SelectablePage.selectableListItems.contains("Morbi leo risus").should('have.class', 'active');
            // 3. Validate the other fields
            SelectablePage.selectableListItems.contains("Dapibus ac facilisis in").should('not.have.class', 'active');
            SelectablePage.selectableListItems.contains("Porta ac consectetur ac").should('not.have.class', 'active');
        });

        it.only("Click Grid elements", () => {
            SelectablePage.gridNavigationButton.click();
            // 1. Click on elements in grid
            SelectablePage.selectableGridItems.contains("Two").click();
            SelectablePage.selectableGridItems.contains("Four").click();
            SelectablePage.selectableGridItems.contains("Six").click();
            SelectablePage.selectableGridItems.contains("Eight").click();
            // 2. Validate clicked elements in grid
            SelectablePage.selectableGridItems.contains("Two").should('have.class','active');
            SelectablePage.selectableGridItems.contains("Four").should('have.class','active');
            SelectablePage.selectableGridItems.contains("Six").should('have.class','active');
            SelectablePage.selectableGridItems.contains("Eight").should('have.class','active');
            // 3. Validate the other grid elements
            SelectablePage.selectableGridItems.contains("One").should('not.have.class','active');
            SelectablePage.selectableGridItems.contains("Three").should('not.have.class','active');
            SelectablePage.selectableGridItems.contains("Five").should('not.have.class','active');
            SelectablePage.selectableGridItems.contains("Seven").should('not.have.class','active');
            SelectablePage.selectableGridItems.contains("Nine").should('not.have.class','active');  
        });
    });
});