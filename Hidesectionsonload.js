var Hidesectiononload = window.Hidesectiononload || {};
(function () {

this.formOnLoad = function (executionContext) {
    var formContext = executionContext.getFormContext();
    var tab = formContext.ui.tabs.get('Project_Request');
    var build_section = tab.sections.get('Build');
    var scope_section = tab.sections.get('Scope')
    var feasibility_status = formContext.getAttribute('pir_feasibilitystatus').getValue();

    build_section.setVisible(false);
    scope_section.setVisible(false);

    


//For Scope Unhiding
if (feasibility_status === 892250000 || feasibility_status === 892250001) 
{
    scope_section.setVisible(true);
    build_section.setVisible(true);
} 



}

}).call(Hidesectiononload);   