var NavigationAndVisibility = window.NavigationAndVisibility || {};

(function () {
    this.formOnSave = function (executionContext) {
        var formContext = executionContext.getFormContext();

    var tab = formContext.ui.tabs.get('Project_Request');

    var build_section = tab.sections.get('Build').setFocus;

    var previous_section = tab.sections.get('Scope');

    build_section.setVisible(true);
    previous_section.setVisible(true);
        }
       }).call(NavigationAndVisibility);


    



