
function hideShowSection(tabName, sectionName, visibility) {
	Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName).setVisible(visibility);
}

function requiredLocationToggle(bOnChange) {

	try {

		if (Xrm.Page.getAttribute("cdss_requiresmove").getValue()) {
			hideShowSection("tabGeneral", "section_requiredlocation", true);
			
			if (bOnChange) {
				Xrm.Page.getControl("cdss_requireddepot").setVisible(false);
				Xrm.Page.getControl("cdss_requireddealer").setVisible(false);
				Xrm.Page.getControl("cdss_requiredenduser").setVisible(false);
			}
		} else {
			hideShowSection("tabGeneral", "section_requiredlocation", false);
			
			if (bOnChange) {
				Xrm.Page.getAttribute("cdss_requiredlocationtype").setValue();
				Xrm.Page.getAttribute("cdss_requireddepot").setValue();
				Xrm.Page.getAttribute("cdss_requireddealer").setValue();
				Xrm.Page.getAttribute("cdss_requiredenduser").setValue();
				Xrm.Page.getAttribute("new_requiredlatitude").setValue();
				Xrm.Page.getAttribute("new_requiredlongitude").setValue();
				Xrm.Page.getAttribute("new_shippingpriority").setValue();
				Xrm.Page.getAttribute("new_pleaseshipbefore").setValue();
				Xrm.Page.getAttribute("cdss_requireddepot").setRequiredLevel("none");
				Xrm.Page.getAttribute("cdss_requireddealer").setRequiredLevel("none");
				Xrm.Page.getAttribute("cdss_requiredenduser").setRequiredLevel("none");
			}
		}
	} catch (err) {
		alert("Error caught in 'requiredLocationToggle(" + bOnChange +")' function. \nError Details: " + err.message);
	}
}

function requiredLocationTypeToggle(bOnChange) {

	try {

		if (Xrm.Page.getAttribute("cdss_requiresmove").getValue()) {
			var locationType = Xrm.Page.getAttribute("cdss_requiredlocationtype").getText();
			
			if (bOnChange) {
				Xrm.Page.getAttribute("cdss_requiredenduser").setValue();
				Xrm.Page.getAttribute("cdss_requireddealer").setValue();
				Xrm.Page.getAttribute("cdss_requireddepot").setValue();
			}
						
			switch (locationType)
			{
				case "Depot":
					Xrm.Page.getControl("cdss_requireddepot").setVisible(true);
					Xrm.Page.getControl("cdss_requireddealer").setVisible(false);
					Xrm.Page.getControl("cdss_requiredenduser").setVisible(false);
					
					Xrm.Page.getAttribute("cdss_requireddepot").setRequiredLevel("required");
					Xrm.Page.getAttribute("cdss_requireddealer").setRequiredLevel("none");
					Xrm.Page.getAttribute("cdss_requiredenduser").setRequiredLevel("none");
					break;
					
				case "Dealer":
					Xrm.Page.getControl("cdss_requireddepot").setVisible(false);
					Xrm.Page.getControl("cdss_requireddealer").setVisible(true);
					Xrm.Page.getControl("cdss_requiredenduser").setVisible(false);
					
					Xrm.Page.getAttribute("cdss_requireddepot").setRequiredLevel("none");
					Xrm.Page.getAttribute("cdss_requireddealer").setRequiredLevel("required");
					Xrm.Page.getAttribute("cdss_requiredenduser").setRequiredLevel("none");
					break;
					
				case "End User":
					Xrm.Page.getControl("cdss_requireddepot").setVisible(false);
					Xrm.Page.getControl("cdss_requireddealer").setVisible(false);
					Xrm.Page.getControl("cdss_requiredenduser").setVisible(true);
					
					Xrm.Page.getAttribute("cdss_requireddepot").setRequiredLevel("none");
					Xrm.Page.getAttribute("cdss_requireddealer").setRequiredLevel("none");
					Xrm.Page.getAttribute("cdss_requiredenduser").setRequiredLevel("required");
					break;
			}
		}
	} catch (err) {
		alert("Error caught in 'requiredLocationTypeToggle(" + bOnChange +")' function. \nError Details: " + err.message);
	}
}

function updateCurrentAddress() {
	
	try {
		var bRetrieve = false;
		var entityType = "";
		
		var lkpEndUser = Xrm.Page.getAttribute("cdss_enduserid").getValue();
		var lkpDealer = Xrm.Page.getAttribute("cdss_dealerid").getValue();
		var lkpDepot = Xrm.Page.getAttribute("new_depotid").getValue();
		
		var serverUrl = Xrm.Page.context.getClientUrl();
		var oDataEndpoint = "/XRMServices/2011/OrganizationData.svc/";
		var oDataSetName = "";
		var oDataSelect = "";
		var oDataFilter = "";
		
		if (lkpEndUser != null) {
			bRetrieve = true;
			entityType = "account";
			oDataSetName = "AccountSet";
			oDataSelect = "?$select=AccountId,Address1_Line1,Address1_Line2,Address1_Line3,Address1_City,Address1_Country,cdss_county,Address1_PostalCode,Telephone1,cdss_mobileno,Address1_Latitude,Address1_Longitude";
			oDataFilter = "&$filter=AccountId eq guid'" + lkpEndUser[0].id + "'";
		} else if (lkpDealer != null) {
			bRetrieve = true;
			entityType = "account";
			oDataSetName = "AccountSet";
			oDataSelect = "?$select=AccountId,Address1_Line1,Address1_Line2,Address1_Line3,Address1_City,Address1_Country,cdss_county,Address1_PostalCode,Telephone1,cdss_mobileno,Address1_Latitude,Address1_Longitude";
			oDataFilter = "&$filter=AccountId eq guid'" + lkpDealer[0].id + "'";
		} else if (lkpDepot != null) {
			bRetrieve = true;
			entityType = "depot";
			oDataSetName = "new_farmhanddepotSet";
			oDataSelect = "?$select=cdss_Addressline1,cdss_Addressline2,cdss_Addressline3,cdss_City,cdss_county,cdss_Country,cdss_Postcode,cdss_Latitude,cdss_longitude";
			oDataFilter = "&$filter=new_farmhanddepotId eq guid'" + lkpDepot[0].id + "'";
		}
		
		var oDataUrl = serverUrl + oDataEndpoint + oDataSetName + oDataSelect + oDataFilter;
		//console.log(oDataUrl);
		
		if (bRetrieve) {
			var returnObj = retrieveRequest(oDataUrl, false);
			//console.log(returnObj);
			
			//debugger;
			
			switch (entityType)
			{
				case "account":
					if (returnObj.results[0].Address1_Line1 != null)
						Xrm.Page.getAttribute("cdss_addressline1").setValue(returnObj.results[0].Address1_Line1);
					else
						Xrm.Page.getAttribute("cdss_addressline1").setValue();
					
					if (returnObj.results[0].Address1_Line2 != null)
						Xrm.Page.getAttribute("cdss_addressline2").setValue(returnObj.results[0].Address1_Line2);
					else
						Xrm.Page.getAttribute("cdss_addressline2").setValue();
				
					if (returnObj.results[0].Address1_Line3 != null)
						Xrm.Page.getAttribute("cdss_addressline3").setValue(returnObj.results[0].Address1_Line3);
					else
						Xrm.Page.getAttribute("cdss_addressline3").setValue();
					
					if (returnObj.results[0].Address1_City != null)
						Xrm.Page.getAttribute("cdss_city").setValue(returnObj.results[0].Address1_City);
					else
						Xrm.Page.getAttribute("cdss_city").setValue();
					
					if (returnObj.results[0].cdss_county != null)
						Xrm.Page.getAttribute("cdss_county").setValue(returnObj.results[0].cdss_county.Value);
					else
						Xrm.Page.getAttribute("cdss_county").setValue();
					
					if (returnObj.results[0].Address1_Country != null)
						Xrm.Page.getAttribute("cdss_country").setValue(returnObj.results[0].Address1_Country);
					else
						Xrm.Page.getAttribute("cdss_country").setValue();
					
					if (returnObj.results[0].Address1_PostalCode != null)
						Xrm.Page.getAttribute("cdss_postcode").setValue(returnObj.results[0].Address1_PostalCode);
					else
						Xrm.Page.getAttribute("cdss_postcode").setValue();
					
					if (returnObj.results[0].Telephone1 != null)
						Xrm.Page.getAttribute("cdss_landline").setValue(returnObj.results[0].Telephone1);
					else
						Xrm.Page.getAttribute("cdss_landline").setValue();
					
					if (returnObj.results[0].cdss_mobileno != null)
						Xrm.Page.getAttribute("cdss_mobileno").setValue(returnObj.results[0].cdss_mobileno);
					else
						Xrm.Page.getAttribute("cdss_mobileno").setValue();
					
					if (returnObj.results[0].Address1_Latitude != null)
						Xrm.Page.getAttribute("cdss_latitude").setValue(returnObj.results[0].Address1_Latitude);
					else
						Xrm.Page.getAttribute("cdss_latitude").setValue();
					
					if (returnObj.results[0].Address1_Longitude != null)
						Xrm.Page.getAttribute("cdss_longitude").setValue(returnObj.results[0].Address1_Longitude);
					else
						Xrm.Page.getAttribute("cdss_longitude").setValue();
					
					break;
					
				case "depot":
					if (returnObj.results[0].cdss_Addressline1 != null)
						Xrm.Page.getAttribute("cdss_addressline1").setValue(returnObj.results[0].cdss_Addressline1);
					else
						Xrm.Page.getAttribute("cdss_addressline1").setValue();
					
					if (returnObj.results[0].cdss_Addressline2 != null)
						Xrm.Page.getAttribute("cdss_addressline2").setValue(returnObj.results[0].cdss_Addressline2);
					else
						Xrm.Page.getAttribute("cdss_addressline2").setValue();
				
					if (returnObj.results[0].cdss_Addressline3 != null)
						Xrm.Page.getAttribute("cdss_addressline3").setValue(returnObj.results[0].cdss_Addressline3);
					else
						Xrm.Page.getAttribute("cdss_addressline3").setValue();
					
					if (returnObj.results[0].cdss_City != null)
						Xrm.Page.getAttribute("cdss_city").setValue(returnObj.results[0].cdss_City);
					else
						Xrm.Page.getAttribute("cdss_city").setValue();
					
					if (returnObj.results[0].cdss_county != null)
						Xrm.Page.getAttribute("cdss_county").setValue(returnObj.results[0].cdss_county.Value);
					else
						Xrm.Page.getAttribute("cdss_county").setValue();
					
					if (returnObj.results[0].cdss_Country != null)
						Xrm.Page.getAttribute("cdss_country").setValue(returnObj.results[0].cdss_Country);
					else
						Xrm.Page.getAttribute("cdss_country").setValue();
					
					if (returnObj.results[0].cdss_Postcode != null)
						Xrm.Page.getAttribute("cdss_postcode").setValue(returnObj.results[0].cdss_Postcode);
					else
						Xrm.Page.getAttribute("cdss_postcode").setValue();
					
					/*
					if (returnObj.results[0].cdss_Latitude != null) {
						var lat = parseFloat(returnObj.results[0].cdss_Latitude).toFixed(5);
						console.log(returnObj.results[0].cdss_Latitude);
						console.log(lat);
						Xrm.Page.getAttribute("cdss_latitude").setValue(lat);
					} else {
						Xrm.Page.getAttribute("cdss_latitude").setValue();
					}
					
					if (returnObj.results[0].cdss_longitude != null) {
						var longitude = parseFloat(returnObj.results[0].cdss_longitude).toFixed(5);
						console.log(returnObj.results[0].cdss_longitude);
						console.log(longitude);
						Xrm.Page.getAttribute("cdss_longitude").setValue(longitude);
					} else {
						Xrm.Page.getAttribute("cdss_longitude").setValue();
					}
					*/
					
					Xrm.Page.getAttribute("cdss_landline").setValue();
					Xrm.Page.getAttribute("cdss_mobileno").setValue();
					break;
			}
		} else {
			Xrm.Page.getAttribute("cdss_addressline1").setValue();
			Xrm.Page.getAttribute("cdss_addressline2").setValue();
			Xrm.Page.getAttribute("cdss_addressline3").setValue();
			Xrm.Page.getAttribute("cdss_city").setValue();
			Xrm.Page.getAttribute("cdss_county").setValue();
			Xrm.Page.getAttribute("cdss_country").setValue();
			Xrm.Page.getAttribute("cdss_postcode").setValue();
			Xrm.Page.getAttribute("cdss_landline").setValue();
			Xrm.Page.getAttribute("cdss_mobileno").setValue();
			Xrm.Page.getAttribute("cdss_latitude").setValue();
			Xrm.Page.getAttribute("cdss_longitude").setValue();
		}
		
		Xrm.Page.getAttribute("cdss_addressline1").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_addressline2").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_addressline3").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_city").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_county").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_country").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_postcode").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_landline").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_mobileno").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_latitude").setSubmitMode("always");
		Xrm.Page.getAttribute("cdss_longitude").setSubmitMode("always");
	} catch (err) {
		alert("Error caught in the 'updateCurrentAddress' function. \nError Details: " + err.message);
	}
}

function getXMLHttpRequest() {		
	
	var xmlHttp;
	
	try {
		// Firefox, Opera 8.0+, Safari, Chrome
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	
	return xmlHttp;
}

function retrieveRequest(oDataUrl, async) {
	
	var returnObj = new Object();
	returnObj.results = new Array();
	
    var oReq = getXMLHttpRequest();
	
    if (oReq != null) {
        oReq.open("GET", encodeURI(oDataUrl), async);
        oReq.setRequestHeader("Accept", "application/json");
        oReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        oReq.onreadystatechange = function() {
			if (oReq.readyState == 4 && oReq.status == 200) {
				oReq.onreadystatechange = null; //avoids memory leaks
				var result = window.JSON.parse(oReq.responseText).d;
				//console.log(result);
				for (var i = 0; i < result.results.length; i++) {
					returnObj.results.push(result.results[i]);
				}
			}
		};
		oReq.send();
    } else {
        alert("Error caught in 'retrieveRequest' function. \nError Details: " + err.message);
    }
	
	return returnObj;
}

function moveCompleted() {
	try {
		var move = Xrm.Page.getAttribute("new_moved").getValue();
		
		if (move) {
			if (confirm('Completing this action will update the current location of this Serial No record. \nDo you want to complete this action?')) {
				
				var locationType = Xrm.Page.getAttribute("cdss_requiredlocationtype").getText();
				
				switch (locationType) {
					case "End User":
						var enduser = Xrm.Page.getAttribute("cdss_requiredenduser").getValue();
						if (enduser != null) {
							Xrm.Page.getAttribute("cdss_enduserid").setValue([{ id: enduser[0].id, name: enduser[0].name, entityType: enduser[0].entityType}]);
						}
						break;
						
					case "Dealer":
						var dealer = Xrm.Page.getAttribute("cdss_requireddealer").getValue();
						if (dealer != null) {
							Xrm.Page.getAttribute("cdss_dealerid").setValue([{ id: dealer[0].id, name: dealer[0].name, entityType: dealer[0].entityType}]);
						}
						break;
						
					case "Depot":
						var depot = Xrm.Page.getAttribute("cdss_requireddepot").getValue();
						if (depot != null) {
							Xrm.Page.getAttribute("new_depotid").setValue([{ id: depot[0].id, name: depot[0].name, entityType: depot[0].entityType}]);
						}
						break;
				}
			
				updateCurrentAddress();
			
				Xrm.Page.getAttribute("new_moved").setValue(false);
				Xrm.Page.getAttribute("cdss_requiresmove").setValue(false);
				
				Xrm.Page.getAttribute("cdss_requiredlocationtype").setValue();
				Xrm.Page.getAttribute("cdss_requireddepot").setValue();
				Xrm.Page.getAttribute("cdss_requireddealer").setValue();
				Xrm.Page.getAttribute("cdss_requiredenduser").setValue();
				Xrm.Page.getAttribute("new_requiredlatitude").setValue();
				Xrm.Page.getAttribute("new_requiredlongitude").setValue();
				Xrm.Page.getAttribute("new_shippingpriority").setValue();
				Xrm.Page.getAttribute("new_pleaseshipbefore").setValue();
				
				Xrm.Page.getAttribute("cdss_requireddepot").setRequiredLevel("none");
				Xrm.Page.getAttribute("cdss_requireddealer").setRequiredLevel("none");
				Xrm.Page.getAttribute("cdss_requiredenduser").setRequiredLevel("none");
				
				hideShowSection("tabGeneral", "section_requiredlocation", false);
			} else {
				Xrm.Page.getAttribute("new_moved").setValue(false);
			}
		}
	} catch (err) {
		alert("Error caught in 'moveCompleted' function. \nError Details: " + err.message);
	}
	
}

function onLoad(executionContext) {
    try {
		var formContext = executionContext.getFormContext();
		endUserContactFieldValidation(formContext);

    } catch (e) {
		console.log(e);
    }

}

function onSave(executionContext) {
    try {
		var formContext = executionContext.getFormContext();
		endUserContactFieldValidation(formContext);
		

    } catch (e) {
		console.log(e);
    }
}

function endUserContactFieldValidation(formContext) {
	if (formContext.getAttribute("bpf_endusercontact").getValue() != null || formContext.getAttribute("bpf_endusercontact").getValue() != undefined)
		formContext.getAttribute("bpf_endusercontact").setRequiredLevel("required");
	else
		formContext.getAttribute("bpf_endusercontact").setRequiredLevel("none");

}