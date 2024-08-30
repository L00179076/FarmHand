var Unhideevaluate = window.Unhideevaluate || {};
(function() {
this.attributeOnChange = function (executionContext) {
var formContext = executionContext.getFormContext();

var tab = formContext.ui.tabs.get('Project_Request');

var evaluate_section = tab.sections.get('Evaluate');
var scope_section = tab.sections.get('Scope');
var build_section = tab.sections.get('Build');
var deliver_section = tab.sections.get('Deliver');

//var project_manager = formContext.getAttribute('pir_projectmanager').getText();
var project_manager = formContext.getAttribute('pir_projectmanager').getValue();



//For Evaluate Unhiding
if (project_manager != null) 
{
    evaluate_section.setVisible(true);
    

} 
else 
{
    evaluate_section.setVisible(false);
    scope_section.setVisible(false);
    build_section.setVisible(false);
    deliver_section.setVisible(false);
}

}
}).call(Unhideevaluate);