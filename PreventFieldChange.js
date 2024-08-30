var PreventFieldChange = window.PreventFieldChange || {};

(function() {
    this.PreventFieldChange = function(executionContext) {
        var formContext = executionContext.getFormContext();

        // field you want to prevent editing for
        
        var feasibility_status = formContext.getAttribute('pir_feasibilitystatus');

        var proceed_build = formContext.getAttribute('pir_proceedwithbuild');

        var task_status = formContext.getAttribute('pir_taskstatus');

        var delivery_status = formContext.getAttribute('pir_deliverystatus');

        

        // Check if the form is in update mode and the field value is not null
        if (formContext.ui.getFormType() === 2 && feasibility_status.getValue() !== null) 
        {
            // Disable the field to prevent editing
            feasibility_status.controls.forEach(function(control) 
            {
                control.setDisabled(true);
            });
        }

        //For Scope- prooced with build value
        if (formContext.ui.getFormType() === 2 && proceed_build.getValue() !== null) 
        {
            // Disable the field to prevent editing
            proceed_build.controls.forEach(function(control) 
            {
                control.setDisabled(true);
            });
        }

        /*
        //For Build-Overall Build task
        if (formContext.ui.getFormType() === 2 && task_status.getText() !== null) 
        {
            // Disable the field to prevent editing
            task_status.controls.forEach(function(control) 
            {
                control.setDisabled(true);
            });
        }*/
        

        /*
        //For delivery status
        if (formContext.ui.getFormType() === 2 && delivery_status.getText() !== null) 
        {
            // Disable the field to prevent editing
            delivery_status.controls.forEach(function(control) 
            {
                control.setDisabled(true);
            });
        }
        */





    }
    // Execute the function on form save
    this.onSave = function(executionContext) {
        this.PreventFieldChange(executionContext);
    }
}).call(PreventFieldChange);