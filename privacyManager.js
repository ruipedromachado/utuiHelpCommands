//
// enable/disable v2
//
utui.privacy_management.util.enableV2()
utui.privacy_management.util.disableV2()

//
// copy between profiles
//
//source profile
var _tmp_pm_data = JSON.stringify(utui.data.privacy_management);

//Destination profile
utui.data.privacy_management = JSON.parse(_tmp_pm_data);