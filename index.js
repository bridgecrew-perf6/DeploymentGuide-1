let DomainSearchField = document.getElementById('nameCheapDomainSearchField');
let DomainSearchButton = document.getElementById('DomainSearchButton');
let domainNameField = document.getElementById('domainNameField');
let domainControlPanelButton = document.getElementById('domainControlPanelButton');
const domainCopyButton = document.getElementById('AddNewDomainCopyButton');
const addnewDomainText = document.getElementById('AddNewDomainText');
let domain = "something.com";
const sshkeycmd = "cat ~/.ssh/id_rsa.pub | pbcopy";



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

clipboard('nsOneCopy','ns1.digitalocean.com');
clipboard('nsTwoCopy','ns2.digitalocean.com');
clipboard('nsThreeCopy','ns3.digitalocean.com');
clipboard('copySshCommandButton',sshkeycmd);








