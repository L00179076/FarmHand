var Unhidebuild = window.Unhidebuild || {};

Unhidebuild.attributeOnChange = function (executionContext) {
    var formContext = executionContext.getFormContext();

    var tab = formContext.ui.tabs.get('Project_Request');
    var evaluate_section = tab.sections.get('Evaluate');
    var build_section = tab.sections.get('Build');
    var deliver_section = tab.sections.get('Deliver');
    var scope_section = tab.sections.get('Scope');
    
    var feasibility_status = formContext.getAttribute('pir_feasibilitystatus').getValue();
    var proceed_build = formContext.getAttribute('pir_proceedwithbuild').getValue();

    
    if (proceed_build === 892250000 && (feasibility_status === 892250000 || feasibility_status === 892250001 ) ) {
       
        build_section.setVisible(true);
    } 
    else {
        
        build_section.setVisible(false);
        deliver_section.setVisible(false);
        
    }
};

Unhidebuild.attributeOnChange(); 
