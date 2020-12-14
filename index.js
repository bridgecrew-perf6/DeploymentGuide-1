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
const serverCredentialscmdTextTwo = document.getElementById('serverCredentialsCommandTextTwo');
const serverCredentialsField = document.getElementById('serverCredentails');
const secondServerCredentialsField = document.getElementById('secondServerCredentails');
const serverUserNameField = document.getElementById("serverUserName");
const serverLogincmdText = document.getElementById("serverLoginCommand");
const configMySQLcmdText = document.getElementById("configMySQLCommandText");
const mySQLCreateAdminUsercmdText = document.getElementById('mySQLamdinUserCommandText');
const serverCreateDbandUserCommandText = document.getElementById('serverCreateDbandUserCommandText');
const appDbNameField = document.getElementById('appDbName')
const appDbUserField = document.getElementById('appDbUser');
const createSiteCommandText = document.getElementById('createSiteCommandText');
const propertiesUploadCommandText = document.getElementById('propertiesUploadCommandText');
const fileEditCommandText = document.getElementById('fileEditCommandText');
const dataSourceURLText = document.getElementById('dataSourceURLText');
const dataSourceUSERNAMEText = document.getElementById('dataSourceUSERNAMEText');
const dataSourcePASSText = document.getElementById('dataSourcePASSText');
const addRemoteCommandText = document.getElementById('addRemoteCommandText');

let domain = "something.com";
const sshkeycmd = "cat ~/.ssh/id_rsa.pub | pbcopy";
const mavenPackagecmd = "./mvnw package";
const findJarFileCmd = String.raw`find target -name \*.jar`
let runJarFilecmd = "YOUR_JAR_FILE";
let codsfileConts = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=target/blog-0.0.1-SNAPSHOT.jar`
let codsFileCreationcmd = "";
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
let credentialsDbUserPass = "";
let serverLoginCommand;
let mysqlConfigcmd = `sudo -s\nwget http://repo.mysql.com/mysql-apt-config_0.8.13-1_all.deb\ndpkg -i mysql-apt-config_0.8.13-1_all.deb`;
let mysqlInstallcmd = `apt update && apt install -y mysql-server`;
const mysqlLogincmd = `mysql -u root`;
let mysqlCreateAdminUsercmd;
let serverCreateDbandUsercmd;
let appDbName;
let appDbUser;
let createSitecmd;
let serverUploadcmd = `myserver upload --file src/main/resources/application.properties --destination /srv/example.com/application.properties`
let editUploadedfilecmd = 'myserver run nano /srv/example.com/application.properties'
let dataSourceUrl = "spring.datasource.url=jdbc:mysql://localhost/mockprepdb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC";
let dataSourceUsername = "spring.datasource.username=root";
let dataSourcePass = "spring.datasource.password=codeup";
let gitAddRemotecmd = `git remote add production username@ipaddress:/srv/domain/repo.git`


configMySQLcmdText.innerHTML = mysqlInstallcmd;

function retreiveNewCredentails(creds){
    let indexOfUser = creds.indexOf(appDbUser);
    console.log(indexOfUser);
    let newUserCreds = creds.substring(indexOfUser, creds.length);
    console.log(newUserCreds);
    credentialsDbUserPass = newUserCreds.slice(appDbUser.length + 1, newUserCreds.length).trim();
    creds.indexOf("appDbUser");
    dataSourcePass = `spring.datasource.password=${credentialsDbUserPass}`;
    dataSourcePASSText.innerHTML = dataSourcePass;
}

function createRemoteSeq(){
    gitAddRemotecmd = `git remote add production ${serverUserName}@${serverIPAddress}:/srv/${domain}/repo.git`
    addRemoteCommandText.innerHTML = gitAddRemotecmd;
    clipboard('addRemoteCommandCopy',gitAddRemotecmd);

}

function credentialsRequest(){

    secondServerCredentialsField.addEventListener('change', () =>{
        retreiveNewCredentails(secondServerCredentialsField.value.trim());
    })
}

function fileUploadEditseq(){
    editUploadedfilecmd = `${serverName} run nano /srv/${domain}/application.properties`
    fileEditCommandText.innerHTML = editUploadedfilecmd;
    clipboard('fileEditCommandCopy',editUploadedfilecmd);
}

function createSiteCommandSeq(){
    createSitecmd = `${serverName} site create --domain ${domain} --java --spring-boot --port 8080`
    createSiteCommandText.innerHTML = createSitecmd;
    clipboard('createSiteCommandCopy',createSitecmd);
}

function secondServerCredentialsSeq(){

}

function RetreiveCredentials(creds) {
    const sudoPassTerm = "Sudo Password:";
    const DbPassTerm = "DB Password:";

    let sudoPassIndex = creds.indexOf(sudoPassTerm);
    let DbPassIndex = creds.indexOf(DbPassTerm);

    let sudoPass = creds.substring(sudoPassIndex, DbPassIndex - 1);
    credentialsSudoPass = sudoPass.slice(sudoPassTerm.length, sudoPass.length).trim();

    let DbPass = creds.substring(DbPassIndex, creds.length);
    credentialsDbPass = DbPass.slice(DbPassTerm.length, DbPass.length).trim();

}


async function copyTextToClipBoard(textToCopy) {
    try {
        await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

function clipboard(id, text) {
    document.getElementById(id).addEventListener('click', () => {
        copyTextToClipBoard(text);

    })
}

DomainSearchButton.addEventListener("click", () => {
    let url = `https://www.namecheap.com/domains/registration/results/?domain=${DomainSearchField.value}`;
    window.open(url);
})

serverIpField.addEventListener("change", () => {
    serverIPAddress = serverIpField.value;
    dropletIpAddress.innerHTML = serverIPAddress;
    createRemoteSeq();
})

domainNameField.addEventListener("change", () => {
    domain = domainNameField.value;
    addnewDomainText.innerHTML = domain;
    clipboard('AddNewDomainCopyButton', domain);
    createSiteCommandSeq();
    serverUploadcmd = `${serverName} upload --file src/main/resources/application.properties --destination /srv/${domain}/application.properties`
    propertiesUploadCommandText.innerHTML = serverUploadcmd;
    clipboard('propertiesUploadCommandCopy', serverUploadcmd);
    fileUploadEditseq();
    createRemoteSeq()

})

domainControlPanelButton.addEventListener("click", () => {
    window.open(`https://ap.www.namecheap.com/domains/domaincontrolpanel/${domain}`)
})

findTargetResult.addEventListener('change', () => {
    jarFileLocation = findTargetResult.value.trim()
    runJarFilecmd = `java -jar ${jarFileLocation}`
    findjarfilecmdText.innerHTML = runJarFilecmd;
    codsFileText.innerHTML = `BUILD_COMMAND='./mvnw package'\nJAR_FILE=${jarFileLocation}`
    codsFileCreationcmd = `echo "` + String.raw`BUILD_COMMAND='./mvnw package'\nJAR_FILE=` + jarFileLocation + `" > .cods`;
    codsFileCreationcmdText.innerHTML = codsFileCreationcmd;
    clipboard('runJarFileCommandCopy', runJarFilecmd);
    clipboard('codsFileCreationCommandText', codsFileCreationcmd);
})

serverNameField.addEventListener('change', () => {
    serverName = serverNameField.value.trim();
    serverInitcmd = `cods init ${serverName}`;
    serverInitcommandText.innerHTML = serverInitcmd;
    serverRefcmdText.innerHTML = serverName;
    serverCredentialscmd = `${serverName} credentials | pbcopy`;
    serverCredentialscmdText.innerHTML = serverCredentialscmd;
    serverCredentialscmdTextTwo.innerHTML = serverCredentialscmd;
    serverLoginCommand = `${serverName} login`;
    serverLogincmdText.value = serverLoginCommand;
    clipboard('serverRefferenceCommandButtonCopy', serverName);
    clipboard('serverCredentialsCommandButtonCopy', serverCredentialscmd);
    clipboard('serverCredentialsCommandButtonCopyTwo', serverCredentialscmd);
    clipboard('serverLoginCommandButtonCopy', serverLoginCommand);
    serverCreateDbandUsercmd = `${serverName} db create --name ${appDbName} --user ${appDbUser}`;
    serverCreateDbandUserCommandText.innerHTML = serverCreateDbandUsercmd;
    clipboard('serverCreateDbandUserCommandCopy', serverCreateDbandUsercmd);
    createSiteCommandSeq();
    serverUploadcmd = `${serverName} upload --file src/main/resources/application.properties --destination /srv/${domain}/application.properties`
    propertiesUploadCommandText.innerHTML = serverUploadcmd;
    clipboard('propertiesUploadCommandCopy', serverUploadcmd);
    fileUploadEditseq();

})

serverUserNameField.addEventListener('change', () => {
    serverUserName = serverUserNameField.value;
    mysqlCreateAdminUsercmd = `CREATE USER '${serverUserName}'@'localhost' IDENTIFIED BY '${credentialsDbPass}';\nGRANT ALL on *.* TO '${serverUserName}'@'localhost' WITH GRANT OPTION;`;
    mySQLCreateAdminUsercmdText.innerHTML = mysqlCreateAdminUsercmd
    clipboard('mySQLadminUserCommandCopy', mysqlCreateAdminUsercmd);
    createRemoteSeq()
})



serverCredentialsField.addEventListener('change', () => {
    serverCredentials = serverCredentialsField.value.trim();
    RetreiveCredentials(serverCredentials);
    mysqlCreateAdminUsercmd = `CREATE USER '${serverUserName}'@'localhost' IDENTIFIED BY '${credentialsDbPass}';\nGRANT ALL on *.* TO '${serverUserName}'@'localhost' WITH GRANT OPTION;`;
    mySQLCreateAdminUsercmdText.innerHTML = mysqlCreateAdminUsercmd
    clipboard('mySQLadminUserCommandCopy', mysqlCreateAdminUsercmd);
    document.getElementById('ServerCreateDbPassText').innerHTML = credentialsDbPass;
    clipboard('ServerCreateDbSudoPassCopy',credentialsDbPass);

})

credentialsRequest();

appDbNameField.addEventListener('change', () =>{
    appDbName = appDbNameField.value;
    serverCreateDbandUsercmd = `${serverName} db create --name ${appDbName} --user ${appDbUser}`;
    serverCreateDbandUserCommandText.innerHTML = serverCreateDbandUsercmd;
    clipboard('serverCreateDbandUserCommandCopy', serverCreateDbandUsercmd);
    dataSourceUrl = `spring.datasource.url=jdbc:mysql://localhost/${appDbName}?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC`
    dataSourceURLText.innerHTML = dataSourceUrl;
})


appDbUserField.addEventListener('change', () =>{
    appDbUser = appDbUserField.value;
        serverCreateDbandUsercmd = `${serverName} db create --name ${appDbName} --user ${appDbUser}`;
    serverCreateDbandUserCommandText.innerHTML = serverCreateDbandUsercmd;
    clipboard('serverCreateDbandUserCommandCopy', serverCreateDbandUsercmd);
    dataSourceUsername = `spring.datasource.username=${appDbUser}`
    dataSourceUSERNAMEText.innerHTML = dataSourceUsername;
})


codsIntegritycmdText.innerHTML = codsFileIntergrityCommand;

clipboard('nsOneCopy', 'ns1.digitalocean.com');
clipboard('nsTwoCopy', 'ns2.digitalocean.com');
clipboard('nsThreeCopy', 'ns3.digitalocean.com');
clipboard('copySshCommandButton', sshkeycmd);
clipboard('copyMavenPackageCommandButton', mavenPackagecmd);
clipboard('findJarFileButton', findJarFileCmd);
clipboard('codsFileIntergrityCommandButton', codsFileIntergrityCommand);
clipboard('zguldeCodsToolButton', zguldeCodsBrewCommand);
clipboard('serverInitcommandCopy', serverInitcmd);
clipboard('dropletIpAddressCopy', serverIPAddress);
clipboard('mySQLconfigCommandCopy', mysqlConfigcmd);
clipboard('mySQLinstallCommandCopy', mysqlInstallcmd);
clipboard('mySQLloginCommandCopy', mysqlLogincmd);

clipboard('exitServerCommandCopy', 'exit');
clipboard('pushProductionCommandCopy',"git push production master");








