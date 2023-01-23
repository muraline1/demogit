public class GeneratePDFCode {
    
    
    public static void generatePdf(String cartListUrl,Id custid){
        System.debug('/apex/TestPdfpage'+cartListUrl);
        PageReference pr = new PageReference('/apex/TestPdfpage'+cartListUrl); 
        ContentVersion cont = new ContentVersion();
        Blob blobFile = pr.getContentAsPDF();
        cont.Title = 'Mani Medical Bill';
        cont.PathOnClient = 'Bill_' + Datetime.now().getTime() + '.pdf';
        cont.VersionData = blobFile;
        cont.Origin = 'H';
        insert cont;
        
        System.debug('Inserted');
        System.debug('Customer Id:'+custid);
        
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId =[SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =: cont.Id].ContentDocumentId;
        cdl.LinkedEntityId = custid;
        cdl.ShareType = 'V';
        insert cdl;
        System.debug('Success');
    }
    
}