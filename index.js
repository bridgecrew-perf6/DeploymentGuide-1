const DomainSearchField = document.getElementById('nameCheapDomainSearchField');
const DomainSearchButton = document.getElementById('DomainSearchButton');
const domainNameField = document.getElementById('domainNameField');
const domainControlPanelButton = document.getElementById('domainControlPanelButton');
const domainCopyButton = document.getElementById('AddNewDomainCopyButton');
const addnewDomainText = document.getElementById('AddNewDomainText');
const findTargetResult = document.getElementById('findTargetResult');
const findjarfilecmdText = document.getElementById('runJarFileCommand');
const codsFileText = document.getElementById('codsFileText')

let domain = "something.com";
const sshkeycmd = "cat ~/.ssh/id_rsa.pub | pbcopy";
const mavenPackagecmd = "./mvnw package";
const findJarFileCmd = String.raw`find target -name \*.jar`
let runJarFilecmd = "YOUR_JAR_FILE";
let codsfileConts = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=target/blog-0.0.1-SNAPSHOT.jar`



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
    runJarFilecmd = `java -jar ${findTargetResult.value}`
    findjarfilecmdText.innerHTML = runJarFilecmd;
    codsFileText.innerHTML = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=${runJarFilecmd}`
    clipboard('runJarFileCommandCopy', runJarFilecmd);
})

clipboard('nsOneCopy','ns1.digitalocean.com');
clipboard('nsTwoCopy','ns2.digitalocean.com');
clipboard('nsThreeCopy','ns3.digitalocean.com');
clipboard('copySshCommandButton',sshkeycmd);
clipboard('copyMavenPackageCommandButton',mavenPackagecmd);
clipboard('findJarFileButton',findJarFileCmd);









