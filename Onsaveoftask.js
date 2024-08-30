var Onsaveoftask = window.Onsaveoftask || {};
(function () {
    this.formOnSave = function (executionContext) {
        var formContext = executionContext.getFormContext();
        var parentFormContext = formContext.getFormContext().data.getParentContext();
        var projectRequestTab = parentFormContext.ui.tabs.get('Project_Request');
        var buildSection = projectRequestTab.sections.get('Build');
        var scopeSection = projectRequestTab.sections.get('Scope');
        // Unhide the 'Build' and 'Scope' sections
    if (buildSection) {
        buildSection.setVisible(true);
    }

    if (scopeSection) {
        scopeSection.setVisible(true);
    }

    
        }
       
}).call(Onsaveoftask);

