var Unhidescope = window.Unhidescope || {};
(function() {
this.attributeOnChange = function (executionContext) {
var formContext = executionContext.getFormContext();

var tab = formContext.ui.tabs.get('Project_Request');
var scope_section = tab.sections.get('Scope');
var build_section = tab.sections.get('Build');
var deliver_section = tab.sections.get('Deliver');


//var feasibility_status = formContext.getAttribute('pir_feasibilitystatus').getText();

var feasibility_status = formContext.getAttribute('pir_feasibilitystatus').getValue();





//For Scope Unhiding
if (feasibility_status === 892250000 || feasibility_status === 892250001 ) 
{
    scope_section.setVisible(true);
} 
else 
{
    scope_section.setVisible(false);
    build_section.setVisible(false);
    deliver_section.setVisible(false);
}


}
}).call(Unhidescope);