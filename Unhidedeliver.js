var Unhidedeliver = window.Unhidedeliver || {};
(function() {
this.attributeOnChange = function (executionContext) {
var formContext = executionContext.getFormContext();

var tab = formContext.ui.tabs.get('Project_Request');

var deliver_section = tab.sections.get('Deliver');
var scope_section = tab.sections.get('Scope');
var build_section = tab.sections.get('Build');
var evaluate_section = tab.sections.get('Evaluate');

var task_status = formContext.getAttribute('pir_taskstatus').getText();
var feasibility_status = formContext.getAttribute('pir_feasibilitystatus').getValue();
var project_manager = formContext.getAttribute('pir_projectmanager').getValue();
var proceed_build = formContext.getAttribute('pir_proceedwithbuild').getValue();

//var task_status = formContext.getAttribute('pir_taskstatus').getValue();



//For Deliver Unhiding
if ( project_manager !== null && (feasibility_status === 892250000 || feasibility_status === 892250001) && proceed_build === 892250000 && task_status === 'Completed') 
{
    deliver_section.setVisible(true);
} 
else {
    deliver_section.setVisible(false);
}
}
}).call(Unhidedeliver);