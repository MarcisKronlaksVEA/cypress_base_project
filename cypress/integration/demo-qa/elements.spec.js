import TextBoxPage from "../../pageObjects/textBoxPage";
import CheckBoxPage from "../../pageObjects/checkBoxPage";
import RadioButtonsPage from "../../pageObjects/radioButtonsPage";
import WebTablesPage from "../../pageObjects/webTablesPage";
import ButtonsPage from "../../pageObjects/buttonsPage";

context("Elements Page", () => {
    context("Text box scenarios", () => {
        beforeEach(() => {
            TextBoxPage.visit();
        });

        it.only("Filling in Text Boxes", () => {
            // Add scenario stuff here
            TextBoxPage.fullNameInput.type("George");
            TextBoxPage.userEmailInput.type("randomemail@randomdomain.com");
            TextBoxPage.currentAddressInput.type("Some random Current Address 1234");
            TextBoxPage.permanentAddressInput.type("Some random Current Address 1234");

            TextBoxPage.submitButton.click();

            TextBoxPage.nameParagraph
                .should("be.visible")
                .should("contain", "George");

            TextBoxPage.emailParagraph
                .should("be.visible")
                .should("contain", "randomemail@randomdomain.com");

            TextBoxPage.currentAddressParagraph
                .should("be.visible")
                .should("contain", "Some Random Current Address 1234");

            TextBoxPage.permanentAddressParagraph
                .should("be.visible")
                .should("contain", "Some Random Permanent Address 1234");



        });
    });

    context("Checkbox scenarios", () => {
        beforeEach(() => {
            // Preconditions
            CheckBoxPage.visit();
        });

        it.only("Clicking checkbox - notes", () => {
            // Scenario stuff
            CheckBoxPage.expandAllButton.click();
            CheckBoxPage.checkboxListItems.contains("Notes").click()
            CheckBoxPage.checkboxListItems.contains("General").click()
            CheckBoxPage.selectedItemsArea
                .should("contain", "notes")
                .should("contain", "general");
        });

        it.only("Clicking checkbox - notes", () => {
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

        it.only("Click Radio buttons scenario", () => {
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

        it.only("web table scenario", () => {
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
            WebTablesPage.allTable.should('contain', ' xyxyxy@xzxz.com');
            WebTablesPage.allTableRows.should('contain', ' xyxyxy@xzxz.com');

        });

        it.only("Delete all record", () => {
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

        it.only("Click buttons", () => {
            // 1. do a double click
            ButtonsPage.doubleClickButton.dblclick();
            ButtonsPage.doubleClickButtonSuccessMsg.should(
                'contain',
                "ou have done a double Click")
            // 2. do a right click
            ButtonsPage.rightClickButton.rightclick();
            ButtonsPage.rightClickButtonSuccessMsg.should(
                'contain',
                "You have done a right click");
            // 3. do a dynamic click
            ButtonsPage.dynamicClickButton.click();
            ButtonsPage.dynamicClickSucessMsg(
                'contain',
                "You have done a dynamic click"
            );
        });
    });
});