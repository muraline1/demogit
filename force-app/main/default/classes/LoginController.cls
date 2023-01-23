global class LoginController {
    @AuraEnabled
    global static String checkPortal(
        String username, String password
    ) {
        
        try {
            ApexPages.PageReference lgn =
                Site.login(username,
                           password, '');
            aura.redirect(lgn);
            return null;
        }
        catch (Exception ex) {
            return ex.getMessage();
        }
    }
    
    @AuraEnabled
    global static String forgotPassowrd(
        String username) {
            String procesMsg = '';
            
            if (Site.isValidUsername(
                username)) {
                    
                    Site.forgotPassword(
                        username);
                    procesMsg = Label.LoginResetSuccess;
                }
            else {
                
                procesMsg = Label.LoginResetWarning;
            }
            
            return procesMsg;
            
        }
    
}