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
const serverIpField = document.getElementById('serverIpField');
const serverNameField = document.getElementById('serverNameField');
const serverInitcommandText = document.getElementById('serverInitcommand');
const dropletIpAddress = document.getElementById('dropletIpAddress');
const serverRefcmdText = document.getElementById('serverRefferenceCommand');
const serverCredentialscmdText = document.getElementById('serverCredentialsCommand');
const serverCredentialsField = document.getElementById('serverCredentails');
const serverUserNameField = document.getElementById("serverUserName");
const serverLogincmdText = document.getElementById("serverLoginCommand");
const configMySQLcmdText = document.getElementById("configMySQLCommandText");
const mySQLCreateAdminUsercmdText = document.getElementById('mySQLamdinUserCommandText');



let domain = "something.com";
const sshkeycmd = "cat ~/.ssh/id_rsa.pub | pbcopy";
const mavenPackagecmd = "./mvnw package";
const findJarFileCmd = String.raw`find target -name \*.jar`
let runJarFilecmd = "YOUR_JAR_FILE";
let codsfileConts = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=target/blog-0.0.1-SNAPSHOT.jar`
let  codsFileCreationcmd = "";
let jarFileLocation = "";
const codsFileIntergrityCommand = `source .cods\neval "$BUILD_COMMAND"\n[[ -f $JAR_FILE ]] && echo 'Good to Go!' || echo 'JAR_FILE not found!'`
const zguldeCodsBrewCommand = "brew install zgulde/zgulde/cods";
let serverIPAddress = "";
let serverName = "springBootServer";
let serverUserName;
let serverInitcmd = "cods init springBootServer";
let serverCredentialscmd = "springBootServer credentials";
let serverCredentials = "Sudo Password: T2OrIQw3VnyBAgSdh1fr   DB Password:   Q5YnPYv6Xqdsa13D4mpy";
let credentialsSudoPass = "";
let credentialsDbPass = "";
let serverLoginCommand;
let mysqlConfigcmd = `sudo -s\nwget http://repo.mysql.com/mysql-apt-config_0.8.13-1_all.deb\ndpkg -i mysql-apt-config_0.8.13-1_all.deb`;
let mysqlInstallcmd = `apt update && apt install -y mysql-server`;
const mysqlLogincmd = `mysql -u root`;
let mysqlCreateAdminUsercmd;

configMySQLcmdText.innerHTML = mysqlInstallcmd;

function RetreiveCredentials(creds){
    const sudoPassTerm = "Sudo Password:";
    const DbPassTerm = "DB Password:";

    let sudoPassIndex = creds.indexOf(sudoPassTerm);
    let DbPassIndex = creds.indexOf(DbPassTerm);

    let sudoPass = creds.substring(sudoPassIndex,DbPassIndex - 1);
    credentialsSudoPass = sudoPass.slice(sudoPassTerm.length,sudoPass.length).trim();

    let DbPass = creds.substring(DbPassIndex,creds.length);
    credentialsDbPass = DbPass.slice(DbPassTerm.length,DbPass.length).trim();

}


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

serverIpField.addEventListener("change", () =>{
    serverIPAddress = serverIpField.value;
    dropletIpAddress.innerHTML = serverIPAddress;
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

serverNameField.addEventListener('change', () =>{
    serverName = serverNameField.value.trim();
    serverInitcmd = `cods init ${serverName}`;
    serverInitcommandText.innerHTML = serverInitcmd;
    serverRefcmdText.innerHTML = serverName;
    serverCredentialscmd = `${serverName} credentials`;
    serverCredentialscmdText.innerHTML = serverCredentialscmd;
    serverLoginCommand = `${serverName} login`;
    serverLogincmdText.value = serverLoginCommand;
    clipboard('serverRefferenceCommandButtonCopy',serverName);
    clipboard('serverCredentialsCommandButtonCopy',serverCredentialscmd);
    clipboard('serverLoginCommandButtonCopy',serverLoginCommand);


})

serverUserNameField.addEventListener('change', () =>{
    serverUserName = serverUserNameField.value;
    mysqlCreateAdminUsercmd = `CREATE USER '${serverUserName}'@'localhost' IDENTIFIED BY '${credentialsDbPass}';\nGRANT ALL on *.* TO '${serverUserName}'@'localhost' WITH GRANT OPTION;`;
    mySQLCreateAdminUsercmdText.innerHTML = mysqlCreateAdminUsercmd
    clipboard('mySQLadminUserCommandCopy',mysqlCreateAdminUsercmd);
})



serverCredentialsField.addEventListener('change', () =>{
    serverCredentials = serverCredentialsField.value.trim();
    RetreiveCredentials(serverCredentials);
    mysqlCreateAdminUsercmd = `CREATE USER '${serverUserName}'@'localhost' IDENTIFIED BY '${credentialsDbPass}';\nGRANT ALL on *.* TO '${serverUserName}'@'localhost' WITH GRANT OPTION;`;
    mySQLCreateAdminUsercmdText.innerHTML = mysqlCreateAdminUsercmd
    clipboard('mySQLadminUserCommandCopy',mysqlCreateAdminUsercmd);

})



codsIntegritycmdText.innerHTML = codsFileIntergrityCommand;

clipboard('nsOneCopy','ns1.digitalocean.com');
clipboard('nsTwoCopy','ns2.digitalocean.com');
clipboard('nsThreeCopy','ns3.digitalocean.com');
clipboard('copySshCommandButton',sshkeycmd);
clipboard('copyMavenPackageCommandButton',mavenPackagecmd);
clipboard('findJarFileButton',findJarFileCmd);
clipboard('codsFileIntergrityCommandButton',codsFileIntergrityCommand);
clipboard('zguldeCodsToolButton',zguldeCodsBrewCommand);
clipboard('serverInitcommandCopy',serverInitcmd);
clipboard('dropletIpAddressCopy',serverIPAddress);
clipboard('mySQLconfigCommandCopy',mysqlConfigcmd);
clipboard('mySQLinstallCommandCopy',mysqlInstallcmd);
clipboard('mySQLloginCommandCopy',mysqlLogincmd);

clipboard('exitServerCommandCopy','exit');









