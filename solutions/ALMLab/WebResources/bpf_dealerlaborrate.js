function OnLoad(executionContext) {
    try {
        var formContext = executionContext.getFormContext();

        var name = formContext.getAttribute("bpf_name").getValue();
        if (name.length === 0) {
            var dealer = formContext.getAttribute("bpf_dealer").getValue();
            formContext.getAttribute("bpf_name").setValue(dealer[0].name);
            formContext.data.entity.save();
        }
    } catch (e) {

    }
}

function OnSave(executionContext) {
    try {
        var formContext = executionContext.getFormContext();

        var isDealerChanged = formContext.getAttribute("bpf_dealer").getIsDirty();
        if (isDealerChanged) {
            var dealer = formContext.getAttribute("bpf_dealer").getValue();
            formContext.getAttribute("bpf_name").setValue(dealer[0].name);
        }
    } catch (e) {

    }
}