const DomainSearchField = document.getElementById('nameCheapDomainSearchField');
const DomainSearchButton = document.getElementById('DomainSearchButton');
const domainNameField = document.getElementById('domainNameField');
const domainControlPanelButton = document.getElementById('domainControlPanelButton');
const domainCopyButton = document.getElementById('AddNewDomainCopyButton');
const addnewDomainText = document.getElementById('AddNewDomainText');
const findTargetResult = document.getElementById('findTargetResult');
const findjarfilecmdText = document.getElementById('runJarFileCommand');
const codsFileCreationcmdText = document.getElementById('codsFileCreationCommand');
const codsFileText = document.getElementById('codsFileText')
const codsIntegritycmdText = document.getElementById('codsFileIntergrityCommandText');

let domain = "something.com";
const sshkeycmd = "cat ~/.ssh/id_rsa.pub | pbcopy";
const mavenPackagecmd = "./mvnw package";
const findJarFileCmd = String.raw`find target -name \*.jar`
let runJarFilecmd = "YOUR_JAR_FILE";
let codsfileConts = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=target/blog-0.0.1-SNAPSHOT.jar`
let  codsFileCreationcmd = "";
let jarFileLocation = "";
const codsFileIntergrityCommand = `source .cods\neval "$BUILD_COMMAND"\n[[ -f $JAR_FILE ]] && echo 'Good to Go!' || echo 'JAR_FILE not found!'`




async function copyTextToClipBoard(textToCopy) {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
}

function clipboard(id,text){
    document.getElementById(id).addEventListener('click',() =>{
        copyTextToClipBoard(text);
    
    })
}

DomainSearchButton.addEventListener("click", () =>{
    let url = `https://www.namecheap.com/domains/registration/results/?domain=${DomainSearchField.value}`;
    window.open(url);
})

domainNameField.addEventListener("change", () =>{
    domain = domainNameField.value;
    addnewDomainText.innerHTML = domain;
    clipboard('AddNewDomainCopyButton',domain);

})

domainControlPanelButton.addEventListener("click", () =>{
    window.open(`https://ap.www.namecheap.com/domains/domaincontrolpanel/${domain}`)
})

findTargetResult.addEventListener('change', () =>{
    jarFileLocation = findTargetResult.value.trim()
    runJarFilecmd = `java -jar ${jarFileLocation}`
    findjarfilecmdText.innerHTML = runJarFilecmd;
    codsFileText.innerHTML = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=${jarFileLocation}`
    codsFileCreationcmd = `echo "`+ String.raw`BUILD_COMMAND='./mvnw package'\nJAR_FILE=`+ jarFileLocation +`" > .cods`;
    codsFileCreationcmdText.innerHTML = codsFileCreationcmd;
    clipboard('runJarFileCommandCopy', runJarFilecmd);
    clipboard('codsFileCreationCommandText',codsFileCreationcmd);
})

codsIntegritycmdText.innerHTML = codsFileIntergrityCommand;

clipboard('nsOneCopy','ns1.digitalocean.com');
clipboard('nsTwoCopy','ns2.digitalocean.com');
clipboard('nsThreeCopy','ns3.digitalocean.com');
clipboard('copySshCommandButton',sshkeycmd);
clipboard('copyMavenPackageCommandButton',mavenPackagecmd);
clipboard('findJarFileButton',findJarFileCmd);
clipboard('codsFileIntergrityCommandButton',codsFileIntergrityCommand);









